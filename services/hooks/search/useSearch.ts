import { useCallback, useEffect, useRef, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import type { Audience, ProductType } from '@/types/catalog'

const secureGet = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key)
  } catch {
    return null
  }
}

const secureSet = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch {}
}

const secureDelete = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch {}
}

const RECENT_SEARCHES_KEY = 'search_recent'
const MAX_RECENT = 8

export type SearchMode = 'products'

export type SizeOption = "Men's" | "Women's" | "Kids'" | 'Custom' | 'Default'

export const SIZE_OPTIONS: SizeOption[] = [
  'Default',
  "Men's",
  "Women's",
  "Kids'",
  'Custom',
]

export const BRAND_OPTIONS = [
  'Nike',
  'Jordan',
  'Adidas',
  'New Balance',
  'Fear of God',
  'Stussy',
  'Puma',
  'Reebok',
  'Converse',
  'Essentials',
]

export const STORE_OPTIONS = [
  'Nike Sportswear',
  'Wardrobe Society',
  'Flight Club',
  'Adidas Originals',
  'Kith Apparel',
  'Stussy Lab',
  'Kicks City',
]

export interface SearchFilters {
  productTypes: ProductType[]
  size: SizeOption
  brands: string[]
  stores: string[]
}

export const DEFAULT_FILTERS: SearchFilters = {
  productTypes: [],
  size: 'Default',
  brands: [],
  stores: [],
}

export interface TrendingItem {
  id: string
  label: string
}

export const TRENDING_ITEMS: TrendingItem[] = [
  { id: '1', label: 'Air Jordan 4 Black Cat' },
  { id: '2', label: 'Essentials Pullover Hoodie' },
  { id: '3', label: 'Nike Tech Fleece Set' },
  { id: '4', label: 'New Balance 550' },
  { id: '5', label: 'Stussy Varsity Jacket' },
  { id: '6', label: 'Adidas Firebird Track Pants' },
]

export interface SearchResult {
  id: string
  name: string
  brand: string
  store: string
  price: number
  size: string
  audience: Audience
  productType: ProductType
  image?: string
}

const MOCK_PRODUCTS: SearchResult[] = [
  {
    id: '1',
    name: 'Air Jordan 4 Black Cat',
    brand: 'Jordan',
    store: 'Kicks City',
    price: 220,
    size: '10.5',
    audience: "Men's",
    productType: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=200&q=80',
  },
  {
    id: '2',
    name: 'Essentials Pullover Hoodie',
    brand: 'Fear of God',
    store: 'Wardrobe Society',
    price: 120,
    size: 'M',
    audience: "Men's",
    productType: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
  },
  {
    id: '3',
    name: 'Nike Tech Fleece Set',
    brand: 'Nike',
    store: 'Nike Sportswear',
    price: 190,
    size: 'L',
    audience: "Men's",
    productType: 'Clothing',
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=200&q=80',
  },
  {
    id: '4',
    name: 'Nike Dunk Low Panda',
    brand: 'Nike',
    store: 'Flight Club',
    price: 120,
    size: '10',
    audience: "Women's",
    productType: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&q=80',
  },
  {
    id: '5',
    name: 'Adidas Firebird Track Pants',
    brand: 'Adidas',
    store: 'Adidas Originals',
    price: 75,
    size: 'Kids L',
    audience: "Kids'",
    productType: 'Clothing',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&q=80',
  },
  {
    id: '6',
    name: 'New Balance 550',
    brand: 'New Balance',
    store: 'Retro Shop',
    price: 140,
    size: '10.5',
    audience: "Men's",
    productType: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&q=80',
  },
]

const mockSearch = (
  query: string,
  _mode: SearchMode,
  filters: SearchFilters,
): SearchResult[] => {
  const normalizedQuery = query.toLowerCase()

  return MOCK_PRODUCTS.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.brand.toLowerCase().includes(normalizedQuery) ||
      item.store.toLowerCase().includes(normalizedQuery) ||
      item.productType.toLowerCase().includes(normalizedQuery)

    const matchesType =
      filters.productTypes.length === 0 ||
      filters.productTypes.includes(item.productType)

    const matchesAudience =
      filters.size === 'Default' ||
      filters.size === 'Custom' ||
      item.audience === filters.size

    const matchesBrand =
      filters.brands.length === 0 ||
      filters.brands.includes(item.brand)

    const matchesStore =
      filters.stores.length === 0 ||
      filters.stores.includes(item.store)

    return matchesQuery && matchesType && matchesAudience && matchesBrand && matchesStore
  })
}

export function useSearch(mode: SearchMode = 'products') {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoadingRecent, setIsLoadingRecent] = useState(true)

  const [results, setResults] = useState<SearchResult[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const stored = await secureGet(RECENT_SEARCHES_KEY)
        if (stored) setRecentSearches(JSON.parse(stored))
      } finally {
        setIsLoadingRecent(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setIsError(false)
      return
    }

    setIsFetching(true)
    setIsError(false)

    const timer = setTimeout(() => {
      try {
        const found = mockSearch(debouncedQuery, mode, filters)
        setResults(found)
      } catch {
        setIsError(true)
      } finally {
        setIsFetching(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [debouncedQuery, mode, filters])

  const hasResults = results.length > 0
  const isSearchActive = query.trim().length >= 1

  const activeFilterCount =
    filters.productTypes.length +
    (filters.size !== 'Default' ? 1 : 0) +
    filters.brands.length +
    filters.stores.length

  const searchParams = {
    query: debouncedQuery,
    productTypes: filters.productTypes.length > 0 ? filters.productTypes : undefined,
    size: filters.size !== 'Default' ? filters.size : undefined,
    brands: filters.brands.length > 0 ? filters.brands : undefined,
    stores: filters.stores.length > 0 ? filters.stores : undefined,
  }

  const handleQueryChange = useCallback((text: string) => setQuery(text), [])

  const handleClearQuery = useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
    setResults([])
  }, [])

  const handleSubmitSearch = useCallback(async () => {
    const trimmed = query.trim()
    if (!trimmed) return

    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(
        0,
        MAX_RECENT,
      )
      secureSet(RECENT_SEARCHES_KEY, JSON.stringify(next))
      return next
    })
  }, [query])

  const handleOpenFilterModal = useCallback(() => setIsFilterModalOpen(true), [])
  const handleCloseFilterModal = useCallback(() => setIsFilterModalOpen(false), [])

  const handleApplyFilters = useCallback((applied: SearchFilters) => {
    setFilters(applied)
    setIsFilterModalOpen(false)
  }, [])

  const handleResetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const handleSelectRecent = useCallback((term: string) => setQuery(term), [])

  const handleRemoveRecent = useCallback((term: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== term)
      secureSet(RECENT_SEARCHES_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const handleClearAllRecent = useCallback(() => {
    setRecentSearches([])
    secureDelete(RECENT_SEARCHES_KEY)
  }, [])

  const handleSelectTrending = useCallback((label: string) => setQuery(label), [])

  return {
    query,
    debouncedQuery,
    isSearchActive,
    handleQueryChange,
    handleClearQuery,
    handleSubmitSearch,

    filters,
    activeFilterCount,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    handleResetFilters,
    searchParams,

    trendingItems: TRENDING_ITEMS,
    handleSelectTrending,

    recentSearches,
    isLoadingRecent,
    handleSelectRecent,
    handleRemoveRecent,
    handleClearAllRecent,

    results,
    isFetching,
    isError,
    hasResults,
  }
}
