import { useState, useCallback } from 'react'

export type AlertType = 'New Arrivals' | 'Drops' | 'Flash Sales' | 'Restocks'

export interface FollowedStore {
  id: string
  name: string
  initials: string
  brandColor: string
  itemsNearYou: number
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
  itemsNearYou: number
  emoji: string
}

const MOCK_STORES: FollowedStore[] = [
  {
    id: 's1',
    name: "Sonny's Kicks",
    initials: 'SK',
    brandColor: '#22C55E',
    itemsNearYou: 12,
    distance: '1.1 mi',
    notificationsOn: true,
    alerts: ['New Arrivals', 'Drops', 'Flash Sales', 'Restocks'],
  },
  {
    id: 's2',
    name: 'Urban Sole',
    initials: 'US',
    brandColor: '#22C55E',
    itemsNearYou: 8,
    distance: '2.3 mi',
    notificationsOn: true,
    alerts: ['New Arrivals', 'Drops'],
  },
  {
    id: 's3',
    name: 'Kicks City',
    initials: 'KC',
    brandColor: '#22C55E',
    itemsNearYou: 15,
    distance: '3.5 mi',
    notificationsOn: false,
    alerts: [],
  },
]

const MOCK_BRANDS: FollowedBrand[] = [
  { id: 'b1', name: 'Nike', initials: 'N', brandColor: '#111827', itemsNearYou: 45, emoji: 'N' },
  { id: 'b2', name: 'Jordan', initials: 'J', brandColor: '#111827', itemsNearYou: 32, emoji: 'J' },
  { id: 'b3', name: 'Adidas', initials: 'A', brandColor: '#111827', itemsNearYou: 18, emoji: 'A' },
  { id: 'b4', name: 'Essentials', initials: 'E', brandColor: '#111827', itemsNearYou: 12, emoji: 'E' },
]

export function useFollowing() {
  const [stores, setStores] = useState<FollowedStore[]>(MOCK_STORES)
  const [brands] = useState<FollowedBrand[]>(MOCK_BRANDS)
  const [activeTab, setActiveTab] = useState<'Stores' | 'Brands'>('Stores')
  const [activeAlertFilters, setActiveAlertFilters] = useState<AlertType[]>([])

  const toggleStoreNotification = useCallback((id: string) => {
    setStores((prev) =>
      prev.map((store) =>
        store.id === id ? { ...store, notificationsOn: !store.notificationsOn } : store,
      ),
    )
  }, [])

  const toggleAlertFilter = useCallback((alert: AlertType) => {
    setActiveAlertFilters((prev) =>
      prev.includes(alert) ? prev.filter((item) => item !== alert) : [...prev, alert],
    )
  }, [])

  const filteredStores =
    activeAlertFilters.length === 0
      ? stores
      : stores.filter((store) => activeAlertFilters.every((filter) => store.alerts.includes(filter)))

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
