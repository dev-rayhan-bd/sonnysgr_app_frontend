// services/hooks/profile/useWantedPairs.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'
import { Router } from 'expo-router'

export interface SneakerAlert {
  inSize: boolean
  nearby: boolean
  stores: boolean
  price: boolean
}

export interface WantedPair {
  id: string
  brand: string
  name: string
  size: string
  addedOn: string
  status: 'available' | 'watching'
  storesNearby?: number
  imageUrl?: string
  alerts: SneakerAlert
}

const MOCK_PAIRS: WantedPair[] = [
  {
    id: '1',
    brand: 'JORDAN',
    name: "Air Jordan 1 'Chicago'",
    size: '10.5',
    addedOn: 'Mar 15',
    status: 'available',
    storesNearby: 2,
    alerts: { inSize: true, nearby: true, stores: false, price: true },
  },
  {
    id: '2',
    brand: 'NIKE',
    name: "Nike SB Dunk Low 'Travis Scott'",
    size: '10.5',
    addedOn: 'Mar 12',
    status: 'watching',
    alerts: { inSize: true, nearby: true, stores: false, price: false },
  },
]

export type FilterTab = 'All' | 'Available Now' | 'Still Watching' | 'Alerts On'

export function useWantedPairs(router?: Router) {
  const [pairs, setPairs] = useState<WantedPair[]>(MOCK_PAIRS)
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const [loading, setLoading] = useState(false)

  const filteredPairs = useCallback(() => {
    switch (activeTab) {
      case 'Available Now':
        return pairs.filter(p => p.status === 'available')
      case 'Still Watching':
        return pairs.filter(p => p.status === 'watching')
      case 'Alerts On':
        return pairs.filter(
          p => p.alerts.inSize || p.alerts.nearby || p.alerts.stores || p.alerts.price
        )
      default:
        return pairs
    }
  }, [pairs, activeTab])

  // ── Navigation handlers (need router) ──────────────────────────────────────

  const handleCardPress = (pair: WantedPair) => {
    router?.push({
      pathname: '/screens/profile/joinWaitlistScreen',
      params: { product: JSON.stringify(pair) },
    })
  }

  const handleAvailableNowPress = (pair: WantedPair) => {
    Toast.show({
      type: 'success',
      text1: 'Available Near You! 🎉',
      text2: `${pair.name} is in stock at ${pair.storesNearby} nearby store${
        pair.storesNearby !== 1 ? 's' : ''
      }.`,
    })
    router?.push({
      pathname: '/screens/profile/joinWaitlistScreen',
      params: { product: JSON.stringify(pair) },
    })
  }

  const handleInfoPress = () => {
    Toast.show({
      type: 'info',
      text1: 'How Wanted Works',
      text2: "Mark a sneaker as Wanted and we'll alert you when it's back in your size nearby.",
    })
  }

  // ── Alert actions ───────────────────────────────────────────────────────────

  const toggleAlert = (pairId: string, alertKey: keyof SneakerAlert) => {
    setPairs(prev =>
      prev.map(p => {
        if (p.id !== pairId) return p
        const updated = { ...p, alerts: { ...p.alerts, [alertKey]: !p.alerts[alertKey] } }
        const label =
          alertKey === 'inSize'
            ? 'In Size'
            : alertKey === 'nearby'
            ? 'Nearby'
            : alertKey === 'stores'
            ? 'Stores'
            : 'Price Drop'
        Toast.show({
          type: updated.alerts[alertKey] ? 'success' : 'info',
          text1: updated.alerts[alertKey] ? `${label} alert enabled` : `${label} alert disabled`,
          text2: updated.alerts[alertKey]
            ? `You'll be notified for ${p.name}`
            : `Alert turned off for ${p.name}`,
        })
        return updated
      })
    )
  }

  const removeFromWanted = (pairId: string) => {
    const pair = pairs.find(p => p.id === pairId)
    setPairs(prev => prev.filter(p => p.id !== pairId))
    Toast.show({
      type: 'info',
      text1: 'Removed from Wanted',
      text2: pair ? `${pair.name} removed` : 'Item removed',
    })
  }

  const manageAlerts = (pair: WantedPair) => {
    Toast.show({
      type: 'info',
      text1: 'Manage Alerts',
      text2: `Opening alert settings for ${pair.name}`,
    })
  }

  const stats = {
    wanted: pairs.length,
    availableNow: pairs.filter(p => p.status === 'available').length,
    watching: pairs.filter(p => p.status === 'watching').length,
  }

  return {
    pairs: filteredPairs(),
    allPairs: pairs,
    activeTab,
    setActiveTab,
    loading,
    stats,
    toggleAlert,
    removeFromWanted,
    manageAlerts,
    handleCardPress,
    handleAvailableNowPress,
    handleInfoPress,
  }
}