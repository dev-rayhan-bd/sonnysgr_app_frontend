import { useState } from 'react';

export const useLocalDemand = () => {
  const [timeFrame, setTimeFrame] = useState('This Week');

  const demandData = [
    {
      rank: 1,
      name: "Air Jordan 1 'Chicago'",
      searches: '2,847',
      inStock: true,
      stockLevel: 1.0, // Full bar
    },
    {
      rank: 2,
      name: "Nike Dunk Low 'Panda'",
      searches: '2,104',
      inStock: false,
      stockLevel: 0.6, // Partial bar
    },
    {
      rank: 3,
      name: "Yeezy 350 'Cream'",
      searches: '1,892',
      inStock: true,
      stockLevel: 0.4,
    }
  ];

  return { timeFrame, setTimeFrame, demandData };
};