// hooks/profile/useProfile.ts
import { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'

export type MemberTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface LockerItem {
  id: string
  image: string
  name: string
}

export interface ProfileData {
  firstName: string
  lastName: string
  username: string
  avatarInitials: string
  avatarColor: string
  memberTier: MemberTier
  points: number
  pointsToNextTier: number
  nextTier: MemberTier
  stats: {
    drops: number
    wishlist: number
    reviews: number
    mySize: string
  }
  sizes: string[]
  favoriteBrands: { id: string; label: string; color: string }[]
  lockerItems: LockerItem[]
  lockerCount: number
  lockerPublic: boolean
  orders: number
  wishlistCount: number
  wantedPairs: number
  reviewsCount: number
  referralCode: string
}

const MOCK_PROFILE: ProfileData = {
  firstName: 'Sonny',
  lastName: 'Garcia',
  username: 'sonnysgr',
  avatarInitials: 'SG',
  avatarColor: '#F97316',
  memberTier: 'Gold',
  points: 1720,
  pointsToNextTier: 2000,
  nextTier: 'Platinum',
  stats: { drops: 34, wishlist: 14, reviews: 8, mySize: '10.5' },
  sizes: ["10.5 Men's", "8.5 Women's"],
  favoriteBrands: [
    { id: 'nike', label: 'N', color: '#111111' },
    { id: 'jordan', label: 'J', color: '#E11D48' },
    { id: 'adidas', label: 'A', color: '#1D4ED8' },
  ],
  lockerItems: [
    { id: '1', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/AIR+JORDAN+4+RETRO.png', name: 'AJ4' },
    { id: '2', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-87f8jZ.png', name: 'Dunk Low' },
    { id: '3', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3d8d5a28-e6bf-4de8-8831-4e7f5a7afb8e/air-force-1-07-mens-shoes-WrpDWH.png', name: 'AF1' },
  ],
  lockerCount: 6,
  lockerPublic: true,
  orders: 3,
  wishlistCount: 14,
  wantedPairs: 5,
  reviewsCount: 8,
  referralCode: 'SONNY20',
}

export const TIER_COLORS: Record<MemberTier, string> = {
  Bronze: '#92400E',
  Silver: '#6B7280',
  Gold: '#D97706',
  Platinum: '#7C3AED',
}

export const useProfile = () => {
  const router = useRouter()
  const [profile] = useState<ProfileData>(MOCK_PROFILE)
  const [lockerPublic, setLockerPublic] = useState(MOCK_PROFILE.lockerPublic)

  const tierColor = TIER_COLORS[profile.memberTier]
  const pointsProgress = profile.points / profile.pointsToNextTier

  const toggleLockerVisibility = useCallback(() => setLockerPublic(p => !p), [])

  const editSizes = useCallback(() => {
    router.push({
      pathname: '/profilesetup/sizeScreen',
      params: { sizes: profile.sizes.join(',') },
    })
  }, [router, profile.sizes])

  const editBrands = useCallback(() => {
    router.push({
      pathname: '/profilesetup/pickBrandScreen',
      params: { brands: profile.favoriteBrands.map(b => b.id).join(',') },
    })
  }, [router, profile.favoriteBrands])

  const addBrand = useCallback(() => console.log('Open brand picker'), [])
  const viewBenefits = useCallback(() => console.log('View benefits'), [])
  const addToLocker = useCallback(() => console.log('Add to locker'), [])

  return {
    profile,
    lockerPublic,
    tierColor,
    pointsProgress,
    toggleLockerVisibility,
    addBrand,
    editSizes,
    editBrands,
    viewBenefits,
    addToLocker,
  }
}