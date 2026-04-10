import { router } from 'expo-router'
import { useState, useCallback } from 'react'
import type { ProductType } from '@/types/catalog'

export type SaleStatus = 'Active' | 'Sold' | 'Pending' | 'Expired'
export type SaleTab = 'All' | 'Active Listings' | 'Offers Received' | 'Completed'

export interface SaleItem {
  id: string
  name: string
  productType: ProductType
  sizeLabel: string
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
  Active: '#22C55E',
  Sold: '#3B82F6',
  Pending: '#F59E0B',
  Expired: '#9CA3AF',
}

const MOCK: SaleItem[] = [
  {
    id: 'sl1',
    name: "Air Jordan 4 'Black Cat'",
    productType: 'Sneakers',
    sizeLabel: '10.5',
    askingPrice: 220,
    priceDelta: 160,
    status: 'Pending',
    offerFrom: "Sonny's Kicks",
    section: 'This Week',
  },
  {
    id: 'sl2',
    name: 'Essentials Pullover Hoodie',
    productType: 'Clothing',
    sizeLabel: 'L',
    askingPrice: 120,
    status: 'Active',
    stores: 3,
    section: 'This Week',
  },
  {
    id: 'sl3',
    name: 'Stussy Varsity Jacket',
    productType: 'Clothing',
    sizeLabel: 'XL',
    askingPrice: 285,
    priceDelta: 225,
    status: 'Sold',
    soldFor: 225,
    soldAt: 'Union Archive',
    soldDate: 'Mar 18',
    section: 'This Week',
  },
  {
    id: 'sl4',
    name: "Travis Scott x Air Jordan 1",
    productType: 'Sneakers',
    sizeLabel: '10.5',
    askingPrice: 300,
    status: 'Expired',
    noOffers: true,
    listingExpired: true,
    section: 'Last Month',
  },
  {
    id: 'sl5',
    name: 'Nike Sportswear Club Tee',
    productType: 'Clothing',
    sizeLabel: 'M',
    askingPrice: 45,
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
    .filter((sale) => sale.status === 'Sold')
    .reduce((acc, sale) => acc + sale.askingPrice, 0)

  const soldCount = sales.filter((sale) => sale.status === 'Sold').length
  const activeCount = sales.filter((sale) => sale.status === 'Active').length
  const declineCount = sales.filter((sale) => sale.status === 'Expired').length

  const filteredSales = sales.filter((sale) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Active Listings') return sale.status === 'Active'
    if (activeTab === 'Offers Received') return sale.status === 'Pending'
    if (activeTab === 'Completed') return sale.status === 'Sold' || sale.status === 'Expired'
    return true
  })

  const thisWeek = filteredSales.filter((sale) => sale.section === 'This Week')
  const lastMonth = filteredSales.filter((sale) => sale.section === 'Last Month')

  const handleNewSale = useCallback(() => {}, [])
  const handleViewOffer = useCallback((_item: SaleItem) => {
    router.push('/screens/discover/offerFromStoreScreen')
  }, [])
  const handleEdit = useCallback((_item: SaleItem) => {}, [])
  const handleRemark = useCallback((_item: SaleItem) => {}, [])
  const handleDetails = useCallback((_item: SaleItem) => {}, [])

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
