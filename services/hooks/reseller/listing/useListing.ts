import { useState } from 'react';

export const useInventory = () => {
  const [activeTab, setActiveTab] = useState('All');

  const stats = {
    total: 24,
    visible: 16,
    pending: 5,
    sold: 3,
  };

  const inventory = [
    {
      id: '1',
      brand: 'NIKE',
      name: "Air Jordan 4 'Black Cat'",
      condition: 'Deadstock',
      size: '10.5',
      price: 220,
      marketPrice: 240,
      views: 3,
      requests: 1,
      isVisible: true,
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400',
    },
    {
      id: '2',
      brand: 'NIKE',
      name: "Nike Dunk Low 'Panda'",
      condition: 'Deadstock',
      size: '11',
      price: 155,
      marketPrice: 185,
      views: 8,
      requests: 2,
      isVisible: true,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    },
    {
      id: '3',
      brand: 'ADIDAS',
      name: "Yeezy Boost 350 V2 'Ze'",
      condition: 'Very Near Deadstock',
      size: '10',
      price: 285,
      marketPrice: 300,
      views: 0,
      requests: 0,
      isVisible: true,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
    },
    {
      id: '4',
      brand: 'NIKE',
      name: "Travis Scott x Air Jordan",
      condition: 'Deadstock',
      size: '9.5',
      price: 850,
      marketPrice: 920,
      views: 0,
      requests: 0,
      isVisible: false,
      isPrivate: true,
      image: 'https://images.unsplash.com/photo-1583333222244-4710d049d5f2?w=400',
    },
  ];

  return { stats, inventory, activeTab, setActiveTab };
};