import { useMemo, useState } from 'react'
import type { ProductType } from '@/types/catalog'

export type RequestTab = 'All' | 'New' | 'Sneakers' | 'Clothing' | 'Pending Response'

export interface ResellerRequest {
  id: string
  storeName: string
  rating: number
  location: string
  distance: string
  itemName: string
  productType: ProductType
  condition: string
  size: string
  offerPrice: number
  message?: string
  tag: 'Buy Request' | 'Price Check' | 'Interest Ping'
  time: string
  source: string
  isNew: boolean
  isExpiring: boolean
  expiryText?: string
  state: 'New' | 'Pending Response'
}

const REQUESTS: ResellerRequest[] = [
  {
    id: '1',
    storeName: 'Kicks City',
    rating: 4.9,
    location: 'Miami, FL',
    distance: '1.2 mi',
    itemName: "Air Jordan 4 'Black Cat'",
    productType: 'Sneakers',
    condition: 'Deadstock',
    size: '10.5',
    offerPrice: 185,
    message: '"Interested in buying this item for a same-day pickup."',
    tag: 'Buy Request',
    time: '5 min ago',
    source: 'Browse',
    isNew: true,
    isExpiring: false,
    state: 'New',
  },
  {
    id: '2',
    storeName: 'Union Archive',
    rating: 4.8,
    location: 'Miami, FL',
    distance: '2.5 mi',
    itemName: 'Essentials Pullover Hoodie',
    productType: 'Clothing',
    condition: 'Near Deadstock',
    size: 'L',
    offerPrice: 82,
    tag: 'Price Check',
    time: '23 min ago',
    source: 'Search',
    isNew: true,
    isExpiring: false,
    state: 'New',
  },
  {
    id: '3',
    storeName: 'Sole House',
    rating: 4.7,
    location: 'Miami, FL',
    distance: '2.8 mi',
    itemName: 'Stussy Varsity Jacket',
    productType: 'Clothing',
    condition: 'Very Good',
    size: 'XL',
    offerPrice: 225,
    message: '"This would fit our outerwear rack well. Let us know if you can move on price."',
    tag: 'Interest Ping',
    time: '1 hr ago',
    source: 'Browse',
    isNew: false,
    isExpiring: true,
    expiryText: 'Expiring in 2 hours. Respond to keep this opportunity.',
    state: 'Pending Response',
  },
  {
    id: '4',
    storeName: 'Urban Sole',
    rating: 4.6,
    location: 'Miami, FL',
    distance: '3.1 mi',
    itemName: 'Nike Dunk Low Panda',
    productType: 'Sneakers',
    condition: 'Deadstock',
    size: '11',
    offerPrice: 140,
    tag: 'Price Check',
    time: '1 hr ago',
    source: 'Search',
    isNew: false,
    isExpiring: false,
    state: 'Pending Response',
  },
  {
    id: '5',
    storeName: 'Archive Room',
    rating: 4.8,
    location: 'Miami, FL',
    distance: '4.4 mi',
    itemName: 'Nike Sportswear Club Tee',
    productType: 'Clothing',
    condition: 'Deadstock',
    size: 'M',
    offerPrice: 32,
    message: '"We can take this tee with the hoodie if you want to bundle both."',
    tag: 'Buy Request',
    time: '2 hrs ago',
    source: 'Browse',
    isNew: true,
    isExpiring: false,
    state: 'New',
  },
  {
    id: '6',
    storeName: 'South Beach Soles',
    rating: 4.9,
    location: 'Miami, FL',
    distance: '5.1 mi',
    itemName: 'New Balance 550',
    productType: 'Sneakers',
    condition: 'Very Good',
    size: '10',
    offerPrice: 92,
    tag: 'Interest Ping',
    time: '3 hrs ago',
    source: 'Search',
    isNew: false,
    isExpiring: false,
    state: 'Pending Response',
  },
]

const TABS: RequestTab[] = ['All', 'New', 'Sneakers', 'Clothing', 'Pending Response']

export const useRequests = () => {
  const [activeTab, setActiveTab] = useState<RequestTab>('All')

  const summary = useMemo(
    () => ({
      total: REQUESTS.length,
      newToday: REQUESTS.filter((request) => request.isNew).length,
      expiringSoon: REQUESTS.filter((request) => request.isExpiring).length,
    }),
    [],
  )

  const tabCounts: Record<RequestTab, number> = useMemo(
    () => ({
      All: REQUESTS.length,
      New: REQUESTS.filter((request) => request.isNew).length,
      Sneakers: REQUESTS.filter((request) => request.productType === 'Sneakers').length,
      Clothing: REQUESTS.filter((request) => request.productType === 'Clothing').length,
      'Pending Response': REQUESTS.filter((request) => request.state === 'Pending Response').length,
    }),
    [],
  )

  const requests = useMemo(() => {
    switch (activeTab) {
      case 'New':
        return REQUESTS.filter((request) => request.isNew)
      case 'Sneakers':
        return REQUESTS.filter((request) => request.productType === 'Sneakers')
      case 'Clothing':
        return REQUESTS.filter((request) => request.productType === 'Clothing')
      case 'Pending Response':
        return REQUESTS.filter((request) => request.state === 'Pending Response')
      default:
        return REQUESTS
    }
  }, [activeTab])

  return { requests, activeTab, setActiveTab, summary, tabs: TABS, tabCounts }
}
