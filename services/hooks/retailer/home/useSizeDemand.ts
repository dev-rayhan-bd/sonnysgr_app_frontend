import { useState } from 'react';

export const useSizeDemand = () => {
  const [category, setCategory] = useState('Men\'s');

  const sizeHeatMap = [
    { size: '7', level: 'low' }, { size: '7.5', level: 'low' }, 
    { size: '8', level: 'mid' }, { size: '8.5', level: 'high' }, { size: '9', level: 'v-high' },
    { size: '9.5', level: 'max' }, { size: '10', level: 'max' }, 
    { size: '10.5', level: 'max' }, { size: '11', level: 'max' }, { size: '11.5', level: 'v-high' },
    { size: '12', level: 'high' }, { size: '12.5', level: 'mid' },
    { size: '13', level: 'low' }, { size: '14', level: 'low' },
  ];

  const stockComparison = [
    { size: '10', demand: 90, stock: 45, status: 'Understocked' },
    { size: '10.5', demand: 100, stock: 60, status: 'Understocked' },
    { size: '11', demand: 75, stock: 80, status: 'Well stocked' },
  ];

  return { category, setCategory, sizeHeatMap, stockComparison };
};