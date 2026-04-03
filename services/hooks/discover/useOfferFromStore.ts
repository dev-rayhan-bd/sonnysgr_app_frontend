// services/hooks/notifications/useOfferFromStore.ts
import { useState, useEffect } from 'react'

export interface OfferStore {
  name: string
  initials: string
  city: string
  distance: string
  rating: number
  purchases: number
  reviews: number
  yearsOnPlatform: number
}

export interface StoreOffer {
  offerId: string
  productId: string
  productName: string
  productCondition: string
  productImageUrl: string
  inLockerSince: string
  storeOffer: number
  marketPrice: number
  discountPercent: number
  storeMessage: string
  platformFeePercent: number
  platformFee: number
  netPayout: number
  store: OfferStore
}

interface UseOfferFromStoreReturn {
  offer: StoreOffer | null
  loading: boolean
  error: string | null
}

// ─── Mock fetcher — swap with your API call ───────────────────────────────────

async function fetchOffer(notificationId: string): Promise<StoreOffer> {
  // TODO: replace with real API
  // const res = await fetch(`/api/notifications/offer/${notificationId}`)
  // return res.json()

  await new Promise(r => setTimeout(r, 400))
  return {
    offerId: notificationId,
    productId: 'aj4-black-cat',
    productName: "Air Jordan 4 'Black Cat'",
    productCondition: 'New',
    productImageUrl: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
    inLockerSince: 'Jan 2024',
    storeOffer: 195,
    marketPrice: 220,
    discountPercent: 11,
    storeMessage:
      "We love this pair and would like to add it to our store inventory. Let us know if you're interested!",
    platformFeePercent: 5,
    platformFee: 9.75,
    netPayout: 185.25,
    store: {
      name: "Sonny's Kicks",
      initials: 'SK',
      city: 'Miami, FL',
      distance: '1.2 mi',
      rating: 4.9,
      purchases: 847,
      reviews: 142,
      yearsOnPlatform: 3,
    },
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useOfferFromStore(notificationId: string): UseOfferFromStoreReturn {
  const [offer, setOffer] = useState<StoreOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const data = await fetchOffer(notificationId)
        if (!cancelled) setOffer(data)
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [notificationId])

  return { offer, loading, error }
}