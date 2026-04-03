import { useState, useCallback } from 'react'

export type WishlistSortOption =
  | 'Default'
  | 'Price: Low to High'
  | 'Price: High to Low'
  | 'Name: A–Z'

export interface WishlistFilterState {
  sort: WishlistSortOption
}

const DEFAULT_FILTER: WishlistFilterState = {
  sort: 'Default',
}

export const WISHLIST_SORT_OPTIONS: WishlistSortOption[] = [
  'Default',
  'Price: Low to High',
  'Price: High to Low',
  'Name: A–Z',
]

export function useWishlistFilter() {
  const [visible, setVisible]   = useState(false)
  const [applied, setApplied]   = useState<WishlistFilterState>(DEFAULT_FILTER)
  const [draft, setDraft]       = useState<WishlistFilterState>(DEFAULT_FILTER)

  const open = useCallback(() => {
    setDraft(applied)   // always start draft from currently applied values
    setVisible(true)
  }, [applied])

  const close = useCallback(() => setVisible(false), [])

  const setSort = useCallback((sort: WishlistSortOption) => {
    setDraft(prev => ({ ...prev, sort }))
  }, [])

  const reset = useCallback(() => {
    setDraft(DEFAULT_FILTER)
    setApplied(DEFAULT_FILTER)
  }, [])

  const apply = useCallback(() => {
    setApplied(draft)
    setVisible(false)
  }, [draft])

  // Count how many non-default options are active
  const activeFilterCount = applied.sort !== 'Default' ? 1 : 0

  return {
    visible,
    draft,
    applied,
    activeFilterCount,
    sortOptions: WISHLIST_SORT_OPTIONS,
    open,
    close,
    setSort,
    reset,
    apply,
  }
}