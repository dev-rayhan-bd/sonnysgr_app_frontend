// services/hooks/order/useRefundRequest.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface RefundEligibility {
  depositPaid: number
  holdDuration: string
  holdExpires: string
  isEligible: boolean
  policyNote: string
  storePolicy: string
  productName: string
  productSize: string
  productGender: string
  productImageColor: string
  amountPaid: number
}

const MOCK_ELIGIBILITY: RefundEligibility = {
  depositPaid: 44.00,
  holdDuration: '48 hrs',
  holdExpires: 'Apr 08, 10:30 AM',
  isEligible: true,
  policyNote: 'Store policy allows refund within 48hrs of hold placement.',
  storePolicy: 'Deposits are refundable if the store cancels the hold or within 24 hours of placement. Change of mind refunds are at store discretion.',
  productName: "Air Jordan 4 'Black Cat'",
  productSize: '10.5',
  productGender: "Men's",
  productImageColor: '#CBD5E1',
  amountPaid: 220.00,
}

export type RefundReason = 'Changed my mind' | 'Item not as described' | 'Other'

export function useRefundRequest() {
  const [eligibility]                   = useState<RefundEligibility>(MOCK_ELIGIBILITY)
  const [selectedReason, setReason]     = useState<RefundReason | null>(null)
  const [notes, setNotes]               = useState('')
  const [loading, setLoading]           = useState(false)

  const REASONS: RefundReason[] = ['Changed my mind', 'Item not as described', 'Other']

  const handleSubmit = useCallback(async (onSuccess: () => void) => {
    if (!selectedReason) {
      Toast.show({ type: 'error', text1: 'Select a reason', text2: 'Please choose a refund reason' })
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onSuccess()
  }, [selectedReason])

  return {
    eligibility,
    reasons: REASONS,
    selectedReason,
    setReason,
    notes,
    setNotes,
    loading,
    handleSubmit,
  }
}