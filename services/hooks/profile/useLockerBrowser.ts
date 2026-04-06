import { useState, useMemo, useCallback } from 'react'
import type { LockerPreview } from '@/types/lockerbrowser'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_LOCKERS: LockerPreview[] = [
  {
    id: '1',
    username: 'kicksbysonny',
    displayName: 'kicksbysonny',
    initials: 'KS',
    location: 'Miami',
    totalPairs: 12,
    estimatedValue: 3240,
    avgCondition: 4.8,
    followerCount: 34,
    isFollowing: false,
    memberSince: '2021',
    badge: 'BESNKR',
    previewImages: [
      'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg',
      'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
      'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Natural-Product.jpg',
    ],
  },
  {
    id: '2',
    username: 'soleking_nyc',
    displayName: 'soleking_nyc',
    initials: 'SK',
    location: 'New York',
    totalPairs: 28,
    estimatedValue: 11400,
    avgCondition: 4.5,
    followerCount: 142,
    isFollowing: true,
    memberSince: '2020',
    badge: 'PRO',
    previewImages: [
      'https://images.stockx.com/images/Nike-Air-Max-90-Infrared-Product.jpg',
      'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020-Product.jpg',
      'https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg',
    ],
  },
  {
    id: '3',
    username: 'sneakerhead_atl',
    displayName: 'sneakerhead_atl',
    initials: 'SA',
    location: 'Atlanta',
    totalPairs: 7,
    estimatedValue: 1860,
    avgCondition: 4.9,
    followerCount: 19,
    isFollowing: false,
    memberSince: '2022',
    badge: 'BESNKR',
    previewImages: [
      'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg',
      'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
      'https://images.stockx.com/images/Nike-Air-Max-90-Infrared-Product.jpg',
    ],
  },
  {
    id: '4',
    username: 'pdx_kicks',
    displayName: 'pdx_kicks',
    initials: 'PK',
    location: 'Portland',
    totalPairs: 41,
    estimatedValue: 22600,
    avgCondition: 4.2,
    followerCount: 311,
    isFollowing: false,
    memberSince: '2019',
    badge: 'VERIFIED',
    previewImages: [
      'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Natural-Product.jpg',
      'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020-Product.jpg',
      'https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg',
    ],
  },
  {
    id: '5',
    username: 'lacedup_la',
    displayName: 'lacedup_la',
    initials: 'LL',
    location: 'Los Angeles',
    totalPairs: 15,
    estimatedValue: 5100,
    avgCondition: 4.6,
    followerCount: 87,
    isFollowing: true,
    memberSince: '2021',
    badge: 'BESNKR',
    previewImages: [
      'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
      'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg',
      'https://images.stockx.com/images/Nike-Air-Max-90-Infrared-Product.jpg',
    ],
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useLockerBrowser = () => {
  const [lockers, setLockers] = useState<LockerPreview[]>(MOCK_LOCKERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredLockers = useMemo(() => {
    if (!searchQuery.trim()) return lockers
    const q = searchQuery.toLowerCase()
    return lockers.filter(
      (l) =>
        l.username.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q),
    )
  }, [lockers, searchQuery])

  const toggleFollow = useCallback((id: string) => {
    setLockers((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              isFollowing: !l.isFollowing,
              followerCount: l.isFollowing ? l.followerCount - 1 : l.followerCount + 1,
            }
          : l,
      ),
    )
  }, [])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsRefreshing(false)
  }, [])

  return {
    lockers: filteredLockers,
    searchQuery,
    setSearchQuery,
    isRefreshing,
    refresh,
    toggleFollow,
  }
}