// services/hooks/profilesetup/useFollowStores.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

export interface Store {
  id: string
  name: string
  rating: number
  reviewCount: number
  distance: string
  tags: string[]
  following: boolean
  emoji: string
}

const DEFAULT_STORES: Store[] = [
  {
    id: 'sneaker_district',
    name: 'Sneaker District NY',
    rating: 4.8,
    reviewCount: 211,
    distance: '0.3 km',
    tags: ['Nike', 'Jordan', 'New Balance', '502+ arrivals'],
    following: true,
    emoji: '🟠',
  },
  {
    id: 'good_will_co',
    name: 'The Good Will Col',
    rating: 4.6,
    reviewCount: 98,
    distance: '0.8 km',
    tags: ['Adidas', 'New Balance', 'ASICS', '8 new arrivals'],
    following: false,
    emoji: '🔵',
  },
  {
    id: 'kith_flagship',
    name: 'KITH Flagship',
    rating: 4.9,
    reviewCount: 430,
    distance: '1.1 km',
    tags: ['Nike', 'Adidas', 'Converse', '14 more stores'],
    following: false,
    emoji: '⚫',
  },
  {
    id: 'extra_butter',
    name: 'Extra Butter NY',
    rating: 4.7,
    reviewCount: 186,
    distance: '1.4 km',
    tags: ['Nike', 'Jordan', 'Puma', '18 new stores'],
    following: true,
    emoji: '🟡',
  },
  {
    id: 'atrans_nyc',
    name: 'Atrans NYC',
    rating: 4.5,
    reviewCount: 72,
    distance: '1.9 km',
    tags: ['Nike', 'Adidas', 'ASICS', '22 new stores'],
    following: false,
    emoji: '🟢',
  },
  {
    id: 'stadium_goods',
    name: 'Stadium Goods',
    rating: 4.8,
    reviewCount: 612,
    distance: '2.1 km',
    tags: ['Nike', 'Jordan', 'Yeezy', '29 new stores'],
    following: false,
    emoji: '🔴',
  },
]

export function useFollowStores() {
  const [stores, setStores] = useState<Store[]>(DEFAULT_STORES)
  const [loading, setLoading] = useState(false)

  const toggleFollow = (id: string) => {
    setStores(prev =>
      prev.map(s => (s.id === id ? { ...s, following: !s.following } : s))
    )
  }

  const followingCount = stores.filter(s => s.following).length

  const handleContinue = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      await new Promise(res => setTimeout(res, 800))

      const followed = stores.filter(s => s.following).map(s => s.name)
      console.log('=== FOLLOWED STORES ===')
      console.log(followed)

      Toast.show({
        type: 'success',
        text1: 'Stores Saved!',
        text2: "You'll get drops & restocks from your followed stores.",
      })

      await new Promise(res => setTimeout(res, 400))
      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.message ?? 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    stores,
    toggleFollow,
    followingCount,
    handleContinue,
    loading,
  }
}