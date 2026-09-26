// services/hooks/order/useDirections.ts
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Linking } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message'

export interface DirectionStep {
  id: string
  instruction: string
  distance: string
}

export interface LatLng {
  latitude: number
  longitude: number
}

export interface DirectionsData {
  storeName: string
  storeAddress: string
  duration: string
  distance: string
  steps: DirectionStep[]
  arrivalTime: string
  origin: LatLng
  destination: LatLng
  // Simple polyline points between origin -> destination.
  // Swap this for the Google Directions API response (overview_polyline) later.
  routeCoordinates: LatLng[]
}

const FALLBACK_ORIGIN: LatLng = { latitude: 25.7743, longitude: -80.1937 }
const FALLBACK_DESTINATION: LatLng = { latitude: 25.7825, longitude: -80.1875 }

const MOCK_STEPS: DirectionStep[] = [
  { id: 'd1', instruction: 'Turn right on 2nd Ave', distance: '0.2 mi' },
  { id: 'd2', instruction: 'Continue on Avenue', distance: '1.1 mi' },
  { id: 'd3', instruction: 'Turn left on N Biscayne Blvd', distance: '0.8 mi' },
  { id: 'd4', instruction: 'Turn left on NE Biscayne West', distance: '0.3 mi' },
]

export function useDirections() {
  // Params passed in from the buyer flow (StoreBottomSheet, storeProfileScreen, etc.)
  const params = useLocalSearchParams<{
    storeId?: string
    storeName?: string
    storeAddress?: string
    latitude?: string
    longitude?: string
  }>()

  const [origin, setOrigin] = useState<LatLng>(FALLBACK_ORIGIN)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      const pos = await Location.getCurrentPositionAsync({})
      if (isMounted) {
        setOrigin({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  const destination: LatLng = useMemo(() => {
    const lat = params.latitude ? parseFloat(params.latitude) : NaN
    const lng = params.longitude ? parseFloat(params.longitude) : NaN
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return { latitude: lat, longitude: lng }
    }
    return FALLBACK_DESTINATION
  }, [params.latitude, params.longitude])

  const directions: DirectionsData = useMemo(
    () => ({
      storeName: params.storeName || "Sonny's Kicks",
      storeAddress: params.storeAddress || 'Miami, FL',
      duration: '8 min',
      distance: '2.4 miles',
      arrivalTime: '2:30 PM',
      origin,
      destination,
      // TODO: replace with real Google Directions API polyline for turn-by-turn accuracy
      routeCoordinates: [origin, destination],
      steps: MOCK_STEPS,
    }),
    [params.storeName, params.storeAddress, origin, destination],
  )

  // Region that frames both origin + destination, used to init the in-app MapView.
  const mapRegion = useMemo(() => {
    const lats = [directions.origin.latitude, directions.destination.latitude]
    const lngs = [directions.origin.longitude, directions.destination.longitude]
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)
    const latPadding = Math.max((maxLat - minLat) * 1.6, 0.01)
    const lngPadding = Math.max((maxLng - minLng) * 1.6, 0.01)

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: latPadding,
      longitudeDelta: lngPadding,
    }
  }, [directions.origin, directions.destination])

  // Kept as a secondary "open externally" action (e.g. for live turn-by-turn nav),
  // no longer the primary way to view directions.
  const openInMaps = useCallback(() => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${directions.destination.latitude},${directions.destination.longitude}`
    Linking.openURL(url).catch(() => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not open Maps' })
    })
  }, [directions.destination])

  const shareLocation = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Share', text2: 'Sharing store location...' })
  }, [])

  return { directions, mapRegion, openInMaps, shareLocation }
}