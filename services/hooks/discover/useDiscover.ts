import { useState, useCallback } from 'react';

export type FilterCategory = 'Default' | "Man's" | "Woman's" | "Kid's" | 'Custom';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Dropping Soon';

export interface NearbyProduct {
  id: string;
  name: string;
  store: string;
  distance: string;
  price: number;
  size?: string;   // e.g. "US 10" | "42 EU"
  year?: string;   // e.g. "2024"
  image: string;
  stockStatus: StockStatus;
  isWishlisted: boolean;
}

export interface BrandProduct {
  id: string;
  name: string;
  store: string;
  distance: string;
  price: number;
  image: string;
  brandInitial: string;
  brandColor: string;
  stockStatus: StockStatus;
}

export interface AdBanner {
  id: string;
  brandLabel: string;
  tag: string;
  productName: string;
  releaseDate: string;
  ctaLabel: string;
  ctaVariant: 'primary' | 'discount';
  image: string;
}

export interface FollowedStore {
  id: string;
  name: string;
  location: string;
  distance: string;
  image: string;
  stockStatus?: StockStatus;
  price?: number;
  isFollowing: boolean;
}

// ─── Static seed data ────────────────────────────────────────────────────
const FILTERS: FilterCategory[] = ['Default', "Man's", "Woman's", "Kid's", 'Custom'];

const NEARBY: NearbyProduct[] = [
  {
    id: 'n1',
    name: 'Air Jordan 4 "Black Cat"',
    store: 'Kicks City',
    distance: '0.9km',
    price: 220,
    size: 'US 10',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n2',
    name: 'Nike Air Max 97',
    store: 'Sneaker Lab',
    distance: '1.2km',
    price: 180,
    size: 'US 9.5',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
];

const BRANDS: BrandProduct[] = [
  {
    id: 'b1',
    name: 'Jordan 1 Retro',
    store: 'Flight Club',
    distance: '1.5mi',
    price: 250,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=200&q=80',
    brandInitial: 'J',
    brandColor: '#C41E3A',
    stockStatus: 'In Stock',
  },
  {
    id: 'b2',
    name: 'Nike SB Dunk',
    store: 'Supreme Kicks',
    distance: '0.3km',
    price: 190,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&q=80',
    brandInitial: 'N',
    brandColor: '#111111',
    stockStatus: 'Low Stock',
  },
];

const AD_DISCOUNT: AdBanner = {
  id: 'ad1',
  brandLabel: 'Adidas',
  tag: 'AD',
  productName: 'Yeezy Boost 350 V2',
  releaseDate: 'Sat, Mar 25',
  ctaLabel: 'Get By 70% 🔥',
  ctaVariant: 'discount',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
};

const AD_NOTIFY: AdBanner = {
  id: 'ad2',
  brandLabel: 'Adidas',
  tag: 'DROPPING SOON',
  productName: 'Adidas Yeezy Boost 350 V2',
  releaseDate: 'Sat, Mar 29',
  ctaLabel: 'Notify Me',
  ctaVariant: 'primary',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
};

const STORES: FollowedStore[] = [
  {
    id: 's1',
    name: 'New Balance',
    location: 'Kicks City',
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&q=80',
    stockStatus: 'In Stock',
    price: 185,
    isFollowing: true,
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────
export function useDiscover() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Default');
  const [nearbyProducts, setNearbyProducts] = useState<NearbyProduct[]>(NEARBY);
  const [brandProducts] = useState<BrandProduct[]>(BRANDS);
  const [adBanner] = useState<AdBanner>(AD_NOTIFY);
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>(STORES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const greeting = getGreeting();
  const userName = 'Sonny';

  const handleFilterChange = useCallback((f: FilterCategory) => {
    setActiveFilter(f);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setNearbyProducts(prev =>
      prev.map(p => p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p)
    );
  }, []);

  const toggleFollow = useCallback((id: string) => {
    setFollowedStores(prev =>
      prev.map(s => s.id === id ? { ...s, isFollowing: !s.isFollowing } : s)
    );
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsRefreshing(false);
  }, []);

  return {
    filters: FILTERS,
    activeFilter,
    nearbyProducts,
    brandProducts,
    adBanner,
    followedStores,
    isRefreshing,
    greeting,
    userName,
    handleFilterChange,
    toggleWishlist,
    toggleFollow,
    handleRefresh,
  };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}