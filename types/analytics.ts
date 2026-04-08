export type TimeFilter = 'Today' | 'This Week' | 'This Month' | 'All Time';
export type ChartMode = 'Daily' | 'Weekly';

export interface TopProduct {
  rank: number;
  name: string;
  sub: string;
  price: string;
}

export interface OrderStatusItem {
  label: string;
  color: string;
  value: number;
}

export interface SizeItem {
  label: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  totalRevenue: string;
  revenueChange: string;
  sparklineData: number[];
  orders: number;
  ordersChange: string;
  rating: number;
  totalRatings: number;
  dailyBarData: number[];
  weeklyBarData: number[];
  barLabelsDaily: string[];
  barLabelsWeekly: string[];
  topProducts: TopProduct[];
  orderStatus: OrderStatusItem[];
  sizes: SizeItem[];
}