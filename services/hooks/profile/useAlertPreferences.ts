// services/hooks/discover/useAlertPreferences.ts
import { useState, useCallback } from 'react'

export interface GlobalAlert {
  id: string
  label: string
  description: string
  icon: string          // Ionicons name
  enabled: boolean
}

export interface StoreAlertSetting {
  storeId: string
  storeName: string
  initials: string
  brandColor: string
  alertCount: number
  expanded: boolean
  alerts: { id: string; label: string; enabled: boolean }[]
}

const INITIAL_GLOBALS: GlobalAlert[] = [
  { id: 'new_arrivals',   label: 'New Arrivals',   description: 'When a followed store adds new inventory',    icon: 'notifications-outline', enabled: true  },
  { id: 'exclusive_drops',label: 'Exclusive Drops', description: 'Limited releases from followed stores',      icon: 'flash-outline',         enabled: true  },
  { id: 'flash_sales',    label: 'Flash Sales',     description: 'Limited-time offers and crazy deals',        icon: 'trending-up-outline',   enabled: false },
  { id: 'restocks',       label: 'Restocks',        description: 'When sold-out pairs are back in stock',      icon: 'refresh-outline',       enabled: true  },
]

const INITIAL_STORES: StoreAlertSetting[] = [
  {
    storeId: 's1', storeName: "Sonny's Kicks", initials: 'SK', brandColor: '#22C55E',
    alertCount: 4, expanded: false,
    alerts: [
      { id: 'na', label: 'New Arrivals',   enabled: true  },
      { id: 'ed', label: 'Exclusive Drops',enabled: true  },
      { id: 'fs', label: 'Flash Sales',    enabled: true  },
      { id: 're', label: 'Restocks',       enabled: true  },
    ],
  },
  {
    storeId: 's2', storeName: 'Urban Sole', initials: 'US', brandColor: '#22C55E',
    alertCount: 3, expanded: false,
    alerts: [
      { id: 'na', label: 'New Arrivals',   enabled: true  },
      { id: 'ed', label: 'Exclusive Drops',enabled: true  },
      { id: 'fs', label: 'Flash Sales',    enabled: false },
      { id: 're', label: 'Restocks',       enabled: true  },
    ],
  },
  {
    storeId: 's3', storeName: 'Kicks City', initials: 'KC', brandColor: '#22C55E',
    alertCount: 2, expanded: false,
    alerts: [
      { id: 'na', label: 'New Arrivals',   enabled: true  },
      { id: 'ed', label: 'Exclusive Drops',enabled: false },
      { id: 'fs', label: 'Flash Sales',    enabled: false },
      { id: 're', label: 'Restocks',       enabled: true  },
    ],
  },
]

export function useAlertPreferences() {
  const [globals, setGlobals] = useState<GlobalAlert[]>(INITIAL_GLOBALS)
  const [stores,  setStores]  = useState<StoreAlertSetting[]>(INITIAL_STORES)
  const [quietHours, setQuietHours] = useState(true)

  const toggleGlobal = useCallback((id: string) => {
    setGlobals(prev => prev.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g))
  }, [])

  const toggleStoreExpand = useCallback((storeId: string) => {
    setStores(prev => prev.map(s => s.storeId === storeId ? { ...s, expanded: !s.expanded } : s))
  }, [])

  const toggleStoreAlert = useCallback((storeId: string, alertId: string) => {
    setStores(prev => prev.map(s => {
      if (s.storeId !== storeId) return s
      const updated = s.alerts.map(a => a.id === alertId ? { ...a, enabled: !a.enabled } : a)
      return { ...s, alerts: updated, alertCount: updated.filter(a => a.enabled).length }
    }))
  }, [])

  return { globals, stores, quietHours, setQuietHours, toggleGlobal, toggleStoreExpand, toggleStoreAlert }
}