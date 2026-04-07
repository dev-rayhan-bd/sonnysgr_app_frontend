// services/hooks/profile/useWishlist.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export type WishlistFilter = 'All' | 'In Stock' | 'Dropping Soon' | 'On Sale'

export interface WishlistItem {
  id: string
  name: string
  brand: string
  size: string
  price: number
  originalPrice?: number
  imageUri?: string
  storeName: string
  storeDistance: string
  stockStatus: 'In Stock' | 'Low Stock' | 'Dropping Soon' | 'Out of Stock'
  isWishlisted: boolean
  addedDaysAgo: number
}

export const STATUS_COLOR: Record<string, string> = {
  'In Stock':      '#22C55E',
  'Low Stock':     '#F59E0B',
  'Dropping Soon': '#3B82F6',
  'Out of Stock':  '#9CA3AF',
}

const MOCK: WishlistItem[] = [
  {
    id: 'w1', name: "Air Jordan 4 'Black Cat'", brand: 'Jordan',
    size: '10.5', price: 220, imageUri: undefined,
    storeName: "Sonny's Kicks", storeDistance: '1.1 mi',
    stockStatus: 'In Stock', isWishlisted: true, addedDaysAgo: 2,
  },
  {
    id: 'w2', name: 'Nike Dunk Low Panda', brand: 'Nike',
    size: '10.5', price: 130, imageUri: undefined,
    storeName: 'Urban Sole', storeDistance: '2.3 mi',
    stockStatus: 'Low Stock', isWishlisted: true, addedDaysAgo: 5,
  },
  {
    id: 'w3', name: 'Yeezy 350 V2 Zebra', brand: 'Adidas',
    size: '10.5', price: 260, originalPrice: 300, imageUri: undefined,
    storeName: 'Kicks City', storeDistance: '3.5 mi',
    stockStatus: 'Dropping Soon', isWishlisted: true, addedDaysAgo: 8,
  },
  {
    id: 'w4', name: 'New Balance 550', brand: 'New Balance',
    size: '10.5', price: 110, imageUri: undefined,
    storeName: "Sonny's Kicks", storeDistance: '1.1 mi',
    stockStatus: 'Out of Stock', isWishlisted: true, addedDaysAgo: 14,
  },
]

export function useWishlist() {
  const [items, setItems]               = useState<WishlistItem[]>(MOCK)
  const [activeFilter, setActiveFilter] = useState<WishlistFilter>('All')

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter(i => i.stockStatus === activeFilter)

  const toggleWishlist = useCallback((id: string) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i
      const nowWishlisted = !i.isWishlisted
      Toast.show({
        type: nowWishlisted ? 'success' : 'info',
        text1: nowWishlisted ? 'Added to Wishlist' : 'Removed from Wishlist',
        text2: nowWishlisted ? 'Item saved to your wishlist' : 'Item removed',
      })
      return { ...i, isWishlisted: nowWishlisted }
    }))
  }, [])

  const handleBuy = useCallback((item: WishlistItem) => {
    Toast.show({
      type: 'success',
      text1: 'Opening Store',
      text2: `Taking you to ${item.storeName}`,
    })
  }, [])

  const handleNotify = useCallback((item: WishlistItem) => {
    Toast.show({
      type: 'success',
      text1: 'Notification Set!',
      text2: `We'll alert you when ${item.name} is available`,
    })
  }, [])

  const totalItems   = items.length
  const inStockCount = items.filter(i =>
    i.stockStatus === 'In Stock' || i.stockStatus === 'Low Stock'
  ).length

  return {
    items: filteredItems,
    activeFilter, setActiveFilter,
    toggleWishlist, handleBuy, handleNotify,
    totalItems, inStockCount,
  }
}