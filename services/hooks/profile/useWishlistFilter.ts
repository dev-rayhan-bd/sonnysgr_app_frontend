import { useCallback, useState } from 'react'
import type { ProductType } from '@/types/catalog'

export type WishlistSortOption =
  | 'Default'
  | 'Price: Low to High'
  | 'Price: High to Low'
  | 'Name: A-Z'

export interface WishlistFilterState {
  sort: WishlistSortOption
  category: 'All' | ProductType
}

const DEFAULT_FILTER: WishlistFilterState = {
  sort: 'Default',
  category: 'All',
}

export const WISHLIST_SORT_OPTIONS: WishlistSortOption[] = [
  'Default',
  'Price: Low to High',
  'Price: High to Low',
  'Name: A-Z',
]

export const WISHLIST_CATEGORY_OPTIONS: WishlistFilterState['category'][] = [
  'All',
  'Sneakers',
  'Clothing',
]

export function useWishlistFilter() {
  const [visible, setVisible] = useState(false)
  const [applied, setApplied] = useState<WishlistFilterState>(DEFAULT_FILTER)
  const [draft, setDraft] = useState<WishlistFilterState>(DEFAULT_FILTER)

  const open = useCallback(() => {
    setDraft(applied)
    setVisible(true)
  }, [applied])

  const close = useCallback(() => setVisible(false), [])

  const setSort = useCallback((sort: WishlistSortOption) => {
    setDraft((prev) => ({ ...prev, sort }))
  }, [])

  const setCategory = useCallback((category: WishlistFilterState['category']) => {
    setDraft((prev) => ({ ...prev, category }))
  }, [])

  const reset = useCallback(() => {
    setDraft(DEFAULT_FILTER)
    setApplied(DEFAULT_FILTER)
  }, [])

  const apply = useCallback(() => {
    setApplied(draft)
    setVisible(false)
  }, [draft])

  const activeFilterCount =
    (applied.sort !== 'Default' ? 1 : 0) +
    (applied.category !== 'All' ? 1 : 0)

  return {
    visible,
    draft,
    applied,
    activeFilterCount,
    sortOptions: WISHLIST_SORT_OPTIONS,
    categoryOptions: WISHLIST_CATEGORY_OPTIONS,
    open,
    close,
    setSort,
    setCategory,
    reset,
    apply,
  }
}
