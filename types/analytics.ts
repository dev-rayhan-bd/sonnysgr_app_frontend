export type TimeFilter = 'Today' | 'Week' | 'Month' | 'Custom';
export type ChartMode = 'Sales' | 'Orders';

export interface TopProduct {
  rank: number;
  name: string;
  sub: string;
  price: string;
  imageUri?: string;
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
  revenueChangePercent: string;
  sparklineData: number[];
  orders: number;
  ordersChange: string;
  grossProfit: string;
  grossProfitMargin: string;
  grossProfitChange: string;
  avgOrder: string;
  avgOrderChange: string;
  pickupRate: string;
  pickupRateChange: string;
  dailySalesBarData: number[];
  dailyOrdersBarData: number[];
  barLabelsDaily: string[];
  topProducts: TopProduct[];
  orderStatus: OrderStatusItem[];
  sizes: SizeItem[];
}