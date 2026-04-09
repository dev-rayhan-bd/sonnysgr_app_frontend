import { useState } from 'react';

export const useProfile = () => {
  const [user] = useState({
    username: 'marcus_kicks',
    company: 'Marcus Reseller Co.',
    location: 'Miami, FL',
    isTrusted: true,
    stats: {
      dealsDone: 47,
      responseRate: 96,
      volumeSold: '18.4K',
      rating: 4.9,
    },
    bio: '10+ years in sneakers. Specializing in DS Jordans and Yeezys. Fast responses guaranteed. Auth checks included.',
    inventoryCount: 16,
  });

  // Mock data for inventory/history images
  const items = [
    { id: '1', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200' },
    { id: '2', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200' },
    { id: '3', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200' },
  ];

  return { user, items };
};