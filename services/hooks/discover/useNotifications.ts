// services/hooks/discover/useNotifications.ts
import { useState, useCallback, useMemo } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationCategory =
  | 'All'
  | 'Unread'
  | 'Orders'
  | 'Restocks'
  | 'Drops'
  | 'PriceDrops'
  | 'Offers'

export type NotificationGroup = 'Today' | 'Yesterday'

export interface NotificationAction {
  label: string
  variant: 'filled' | 'outline'
}

export interface Notification {
  id: string
  category: Exclude<NotificationCategory, 'All' | 'Unread'>
  group: NotificationGroup
  title: string
  subtitle: string
  time: string
  read: boolean
  brand?: string
  imageUri?: string
  icon: 'restock' | 'order' | 'drop' | 'store' | 'system'
  price?: number
  originalPrice?: number
  action?: NotificationAction
  ended?: boolean
}

// ─── Mock Data (matches mockup exactly) ────────────────────────────────────────

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    category: 'Restocks',
    group: 'Today',
    title: 'Back in your size',
    subtitle: 'Air Jordan 4 Black Cat\nUS Men 10.5 · Sonnys · 1.1 mi',
    time: 'Just now',
    read: false,
    icon: 'restock',
    action: { label: 'View item', variant: 'outline' },
  },
  {
    id: '2',
    category: 'Orders',
    group: 'Today',
    title: 'Ready for pickup',
    subtitle: 'Order GS-7843 · Kicks City',
    time: '15 min ago',
    read: false,
    icon: 'order',
    action: { label: 'View pickup details', variant: 'outline' },
  },
  {
    id: '3',
    category: 'Drops',
    group: 'Today',
    title: 'Upcoming drop',
    subtitle: 'Nike Dunk Low Panda\nOct 3 · 10 AM ET · 3 followed stores',
    time: '2 hr ago',
    read: true,
    icon: 'drop',
    action: { label: 'Set reminder', variant: 'outline' },
  },
  {
    id: '4',
    category: 'PriceDrops',
    group: 'Yesterday',
    title: 'Price dropped by $30',
    subtitle: 'Yeezy Boost 350 Carbon · US Men 10.5',
    time: 'Yesterday · 4:20 PM',
    read: true,
    icon: 'restock',
    price: 320,
    originalPrice: 350,
    action: { label: 'View item', variant: 'outline' },
  },
  {
    id: '5',
    category: 'Offers',
    group: 'Yesterday',
    title: 'Sonnys flash sale',
    subtitle: '20% off selected items',
    time: 'Yesterday · 10:00 AM',
    read: true,
    icon: 'store',
    ended: true,
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('All')

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return notifications
    if (activeCategory === 'Unread') return notifications.filter((n) => !n.read)
    return notifications.filter((n) => n.category === activeCategory)
  }, [notifications, activeCategory])

  const grouped = useMemo(() => {
    const order: NotificationGroup[] = ['Today', 'Yesterday']
    const map: Partial<Record<NotificationGroup, Notification[]>> = {}
    filtered.forEach((n) => {
      if (!map[n.group]) map[n.group] = []
      map[n.group]!.push(n)
    })
    return order
      .filter((g) => map[g] && map[g]!.length > 0)
      .map((g) => ({ group: g, items: map[g]! }))
  }, [filtered])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return {
    notifications,
    grouped,
    activeCategory,
    unreadCount,
    setActiveCategory,
    markAllRead,
    clearAll,
    markRead,
    dismiss,
  }
}