import { useMemo, useState } from 'react';

export type DayRange = '7' | '30' | '90';
export type GenderCategory = "Men's" | "Women's" | "Kids'";

export interface SizeBar {
  size: string;
  searches: number;
}

export interface StockRow {
  size: string;
  searches: number;
  onHand: number;
  suggested: number;
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

const GENDER_CATEGORIES: GenderCategory[] = ["Men's", "Women's", "Kids'"];

const SIZE_BARS_BY_GENDER: Record<GenderCategory, SizeBar[]> = {
  "Men's": [
    { size: '10.5', searches: 128 },
    { size: '10', searches: 114 },
    { size: '11', searches: 98 },
    { size: '9.5', searches: 90 },
    { size: '9', searches: 72 },
    { size: '12', searches: 45 },
  ],
  "Women's": [
    { size: '8', searches: 96 },
    { size: '7.5', searches: 84 },
    { size: '8.5', searches: 70 },
    { size: '9', searches: 58 },
    { size: '7', searches: 41 },
    { size: '6.5', searches: 22 },
  ],
  "Kids'": [
    { size: '5Y', searches: 40 },
    { size: '4Y', searches: 33 },
    { size: '6Y', searches: 27 },
    { size: '3Y', searches: 19 },
    { size: '2Y', searches: 12 },
    { size: '7Y', searches: 8 },
  ],
};

const STOCK_ROWS_BY_GENDER: Record<GenderCategory, StockRow[]> = {
  "Men's": [
    { size: '10', searches: 114, onHand: 4, suggested: 10 },
    { size: '10.5', searches: 128, onHand: 3, suggested: 12 },
    { size: '11', searches: 98, onHand: 9, suggested: 9 },
  ],
  "Women's": [
    { size: '8', searches: 96, onHand: 5, suggested: 9 },
    { size: '7.5', searches: 84, onHand: 6, suggested: 8 },
    { size: '8.5', searches: 70, onHand: 7, suggested: 7 },
  ],
  "Kids'": [
    { size: '5Y', searches: 40, onHand: 3, suggested: 4 },
    { size: '4Y', searches: 33, onHand: 3, suggested: 3 },
    { size: '6Y', searches: 27, onHand: 2, suggested: 3 },
  ],
};

export const useSizeDemand = () => {
  const [dayRange, setDayRange] = useState<DayRange>('7');
  const [category, setCategory] = useState<GenderCategory>("Men's");
  const [categoryLabel] = useState('All Sneakers');
  const [store] = useState<StoreOption>({ id: 'novi', name: "Sonny's Kicks · Novi", radiusMiles: 10 });

  const sizeBars = useMemo(() => SIZE_BARS_BY_GENDER[category], [category]);
  const stockRows = useMemo(() => STOCK_ROWS_BY_GENDER[category], [category]);

  const topSize = useMemo(() => {
    const top = sizeBars[0];
    return {
      label: `${category} US ${top.size}`,
      searches: top.searches,
      trendPct: 14,
    };
  }, [sizeBars, category]);

  const maxSearches = useMemo(() => Math.max(...sizeBars.map((b) => b.searches)), [sizeBars]);

  const restockNote = useMemo(() => {
    const [first, second] = sizeBars;
    return `Prioritize ${category} US ${first.size} and ${second.size} for Jordan and Nike styles.`;
  }, [sizeBars, category]);

  return {
    store,
    dayRanges: DAY_RANGES,
    dayRange,
    setDayRange,
    genderCategories: GENDER_CATEGORIES,
    category,
    setCategory,
    categoryLabel,
    topSize,
    sizeBars,
    maxSearches,
    restockNote,
    stockRows,
  };
};