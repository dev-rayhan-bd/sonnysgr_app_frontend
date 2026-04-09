import { useState, useCallback, useMemo } from 'react'
import type { LockerItem, ViewMode, ConditionLabel } from '@/types/locker'

const MOCK_ITEMS: LockerItem[] = [
  {
    id: '1',
    name: "Air Jordan 1 'Chicago'",
    brand: 'Jordan',
    image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg',
    condition: 'DS',
    estimatedValue: 420,
    size: '10',
    colorway: 'Varsity Red/White-Black',
  },
  {
    id: '2',
    name: 'Essentials Pullover Hoodie',
    brand: 'Essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    condition: '9/10',
    estimatedValue: 120,
    size: 'L',
    colorway: 'Stretch Limo',
  },
  {
    id: '3',
    name: 'Yeezy Boost 350',
    brand: 'Adidas',
    image: 'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Natural-Product.jpg',
    condition: 'DS',
    estimatedValue: 240,
    size: '10',
    colorway: 'Natural/Natural',
  },
  {
    id: '4',
    name: 'Nike Sportswear Club Tee',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    condition: '9/10',
    estimatedValue: 40,
    size: 'M',
    colorway: 'White/Black',
  },
  {
    id: '5',
    name: "Jordan 4 'Black Cat'",
    brand: 'Jordan',
    image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020-Product.jpg',
    condition: 'DS',
    estimatedValue: 260,
    size: '10',
    colorway: 'Black/Black-Black',
  },
  {
    id: '6',
    name: 'Stussy Varsity Jacket',
    brand: 'Stussy',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    condition: '9/10',
    estimatedValue: 310,
    size: 'L',
    colorway: 'Black/Cream',
  },
]

export const useLocker = () => {
  const [items, setItems] = useState<LockerItem[]>(MOCK_ITEMS)
  const [isPublic, setIsPublic] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [showActionSheet, setShowActionSheet] = useState(false)

  const stats = useMemo(() => {
    const conditionToNumber = (condition: ConditionLabel): number => {
      if (condition === 'DS') return 10
      if (condition === 'VNDS') return 9.5
      return parseFloat(condition.replace('/10', ''))
    }

    const totalValue = items.reduce((sum, item) => sum + item.estimatedValue, 0)
    const avgCondition =
      items.length > 0
        ? items.reduce((sum, item) => sum + conditionToNumber(item.condition), 0) / items.length
        : 0

    return {
      totalPairs: items.length,
      estimatedValue: totalValue,
      avgCondition: Math.round(avgCondition * 10) / 10,
    }
  }, [items])

  const toggleVisibility = useCallback(() => setIsPublic((value) => !value), [])

  const toggleViewMode = useCallback(
    () => setViewMode((value) => (value === 'grid' ? 'list' : 'grid')),
    [],
  )

  const openItemMenu = useCallback((id: string) => {
    setSelectedItemId(id)
    setShowActionSheet(true)
  }, [])

  const closeActionSheet = useCallback(() => {
    setShowActionSheet(false)
    setSelectedItemId(null)
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setShowActionSheet(false)
    setSelectedItemId(null)
  }, [])

  const addItem = useCallback((newItem: Omit<LockerItem, 'id'>) => {
    const item: LockerItem = {
      ...newItem,
      id: Date.now().toString(),
    }
    setItems((prev) => [...prev, item])
  }, [])

  const updateItem = useCallback((id: string, updates: Partial<LockerItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }, [])

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId) ?? null,
    [items, selectedItemId],
  )

  return {
    items,
    isPublic,
    viewMode,
    isLoading,
    stats,
    selectedItem,
    showActionSheet,
    toggleVisibility,
    toggleViewMode,
    openItemMenu,
    closeActionSheet,
    deleteItem,
    addItem,
    updateItem,
  }
}
