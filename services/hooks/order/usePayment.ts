// services/hooks/store/usePayment.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface SavedCard {
  id: string
  type: 'visa' | 'mc' | 'amex'
  last4: string
  expiry: string
}

const MOCK_CARDS: SavedCard[] = [
  { id: 'c1', type: 'visa', last4: '4242', expiry: '12/26' },
  { id: 'c2', type: 'mc',   last4: '8888', expiry: '09/27' },
]

export function usePayment(amount: number) {
  const [cards]           = useState<SavedCard[]>(MOCK_CARDS)
  const [selectedCard, setSelectedCard] = useState<string>('c1')
  const [loading, setLoading]           = useState(false)

  const handlePayNow = useCallback(async (onSuccess: () => void) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    Toast.show({ type: 'success', text1: 'Payment Successful!', text2: `$${amount.toFixed(2)} paid` })
    onSuccess()
  }, [amount])

  const handleGPay = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Google Pay', text2: 'Opening Google Pay...' })
  }, [])

  const handleApplePay = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Apple Pay', text2: 'Opening Apple Pay...' })
  }, [])

  return {
    cards, selectedCard, setSelectedCard,
    loading, handlePayNow, handleGPay, handleApplePay,
  }
}