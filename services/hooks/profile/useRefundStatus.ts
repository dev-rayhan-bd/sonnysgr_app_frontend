// services/hooks/order/useRefundStatus.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export type RefundStep = 'Requested' | 'Under Review' | 'Approved' | 'Refunded'

export interface RefundStatusStep {
  id: string
  label: RefundStep
  date: string
  status: 'done' | 'active' | 'pending'
  detail?: string
}

export interface RefundStatusData {
  orderStep: string
  productName: string
  productSize: string
  productGender: string
  refundAmount: number
  steps: RefundStatusStep[]
  estimatedDate: string
  paymentRef: string
}

const MOCK: RefundStatusData = {
  orderStep: 'Step 4 of 4',
  productName: "Air Jordan 4 'Black Cat'",
  productSize: '10.5',
  productGender: "Men's",
  refundAmount: 44.00,
  steps: [
    { id: 'r1', label: 'Requested',    date: 'Apr 04, 2026 · 7:43 PM', status: 'done'   },
    { id: 'r2', label: 'Under Review', date: 'Store reviewing your request', status: 'active', detail: 'In Progress' },
    { id: 'r3', label: 'Approved',     date: 'Waiting for store approval',   status: 'pending' },
    { id: 'r4', label: 'Refunded',     date: 'Funds return to Visa ••••4242', status: 'pending' },
  ],
  estimatedDate: 'Apr 09-11, 2026',
  paymentRef: '••••4242',
}

export function useRefundStatus() {
  const data = MOCK

  const handleContactSupport = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Support', text2: 'Opening support chat...' })
  }, [])

  return { data, handleContactSupport }
}