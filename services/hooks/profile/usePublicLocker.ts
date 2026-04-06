import { useState, useMemo, useCallback } from 'react'
import type { PublicLockerProfile, PublicLockerItem, FilterLabel, FilterCounts } from '@/types/lockerbrowser'

// ─── Mock Profile Data ────────────────────────────────────────────────────────
const MOCK_PROFILE: PublicLockerProfile = {
  id: '1',
  username: 'kicksbysonny',
  displayName: 'kicksbysonny',
  initials: 'KS',
  role: 'Sneaker Enthusiast',
  location: 'Miami',
  badge: 'BESNKR member',
  memberSince: 'since 2021',
  followerCount: 34,
  isFollowing: false,
  stats: {
    totalPairs: 12,
    estimatedValue: 3240,
    avgCondition: 4.8,
  },
  items: [
    { id: '1', name: "Air Jordan 1 'Chicago'", image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg', condition: 'Deadstock', isForSale: true, price: 450, size: '10' },
    { id: '2', name: "Nike Dunk Low 'Panda'", image: 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg', condition: '9/10', isForSale: false, size: '10' },
    { id: '3', name: 'Yeezy Boost 350', image: 'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Natural-Product.jpg', condition: 'Deadstock', isForSale: true, price: 280, size: '10' },
    { id: '4', name: "Air Max 90 'Infrared'", image: 'https://images.stockx.com/images/Nike-Air-Max-90-Infrared-Product.jpg', condition: '9/10', isForSale: false, size: '10' },
    { id: '5', name: "Jordan 4 'Black Cat'", image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020-Product.jpg', condition: 'Deadstock', isForSale: false, size: '10' },
    { id: '6', name: 'New Balance 550', image: 'https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg', condition: '9/10', isForSale: true, price: 180, size: '10' },
    { id: '7', name: "Nike Air Force 1", image: 'https://images.stockx.com/images/Nike-Air-Force-1-Low-White-07-Product.jpg', condition: '8/10', isForSale: false, size: '10' },
    { id: '8', name: "Jordan 3 'Fire Red'", image: 'https://images.stockx.com/images/Air-Jordan-3-Retro-Fire-Red-2022-Product.jpg', condition: '8/10', isForSale: true, price: 320, size: '10' },
  ],
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const usePublicLocker = (lockerId?: string) => {
  const [profile, setProfile] = useState<PublicLockerProfile>(MOCK_PROFILE)
  const [activeFilter, setActiveFilter] = useState<FilterLabel>('All')
  const [isLoading, setIsLoading] = useState(false)

  const filters: FilterLabel[] = ['All', 'Deadstock', '9/10', '8/10', '7/10', 'For Sale']

  const filteredItems = useMemo<PublicLockerItem[]>(() => {
    switch (activeFilter) {
      case 'Deadstock': return profile.items.filter((i) => i.condition === 'Deadstock')
      case '9/10':      return profile.items.filter((i) => i.condition === '9/10')
      case '8/10':      return profile.items.filter((i) => i.condition === '8/10')
      case '7/10':      return profile.items.filter((i) => i.condition === '7/10')
      case 'For Sale':  return profile.items.filter((i) => i.isForSale)
      default:          return profile.items
    }
  }, [profile.items, activeFilter])

  const filterCounts = useMemo<FilterCounts>(() => ({
    All:       profile.items.length,
    Deadstock: profile.items.filter((i) => i.condition === 'Deadstock').length,
    '9/10':    profile.items.filter((i) => i.condition === '9/10').length,
    '8/10':    profile.items.filter((i) => i.condition === '8/10').length,
    '7/10':    profile.items.filter((i) => i.condition === '7/10').length,
    'For Sale': profile.items.filter((i) => i.isForSale).length,
  }), [profile.items])

  const toggleFollow = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followerCount: prev.isFollowing ? prev.followerCount - 1 : prev.followerCount + 1,
    }))
  }, [])

  return {
    profile,
    filters,
    activeFilter,
    setActiveFilter,
    filteredItems,
    filterCounts,
    isLoading,
    toggleFollow,
  }
}