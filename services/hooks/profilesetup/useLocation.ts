// services/hooks/profilesetup/useLocation.ts
import { useState } from 'react'
import * as Location from 'expo-location'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export function useLocation() {
  const [loading, setLoading] = useState(false)

  const handleEnableLocation = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      // Check existing permission
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync()
      let finalStatus = existingStatus

      // Request if not already granted
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Location Permission Denied',
          text2: 'Please enable location access in your device settings.',
        })
        await Linking.openSettings()
        return
      }

      // Permission granted — try to get coords but don't block on failure
      // (emulators often fail getCurrentPositionAsync)
      try {
        const location =
          await Location.getLastKnownPositionAsync() ??
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
            timeInterval: 5000,
          })
        console.log('=== LOCATION ENABLED ===')
        console.log('Coords:', location?.coords)
      } catch (coordsError) {
        // Coords failed (common on emulator) — permission is still granted, continue
        console.log('Could not get coords (emulator?):', coordsError)
      }

      Toast.show({
        type: 'success',
        text1: 'Location Enabled!',
        text2: "We'll show you nearby stores in real-time.",
      })

      await new Promise(res => setTimeout(res, 400))
      onSuccess?.()

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Location Access Failed',
        text2: error?.message ?? 'Please enable location in your settings.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleEnableLocation,
  }
}