import { useCallback, useState } from 'react'
import type { ProductType } from '@/types/catalog'

export type SortOption = 'Newest' | 'Oldest' | 'Price: Low to High' | 'Price: High to Low'

export interface FilterState {
  sort: SortOption
  category: 'All' | ProductType
}

const DEFAULT_FILTER: FilterState = {
  sort: 'Newest',
  category: 'All',
}

const SORT_OPTIONS: SortOption[] = [
  'Newest',
  'Oldest',
  'Price: Low to High',
  'Price: High to Low',
]

const CATEGORY_OPTIONS: FilterState['category'][] = ['All', 'Sneakers', 'Clothing']

export const useOrderFilter = () => {
  const [visible, setVisible] = useState(false)
  const [applied, setApplied] = useState<FilterState>(DEFAULT_FILTER)
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTER)

  const open = useCallback(() => {
    setDraft(applied)
    setVisible(true)
  }, [applied])

  const close = useCallback(() => setVisible(false), [])

  const setSort = useCallback((sort: SortOption) => {
    setDraft((prev) => ({ ...prev, sort }))
  }, [])

  const setCategory = useCallback((category: FilterState['category']) => {
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
    (applied.sort !== 'Newest' ? 1 : 0) + (applied.category !== 'All' ? 1 : 0)

  return {
    visible,
    draft,
    applied,
    activeFilterCount,
    sortOptions: SORT_OPTIONS,
    categoryOptions: CATEGORY_OPTIONS,
    open,
    close,
    setSort,
    setCategory,
    reset,
    apply,
  }
}
