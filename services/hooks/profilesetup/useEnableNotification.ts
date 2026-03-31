// services/hooks/profilesetup/useNotifications.ts
import { useState } from 'react'
import { Linking, Platform } from 'react-native'
import Toast from 'react-native-toast-message'

export interface NotificationSetting {
  id: string
  label: string
  description: string
  emoji: string
  enabled: boolean
}

const DEFAULT_SETTINGS: NotificationSetting[] = [
  {
    id: 'restocks',
    label: 'Restocks in my size',
    description: 'For shoes on your Wantlist & Wanted',
    emoji: '👟',
    enabled: true,
  },
  {
    id: 'nearby_stores',
    label: 'Nearby store alerts',
    description: 'Within 5 miles of you',
    emoji: '📍',
    enabled: true,
  },
  {
    id: 'store_drops',
    label: 'Followed store drops',
    description: 'From stores you follow',
    emoji: '⭐',
    enabled: true,
  },
  {
    id: 'price_drops',
    label: 'Price drops',
    description: 'When wanted items go on sale',
    emoji: '💸',
    enabled: true,
  },
  {
    id: 'wanted_pairs',
    label: 'Wanted pair alerts',
    description: 'When wanted pairs appear nearby',
    emoji: '🔥',
    enabled: true,
  },
  {
    id: 'announcements',
    label: 'GoSNKR announcements',
    description: 'New features & updates',
    emoji: '📢',
    enabled: false,
  },
]

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(false)

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const handleEnableNotifications = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      // TODO: replace with expo-notifications permission request
      // const { status } = await Notifications.requestPermissionsAsync()
      // if (status !== 'granted') throw new Error('Permission denied')

      await new Promise(res => setTimeout(res, 800))

      const enabled = settings.filter(s => s.enabled).map(s => s.id)
      console.log('=== NOTIFICATIONS ENABLED ===')
      console.log('Enabled:', enabled)

      Toast.show({
        type: 'success',
        text1: 'Notifications Enabled!',
        text2: "You're all set to get sneaker alerts.",
      })

      await new Promise(res => setTimeout(res, 400))
      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Enable Notifications',
        text2: error?.message ?? 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    settings,
    loading,
    toggleSetting,
    handleEnableNotifications,
  }
}