// services/hooks/store/useOrderStatus.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export type StatusStep = 'placed' | 'confirmed' | 'payment' | 'pickup' | 'completed'

export interface OrderStatusStep {
  id: StatusStep
  label: string
  time: string
  done: boolean
  active: boolean
  detail?: string
}

export interface OrderStatusData {
  orderNumber: string
  placedAt: string
  statusLabel: string
  productName: string
  productSize: string
  productStore: string
  price: number
  steps: OrderStatusStep[]
  storeName: string
  storeDistance: string
  pickupBy: string
  timeRemaining: string
}

const MOCK: OrderStatusData = {
  orderNumber: '#GS-2024-7843',
  placedAt: 'Placed today at 10:24 AM',
  statusLabel: 'Ready for Pickup',
  productName: "Air Jordan 4 'Black Cat'",
  productSize: "Size 10.5 · Men's",
  productStore: "Sonny's Kicks",
  price: 220,
  steps: [
    { id: 'placed',    label: 'Order Placed',      time: 'Today, 10:24 AM', done: true,  active: false },
    { id: 'confirmed', label: 'Hold Confirmed',     time: 'Today, 10:35 AM', done: true,  active: false },
    { id: 'payment',   label: 'Payment Received',   time: 'Today, 12:15 PM', done: true,  active: false },
    { id: 'pickup',    label: 'Ready for Pickup',   time: 'Today, 12:45 PM', done: false, active: true, detail: 'Your pair is at the counter waiting! Staff notified' },
    { id: 'completed', label: 'Completed',          time: '',                done: false, active: false },
  ],
  storeName: "Sonny's Kicks",
  storeDistance: '1.1 mi',
  pickupBy: 'Today, 6:00 PM',
  timeRemaining: '7h 30m remaining',
}

export function useOrderStatus() {
  const status = MOCK

  const handleShowQR = useCallback((onPress: () => void) => {
    onPress()
  }, [])

  const handleGetDirections = useCallback((onPress: () => void) => {
    onPress()
  }, [])

  const handleContactStore = useCallback(() => {
    Linking.openURL('tel:3055550198').catch(() => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not call store' })
    })
  }, [])

  const handleShare = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Share', text2: 'Sharing order status...' })
  }, [])

  return { status, handleShowQR, handleGetDirections, handleContactStore, handleShare }
}