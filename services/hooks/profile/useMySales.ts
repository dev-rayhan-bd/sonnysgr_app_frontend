import { router } from 'expo-router'
import { useState, useCallback } from 'react'

export type SaleStatus = 'Active' | 'Sold' | 'Pending' | 'Expired'
export type SaleTab = 'All' | 'Active Listings' | 'Offers Received' | 'Completed'

export interface SaleItem {
  id: string
  name: string
  sizeRange: string
  askingPrice: number
  priceDelta?: number
  status: SaleStatus
  imageUri?: string
  soldFor?: number
  soldAt?: string
  soldDate?: string
  offerFrom?: string
  stores?: number
  noOffers?: boolean
  listingExpired?: boolean
  section: 'This Week' | 'Last Month'
}

export const STATUS_COLOR: Record<SaleStatus, string> = {
  Active:  '#22C55E',
  Sold:    '#3B82F6',
  Pending: '#F59E0B',
  Expired: '#9CA3AF',
}

const MOCK: SaleItem[] = [
  {
    id: 'sl1',
    name: "Air Jordan 4 'Black Cat'",
    sizeRange: '10.5 - D5',
    askingPrice: 220,
    priceDelta: 160,
    status: 'Pending',
    offerFrom: "Sonny's Kickss",
    section: 'This Week',
  },
  {
    id: 'sl2',
    name: "Nike Dunk Low 'Panda'",
    sizeRange: '11 - D5',
    askingPrice: 180,
    status: 'Active',
    stores: 3,
    section: 'This Week',
  },
  {
    id: 'sl3',
    name: 'Yeezy Boost 350 V2',
    sizeRange: '10 - 8/10',
    askingPrice: 140,
    priceDelta: 90,
    status: 'Sold',
    soldFor: 90,
    soldAt: 'Kicks City',
    soldDate: 'Mar 18',
    section: 'This Week',
  },
  {
    id: 'sl4',
    name: 'Travis Scott x Nike',
    sizeRange: '10.5 - D5',
    askingPrice: 300,
    status: 'Expired',
    noOffers: true,
    listingExpired: true,
    section: 'Last Month',
  },
  {
    id: 'sl5',
    name: 'Off-White Blazer Mid',
    sizeRange: '11 - 9/10',
    askingPrice: 250,
    status: 'Expired',
    noOffers: true,
    listingExpired: true,
    section: 'Last Month',
  },
]

export function useMySales() {
  const [sales] = useState<SaleItem[]>(MOCK)
  const [activeTab, setActiveTab] = useState<SaleTab>('All')

  const totalEarned = sales
    .filter(s => s.status === 'Sold')
    .reduce((acc, s) => acc + s.askingPrice, 0)

  const soldCount    = sales.filter(s => s.status === 'Sold').length
  const activeCount  = sales.filter(s => s.status === 'Active').length
  const declineCount = sales.filter(s => s.status === 'Expired').length

  const filteredSales = sales.filter(s => {
    if (activeTab === 'All') return true
    if (activeTab === 'Active Listings') return s.status === 'Active'
    if (activeTab === 'Offers Received') return s.status === 'Pending'
    if (activeTab === 'Completed') return s.status === 'Sold' || s.status === 'Expired'
    return true
  })

  const thisWeek  = filteredSales.filter(s => s.section === 'This Week')
  const lastMonth = filteredSales.filter(s => s.section === 'Last Month')

  const handleNewSale   = useCallback(() => {}, [])
  const handleViewOffer = useCallback((_item: SaleItem) => {router.push("/screens/discover/offerFromStoreScreen")}, [])
  const handleEdit      = useCallback((_item: SaleItem) => {}, [])
  const handleRemark    = useCallback((_item: SaleItem) => {}, [])
  const handleDetails   = useCallback((_item: SaleItem) => {}, [])

  return {
    sales,
    thisWeek,
    lastMonth,
    totalEarned,
    soldCount,
    activeCount,
    declineCount,
    activeTab,
    setActiveTab,
    handleNewSale,
    handleViewOffer,
    handleEdit,
    handleRemark,
    handleDetails,
  }
}