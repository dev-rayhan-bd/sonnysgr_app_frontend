import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeListings: 24,
    storeRequests: 7,
    dealsActive: 4,
    revenue: 3840,
  });

  const [requests, setRequests] = useState([
    {
      id: '1',
      storeName: 'Kicks City',
      rating: 4.8,
      item: "Air Jordan 4 'Black Cat'",
      size: '10.5',
      condition: 'Deadstock',
      price: 185,
      time: '5 min ago',
    },
        {
      id: '2',
      storeName: 'Kicks City',
      rating: 4.8,
      item: "Air Jordan 4 'Black Cat'",
      size: '10.5',
      condition: 'Deadstock',
      price: 185,
      time: '5 min ago',
    },
        {
      id: '3',
      storeName: 'Kicks City',
      rating: 4.8,
      item: "Air Jordan 4 'Black Cat'",
      size: '10.5',
      condition: 'Deadstock',
      price: 185,
      time: '5 min ago',
    },
        {
      id: '4',
      storeName: 'Kicks City',
      rating: 4.8,
      item: "Air Jordan 4 'Black Cat'",
      size: '10.5',
      condition: 'Deadstock',
      price: 185,
      time: '5 min ago',
    },
  ]);

  const [activities, setActivities] = useState([
    { id: '1', type: 'request', message: 'Kicks City sent a request for Jordan 4 Black Cat', time: '5 min ago', color: '#4ADE80' },
    { id: '2', type: 'counter', message: 'You countered $210 to Sole House', time: '1 hr ago', color: '#FB923C' },
    { id: '3', type: 'deal', message: 'Deal confirmed: Nike Dunk Low - $155', time: '3 hrs ago', color: '#60A5FA' },
  ]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return { stats, requests, activities, loading };
};