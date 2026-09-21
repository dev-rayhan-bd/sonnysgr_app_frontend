import { useState, useCallback } from 'react';
import { TimeFilter, ChartMode, AnalyticsData } from '@/types/analytics';

// ── Mock data per filter (swap with real API calls) ────────────────────────
const MOCK_DATA: Record<TimeFilter, AnalyticsData> = {
  Today: {
    totalRevenue: '$340',
    revenueChange: '+$40 vs yesterday',
    revenueChangePercent: '+13.3%',
    sparklineData: [120, 180, 150, 200, 220, 310, 340],
    orders: 2,
    ordersChange: '+1 vs yesterday',
    grossProfit: '$140',
    grossProfitMargin: '41.2%',
    grossProfitChange: '+$20 vs yesterday',
    avgOrder: '$170',
    avgOrderChange: '+$5 vs yesterday',
    pickupRate: '100%',
    pickupRateChange: 'No change',
    dailySalesBarData: [40, 80, 60, 120, 100, 180, 160],
    dailyOrdersBarData: [1, 2, 1, 3, 2, 4, 3],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '2 colorways · 12 viewed', price: '$1100' },
      { rank: 2, name: 'Nike Dunk Low', sub: '1 colorway · 8 viewed', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#00C853', value: 1 },
      { label: 'Pending', color: '#F59E0B', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 12, color: '#111' },
      { label: 'US 10', value: 9, color: '#6B7280' },
    ],
  },
  Week: {
    totalRevenue: '$980',
    revenueChange: '+$120 vs last week',
    revenueChangePercent: '+13.9%',
    sparklineData: [200, 350, 300, 500, 450, 700, 980],
    orders: 4,
    ordersChange: '+2 vs last week',
    grossProfit: '$390',
    grossProfitMargin: '39.8%',
    grossProfitChange: '+$60 vs last week',
    avgOrder: '$245',
    avgOrderChange: '+$12 vs last week',
    pickupRate: '96%',
    pickupRateChange: '+2% vs last week',
    dailySalesBarData: [120, 180, 140, 260, 200, 340, 300],
    dailyOrdersBarData: [1, 2, 1, 3, 2, 4, 3],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '2 colorways · 25 viewed', price: '$1100' },
      { rank: 2, name: 'Yeezy Boost 350 V2', sub: '3 colorways · 18 viewed', price: '$1120' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#00C853', value: 3 },
      { label: 'Pending', color: '#F59E0B', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 22, color: '#111' },
      { label: 'US 10', value: 18, color: '#6B7280' },
      { label: 'US 8', value: 12, color: '#9CA3AF' },
    ],
  },
  Month: {
    totalRevenue: '$2,840',
    revenueChange: '+$237 vs last month (+9.1%)',
    revenueChangePercent: '+9.1%',
    sparklineData: [820, 932, 701, 1050, 980, 1120, 1400, 1280, 1600, 2840],
    orders: 8,
    ordersChange: '+1 vs last month',
    grossProfit: '$1,120',
    grossProfitMargin: '39.4%',
    grossProfitChange: '+12.6% vs last month',
    avgOrder: '$355',
    avgOrderChange: '+$18 vs last month',
    pickupRate: '94%',
    pickupRateChange: 'No change',
    dailySalesBarData: [280, 360, 240, 420, 380, 610, 550],
    dailyOrdersBarData: [1, 2, 1, 2, 1, 3, 2],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    topProducts: [
      { rank: 1, name: 'Yeezy Boost 350 V2', sub: '4 sold · 4 colorways', price: '$1,120' },
      { rank: 2, name: 'Air Jordan 1 Retro High', sub: '5 sold · 2 colorways', price: '$1,100' },
      { rank: 3, name: 'Nike Dunk Low', sub: '3 sold · 3 colorways', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#00C853', value: 5 },
      { label: 'Pending', color: '#F59E0B', value: 1 },
      { label: 'Not Confirmed', color: '#3B82F6', value: 1 },
      { label: 'Cancelled', color: '#EF4444', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 37, color: '#065F46' },
      { label: 'US 10', value: 32, color: '#065F46' },
      { label: 'US 8', value: 28, color: '#065F46' },
      { label: 'US 11', value: 18, color: '#065F46' },
    ],
  },
  Custom: {
    totalRevenue: '$14,200',
    revenueChange: '+$2,840 vs previous period',
    revenueChangePercent: '+25%',
    sparklineData: [1000, 2000, 1800, 3200, 2900, 4100, 5800, 7200, 9400, 14200],
    orders: 52,
    ordersChange: '+8 vs previous period',
    grossProfit: '$5,680',
    grossProfitMargin: '40%',
    grossProfitChange: '+$820 vs previous period',
    avgOrder: '$273',
    avgOrderChange: '+$14 vs previous period',
    pickupRate: '95%',
    pickupRateChange: '+1% vs previous period',
    dailySalesBarData: [1200, 1800, 1400, 2600, 2000, 3400, 3000],
    dailyOrdersBarData: [4, 6, 5, 9, 7, 12, 10],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '5 colorways · 210 sold', price: '$1100' },
      { rank: 2, name: 'Yeezy Boost 350 V2', sub: '7 colorways · 184 sold', price: '$1120' },
      { rank: 3, name: 'Nike Dunk Low', sub: '6 colorways · 152 sold', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#00C853', value: 42 },
      { label: 'Pending', color: '#F59E0B', value: 4 },
      { label: 'Not Confirmed', color: '#3B82F6', value: 3 },
      { label: 'Cancelled', color: '#EF4444', value: 3 },
    ],
    sizes: [
      { label: 'US 9', value: 38, color: '#065F46' },
      { label: 'US 10', value: 34, color: '#065F46' },
      { label: 'US 8', value: 30, color: '#065F46' },
      { label: 'US 11', value: 22, color: '#065F46' },
    ],
  },
};

export const useAnalytics = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('Month');
  const [chartMode, setChartMode] = useState<ChartMode>('Sales');

  const data = MOCK_DATA[activeFilter];

  const barData = chartMode === 'Sales' ? data.dailySalesBarData : data.dailyOrdersBarData;
  const barLabels = data.barLabelsDaily;

  const handleFilterChange = useCallback((filter: TimeFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleChartModeChange = useCallback((mode: ChartMode) => {
    setChartMode(mode);
  }, []);

  return {
    activeFilter,
    chartMode,
    data,
    barData,
    barLabels,
    handleFilterChange,
    handleChartModeChange,
  };
};