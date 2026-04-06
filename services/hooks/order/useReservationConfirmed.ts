// services/hooks/store/useReservationConfirmed.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export interface ReservationDetails {
  pickupCode: string
  orderNumber: string
  store: string
  address: string
  pickupTime: string
  size: string
  price: number
}

const MOCK: ReservationDetails = {
  pickupCode: 'GS-2024-7843',
  orderNumber: 'GS-2024-7843',
  store: "Sonny's Kicks",
  address: '123 Main St, Miami FL',
  pickupTime: 'Today · 11:00 AM',
  size: "10.5 Men's",
  price: 220.00,
}

export function useReservationConfirmed() {
  const reservation = MOCK

  const handleGetDirections = useCallback(() => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(MOCK.address)}`
    Linking.openURL(url).catch(() => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not open maps' })
    })
  }, [])

  const handleAddToWallet = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Wallet', text2: 'Adding to wallet...' })
  }, [])

  const handleEnlarge = useCallback(() => {
    Toast.show({ type: 'info', text1: 'QR Code', text2: 'Tap to enlarge QR' })
  }, [])

  return { reservation, handleGetDirections, handleAddToWallet, handleEnlarge }
}