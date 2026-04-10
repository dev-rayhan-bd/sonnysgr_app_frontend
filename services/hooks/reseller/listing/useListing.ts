import { useMemo, useState } from 'react'
import type { ProductType } from '@/types/catalog'

export type InventoryTab = 'All' | ProductType | 'Private'

export interface ResellerInventoryItem {
  id: string
  brand: string
  name: string
  productType: ProductType
  condition: string
  size: string
  price: number
  marketPrice: number
  views: number
  requests: number
  isVisible: boolean
  isPrivate?: boolean
  image: string
}

const INVENTORY_ITEMS: ResellerInventoryItem[] = [
  {
    id: '1',
    brand: 'NIKE',
    name: "Air Jordan 4 'Black Cat'",
    productType: 'Sneakers',
    condition: 'Deadstock',
    size: '10.5',
    price: 220,
    marketPrice: 240,
    views: 3,
    requests: 1,
    isVisible: true,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400',
  },
  {
    id: '2',
    brand: 'ESSENTIALS',
    name: 'Pullover Hoodie',
    productType: 'Clothing',
    condition: 'Near Deadstock',
    size: 'L',
    price: 120,
    marketPrice: 135,
    views: 8,
    requests: 2,
    isVisible: true,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
  {
    id: '3',
    brand: 'STUSSY',
    name: 'Varsity Jacket',
    productType: 'Clothing',
    condition: 'Very Good',
    size: 'XL',
    price: 285,
    marketPrice: 320,
    views: 2,
    requests: 1,
    isVisible: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  },
  {
    id: '4',
    brand: 'ADIDAS',
    name: "Yeezy Boost 350 V2 'Zebra'",
    productType: 'Sneakers',
    condition: 'Very Good',
    size: '10',
    price: 245,
    marketPrice: 280,
    views: 0,
    requests: 0,
    isVisible: false,
    isPrivate: true,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
  },
  {
    id: '5',
    brand: 'NIKE',
    name: 'Sportswear Club Tee',
    productType: 'Clothing',
    condition: 'Deadstock',
    size: 'M',
    price: 45,
    marketPrice: 52,
    views: 4,
    requests: 0,
    isVisible: true,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  },
]

const TABS: InventoryTab[] = ['All', 'Sneakers', 'Clothing', 'Private']

export const useInventory = () => {
  const [activeTab, setActiveTab] = useState<InventoryTab>('All')

  const stats = useMemo(
    () => ({
      total: INVENTORY_ITEMS.length,
      visible: INVENTORY_ITEMS.filter((item) => item.isVisible).length,
      privateCount: INVENTORY_ITEMS.filter((item) => item.isPrivate).length,
      liveRequests: INVENTORY_ITEMS.reduce((sum, item) => sum + item.requests, 0),
    }),
    [],
  )

  const tabCounts: Record<InventoryTab, number> = useMemo(
    () => ({
      All: INVENTORY_ITEMS.length,
      Sneakers: INVENTORY_ITEMS.filter((item) => item.productType === 'Sneakers').length,
      Clothing: INVENTORY_ITEMS.filter((item) => item.productType === 'Clothing').length,
      Private: INVENTORY_ITEMS.filter((item) => item.isPrivate).length,
    }),
    [],
  )

  const inventory = useMemo(() => {
    if (activeTab === 'All') return INVENTORY_ITEMS
    if (activeTab === 'Private') return INVENTORY_ITEMS.filter((item) => item.isPrivate)
    return INVENTORY_ITEMS.filter((item) => item.productType === activeTab)
  }, [activeTab])

  return {
    stats,
    inventory,
    activeTab,
    setActiveTab,
    tabs: TABS,
    tabCounts,
  }
}
