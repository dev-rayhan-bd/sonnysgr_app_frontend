// services/hooks/notifications/useRestockAlert.ts
import { useState, useEffect } from 'react'

export interface StoreInfo {
  id: string
  name: string
  initials: string
  distance: string
  rating: number
  closingTime: string
}

export interface RestockAlert {
  id: string
  productId: string
  name: string
  colorway: string
  size: string
  imageUrl: string
  currentPrice: number
  originalPrice: number
  stockLeft: number
  viewerCount: number
  store: StoreInfo
}

export interface WatchlistPair {
  id: string
  name: string
  brand: string
  price: number
  imageUrl: string
  tag?: 'Just Restocked' | 'Low Stock'
  tagColor?: 'green' | 'red'
  storeDistance: string
}

interface UseRestockAlertReturn {
  alert: RestockAlert | null
  watchlistPairs: WatchlistPair[]
  loading: boolean
  error: string | null
}

// ─── Mock fetcher — swap with your API call ───────────────────────────────────

async function fetchRestockAlert(notificationId: string): Promise<RestockAlert> {
  // TODO: replace with real API
  // const res = await fetch(`/api/notifications/restock/${notificationId}`)
  // return res.json()

  await new Promise(r => setTimeout(r, 400)) // simulate latency
  return {
    id: notificationId,
    productId: 'aj4-black-cat',
    name: "Air Jordan 4 'Black Cat'",
    colorway: 'Retro OG Colorway',
    size: 'Size 10.5 Men\'s',
    imageUrl: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
    currentPrice: 220,
    originalPrice: 240,
    stockLeft: 2,
    viewerCount: 47,
    store: {
      id: 'store-1',
      name: "Sonny's Kicks",
      initials: 'SK',
      distance: '1.1 mi away',
      rating: 4.9,
      closingTime: '9:00 PM',
    },
  }
}

async function fetchWatchlistPairs(_productId: string): Promise<WatchlistPair[]> {
  await new Promise(r => setTimeout(r, 200))
  return [
    {
      id: 'panda-1',
      name: 'Nike Dunk Low "Panda"',
      brand: 'Kicks City',
      price: 120,
      imageUrl: 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021.png',
      tag: 'Just Restocked',
      tagColor: 'green',
      storeDistance: '2.5 mi',
    },
    {
      id: 'yeezy-carbon',
      name: 'Yeezy Boost 350 "Carbon"',
      brand: 'Jordan Hub',
      price: 320,
      imageUrl: 'https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Carbon.png',
      tag: 'Low Stock',
      tagColor: 'red',
      storeDistance: '1.3 mi',
    },
  ]
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRestockAlert(notificationId: string): UseRestockAlertReturn {
  const [alert, setAlert] = useState<RestockAlert | null>(null)
  const [watchlistPairs, setWatchlistPairs] = useState<WatchlistPair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const data = await fetchRestockAlert(notificationId)
        if (cancelled) return
        setAlert(data)

        const pairs = await fetchWatchlistPairs(data.productId)
        if (cancelled) return
        setWatchlistPairs(pairs)
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [notificationId])

  return { alert, watchlistPairs, loading, error }
}