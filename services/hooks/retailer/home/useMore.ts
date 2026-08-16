import { router } from 'expo-router';

export interface DashboardMenuItem {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    route: string;
}

export const useDashboard = () => {
    const storeInfo = {
        name: "Sonny's Kicks",
        location: "Miami, FL",
        status: "Active"
    };

    const menuItems: DashboardMenuItem[] = [
        { id: '1', title: 'Reviews', icon: 'star', iconBg: '#F59E0B', route: '/screens/retailer/home/more/reviewScreen' },
        { id: '2', title: 'Drop Manager', icon: 'zap', iconBg: '#8B5CF6', route: '/screens/retailer/home/more/dropManagerScreen' },
        { id: '3', title: 'Radius Promotion', icon: 'map-pin', iconBg: '#10B981', route: '/screens/retailer/home/more/radiusPromotionScreen' },
        { id: '4', title: 'Analytics', icon: 'bar-chart-2', iconBg: '#3B82F6', route: '/screens/retailer/home/more/analyticsScreen' },
        { id: '5', title: 'Local Demand', icon: 'trending-up', iconBg: '#10B981', route: '/screens/retailer/home/more/localDemandScreen' },
        { id: '6', title: 'Size Demand', icon: 'tag', iconBg: '#111827', route: '/screens/retailer/home/more/sizeDemandScreen' },
        { id: '7', title: 'Demand Gaps', icon: 'zap', iconBg: '#F59E0B', route: '/screens/retailer/home/more/demandGapsScreen' },
        { id: '8', title: 'Boost Your Store', icon: 'credit-card', iconBg: '#3B82F6', route: '/screens/retailer/home/more/boostStoreScreen' },
        { id: '9', title: 'Source Inventory', icon: 'users', iconBg: '#10B981', route: '/screens/retailer/home/more/sourceInventoryScreen' },
        { id: '10', title: 'Make an Offer', icon: 'dollar-sign', iconBg: '#111827', route: '/screens/retailer/home/more/makeOfferScreen' },
        { id: '11', title: 'Business Overview', icon: 'briefcase', iconBg: '#6B7280', route: '/screens/retailer/home/more/businessOverViewScreen' },
        { id: '12', title: 'Sync Settings',    icon: 'refresh-cw', iconBg: '#3B82F6', route: '/screens/retailer/home/more/syncSettingsScreen' },
        { id: '13', title: 'Sell to Customer', icon: 'user-check', iconBg: '#22c55e', route: '/screens/retailer/home/more/sellToCustomerScreen' },
        { id: '14', title: 'Pickup Settings',  icon: 'map-pin',    iconBg: '#8B5CF6', route: '/screens/retailer/home/more/pickupSettingsScreen' },
        { id: '15', title: 'Subscription',     icon: 'award',      iconBg: '#F59E0B', route: '/screens/retailer/home/more/storeSubscriptionScreen' },
    ];

    const handlePress = (route: string) => {
        router.push(route as any);
    };

    return { storeInfo, menuItems, handlePress };
};