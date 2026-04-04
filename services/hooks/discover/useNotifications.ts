// hooks/notifications/useNotifications.ts
import { useState, useCallback, useMemo } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationCategory = 'All' | 'Restocks' | 'Orders' | 'Drops' | 'Stores'
export type NotificationGroup = 'NOW' | 'TODAY' | 'YESTERDAY' | 'THIS WEEK'

export interface Notification {
  id: string
  category: Exclude<NotificationCategory, 'All'>
  group: NotificationGroup
  title: string
  subtitle: string
  time: string
  read: boolean
  // ✅ ADD THESE
  brand?: string
  imageUri?: string
  icon: 'restock' | 'order' | 'drop' | 'store' | 'system'
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    category: 'Restocks',
    group: 'NOW',
    title: "Air Jordan 4 'Black Cat' is back! 🔥",
    subtitle: "Size 10.5 now in stock at Sonny's Kicks · 1.1 mi",
    time: 'Just now',
    read: false,
    icon: 'restock',
  },
  {
    id: '2',
    category: 'Orders',
    group: 'NOW',
    title: 'Your order is ready for pickup',
    subtitle: 'GS-2024-7843 · Kicks City · Ready now',
    time: '15 min ago',
    read: false,
    icon: 'order',
  },
  {
    id: '3',
    category: 'Drops',
    group: 'TODAY',
    title: "Nike Dunk Low 'Panda' dropping Saturday",
    subtitle: "3 followed stores are stocking this. Set reminder →",
    time: '2 hrs ago',
    read: true,
    icon: 'drop',
  },
  {
    id: '4',
    category: 'Restocks',
    group: 'YESTERDAY',
    title: "Price drop: Yeezy Boost 350 'Carbon'",
    subtitle: 'Now $320, down from $350 · Available in your size',
    time: 'Yesterday',
    read: true,
    icon: 'restock',
  },
  {
    id: '5',
    category: 'Stores',
    group: 'YESTERDAY',
    title: "Flash Sale at Sonny's Kicks — 20% off today!",
    subtitle: "Today only · Tap to see what's on sale",
    time: 'Yesterday',
    read: true,
    icon: 'store',
  },
  {
    id: '6',
    category: 'Stores',
    group: 'THIS WEEK',
    title: 'Profile updated successfully',
    subtitle: "Size preferences saved · Size 10.5 Men's",
    time: '3 days ago',
    read: true,
    icon: 'system',
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('All')

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return notifications
    return notifications.filter(n => n.category === activeCategory)
  }, [notifications, activeCategory])

  // Group filtered notifications by their group label
  const grouped = useMemo(() => {
    const order: NotificationGroup[] = ['NOW', 'TODAY', 'YESTERDAY', 'THIS WEEK']
    const map: Partial<Record<NotificationGroup, Notification[]>> = {}
    filtered.forEach(n => {
      if (!map[n.group]) map[n.group] = []
      map[n.group]!.push(n)
    })
    return order
      .filter(g => map[g] && map[g]!.length > 0)
      .map(g => ({ group: g, items: map[g]! }))
  }, [filtered])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
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