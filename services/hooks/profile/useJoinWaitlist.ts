// services/hooks/profile/useJoinWaitlist.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

export type NotifyLocation = 'anywhere' | 'specific'

export interface WaitlistProduct {
  id: string
  brand: string
  name: string
  size: string
  gender: string
  waitingCount: number
  demand: 'high' | 'medium' | 'low'
  imageUrl?: string
}

export function useJoinWaitlist(product: WaitlistProduct, onSuccess?: () => void) {
  const [notifyLocation, setNotifyLocation] = useState<NotifyLocation>('anywhere')
  const [alertPriceDrop, setAlertPriceDrop] = useState(false)
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)

  const handleSelectLocation = (loc: NotifyLocation) => {
    setNotifyLocation(loc)
    if (loc === 'specific') {
      Toast.show({
        type: 'info',
        text1: 'Choose Your Stores',
        text2: 'Select specific stores to monitor for your size.',
      })
    }
  }

  const handleTogglePriceDrop = () => {
    const next = !alertPriceDrop
    setAlertPriceDrop(next)
    Toast.show({
      type: next ? 'success' : 'info',
      text1: next ? 'Price Drop Alert On' : 'Price Drop Alert Off',
      text2: next
        ? `We'll notify you if ${product.name} drops in price.`
        : 'You won\'t receive price drop alerts.',
    })
  }

// Replace the handleChooseStores stub with:
const handleChooseStores = (storeIds: string[]) => {
  setSelectedStores(storeIds)
}

  const handleJoinWaitlist = async () => {
    if (joined) {
      Toast.show({
        type: 'info',
        text1: 'Already on Waitlist',
        text2: `You're already waiting for ${product.name} in size ${product.size}.`,
      })
      return
    }

    if (notifyLocation === 'specific' && selectedStores.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No Stores Selected',
        text2: 'Please choose at least one store or switch to "Anywhere nearby".',
      })
      return
    }

    try {
      setLoading(true)
      // TODO: replace with real API call
      await new Promise(res => setTimeout(res, 900))

      setJoined(true)
      Toast.show({
        type: 'success',
        text1: "You're on the Waitlist! 🎉",
        text2: `We'll notify you the moment ${product.name} is back in size ${product.size}.`,
      })
      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Join',
        text2: error?.message ?? 'Something went wrong. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveWaitlist = async () => {
    try {
      setLoading(true)
      await new Promise(res => setTimeout(res, 600))
      setJoined(false)
      Toast.show({
        type: 'info',
        text1: 'Left Waitlist',
        text2: `You've been removed from the waitlist for ${product.name}.`,
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message ?? 'Could not leave waitlist. Try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    notifyLocation,
    alertPriceDrop,
    selectedStores,
    loading,
    joined,
    handleSelectLocation,
    handleTogglePriceDrop,
    handleChooseStores,
    handleJoinWaitlist,
    handleLeaveWaitlist,
  }
}