import { useMemo, useState } from 'react'
import type { ProductType } from '@/types/catalog'
import type { WishlistFilterState } from './useWishlistFilter'

export type StockStatus = 'In Stock' | 'Low Stock' | 'Sold Out'
export type FilterTab = 'All' | StockStatus

export interface WishlistItem {
  id: string
  brand: string
  name: string
  size: string
  storesNearby: number
  price: number
  originalPrice?: number
  discount?: number
  status: StockStatus
  image: string
  productType: ProductType
  isPriceDropped?: boolean
  isLiked: boolean
}

const MOCK_ITEMS: WishlistItem[] = [
  {
    id: '1',
    brand: 'JORDAN',
    name: "Air Jordan 4 'Black Cat'",
    size: '10.5',
    storesNearby: 3,
    price: 220,
    originalPrice: 240,
    discount: 20,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    productType: 'Sneakers',
    isPriceDropped: true,
    isLiked: true,
  },
  {
    id: '2',
    brand: 'ESSENTIALS',
    name: 'Pullover Hoodie',
    size: 'M',
    storesNearby: 5,
    price: 120,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
    productType: 'Clothing',
    isLiked: true,
  },
  {
    id: '3',
    brand: 'STUSSY',
    name: 'Varsity Jacket',
    size: 'L',
    storesNearby: 1,
    price: 320,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200',
    productType: 'Clothing',
    isLiked: true,
  },
  {
    id: '4',
    brand: 'NIKE',
    name: "Air Max 90 'Infrared'",
    size: '10.5',
    storesNearby: 0,
    price: 140,
    status: 'Sold Out',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    productType: 'Sneakers',
    isLiked: true,
  },
]

export function useWishlist(appliedFilter: WishlistFilterState) {
  const [items, setItems] = useState<WishlistItem[]>(MOCK_ITEMS)
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const filteredItems = useMemo(() => {
    let result =
      activeFilter === 'All'
        ? items
        : items.filter((item) => item.status === activeFilter)

    if (appliedFilter.category !== 'All') {
      result = result.filter((item) => item.productType === appliedFilter.category)
    }

    if (appliedFilter.sort === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price)
    }

    if (appliedFilter.sort === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    if (appliedFilter.sort === 'Name: A-Z') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [items, activeFilter, appliedFilter])

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const filterCounts: Record<FilterTab, number> = useMemo(
    () => ({
      All: items.length,
      'In Stock': items.filter((item) => item.status === 'In Stock').length,
      'Low Stock': items.filter((item) => item.status === 'Low Stock').length,
      'Sold Out': items.filter((item) => item.status === 'Sold Out').length,
    }),
    [items],
  )

  return {
    items: filteredItems,
    activeFilter,
    setActiveFilter,
    filterCounts,
    toggleLike,
    removeItem,
  }
}
