// hooks/orders/useOrderFilter.ts
import { useState, useCallback } from 'react'
import type { OrderFilter } from './useOrders'

export type SortOption = 'Newest' | 'Oldest' | 'Price: Low to High' | 'Price: High to Low'

export interface FilterState {
  sort: SortOption
}

const DEFAULT_FILTER: FilterState = {
  sort: 'Newest',
}

const SORT_OPTIONS: SortOption[] = [
  'Newest',
  'Oldest',
  'Price: Low to High',
  'Price: High to Low',
]

export const useOrderFilter = () => {
  const [visible, setVisible]       = useState(false)
  const [applied, setApplied]       = useState<FilterState>(DEFAULT_FILTER)
  const [draft, setDraft]           = useState<FilterState>(DEFAULT_FILTER)

  const open = useCallback(() => {
    setDraft(applied) // start draft from currently applied
    setVisible(true)
  }, [applied])

  const close = useCallback(() => setVisible(false), [])

  const setSort = useCallback((sort: SortOption) => {
    setDraft(prev => ({ ...prev, sort }))
  }, [])

  const toggleStatus = undefined  // removed — tabs handle status filtering

const reset = useCallback(() => {
  setDraft(DEFAULT_FILTER)
  setApplied(DEFAULT_FILTER) 
}, [])

  const apply = useCallback(() => {
    setApplied(draft)
    setVisible(false)
  }, [draft])

  const activeFilterCount = applied.sort !== 'Newest' ? 1 : 0

  return {
    visible,
    draft,
    applied,
    activeFilterCount,
    sortOptions: SORT_OPTIONS,
    open,
    close,
    setSort,
    reset,
    apply,
  }
}