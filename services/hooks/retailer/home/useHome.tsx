import { useState, useCallback } from 'react';
import { StoreInfo } from '@/components/retailer/home/HomeStoreInto';
import { StatCard } from '@/components/retailer/home/HomeStats';
import { StockAlert } from '@/components/retailer/home/HomeAlert';
import { ActionItem } from '@/components/retailer/home/HomeActions';
import { RecentOrder } from '@/components/retailer/home/HomeRecentOrders';
import { SyncStatus } from '@/components/retailer/home/HomeLiveSync';
import { router } from 'expo-router';
export const useHome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const storeInfo: StoreInfo = {
    name: "Sonny's Kicks",
    location: 'Miami, FL',
    isVerified: true,
  };

  const stats: StatCard[] = [
    {
      id: 'orders',
      value: 12,
      label: 'Orders',
      subLine: '↓ 3 from yesterday',
      variant: 'default',
    },
    {
      id: 'ready',
      value: 5,
      label: 'Ready',
      subLine: '3 overdue',
      variant: 'warning',
    },
    {
      id: 'revenue',
      value: '$2,840',
      label: 'Revenue',
      subLine: '+ $420 vs avg',
      variant: 'revenue',
    },
  ];

  const stockAlerts: StockAlert[] = [
    { id: 'alert-1', message: '3 pairs running low in size 10.5' },
  ];

  const actions: ActionItem[] = [
    {
      id: 'add-product',
      label: 'Add Product',
      icon: 'plus',
      iconColor: '#8B5CF6',
      onPress: () => router.push("/screens/retailer/home/product/AddProductScreen"),
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'shopping-bag',
      iconColor: '#F97316',
      badgeCount: 5,
      onPress: () =>   router.push("/retailerTabs/orders"),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'bar-chart-2',
      iconColor: '#3B82F6',
      onPress: () => router.push("/screens/retailer/home/analytics/analyticsScreen"),
    },
    {
      id: 'more',
      label: 'More',
      icon: 'grid',
      iconColor: '#6B7280',
      onPress: () => router.push("/screens/retailer/home/more/moreScreen"),
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: 'order-1',
      productName: 'Air Jordan 1 Retro High',
      size: 'Size 10.5',
      customer: 'Marcus L.',
      placedAgo: 'Placed 8 min ago',
      price: 220,
      status: 'Pickup Ready',
    },
    {
      id: 'order-2',
      productName: 'Yeezy Boost 350 V2',
      size: 'Size 9',
      customer: 'Sarah K.',
      placedAgo: 'Placed 15 min ago',
      price: 280,
      status: 'Hold Confirmed',
    },
    {
      id: 'order-3',
      productName: 'Nike Dunk Low',
      size: 'Size 11',
      customer: 'James P.',
      placedAgo: 'Placed 32 min ago',
      price: 150,
      status: 'Processing',
    },
  ];

  const syncStatus: SyncStatus = {
    isSynced: true,
    lastSyncedLabel: 'Synced 2 min ago',
    activePairs: 83,
    syncErrors: 0,
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(res => setTimeout(res, 1200));
    setIsRefreshing(false);
  }, []);

  const handleViewAllOrders = useCallback(() => {
    console.log('view all orders');
  }, []);

  const handleViewAlert = useCallback((alert: StockAlert) => {
    router.push("/retailerTabs/home");
  }, []);

  return {
    storeInfo,
    stats,
    stockAlerts,
    actions,
    recentOrders,
    syncStatus,
    isRefreshing,
    handleRefresh,
    handleViewAllOrders,
    handleViewAlert,
  };
};