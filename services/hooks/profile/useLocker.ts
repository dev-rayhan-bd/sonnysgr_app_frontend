import { useState, useCallback, useMemo } from 'react'
import type { LockerItem, LockerState, ViewMode, ConditionLabel } from '@/types/locker'

// ─── Mock Data ────────────────────────────────────────────────────────────────
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
    name: "Nike Dunk Low 'Panda'",
    brand: 'Nike',
    image: 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
    condition: '9/10',
    estimatedValue: 180,
    size: '10',
    colorway: 'White/Black',
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
    name: "Air Max 90 'Infrared'",
    brand: 'Nike',
    image: 'https://images.stockx.com/images/Nike-Air-Max-90-Infrared-Product.jpg',
    condition: '9/10',
    estimatedValue: 160,
    size: '10',
    colorway: 'White/Black-Infrared',
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
    name: 'New Balance 550',
    brand: 'New Balance',
    image: 'https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg',
    condition: '9/10',
    estimatedValue: 160,
    size: '10',
    colorway: 'White/Green',
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useLocker = () => {
  const [items, setItems] = useState<LockerItem[]>(MOCK_ITEMS)
  const [isPublic, setIsPublic] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [showActionSheet, setShowActionSheet] = useState(false)

  // ── Derived Stats ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const conditionToNumber = (c: ConditionLabel): number => {
      if (c === 'DS') return 10
      if (c === 'VNDS') return 9.5
      return parseFloat(c.replace('/10', ''))
    }

    const totalValue = items.reduce((sum, i) => sum + i.estimatedValue, 0)
    const avgCondition =
      items.length > 0
        ? items.reduce((sum, i) => sum + conditionToNumber(i.condition), 0) / items.length
        : 0

    return {
      totalPairs: items.length,
      estimatedValue: totalValue,
      avgCondition: Math.round(avgCondition * 10) / 10,
    }
  }, [items])

  // ── Actions ────────────────────────────────────────────────────────────────
  const toggleVisibility = useCallback(() => setIsPublic((v) => !v), [])

  const toggleViewMode = useCallback(
    () => setViewMode((v) => (v === 'grid' ? 'list' : 'grid')),
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
    () => items.find((i) => i.id === selectedItemId) ?? null,
    [items, selectedItemId],
  )

  return {
    // State
    items,
    isPublic,
    viewMode,
    isLoading,
    stats,
    selectedItem,
    showActionSheet,
    // Actions
    toggleVisibility,
    toggleViewMode,
    openItemMenu,
    closeActionSheet,
    deleteItem,
    addItem,
    updateItem,
  }
}