// services/hooks/store/useRadiusPromotion.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export type RadiusOption = 5 | 10 | 25

export function useRadiusPromotion() {
  const [selectedRadius, setSelectedRadius] = useState<RadiusOption>(5)
  const [message,        setMessage]        = useState('')
  const [loading,        setLoading]        = useState(false)

  const RADIUS_CUSTOMERS: Record<RadiusOption, number> = {
    5:  2400,
    10: 5800,
    25: 12000,
  }

  const estimatedCustomers = RADIUS_CUSTOMERS[selectedRadius]

  const handleSend = useCallback(async (onSuccess: () => void) => {
    if (!message.trim()) {
      Toast.show({ type: 'error', text1: 'Add a message', text2: 'Please write a promotion message' })
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Promotion Sent!',
      text2: `Sent to ~${estimatedCustomers.toLocaleString()} people`,
    })
    onSuccess()
  }, [message, estimatedCustomers])

  return {
    selectedRadius, setSelectedRadius,
    message, setMessage,
    estimatedCustomers,
    loading,
    handleSend,
  }
}