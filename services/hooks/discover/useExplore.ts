// services/hooks/discover/useExplore.ts
import { useState, useCallback } from 'react'

export type ExploreTab = 'New Arrivals' | 'Trending 🔥' | 'Wishlist ❤️'

export interface ExploreProduct {
  id: string
  name: string
  brand: string
  price: number
  imageUri?: string
  badge?: string
  badgeColor?: string
}

export interface FeaturedDrop {
  id: string
  label: string
  name: string
  brand: string
  subtitle: string
  price: number
  imageUri?: string
  ctaText: string
}

const MOCK_FEATURED: FeaturedDrop = {
  id: 'f1',
  label: 'JUST DROPPED',
  name: 'Air Jordan 1 High "Royal Toe"',
  brand: 'Jordan',
  subtitle: 'Available nearby · 1.1 mi',
  price: 180,
  ctaText: 'Shop Now →',
}

const MOCK_PRODUCTS: ExploreProduct[] = [
  { id: 'p1', name: 'Air Max 90',      brand: 'Nike',   price: 140, badge: 'NEW',      badgeColor: '#22C55E' },
  { id: 'p2', name: 'Dunk Low',        brand: 'Nike',   price: 110, badge: 'NEW',      badgeColor: '#22C55E' },
  { id: 'p3', name: 'Ultraboost',      brand: 'Adidas', price: 160, badge: 'TRENDING', badgeColor: '#F59E0B' },
  { id: 'p4', name: 'New Balance 574', brand: 'NB',     price: 90,  badge: 'NEW',      badgeColor: '#22C55E' },
]

export function useExplore() {
  const [activeTab, setActiveTab]     = useState<ExploreTab>('New Arrivals')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch  = useCallback(() => {}, [])
  const handleProduct = useCallback((p: ExploreProduct) => {}, [])
  const handleShopNow = useCallback(() => {}, [])

  return {
    activeTab, setActiveTab,
    searchQuery, setSearchQuery,
    featured: MOCK_FEATURED,
    products: MOCK_PRODUCTS,
    handleSearch, handleProduct, handleShopNow,
  }
}