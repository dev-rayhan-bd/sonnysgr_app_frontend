// services/hooks/discover/useStoreProfile.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface StoreProduct {
  id: string
  name: string
  size: string
  price: number
  badge?: string
  badgeColor?: string
  imageUri?: string
}

export interface ReviewBreakdown {
  star: number
  percent: number
}

export interface StoreProfile {
  id: string
  name: string
  badge: 'Premium Partner' | 'Verified' | 'New'
  avatarColor: string
  initials: string
  rating: number
  followers: number
  posts: number
  distance: string

  latitude: number       // ✅ add this
  longitude: number      // ✅ add this

  isFollowing: boolean
  isVerified: boolean
  isFastPickup: boolean
  isTopRated: boolean
  isOpen: boolean
  closingTime: string
  address: string
  phone: string
  website: string
  instagram: string
  tags: string[]
  pairsInSize: number
  products: StoreProduct[]
  reviewScore: number
  reviewBreakdown: ReviewBreakdown[]
  customerService: number
  authenticity: number
  pickupSpeed: number
  pricing: number
  notificationsOn: boolean
}

const MOCK: StoreProfile = {
  id: 's1',
  name: "Sonny's Kicks",
  badge: 'Premium Partner',
  avatarColor: '#22C55E',
  initials: 'SK',
  rating: 4.8,
  followers: 247,
  posts: 83,
  distance: '1.1 mi',

  latitude: 100.7617,     // Miami example
  longitude: -80.1918,   // Miami example

  isFollowing: false,
  isVerified: true,
  isFastPickup: true,
  isTopRated: true,
  isOpen: true,
  closingTime: '9:00 PM',
  address: '123 Main Street, Miami, FL 33101',
  phone: '(305) 555-0198',
  website: 'sonnykicks.com',
  instagram: '@sonnykicks',
  tags: ['Your Size 10.5', 'Jordans', 'Nike', 'New Arrivals'],
  pairsInSize: 83,
  notificationsOn: false,
  products: [
    { id: 'p1', name: "Air Jordan 4 'Black Cat'", size: 'Size 10.5', price: 220 },
    { id: 'p2', name: "Air Jordan 4 'B'", size: 'Size 10.5', price: 220, badge: 'In Stock', badgeColor: '#22C55E' },
  ],
  reviewScore: 4.8,
  reviewBreakdown: [
    { star: 5, percent: 70 },
    { star: 4, percent: 50 },
    { star: 3, percent: 6 },
    { star: 2, percent: 2 },
    { star: 1, percent: 1 },
  ],
  customerService: 4.9,
  authenticity: 5.0,
  pickupSpeed: 4.7,
  pricing: 4.6,
}
export function useStoreProfile(storeId?: string) {
  const [store, setStore] = useState<StoreProfile>(MOCK)
  const [activeTag, setActiveTag] = useState<string>('Your Size 10.5')

  const toggleFollow = useCallback(() => {
    setStore(prev => {
      const nowFollowing = !prev.isFollowing
      Toast.show({
        type: nowFollowing ? 'success' : 'info',
        text1: nowFollowing ? 'Following!' : 'Unfollowed',
        text2: nowFollowing
          ? `You're now following ${prev.name} 🎉`
          : `You unfollowed ${prev.name}`,
      })
      return {
        ...prev,
        isFollowing: nowFollowing,
        followers: nowFollowing ? prev.followers + 1 : prev.followers - 1,
      }
    })
  }, [])

  const toggleNotifications = useCallback(() => {
    setStore(prev => {
      const nowOn = !prev.notificationsOn
      Toast.show({
        type: nowOn ? 'success' : 'info',
        text1: nowOn ? 'Notifications On' : 'Notifications Off',
        text2: nowOn
          ? `You'll be notified about ${prev.name} 🔔`
          : `Notifications disabled for ${prev.name}`,
      })
      return { ...prev, notificationsOn: nowOn }
    })
  }, [])

  const handleShare = useCallback(async (shareFn: () => Promise<void>) => {
    try {
      await shareFn()
      Toast.show({
        type: 'success',
        text1: 'Shared!',
        text2: 'Link ready to share 📤',
      })
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Share Failed',
        text2: 'Could not share at this time',
      })
    }
  }, [])

  const handleProductPress = useCallback((product: StoreProduct) => {
    Toast.show({
      type: 'info',
      text1: 'Viewing Product',
      text2: product.name,
    })
  }, [])

  const handleSeeAll = useCallback(() => {
    Toast.show({
      type: 'info',
      text1: 'Showing All',
      text2: 'All products in your size',
    })
  }, [])

  const handleSeeAllReviews = useCallback(() => {
    Toast.show({
      type: 'info',
      text1: 'Reviews',
      text2: 'Loading all reviews...',
    })
  }, [])

  return {
    store,
    activeTag,
    setActiveTag,
    toggleFollow,
    toggleNotifications,
    handleShare,
    handleProductPress,
    handleSeeAll,
    handleSeeAllReviews,
  }
}