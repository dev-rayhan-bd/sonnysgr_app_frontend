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
        { id: '2', title: 'Drop Manager', icon: 'zap', iconBg: '#8B5CF6', route: '/drops' },
        { id: '3', title: 'Radius Promotion', icon: 'map-pin', iconBg: '#10B981', route: '/promo' },
        { id: '4', title: 'Analytics', icon: 'bar-chart-2', iconBg: '#3B82F6', route: '/analytics' },
        { id: '5', title: 'Local Demand', icon: 'trending-up', iconBg: '#10B981', route: '/demand/local' },
        { id: '6', title: 'Size Demand', icon: 'tag', iconBg: '#111827', route: '/demand/size' },
        { id: '7', title: 'Demand Gaps', icon: 'zap', iconBg: '#F59E0B', route: '/gaps' },
        { id: '8', title: 'Boost Your Store', icon: 'credit-card', iconBg: '#3B82F6', route: '/boost' },
        { id: '9', title: 'Source Inventory', icon: 'users', iconBg: '#10B981', route: '/source' },
        { id: '10', title: 'Make an Offer', icon: 'dollar-sign', iconBg: '#111827', route: '/offers' },
        { id: '11', title: 'Business Overview', icon: 'briefcase', iconBg: '#6B7280', route: '/overview' },
    ];

    const handlePress = (route: string) => {
        router.push(route as any);
    };

    return { storeInfo, menuItems, handlePress };
};