import { useMemo, useState } from 'react';

export type OverviewPeriod = 'Today' | 'Yesterday' | 'This Week';

export interface LocationAlert {
  type: 'ready' | 'overdue' | 'low_stock';
  count: number;
}

export interface Location {
  id: string;
  initials: string;
  name: string;
  address: string;
  isOpen: boolean;
  hoursNote: string; // "Closes 9 PM" or "Opens 10 AM"
  salesToday: string;
  ordersToday: number;
  alerts: LocationAlert[];
  syncedAgo: string;
}

export interface BusinessSummary {
  initials: string;
  name: string;
  locationCount: number;
  city: string;
}

interface PeriodStats {
  grossSales: string;
  deltaVsPrevious: string;
  deltaIsPositive: boolean;
  netSales: string;
  orders: number;
  avgOrder: string;
  activeListings: number;
}

const STATS_BY_PERIOD: Record<OverviewPeriod, PeriodStats> = {
  Today: {
    grossSales: '$12,480',
    deltaVsPrevious: '+$1,240',
    deltaIsPositive: true,
    netSales: '$11,860',
    orders: 47,
    avgOrder: '$266',
    activeListings: 312,
  },
  Yesterday: {
    grossSales: '$11,240',
    deltaVsPrevious: '-$680',
    deltaIsPositive: false,
    netSales: '$10,690',
    orders: 41,
    avgOrder: '$274',
    activeListings: 308,
  },
  'This Week': {
    grossSales: '$68,910',
    deltaVsPrevious: '+$5,320',
    deltaIsPositive: true,
    netSales: '$65,120',
    orders: 261,
    avgOrder: '$264',
    activeListings: 312,
  },
};

export const useBusinessOverview = () => {
  const [period, setPeriod] = useState<OverviewPeriod>('Today');

  const [business] = useState<BusinessSummary>({
    initials: 'KE',
    name: 'Kicks Empire LLC',
    locationCount: 3,
    city: 'Miami, FL',
  });

  const [locations] = useState<Location[]>([
    {
      id: '1',
      initials: 'SK',
      name: "Sonny's Kicks — Main St",
      address: '123 Ocean Drive, Miami, FL',
      isOpen: true,
      hoursNote: 'Closes 9 PM',
      salesToday: '$5,200',
      ordersToday: 18,
      alerts: [
        { type: 'ready', count: 2 },
        { type: 'overdue', count: 1 },
      ],
      syncedAgo: 'Synced 2 min ago',
    },
    {
      id: '2',
      initials: 'SK',
      name: "Sonny's Kicks — Downtown",
      address: '456 Bay Street, Miami, FL',
      isOpen: true,
      hoursNote: 'Closes 9 PM',
      salesToday: '$4,180',
      ordersToday: 15,
      alerts: [
        { type: 'ready', count: 3 },
        { type: 'overdue', count: 0 },
      ],
      syncedAgo: 'Synced 1 min ago',
    },
    {
      id: '3',
      initials: 'SK',
      name: "Sonny's Kicks — Beach",
      address: '789 Sunset Blvd, Miami Beach, FL',
      isOpen: false,
      hoursNote: 'Opens 10 AM',
      salesToday: '$3,100',
      ordersToday: 14,
      alerts: [{ type: 'low_stock', count: 2 }],
      syncedAgo: 'Synced 4 min ago',
    },
  ]);

  const stats = useMemo(() => STATS_BY_PERIOD[period], [period]);

  const [ordersNeedingAttention] = useState(5);

  return {
    periods: ['Today', 'Yesterday', 'This Week'] as OverviewPeriod[],
    period,
    setPeriod,
    business,
    stats,
    ordersNeedingAttention,
    locations,
  };
};