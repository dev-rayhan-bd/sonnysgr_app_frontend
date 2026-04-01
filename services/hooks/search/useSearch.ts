// services/hooks/search/useSearch.ts
import { useCallback, useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";

// ─── SecureStore helpers ──────────────────────────────────────────────────────

const secureGet = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
};

const secureSet = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {}
};

const secureDelete = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {}
};

// ─── Constants ───────────────────────────────────────────────────────────────

const RECENT_SEARCHES_KEY = "search_recent";
const MAX_RECENT = 8;

// ─── Types & options ─────────────────────────────────────────────────────────

export type SearchMode = "clients" | "visits";

export type SizeOption = "Men's" | "Women's" | "Kids'" | "Custom" | "Default";

export const SIZE_OPTIONS: SizeOption[] = [
  "Default",
  "Men's",
  "Women's",
  "Kids'",
  "Custom",
];

export const BRAND_OPTIONS = [
  "Nike",
  "Jordan",
  "Adidas",
  "New Balance",
  "Yeezy",
  "Puma",
  "Reebok",
  "Converse",
  "Vans",
  "Asics",
];

export const STORE_OPTIONS = [
  "Nike Store",
  "Foot Locker",
  "StockX",
  "GOAT",
  "Flight Club",
  "Sneaker Politics",
  "Kith",
  "END.",
];

export interface SearchFilters {
  size: SizeOption;
  brands: string[];
  stores: string[];
}

export const DEFAULT_FILTERS: SearchFilters = {
  size: "Default",
  brands: [],
  stores: [],
};

// ─── Trending ────────────────────────────────────────────────────────────────

export interface TrendingItem {
  id: string;
  label: string;
}

export const TRENDING_ITEMS: TrendingItem[] = [
  { id: "1", label: "Air Jordan 4 Black Cat" },
  { id: "2", label: "Nike Dunk Low Panda" },
  { id: "3", label: "Yeezy Boost 350" },
  { id: "4", label: "New Balance 550" },
  { id: "5", label: "Air Max 1 '86" },
  { id: "6", label: "Travis Scott Jordan 1" },
];

// ─── Mock search result type (swap for your real type when API is ready) ──────

export interface SearchResult {
  _id: string;
  fullName?: string;
  email?: string;
  picture?: string;
  serviceType?: string;
  clientName?: string;
  date?: string;
  photos?: string[];
}

// ─── Mock data (delete when API is ready) ────────────────────────────────────

const MOCK_CLIENTS: SearchResult[] = [
  { _id: "1", fullName: "Jordan Smith", email: "jordan@example.com" },
  { _id: "2", fullName: "Nike Williams", email: "nike@example.com" },
  { _id: "3", fullName: "Adidas Brown", email: "adidas@example.com" },
  { _id: "4", fullName: "Yeezy Davis", email: "yeezy@example.com" },
  { _id: "5", fullName: "Puma Johnson", email: "puma@example.com" },
];

const MOCK_VISITS: SearchResult[] = [
  { _id: "v1", serviceType: "Sneaker Cleaning", clientName: "Jordan Smith", date: "2024-03-15" },
  { _id: "v2", serviceType: "Sole Swap", clientName: "Nike Williams", date: "2024-03-10" },
  { _id: "v3", serviceType: "Custom Paint", clientName: "Adidas Brown", date: "2024-02-28" },
];

const mockSearch = (
  query: string,
  mode: SearchMode,
  filters: SearchFilters,
): SearchResult[] => {
  const q = query.toLowerCase();
  const pool = mode === "clients" ? MOCK_CLIENTS : MOCK_VISITS;

  return pool.filter((item) => {
    const matchesQuery = mode === "clients"
      ? item.fullName?.toLowerCase().includes(q) || item.email?.toLowerCase().includes(q)
      : item.serviceType?.toLowerCase().includes(q) || item.clientName?.toLowerCase().includes(q);

    // When API is ready, pass filters.size / filters.brands / filters.stores
    // in the request body. For now they don't narrow mock data.
    return matchesQuery;
  });
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSearch(mode: SearchMode = "clients") {
  // ── query ──────────────────────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── filters ────────────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ── recent ─────────────────────────────────────────────────────────────────
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  // ── results ────────────────────────────────────────────────────────────────
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  // ── Load recent from SecureStore ───────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const stored = await secureGet(RECENT_SEARCHES_KEY);
        if (stored) setRecentSearches(JSON.parse(stored));
      } finally {
        setIsLoadingRecent(false);
      }
    })();
  }, []);

  // ── Debounce query ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // ── Mock search (replace this whole effect with your API call later) ───────
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsError(false);
      return;
    }

    setIsFetching(true);
    setIsError(false);

    // Simulate network latency
    const timer = setTimeout(() => {
      try {
        const found = mockSearch(debouncedQuery, mode, filters);
        setResults(found);
      } catch {
        setIsError(true);
      } finally {
        setIsFetching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedQuery, mode, filters]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const hasResults = results.length > 0;
  const isSearchActive = query.trim().length >= 1;

  const activeFilterCount =
    (filters.size !== "Default" ? 1 : 0) +
    filters.brands.length +
    filters.stores.length;

  // searchParams — forward this to your real API when ready
  const searchParams = {
    query: debouncedQuery,
    size: filters.size !== "Default" ? filters.size : undefined,
    brands: filters.brands.length > 0 ? filters.brands : undefined,
    stores: filters.stores.length > 0 ? filters.stores : undefined,
  };

  // ── Query handlers ─────────────────────────────────────────────────────────
  const handleQueryChange = useCallback((text: string) => setQuery(text), []);

  const handleClearQuery = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setResults([]);
  }, []);

  const handleSubmitSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(
        0,
        MAX_RECENT,
      );
      secureSet(RECENT_SEARCHES_KEY, JSON.stringify(next));
      return next;
    });
  }, [query]);

  // ── Filter modal handlers ──────────────────────────────────────────────────
  const handleOpenFilterModal = useCallback(
    () => setIsFilterModalOpen(true),
    [],
  );
  const handleCloseFilterModal = useCallback(
    () => setIsFilterModalOpen(false),
    [],
  );

  const handleApplyFilters = useCallback((applied: SearchFilters) => {
    setFilters(applied);
    setIsFilterModalOpen(false);
  }, []);

  const handleResetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  // ── Recent handlers ────────────────────────────────────────────────────────
  const handleSelectRecent = useCallback((term: string) => setQuery(term), []);

  const handleRemoveRecent = useCallback((term: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((s) => s !== term);
      secureSet(RECENT_SEARCHES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleClearAllRecent = useCallback(() => {
    setRecentSearches([]);
    secureDelete(RECENT_SEARCHES_KEY);
  }, []);

  // ── Trending handler ───────────────────────────────────────────────────────
  const handleSelectTrending = useCallback(
    (label: string) => setQuery(label),
    [],
  );

  return {
    // query
    query,
    debouncedQuery,
    isSearchActive,
    handleQueryChange,
    handleClearQuery,
    handleSubmitSearch,

    // filters
    filters,
    activeFilterCount,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    handleResetFilters,
    searchParams,

    // trending
    trendingItems: TRENDING_ITEMS,
    handleSelectTrending,

    // recent
    recentSearches,
    isLoadingRecent,
    handleSelectRecent,
    handleRemoveRecent,
    handleClearAllRecent,

    // results
    results,
    isFetching,
    isError,
    hasResults,
  };
}