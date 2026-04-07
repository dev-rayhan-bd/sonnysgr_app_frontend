// services/hooks/discover/useTrending.ts
import { useState, useCallback } from 'react'

export type TrendingTab = 'Today' | 'This Week' | 'This Month' | 'All Time'

export interface TrendingProduct {
  id: string
  rank: number
  name: string
  brand: string
  price: number
  imageUri?: string
  change?: 'up' | 'down' | 'same'
  changeValue?: number
}

export interface TrendingLocalProduct {
  id: string
  name: string
  brand: string
  price: number
  imageUri?: string
  location: string
}

export interface ActivityItem {
  id: string
  username: string
  handle: string
  action: string
  target: string
  store?: string
  timeAgo: string
  avatarColor: string
  avatarInitials: string
  imageUri?: string
}

const MOCK_MOST_WANTED: TrendingProduct = {
  id: 'mw1',
  rank: 1,
  name: "Air Jordan 4 'Black Cat'",
  brand: 'Jordan',
  price: 220,
  change: 'up',
  changeValue: 12,
}

const MOCK_TRENDING_LIST: TrendingProduct[] = [
  { id: 't1', rank: 1, name: 'Nike Dunk Low',       brand: 'Nike',   price: 130, change: 'up',   changeValue: 5 },
  { id: 't2', rank: 2, name: "Yeezy 350 'Carbon'",  brand: 'Adidas', price: 290, change: 'down', changeValue: 3 },
]

const MOCK_LOCAL: TrendingLocalProduct[] = [
  { id: 'l1', name: 'Air Max 1',     brand: 'Nike',   price: 180, location: 'Miami' },
  { id: 'l2', name: 'Jordan 1 High', brand: 'Jordan', price: 220, location: 'Miami' },
]

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1', username: 'KicksMaster', handle: '@kicksmaster',
    action: 'just bought', target: '"No 10" Nike Dunk Low',
    timeAgo: '2m ago', avatarColor: '#22C55E', avatarInitials: 'KM',
  },
  {
    id: 'a2', username: 'SneakerHead92', handle: '@sneakerhead92',
    action: 'wishlisted', target: '"Nike Dunk Panda"',
    store: "Sonny's Kicks",
    timeAgo: '5m ago', avatarColor: '#3B82F6', avatarInitials: 'SH',
  },
  {
    id: 'a3', username: 'JordanKiss', handle: '@jordankiss',
    action: 'left a review at', target: "Sonny's Kicks",
    timeAgo: '8m ago', avatarColor: '#F59E0B', avatarInitials: 'JK',
  },
  {
    id: 'a4', username: 'SoleKing', handle: '@soleking',
    action: 'just bought', target: '"Yeezy 356 Black Cat"',
    timeAgo: '12m ago', avatarColor: '#8B5CF6', avatarInitials: 'SK',
  },
]

export function useTrending() {
  const [activeTab, setActiveTab] = useState<TrendingTab>('Today')

  const handleProductPress = useCallback((p: TrendingProduct | TrendingLocalProduct) => {}, [])
  const handleLoadMore     = useCallback(() => {}, [])
  const handleUserPress    = useCallback((a: ActivityItem) => {}, [])

  return {
    activeTab, setActiveTab,
    mostWanted: MOCK_MOST_WANTED,
    trendingList: MOCK_TRENDING_LIST,
    localTrending: MOCK_LOCAL,
    activity: MOCK_ACTIVITY,
    handleProductPress,
    handleLoadMore,
    handleUserPress,
  }
}