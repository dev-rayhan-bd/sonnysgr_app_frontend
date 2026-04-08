import { useState } from 'react';

export interface Location {
  id: string;
  initials: string;
  name: string;
  address: string;
  isOpen: boolean;
  closesAt: string;
  ordersToday: number;
  revenueToday: string;
}

export interface BusinessSummary {
  initials: string;
  name: string;
  locationCount: number;
  city: string;
  revenue: string;
  orders: number;
  listings: number;
  rating: string;
}

export const useBusinessOverview = () => {
  const [business] = useState<BusinessSummary>({
    initials: 'KE',
    name: 'Kicks Empire LLC',
    locationCount: 3,
    city: 'Miami, FL',
    revenue: '$12,480',
    orders: 47,
    listings: 312,
    rating: '4.8',
  });

  const [locations] = useState<Location[]>([
    {
      id: '1',
      initials: 'SK',
      name: "Sonny's Kicks - Main St",
      address: '123 Ocean Drive, Miami, FL',
      isOpen: true,
      closesAt: '9 PM',
      ordersToday: 18,
      revenueToday: '$5,200',
    },
    {
      id: '2',
      initials: 'SK',
      name: "Sonny's Kicks - Downtown",
      address: '456 Bay Street, Miami, FL',
      isOpen: true,
      closesAt: '9 PM',
      ordersToday: 15,
      revenueToday: '$4,180',
    },
    {
      id: '3',
      initials: 'SK',
      name: "Sonny's Kicks - Beach",
      address: '789 Sunset Blvd, Miami Beach, FL',
      isOpen: false,
      closesAt: '10 AM',
      ordersToday: 14,
      revenueToday: '$3,100',
    },
  ]);

  return { business, locations };
};