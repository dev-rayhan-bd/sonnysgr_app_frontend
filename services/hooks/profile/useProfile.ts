// services/hooks/profile/useProfile.ts
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
  sizeCategories: {
    id: string
    label: string
    icon: 'sneaker' | 'shirt'
    editableLabel: string
    values: { label: string; value: string }[]
  }[]
  favoriteBrands: { id: string; label: string; color: string }[]
  followedStoresCount: number
  lockerItems: LockerItem[]
  lockerCount: number
  lockerPublic: boolean
  orders: number
  wishlistCount: number
  stockAlerts: number
  wantedPairs: number
  reviewsCount: number
  referralCode: string
}

const MOCK_PROFILE: ProfileData = {
  firstName: 'Sonny',
  lastName: 'Garcia',
  username: 'sonnysgr',
  avatarInitials: 'SG',
  avatarColor: '#22C55E',
  memberTier: 'Gold',
  points: 1720,
  pointsToNextTier: 2000,
  nextTier: 'Platinum',
  stats: { drops: 34, wishlist: 14, reviews: 8, mySize: '10.5 / L' },
  sizes: ["10.5 Men's", "8.5 Women's", "L Men's", "S Women's"],
  sizeCategories: [
    {
      id: 'sneakers',
      label: 'Sneakers',
      icon: 'sneaker',
      editableLabel: 'US',
      values: [
        { label: "Men", value: '10.5' },
        { label: "Women", value: '8.5' },
      ],
    },
    {
      id: 'clothing',
      label: 'Clothing',
      icon: 'shirt',
      editableLabel: '',
      values: [
        { label: 'Men', value: 'L' },
        { label: 'Women', value: 'S' },
      ],
    },
  ],
  favoriteBrands: [
    { id: 'nike', label: 'Nike', color: '#111111' },
    { id: 'jordan', label: 'Jordan', color: '#E11D48' },
    { id: 'adidas', label: 'Adidas', color: '#1D4ED8' },
  ],
  followedStoresCount: 5,
  lockerItems: [
    {
      id: '1',
      image:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/AIR+JORDAN+4+RETRO.png',
      name: 'AJ4',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      name: 'Essentials Hoodie',
    },
  ],
  lockerCount: 6,
  lockerPublic: true,
  orders: 3,
  wishlistCount: 14,
  stockAlerts: 2,
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

  const toggleLockerVisibility = useCallback(() => setLockerPublic((value) => !value), [])

  const editSizes = useCallback(() => {
    router.push({
      pathname: '/profilesetup/sizeScreen',
      params: { sizes: profile.sizes.join(',') },
    })
  }, [profile.sizes, router])

  const editBrands = useCallback(() => {
    router.push({
      pathname: '/profilesetup/pickBrandScreen',
      params: { brands: profile.favoriteBrands.map((brand) => brand.id).join(',') },
    })
  }, [profile.favoriteBrands, router])

  const addBrand = useCallback(() => console.log('Open brand picker'), [])
  const viewBenefits = useCallback(() => router.push('/screens/profile/vipStatusScreen'), [router])
  const addToLocker = useCallback(() => router.push('/screens/profile/lockerScreen'), [router])
  const manageLocker = useCallback(() => console.log('Manage locker'), [])
  const viewFollowedStores = useCallback(() => console.log('Followed stores'), [])
  const openDiscoverCollections = useCallback(
    () => router.push('/screens/profile/lockerBrowserScreen'),
    [router],
  )
  const inviteFriends = useCallback(() => router.push('/screens/profile/referralScreen'), [router])
  const openHelpSupport = useCallback(() => console.log('Help & support'), [])

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
    manageLocker,
    viewFollowedStores,
    openDiscoverCollections,
    inviteFriends,
    openHelpSupport,
  }
}