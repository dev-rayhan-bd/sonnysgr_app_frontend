import { useState, useMemo } from 'react';

export type NotificationType = 'order' | 'hold' | 'refund' | 'alert' | 'promo' | 'complete';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  dateSection: 'Today' | 'Yesterday';
  status?: string;
  actionRequired?: boolean;
  deadline?: string;
}

export const useNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'order',
      title: 'New order received',
      description: 'Marcus L. ordered Air Jordan 1 Retro High Size 10.5 - $220 - Pickup',
      time: '8 min ago',
      dateSection: 'Today',
    },
    {
      id: '2',
      type: 'hold',
      title: 'Hold confirmed',
      description: 'Sarah K. placed a hold on Yeezy Boost 350 V2 Size 9 - $280 deposit paid.',
      time: '15 min ago',
      dateSection: 'Today',
    },
    {
      id: '3',
      type: 'refund',
      title: 'Refund claim received',
      description: 'Sonny Garcia submitted a refund request for ORD-20948 - $44.00 deposit.',
      time: 'Just now',
      dateSection: 'Today',
      actionRequired: true,
      deadline: 'Apr 05, 10:30 AM',
    },
    {
      id: '4',
      type: 'alert',
      title: 'Low stock alert',
      description: '3 pairs running low in Size 10.5: Jordan 4, Dunk Low, Air Max 90.',
      time: 'Today',
      dateSection: 'Today',
    },    {
      id: '5',
      type: 'order',
      title: 'New order received',
      description: 'Marcus L. ordered Air Jordan 1 Retro High Size 10.5 - $220 - Pickup',
      time: '8 min ago',
      dateSection: 'Today',
    },
    {
      id: '6',
      type: 'hold',
      title: 'Hold confirmed',
      description: 'Sarah K. placed a hold on Yeezy Boost 350 V2 Size 9 - $280 deposit paid.',
      time: '15 min ago',
      dateSection: 'Today',
    },
    {
      id: '7',
      type: 'refund',
      title: 'Refund claim received',
      description: 'Sonny Garcia submitted a refund request for ORD-20948 - $44.00 deposit.',
      time: 'Just now',
      dateSection: 'Today',
      actionRequired: true,
      deadline: 'Apr 05, 10:30 AM',
    },
    {
      id: '8',
      type: 'alert',
      title: 'Low stock alert',
      description: '3 pairs running low in Size 10.5: Jordan 4, Dunk Low, Air Max 90.',
      time: 'Today',
      dateSection: 'Today',
    },
  ];

  const filteredData = useMemo(() => {
    if (activeFilter === 'All') return notifications;
    return notifications.filter(n => n.type.includes(activeFilter.toLowerCase().slice(0, -1)));
  }, [activeFilter]);

  return { activeFilter, setActiveFilter, filteredData };
};