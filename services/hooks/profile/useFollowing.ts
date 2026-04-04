import { useState, useCallback } from 'react'

export type AlertType = 'New Arrivals' | 'Drops' | 'Flash Sales' | 'Restocks'

export interface FollowedStore {
  id: string
  name: string
  initials: string
  brandColor: string
  pairsInSize: number
  distance: string
  notificationsOn: boolean
  alerts: AlertType[]
  logoUri?: string
}

export interface FollowedBrand {
  id: string
  name: string
  initials: string
  brandColor: string
  pairsInSize: number
  emoji: string
}

const MOCK_STORES: FollowedStore[] = [
  { id: 's1', name: "Sonny's Kicks", initials: 'SK', brandColor: '#22C55E', pairsInSize: 12, distance: '1.1 mi', notificationsOn: true,  alerts: ['New Arrivals', 'Drops', 'Flash Sales', 'Restocks'] },
  { id: 's2', name: 'Urban Sole',    initials: 'US', brandColor: '#22C55E', pairsInSize: 8,  distance: '2.3 mi', notificationsOn: true,  alerts: ['New Arrivals', 'Drops'] },
  { id: 's3', name: 'Kicks City',    initials: 'KC', brandColor: '#22C55E', pairsInSize: 15, distance: '3.5 mi', notificationsOn: false, alerts: [] },
]

const MOCK_BRANDS: FollowedBrand[] = [
  { id: 'b1', name: 'Nike',        initials: 'N',  brandColor: '#111827', pairsInSize: 45, emoji: '👟' },
  { id: 'b2', name: 'Jordan',      initials: 'J',  brandColor: '#111827', pairsInSize: 32, emoji: '🏀' },
  { id: 'b3', name: 'Adidas',      initials: 'A',  brandColor: '#111827', pairsInSize: 18, emoji: '🦅' },
  { id: 'b4', name: 'New Balance', initials: 'NB', brandColor: '#111827', pairsInSize: 12, emoji: '⚖️' },
]

export function useFollowing() {
  const [stores, setStores] = useState<FollowedStore[]>(MOCK_STORES)
  const [brands]            = useState<FollowedBrand[]>(MOCK_BRANDS)
  const [activeTab, setActiveTab] = useState<'Stores' | 'Brands'>('Stores')
  const [activeAlertFilters, setActiveAlertFilters] = useState<AlertType[]>([])

  const toggleStoreNotification = useCallback((id: string) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, notificationsOn: !s.notificationsOn } : s))
  }, [])

  const toggleAlertFilter = useCallback((alert: AlertType) => {
    setActiveAlertFilters(prev =>
      prev.includes(alert) ? prev.filter(a => a !== alert) : [...prev, alert]
    )
  }, [])

  const filteredStores = activeAlertFilters.length === 0
    ? stores
    : stores.filter(s => activeAlertFilters.every(f => s.alerts.includes(f)))

  return {
    stores: filteredStores,
    brands,
    activeTab,
    setActiveTab,
    activeAlertFilters,
    toggleAlertFilter,
    toggleStoreNotification,
    storeCount: stores.length,
    brandCount: brands.length,
  }
}