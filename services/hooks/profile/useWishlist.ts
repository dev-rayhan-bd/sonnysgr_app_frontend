import { useState, useMemo } from 'react'
import type { WishlistSortOption } from './useWishlistFilter'

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
  image: string            // URI or local require path (string for simplicity)
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
    isPriceDropped: true,
    isLiked: true,
  },
  {
    id: '2',
    brand: 'NIKE',
    name: "Nike Dunk Low 'Panda'",
    size: '10.5',
    storesNearby: 5,
    price: 120,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200',
    isLiked: true,
  },
  {
    id: '3',
    brand: 'ADIDAS',
    name: "Yeezy Boost 350 'Carbon'",
    size: '10.5',
    storesNearby: 1,
    price: 320,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200',
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
    isLiked: true,
  },
]

export function useWishlist(sort: WishlistSortOption = 'Default') {
  const [items, setItems] = useState<WishlistItem[]>(MOCK_ITEMS)
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const filteredItems = useMemo(() => {
    let result = activeFilter === 'All'
      ? items
      : items.filter(item => item.status === activeFilter)

    if (sort === 'Price: Low to High')  result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low')  result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'Name: A–Z')           result = [...result].sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [items, activeFilter, sort])

  const toggleLike = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const filterCounts: Record<FilterTab, number> = useMemo(
    () => ({
      All: items.length,
      'In Stock': items.filter(i => i.status === 'In Stock').length,
      'Low Stock': items.filter(i => i.status === 'Low Stock').length,
      'Sold Out': items.filter(i => i.status === 'Sold Out').length,
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