import { useMemo, useState } from 'react';

export type DayRange = '7' | '30' | '90';
export type CategoryFilter = 'All' | 'Sneakers' | 'Clothing';

export interface SizeDemand {
  label: string;
  searches: number;
  status: 'searches' | 'low' | 'out';
}

export interface OpportunityItem {
  id: string;
  rank: number;
  name: string;
  searchesLabel: string;
  trendPct: number; // positive = up, negative = down
  stockStatus: 'not_stocked' | 'missing_sizes' | 'demand_covered';
  stockNote: string; // e.g. "Not Stocked", "In stock: 3 pairs", "In stock: 12 pairs"
  sizes: SizeDemand[];
  primaryAction: {
    label: string;
    icon: 'plus' | 'box' | 'file';
    kind: 'add_to_sourcing' | 'review_inventory' | 'view_details';
  };
}

export interface BestOpportunity {
  itemName: string;
  reason: string;
  potentialBuyers: number;
}

interface StoreOption {
  id: string;
  name: string;
  radiusMiles: number;
}

const DAY_RANGES: { key: DayRange; label: string }[] = [
  { key: '7', label: '7 Days' },
  { key: '30', label: '30 Days' },
  { key: '90', label: '90 Days' },
];

const CATEGORY_FILTERS: CategoryFilter[] = ['All', 'Sneakers', 'Clothing'];

const OPPORTUNITIES_BY_RANGE: Record<DayRange, OpportunityItem[]> = {
  '7': [
    {
      id: 'panda',
      rank: 1,
      name: "Nike Dunk Low 'Panda'",
      searchesLabel: '2,104 searches',
      trendPct: 18,
      stockStatus: 'not_stocked',
      stockNote: 'Not Stocked',
      sizes: [
        { label: '9', searches: 24, status: 'searches' },
        { label: '10', searches: 18, status: 'searches' },
        { label: '10.5', searches: 16, status: 'searches' },
      ],
      primaryAction: { label: 'Add to Sourcing List', icon: 'plus', kind: 'add_to_sourcing' },
    },
    {
      id: 'chicago',
      rank: 2,
      name: "Air Jordan 1 'Chicago'",
      searchesLabel: '2,847 searches',
      trendPct: 9,
      stockStatus: 'missing_sizes',
      stockNote: 'In stock: 3 pairs',
      sizes: [
        { label: '9', searches: 0, status: 'low' },
        { label: '10', searches: 0, status: 'out' },
        { label: '10.5', searches: 0, status: 'out' },
      ],
      primaryAction: { label: 'Review Inventory', icon: 'box', kind: 'review_inventory' },
    },
    {
      id: 'cream',
      rank: 3,
      name: "Yeezy 350 'Cream'",
      searchesLabel: '1,892 searches',
      trendPct: -4,
      stockStatus: 'demand_covered',
      stockNote: 'In stock: 12 pairs',
      sizes: [
        { label: '9', searches: 14, status: 'searches' },
        { label: '10', searches: 12, status: 'searches' },
        { label: '11', searches: 11, status: 'searches' },
      ],
      primaryAction: { label: 'View Details', icon: 'file', kind: 'view_details' },
    },
  ],
  '30': [
    {
      id: 'panda-30',
      rank: 1,
      name: "Nike Dunk Low 'Panda'",
      searchesLabel: '7,910 searches',
      trendPct: 22,
      stockStatus: 'not_stocked',
      stockNote: 'Not Stocked',
      sizes: [
        { label: '9', searches: 88, status: 'searches' },
        { label: '10', searches: 71, status: 'searches' },
        { label: '10.5', searches: 60, status: 'searches' },
      ],
      primaryAction: { label: 'Add to Sourcing List', icon: 'plus', kind: 'add_to_sourcing' },
    },
    {
      id: 'chicago-30',
      rank: 2,
      name: "Air Jordan 1 'Chicago'",
      searchesLabel: '9,532 searches',
      trendPct: 5,
      stockStatus: 'missing_sizes',
      stockNote: 'In stock: 3 pairs',
      sizes: [
        { label: '9', searches: 0, status: 'low' },
        { label: '10', searches: 0, status: 'out' },
        { label: '10.5', searches: 0, status: 'out' },
      ],
      primaryAction: { label: 'Review Inventory', icon: 'box', kind: 'review_inventory' },
    },
    {
      id: 'cream-30',
      rank: 3,
      name: "Yeezy 350 'Cream'",
      searchesLabel: '6,203 searches',
      trendPct: 2,
      stockStatus: 'demand_covered',
      stockNote: 'In stock: 12 pairs',
      sizes: [
        { label: '9', searches: 49, status: 'searches' },
        { label: '10', searches: 41, status: 'searches' },
        { label: '11', searches: 37, status: 'searches' },
      ],
      primaryAction: { label: 'View Details', icon: 'file', kind: 'view_details' },
    },
  ],
  '90': [
    {
      id: 'panda-90',
      rank: 1,
      name: "Nike Dunk Low 'Panda'",
      searchesLabel: '21,340 searches',
      trendPct: 31,
      stockStatus: 'not_stocked',
      stockNote: 'Not Stocked',
      sizes: [
        { label: '9', searches: 240, status: 'searches' },
        { label: '10', searches: 198, status: 'searches' },
        { label: '10.5', searches: 172, status: 'searches' },
      ],
      primaryAction: { label: 'Add to Sourcing List', icon: 'plus', kind: 'add_to_sourcing' },
    },
    {
      id: 'chicago-90',
      rank: 2,
      name: "Air Jordan 1 'Chicago'",
      searchesLabel: '25,110 searches',
      trendPct: -3,
      stockStatus: 'missing_sizes',
      stockNote: 'In stock: 3 pairs',
      sizes: [
        { label: '9', searches: 0, status: 'low' },
        { label: '10', searches: 0, status: 'out' },
        { label: '10.5', searches: 0, status: 'out' },
      ],
      primaryAction: { label: 'Review Inventory', icon: 'box', kind: 'review_inventory' },
    },
    {
      id: 'cream-90',
      rank: 3,
      name: "Yeezy 350 'Cream'",
      searchesLabel: '17,880 searches',
      trendPct: -8,
      stockStatus: 'demand_covered',
      stockNote: 'In stock: 12 pairs',
      sizes: [
        { label: '9', searches: 130, status: 'searches' },
        { label: '10', searches: 111, status: 'searches' },
        { label: '11', searches: 98, status: 'searches' },
      ],
      primaryAction: { label: 'View Details', icon: 'file', kind: 'view_details' },
    },
  ],
};

export const useLocalDemand = () => {
  const [dayRange, setDayRange] = useState<DayRange>('7');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [store] = useState<StoreOption>({ id: 'novi', name: "Sonny's Kicks · Novi", radiusMiles: 10 });

  const missedSearchesCount = useMemo(() => {
    return dayRange === '7' ? 42 : dayRange === '30' ? 168 : 512;
  }, [dayRange]);

  const opportunities = useMemo(() => {
    const list = OPPORTUNITIES_BY_RANGE[dayRange];
    // "Sneakers"/"All" show everything in this mock dataset; "Clothing" has none yet.
    if (category === 'Clothing') return [];
    return list;
  }, [dayRange, category]);

  const bestOpportunity: BestOpportunity | null = useMemo(() => {
    if (opportunities.length === 0) return null;
    const top = opportunities.find((o) => o.stockStatus === 'not_stocked') ?? opportunities[0];
    return {
      itemName: top.name,
      reason: 'has high local demand and no inventory.',
      potentialBuyers: 24,
    };
  }, [opportunities]);

  return {
    store,
    dayRanges: DAY_RANGES,
    dayRange,
    setDayRange,
    categoryFilters: CATEGORY_FILTERS,
    category,
    setCategory,
    missedSearchesCount,
    opportunities,
    bestOpportunity,
  };
};