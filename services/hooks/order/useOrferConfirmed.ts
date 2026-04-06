// services/hooks/store/useOrderConfirmed.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'
import { useRouter } from 'expo-router'
import { useStoreProfile } from '../store/useStoreProfile'
export interface OrderSummary {
  avatarInitials: string
  avatarColor: string
  orderNumber: string
  productName: string
  productSize: string
  price: number
  paymentLast4: string
  serviceFee: number
  tax: number
  total: number
  storeName: string
  storeDistance: string
  readyIn: string
  pickupDate: string
  pickupTime: string
}

const MOCK: OrderSummary = {
  avatarInitials: 'GS',
  avatarColor: '#22C55E',
  orderNumber: '#GS-2024-7843',
  productName: "Air Jordan 4 'Black Cat'",
  productSize: "Size 10.5 · Men's",
  price: 220.00,
  paymentLast4: '4242',
  serviceFee: 5.50,
  tax: 18.15,
  total: 243.65,
  storeName: "Sonny's Kicks",
  storeDistance: '1.1 mi',
  readyIn: '~30 min',
  pickupDate: 'Today',
  pickupTime: '2:00 PM',
}

export function useOrderConfirmed() {
  const order = MOCK
  const router = useRouter()
  const {
    store, activeTag, setActiveTag,
    toggleFollow, toggleNotifications,
    handleShare, handleProductPress,
    handleSeeAll, handleSeeAllReviews,
  } = useStoreProfile()
  const handleGetDirections = useCallback(() => {
    router.push({
      pathname: '/tabs/mapScreen',
      params: {
        lat: store.latitude.toString(),
        lng: store.longitude.toString(),
        name: store.name,
      },
    })
  }, [])

  const handleViewQR = useCallback((onPress: () => void) => {
    onPress()
  }, [])

  return { order, handleGetDirections, handleViewQR }
}