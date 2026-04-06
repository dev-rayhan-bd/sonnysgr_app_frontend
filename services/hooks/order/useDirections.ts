// services/hooks/store/useDirections.ts
import { useCallback } from 'react'
import { Linking } from 'react-native'
import Toast from 'react-native-toast-message'

export interface DirectionStep {
  id: string
  instruction: string
  distance: string
}

export interface DirectionsData {
  storeName: string
  storeAddress: string
  duration: string
  distance: string
  steps: DirectionStep[]
  arrivalTime: string
}

const MOCK: DirectionsData = {
  storeName: "Sonny's Kicks",
  storeAddress: 'Miami, FL',
  duration: '8 min',
  distance: '2.4 miles',
  arrivalTime: '2:30 PM',
  steps: [
    { id: 'd1', instruction: 'Turn right on 2nd Ave',         distance: '0.2 mi' },
    { id: 'd2', instruction: 'Continue on Avenue',            distance: '1.1 mi' },
    { id: 'd3', instruction: 'Turn left on N Biscayne Blvd',  distance: '0.8 mi' },
    { id: 'd4', instruction: 'Turn left on NE Biscayne West', distance: '0.3 mi' },
  ],
}

export function useDirections() {
  const directions = MOCK

  const openInMaps = useCallback(() => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(MOCK.storeName + ' ' + MOCK.storeAddress)}`
    Linking.openURL(url).catch(() => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not open Maps' })
    })
  }, [])

  const shareLocation = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Share', text2: 'Sharing store location...' })
  }, [])

  return { directions, openInMaps, shareLocation }
}