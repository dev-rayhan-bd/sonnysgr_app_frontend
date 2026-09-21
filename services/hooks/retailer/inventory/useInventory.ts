import { useState, useCallback, useMemo } from 'react'
import type { ProductType } from '@/types/catalog'

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Hold'
export type FilterTab = 'All' | ProductType | 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface SizeEntry {
  size: string
  qty: number
}

export interface InventoryProduct {
  id: string
  brand: string
  name: string
  sku: string
  price: number
  cost: number
  status: StockStatus
  productType: ProductType
  lowCount?: number
  sizes: SizeEntry[]
  imageUri?: string
  imageBg: string
}

export interface InventorySummary {
  active: number
  lowStock: number
  outOfStock: number
  onHold: number
}

export interface SyncInfo {
  isSynced: boolean
  lastSyncedLabel: string
  isPosConnected: boolean
}

const INVENTORY_PRODUCTS: InventoryProduct[] = [
  {
    id: 'prod-1',
    brand: 'NIKE',
    name: 'Air Jordan 1 Retro High OG',
    sku: 'DJ1237-010',
    price: 220,
    cost: 140,
    status: 'In Stock',
    productType: 'Sneakers',
    imageBg: '#E8F5E9',
    sizes: [
      { size: '9', qty: 1 },
      { size: '9.5', qty: 1 },
      { size: '10', qty: 3 },
      { size: '10.5', qty: 2 },
      { size: '11', qty: 4 },
      { size: '11.5', qty: 1 },
      { size: '12', qty: 1 },
    ],
  },
  {
    id: 'prod-2',
    brand: 'ESSENTIALS',
    name: 'Pullover Hoodie',
    sku: 'ESS-HOODIE-CRM',
    price: 120,
    cost: 68,
    status: 'Low Stock',
    productType: 'Clothing',
    lowCount: 3,
    imageBg: '#FEF3C7',
    sizes: [
      { size: 'S', qty: 2 },
      { size: 'M', qty: 1 },
      { size: 'L', qty: 0 },
      { size: 'XL', qty: 0 },
    ],
  },
  {
    id: 'prod-3',
    brand: 'NIKE',
    name: 'Nike Dunk Low Retro',
    sku: 'DD1391-100',
    price: 150,
    cost: 90,
    status: 'In Stock',
    productType: 'Sneakers',
    imageBg: '#E8F0FE',
    sizes: [
      { size: '8', qty: 1 },
      { size: '10', qty: 2 },
      { size: '11', qty: 1 },
      { size: '12', qty: 1 },
    ],
  },
  {
    id: 'prod-4',
    brand: 'STUSSY',
    name: 'Varsity Jacket',
    sku: 'STU-VARSITY-BLK',
    price: 320,
    cost: 210,
    status: 'On Hold',
    productType: 'Clothing',
    imageBg: '#FDE8E8',
    sizes: [
      { size: 'M', qty: 1 },
      { size: 'L', qty: 1 },
      { size: 'XL', qty: 1 },
    ],
  },
  {
    id: 'prod-5',
    brand: 'ADIDAS',
    name: 'Yeezy Boost 350 V2',
    sku: 'FZ5246',
    price: 220,
    cost: 180,
    status: 'Out of Stock',
    productType: 'Sneakers',
    imageBg: '#F3F4F6',
    sizes: [
      { size: '8', qty: 0 },
      { size: '9', qty: 0 },
      { size: '9.5', qty: 0 },
      { size: '10', qty: 0 },
    ],
  },
  {
    id: 'prod-6',
    brand: 'ADIDAS',
    name: 'Firebird Track Pants',
    sku: 'ADI-FB-TRK-BLU',
    price: 95,
    cost: 54,
    status: 'Out of Stock',
    productType: 'Clothing',
    imageBg: '#DBEAFE',
    sizes: [
      { size: 'S', qty: 0 },
      { size: 'M', qty: 0 },
      { size: 'L', qty: 0 },
    ],
  },
]

export const useInventory = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Matches the tabs shown in the design: All, Sneakers, Clothing, Low Stock
  const filterTabs: FilterTab[] = [
    'All',
    'Sneakers',
    'Clothing',
    'Low Stock',
  ]

  const summary: InventorySummary = useMemo(
    () => ({
      active: INVENTORY_PRODUCTS.filter((product) => product.status !== 'Out of Stock').length,
      lowStock: INVENTORY_PRODUCTS.filter((product) => product.status === 'Low Stock').length,
      outOfStock: INVENTORY_PRODUCTS.filter((product) => product.status === 'Out of Stock').length,
      onHold: INVENTORY_PRODUCTS.filter((product) => product.status === 'On Hold').length,
    }),
    [],
  )

  const syncInfo: SyncInfo = {
    isSynced: true,
    lastSyncedLabel: 'Synced 2 min ago',
    isPosConnected: true,
  }

  const filterCounts: Record<FilterTab, number> = useMemo(
    () => ({
      All: INVENTORY_PRODUCTS.length,
      Sneakers: INVENTORY_PRODUCTS.filter((product) => product.productType === 'Sneakers').length,
      Clothing: INVENTORY_PRODUCTS.filter((product) => product.productType === 'Clothing').length,
      'In Stock': INVENTORY_PRODUCTS.filter((product) => product.status === 'In Stock').length,
      'Low Stock': INVENTORY_PRODUCTS.filter((product) => product.status === 'Low Stock').length,
      'Out of Stock': INVENTORY_PRODUCTS.filter((product) => product.status === 'Out of Stock').length,
    }),
    [],
  )

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return INVENTORY_PRODUCTS

    if (activeFilter === 'Sneakers' || activeFilter === 'Clothing') {
      return INVENTORY_PRODUCTS.filter((product) => product.productType === activeFilter)
    }

    return INVENTORY_PRODUCTS.filter((product) => product.status === activeFilter)
  }, [activeFilter])

  const handleFilterChange = useCallback((tab: FilterTab) => {
    setActiveFilter(tab)
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsRefreshing(false)
  }, [])

  const handleEditProduct = useCallback((product: InventoryProduct) => {
    console.log('edit product', product.id)
  }, [])

  const handleProductPress = useCallback((product: InventoryProduct) => {
    console.log('product pressed', product.id)
  }, [])

  return {
    activeFilter,
    filterTabs,
    filterCounts,
    summary,
    syncInfo,
    filteredProducts,
    isRefreshing,
    handleFilterChange,
    handleRefresh,
    handleEditProduct,
    handleProductPress,
  }
}