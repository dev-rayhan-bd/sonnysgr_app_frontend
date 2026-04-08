import { useState } from 'react';

export const useAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('Today');

  const stats = {
    revenue: '$2,840',
    revenueChange: '+$420 vs yesterday',
    orders: 12,
    pickups: 8,
    holds: 4,
    metrics: [
      { label: 'Profile Views', value: '347', change: '+ 12%', type: 'up' },
      { label: 'Product Views', value: '1,204', change: '+ 8%', type: 'up' },
      { label: 'Search Impressions', value: '892', change: '→ stable', type: 'stable' },
      { label: 'Repeat Buyers', value: '7', change: '↑ 2', type: 'up' },
    ],
    funnel: [
      { label: 'views', count: '892', percentage: '100%' },
      { label: 'clicks (39%)', count: '347', percentage: '39%' },
      { label: 'purchases (3.5%)', count: '12', percentage: '13%' },
    ]
  };

  return { timePeriod, setTimePeriod, stats };
};