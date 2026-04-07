// services/hooks/order/useOrderDetail.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export interface OrderTimeline {
  id: string
  label: string
  date: string
  amount?: string
  done: boolean
  cancelled?: boolean
}

export interface OrderDetailData {
  id: string
  orderNumber: string
  status: 'Cancelled' | 'Active' | 'Completed' | 'Pick Up Ready' | 'On Hold'
  cancelledBy: string
  cancelledDate: string
  cancelledTime: string
  productName: string
  productSize: string
  productGender: string
  productImageColor: string
  storeName: string
  storeDistance: string
  itemPrice: number
  depositPaid: number
  remaining: number
  totalCharged: number
  refundEligible: number
  cancellationReason: string
  timeline: OrderTimeline[]
}

const MOCK: OrderDetailData = {
  id: '4',
  orderNumber: '089-09283',
  status: 'Cancelled',
  cancelledBy: 'Store',
  cancelledDate: 'Apr 04, 2026',
  cancelledTime: '2:09 PM',
  productName: "Air Jordan 4 'Black Cat'",
  productSize: '10.5',
  productGender: "Men's",
  productImageColor: '#CBD5E1',
  storeName: "Sonny's Kicks",
  storeDistance: '1.2 mi',
  itemPrice: 220.00,
  depositPaid: 44.00,
  remaining: 176.00,
  totalCharged: 44.00,
  refundEligible: 44.00,
  cancellationReason: 'The store cancelled this hold. You are eligible for a full deposit refund of $44.00.',
  timeline: [
    { id: 't1', label: 'Hold Placed',      date: 'Apr 03, 2026 · 10:30 AM', done: true },
    { id: 't2', label: 'Deposit Paid',      date: 'Apr 03, 2026 · 10:31 AM', amount: '· $44.00', done: true },
    { id: 't3', label: 'Cancelled by Store', date: 'Apr 04, 2026 · 2:09 PM', done: true, cancelled: true },
  ],
}

export function useOrderDetail(orderId?: string) {
  const order = MOCK

  const handleCopy = useCallback(() => {
    Toast.show({ type: 'success', text1: 'Copied!', text2: 'Order number copied' })
  }, [])

  const handleContactStore = useCallback(() => {
    Linking.openURL('tel:3055550198').catch(() => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not call store' })
    })
  }, [])

  return { order, handleCopy, handleContactStore }
}