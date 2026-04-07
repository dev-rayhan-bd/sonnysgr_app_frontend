// services/hooks/order/useRefundSubmitted.ts
import { useCallback } from 'react'

export interface RefundSubmittedData {
  refundAmount: number
  requestId: string
  reason: string
  submittedAt: string
  estimatedReturn: string
  steps: { id: string; label: string; description: string }[]
}

const MOCK: RefundSubmittedData = {
  refundAmount: 44.00,
  requestId: 'REF-09291',
  reason: 'Store cancelled the hold',
  submittedAt: 'Apr 04, 2026 · 2:42 PM',
  estimatedReturn: '3-5 business days',
  steps: [
    { id: 's1', label: "We've notified the store about your refund request.",     description: '' },
    { id: 's2', label: 'The store reviews and approves within 1 business day.',   description: '' },
    { id: 's3', label: 'Funds return to your original payment method in 3-5 days.', description: '' },
  ],
}

export function useRefundSubmitted() {
  const data = MOCK
  return { data }
}