// services/hooks/store/usePickupComplete.ts
import { router } from 'expo-router'
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export function usePickupComplete() {
  const [rating, setRating] = useState(0)
  const storeName = "Sonny's Kicks"

  const handleRate = useCallback((star: number) => {
    setRating(star)
    Toast.show({ type: 'success', text1: 'Thanks!', text2: `You rated ${star} star${star > 1 ? 's' : ''}` })
  }, [])

  const handleWriteReview = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Review', text2: 'Opening review form...' })
    router.push("/screens/settings/leaveReviewScreen")
  }, [])

  return { storeName, rating, handleRate, handleWriteReview }
}