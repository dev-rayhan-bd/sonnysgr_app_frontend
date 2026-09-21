import { useState, useMemo, useCallback } from 'react';
import { Order, OrderStatus } from '@/types/Orders';
import { OrderTab, TabCounts } from '@/components/retailer/orders/OrdersTabs';

// ── Mock data — pixel-exact match to screenshot ──────────────────────────────
const MOCK_ORDERS: Order[] = [
    {
        id: '1',
        orderNumber: 'GS-1048',
        status: 'new',
        tag: 'BUY NOW',
        productName: "Air Jordan 4 'Black Cat'",
        size: '10.5',
        gender: "Men's",
        customerName: 'Azafar P.',
        price: 220,
        timeAgo: '12 min ago',
        confirmWithinMinutes: 18,
        inventoryReserved: true,
    },
    {
        id: '2',
        orderNumber: 'GS-1047',
        status: 'holding',
        tag: 'DETAILS',
        productName: "Nike Dunk Low 'Panda'",
        size: '9.5',
        gender: "Men's",
        customerName: 'Melten',
        price: 130,
        timeAgo: '1 hour ago',
        expiresIn: '3h 5m',
        depositPaid: true,
        depositAmount: 30,
    },
    {
        id: '3',
        orderNumber: 'GS-1046',
        status: 'ready',
        tag: 'PICKUP',
        productName: "Adidas Yeezy 350 V2 'Zebra'",
        size: '11',
        gender: "Men's",
        customerName: 'Rafiq H.',
        price: 340,
        timeAgo: '2 hours ago',
        readySince: '5:16 PM',
        customerNotified: true,
        waitingSince: '2h',
    },
    {
        id: '4',
        orderNumber: 'GS-1045',
        status: 'completed',
        tag: 'BUY NOW',
        productName: "New Balance 550 'White Green'",
        size: '9',
        gender: "Men's",
        customerName: 'Sadia K.',
        price: 160,
        timeAgo: 'Mar 26',
        completedDate: 'Mar 26',
    },
    {
        id: '5',
        orderNumber: 'GS-1044',
        status: 'cancelled',
        tag: 'DETAILS',
        productName: "Converse Chuck 70 'Black'",
        size: '7',
        gender: "Men's",
        customerName: 'Tarvin M.',
        price: 95,
        timeAgo: 'Mar 31',
        cancelledDate: 'Mar 23',
        cancelledBy: 'customer',
    },
];

// ── Tab → statuses map ────────────────────────────────────────────────────────
const TAB_STATUS_MAP: Record<OrderTab, OrderStatus[] | null> = {
    'Needs Action': ['new'],
    Holds:          ['holding'],
    Ready:          ['ready'],
    History:        ['completed', 'cancelled'],
};

// ── Hook ─────────────────────────────────────────────────────────────────────
export const useOrders = () => {
    const [activeTab, setActiveTab]   = useState<OrderTab>('Needs Action');
    const [orders, setOrders]         = useState<Order[]>(MOCK_ORDERS);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // ── Computed tab counts ──────────────────────────────────────────────────
    const tabCounts = useMemo<TabCounts>(() => ({
        'Needs Action': orders.filter(o => o.status === 'new').length,
        Holds:          orders.filter(o => o.status === 'holding').length,
        Ready:          orders.filter(o => o.status === 'ready').length,
        History:        orders.filter(o => o.status === 'completed' || o.status === 'cancelled').length,
    }), [orders]);

    // ── Filtered list ────────────────────────────────────────────────────────
    const filteredOrders = useMemo(() => {
        const statuses = TAB_STATUS_MAP[activeTab];
        if (!statuses) return orders;
        return orders.filter(o => statuses.includes(o.status));
    }, [activeTab, orders]);

    // ── Recent activity (completed/cancelled, most recent first) ────────────
    const recentActivity = useMemo(() => {
        if (activeTab === 'History') return [];
        return orders.filter(o => o.status === 'completed' || o.status === 'cancelled');
    }, [orders, activeTab]);

    // ── Today summary ────────────────────────────────────────────────────────
    const ordersToday = orders.length;
    const avgPrepMinutes = 8;

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        // TODO: replace with real API call
        await new Promise(r => setTimeout(r, 1200));
        setIsRefreshing(false);
    }, []);

    const handleTabChange = useCallback((tab: OrderTab) => {
        setActiveTab(tab);
    }, []);

    const handleConfirmOrder = useCallback((orderId: string) => {
        // TODO: call API then update local state
        setOrders(prev =>
            prev.map(o => o.id === orderId ? { ...o, status: 'holding' as OrderStatus } : o)
        );
    }, []);

    const handleMarkReady = useCallback((orderId: string) => {
        // TODO: call API then update local state
        setOrders(prev =>
            prev.map(o => o.id === orderId ? { ...o, status: 'ready' as OrderStatus } : o)
        );
    }, []);

    const handleMarkPickedUp = useCallback((orderId: string) => {
        // TODO: call API then update local state
        setOrders(prev =>
            prev.map(o => o.id === orderId ? { ...o, status: 'completed' as OrderStatus } : o)
        );
    }, []);

    const handleViewDetails = useCallback((orderId: string) => {
        // TODO: navigate to order detail screen
        console.log('View details', orderId);
    }, []);

    const handleViewHoldDetails = useCallback((orderId: string) => {
        // TODO: navigate to hold detail screen
        console.log('View hold details', orderId);
    }, []);

    const handleSearch = useCallback(() => {
        // TODO: open search modal
        console.log('Search');
    }, []);

    const handleFilter = useCallback(() => {
        // TODO: open filter bottom sheet
        console.log('Filter');
    }, []);

    const handleViewAllActivity = useCallback(() => {
        setActiveTab('History');
    }, []);

    return {
        activeTab,
        tabCounts,
        filteredOrders,
        recentActivity,
        ordersToday,
        avgPrepMinutes,
        isRefreshing,
        handleTabChange,
        handleRefresh,
        handleConfirmOrder,
        handleMarkReady,
        handleMarkPickedUp,
        handleViewDetails,
        handleViewHoldDetails,
        handleSearch,
        handleFilter,
        handleViewAllActivity,
    };
};