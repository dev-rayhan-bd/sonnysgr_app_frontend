import { useState, useCallback } from 'react';
import { TimeFilter, ChartMode, AnalyticsData } from '@/types/analytics';

// ── Mock data per filter (swap with real API calls) ────────────────────────
const MOCK_DATA: Record<TimeFilter, AnalyticsData> = {
  Today: {
    totalRevenue: '$340',
    revenueChange: '+$40 vs yesterday',
    sparklineData: [120, 180, 150, 200, 220, 310, 340],
    orders: 2,
    ordersChange: '+1 vs yesterday',
    rating: 5,
    totalRatings: 1,
    dailyBarData: [40, 80, 60, 120, 100, 180, 160],
    weeklyBarData: [200, 340],
    barLabelsDaily: ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am'],
    barLabelsWeekly: ['Last Week', 'This Week'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '2 colorways · 12 viewed', price: '$1100' },
      { rank: 2, name: 'Nike Dunk Low', sub: '1 colorway · 8 viewed', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#111', value: 1 },
      { label: 'Pending', color: '#F59E0B', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 12, color: '#111' },
      { label: 'US 10', value: 9, color: '#6B7280' },
    ],
  },
  'This Week': {
    totalRevenue: '$980',
    revenueChange: '+$120 vs last week',
    sparklineData: [200, 350, 300, 500, 450, 700, 980],
    orders: 4,
    ordersChange: '+2 vs last week',
    rating: 4.8,
    totalRatings: 3,
    dailyBarData: [120, 180, 140, 260, 200, 340, 300],
    weeklyBarData: [600, 980],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    barLabelsWeekly: ['Last Week', 'This Week'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '2 colorways · 25 viewed', price: '$1100' },
      { rank: 2, name: 'Yeezy Boost 350 V2', sub: '3 colorways · 18 viewed', price: '$1120' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#111', value: 3 },
      { label: 'Pending', color: '#F59E0B', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 22, color: '#111' },
      { label: 'US 10', value: 18, color: '#6B7280' },
      { label: 'US 8', value: 12, color: '#9CA3AF' },
    ],
  },
  'This Month': {
    totalRevenue: '$2,840',
    revenueChange: '+$237 vs last month',
    sparklineData: [820, 932, 701, 1050, 980, 1120, 1400, 1280, 1600, 2840],
    orders: 8,
    ordersChange: '+1% vs last month',
    rating: 5,
    totalRatings: 1,
    dailyBarData: [180, 220, 160, 300, 250, 420, 380],
    weeklyBarData: [900, 1200, 740, 2840],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    barLabelsWeekly: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '2 colorways · 37.5 reviewed', price: '$1100' },
      { rank: 2, name: 'Yeezy Boost 350 V2', sub: '4 colorways · 28.2 reviewed', price: '$1120' },
      { rank: 3, name: 'Nike Dunk Low', sub: '3 colorways · 18.1 reviewed', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#111', value: 7 },
      { label: 'Pending', color: '#F59E0B', value: 2 },
      { label: 'Not Confirmed', color: '#10B981', value: 3 },
      { label: 'Cancelled', color: '#EF4444', value: 1 },
    ],
    sizes: [
      { label: 'US 9', value: 37, color: '#111' },
      { label: 'US 10', value: 32, color: '#6B7280' },
      { label: 'US 8', value: 28, color: '#9CA3AF' },
      { label: 'US 11', value: 18, color: '#D1D5DB' },
    ],
  },
  'All Time': {
    totalRevenue: '$14,200',
    revenueChange: '+$2,840 vs last month',
    sparklineData: [1000, 2000, 1800, 3200, 2900, 4100, 5800, 7200, 9400, 14200],
    orders: 52,
    ordersChange: '+8 vs last month',
    rating: 4.9,
    totalRatings: 24,
    dailyBarData: [1200, 1800, 1400, 2600, 2000, 3400, 3000],
    weeklyBarData: [4000, 5200, 4800, 6200, 7800, 9400, 11200, 14200],
    barLabelsDaily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    barLabelsWeekly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    topProducts: [
      { rank: 1, name: 'Air Jordan 1 Retro High', sub: '5 colorways · 210 reviewed', price: '$1100' },
      { rank: 2, name: 'Yeezy Boost 350 V2', sub: '7 colorways · 184 reviewed', price: '$1120' },
      { rank: 3, name: 'Nike Dunk Low', sub: '6 colorways · 152 reviewed', price: '$450' },
    ],
    orderStatus: [
      { label: 'Completed', color: '#111', value: 42 },
      { label: 'Pending', color: '#F59E0B', value: 4 },
      { label: 'Not Confirmed', color: '#10B981', value: 3 },
      { label: 'Cancelled', color: '#EF4444', value: 3 },
    ],
    sizes: [
      { label: 'US 9', value: 38, color: '#111' },
      { label: 'US 10', value: 34, color: '#6B7280' },
      { label: 'US 8', value: 30, color: '#9CA3AF' },
      { label: 'US 11', value: 22, color: '#D1D5DB' },
    ],
  },
};

export const useAnalytics = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('This Month');
  const [chartMode, setChartMode] = useState<ChartMode>('Daily');

  const data = MOCK_DATA[activeFilter];

  const barData = chartMode === 'Daily' ? data.dailyBarData : data.weeklyBarData;
  const barLabels = chartMode === 'Daily' ? data.barLabelsDaily : data.barLabelsWeekly;

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