import { useMemo, useState } from 'react';

export interface NotificationItem {
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    color: string;
    bgColor: string;
    initials?: string;
    icon?: string;
    actions?: string[];
    isRead: boolean;
    category: 'Requests' | 'Deals' | 'Alerts';
}

interface NotificationSection {
    title: string;
    data: NotificationItem[];
}

const RAW_ITEMS: NotificationItem[] = [
    {
        id: '1',
        type: 'request',
        title: 'New request from Kicks City',
        description: 'Air Jordan 4 "Black Cat" Size 10.5 · Deadstock — Offer: $185',
        time: '5 min ago',
        initials: 'KC',
        color: '#22C55E',
        bgColor: '#F0FDF4',
        actions: ['View Request', 'Ignore'],
        isRead: false,
        category: 'Requests',
    },
    {
        id: '2',
        type: 'counter',
        title: 'Counter offer from Sole House',
        description: 'Nike Dunk Low - Size 11 · Your ask: $210 → Counter offer: $195',
        time: '1 hr ago',
        initials: 'SH',
        color: '#F59E0B',
        bgColor: '#FFFBEB',
        actions: ['Accept $195', 'Counter', 'Decline'],
        isRead: false,
        category: 'Deals',
    },
    {
        id: '3',
        type: 'deal',
        title: 'Deal confirmed',
        description: 'Nike Dunk Low - $155 · Arrange pickup/shipping details.',
        time: '3 hrs ago',
        icon: 'checkmark-circle-outline',
        color: '#22C55E',
        bgColor: '#F0FDF4',
        actions: ['View Deal'],
        isRead: false,
        category: 'Deals',
    },
    {
        id: '4',
        type: 'info',
        title: '3 stores viewed your inventory',
        description: 'Kicks City, Sole House, and 1 other store viewed your listings today.',
        time: 'Today',
        icon: 'eye-outline',
        color: '#6B7280',
        bgColor: '#F9FAFB',
        actions: ['View Stores'],
        isRead: true,
        category: 'Alerts',
    },
    {
        id: '5',
        type: 'declined',
        title: 'Request declined',
        description: 'Premier Kicks declined your Air Max 90 listing.',
        time: 'Yesterday',
        icon: 'close-outline',
        color: '#EF4444',
        bgColor: '#FFF1F2',
        actions: ['View Listing'],
        isRead: true,
        category: 'Alerts',
    },
    {
        id: '6',
        type: 'trust',
        title: 'Trust Score updated',
        description: 'Your Trust Score is now 98/100. Response rate: 99%',
        time: 'Yesterday',
        icon: 'shield-checkmark-outline',
        color: '#22C55E',
        bgColor: '#F0FDF4',
        actions: ['View Trust Score'],
        isRead: true,
        category: 'Alerts',
    },
];

export const useNotifications = () => {
    const [items, setItems] = useState<NotificationItem[]>(RAW_ITEMS);
    const [activeTab, setActiveTab] = useState<'All' | 'Requests' | 'Deals' | 'Alerts'>('All');

    const filtered = useMemo(
        () => (activeTab === 'All' ? items : items.filter((i) => i.category === activeTab)),
        [items, activeTab]
    );

    const actionRequired = filtered.filter(
        (i) => i.actions?.some((a) => !a.toLowerCase().startsWith('view'))
    );
    const today = filtered.filter(
        (i) => !actionRequired.includes(i) && (i.time.includes('ago') || i.time === 'Today')
    );
    const yesterday = filtered.filter(
        (i) => !actionRequired.includes(i) && !today.includes(i)
    );

    const sections: NotificationSection[] = [
        ...(actionRequired.length ? [{ title: 'Action Required', data: actionRequired }] : []),
        ...(today.length ? [{ title: 'TODAY', data: today }] : []),
        ...(yesterday.length ? [{ title: 'YESTERDAY', data: yesterday }] : []),
    ];

    const tabCounts = {
        All: items.length,
        Requests: items.filter((i) => i.category === 'Requests').length,
        Deals: items.filter((i) => i.category === 'Deals').length,
        Alerts: items.filter((i) => i.category === 'Alerts').length,
    };

    const totalCount = items.length;

    const markAllRead = () => {
        setItems((prev) => prev.map((i) => ({ ...i, isRead: true })));
    };

    // value omitted = mark read; pass false to mark unread (used by swipe action toggle)
    const markRead = (id: string, value: boolean = true) => {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isRead: value } : i)));
    };

    const deleteNotification = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    return { sections, activeTab, setActiveTab, tabCounts, totalCount, markAllRead, markRead, deleteNotification };
};