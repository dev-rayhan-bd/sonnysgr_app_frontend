import { useState, useCallback } from 'react';

export type FilterCategory = 'Default' | "Man's" | "Woman's" | "Kid's" | 'Custom';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Dropping Soon';

export interface NearbyProduct {
  id: string;
  name: string;
  store: string;
  distance: string;
  price: number;
  size?: string;
  year?: string;
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
  isWishlisted: boolean;
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
  /** Avatar shown in the top horizontal story-row */
  avatar: string;
  /** Full cover image shown in the card below */
  image: string;
  stockStatus?: StockStatus;
  price?: number;
  isFollowing: boolean;
  isWishlisted: boolean;
  brandInitial: string;
  brandColor: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────
const FILTERS: FilterCategory[] = ['Default', "Man's", "Woman's", "Kid's", 'Custom'];

// ─── Nearby Products — 8 items, all valid Unsplash sneaker images ────────
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
    name: 'Nike Air Max 97 OG',
    store: 'Sneaker Lab',
    distance: '1.2km',
    price: 180,
    size: 'US 9.5',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    stockStatus: 'Low Stock',
    isWishlisted: true,
  },
  {
    id: 'n3',
    name: 'Yeezy Boost 350 V2 Zebra',
    store: 'Sneaker Universe',
    distance: '2.1km',
    price: 320,
    size: 'US 11',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
  {
    id: 'n4',
    name: 'Puma RS-X Reinvention',
    store: 'Street Kicks',
    distance: '0.7km',
    price: 120,
    size: 'US 8',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n5',
    name: 'New Balance 550 White',
    store: 'Retro Shop',
    distance: '1.8km',
    price: 140,
    size: 'US 10.5',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
  {
    id: 'n6',
    name: 'Nike SB Dunk Low Pro',
    store: 'Supreme Kicks',
    distance: '1.4km',
    price: 165,
    size: 'US 9',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80',
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
  {
    id: 'n7',
    name: 'Converse Chuck 70 Hi',
    store: 'Vintage Kicks',
    distance: '3.0km',
    price: 90,
    size: 'US 10',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&q=80',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n8',
    name: 'Adidas UltraBoost 22',
    store: 'Boost Zone',
    distance: '2.5km',
    price: 190,
    size: 'US 11.5',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80',
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
];

// ─── Brand Products — 8 items ─────────────────────────────────────────────
const BRANDS: BrandProduct[] = [
  {
    id: 'b1',
    name: 'Jordan 1 Retro High OG',
    store: 'Flight Club',
    distance: '1.5mi',
    price: 250,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    brandInitial: 'J',
    brandColor: '#C41E3A',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b2',
    name: 'Nike SB Dunk Low',
    store: 'Supreme Kicks',
    distance: '0.3km',
    price: 190,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80',
    brandInitial: 'N',
    brandColor: '#111111',
    stockStatus: 'Low Stock',
    isWishlisted: true,
  },
  {
    id: 'b3',
    name: 'Adidas UltraBoost 22',
    store: 'Boost Zone',
    distance: '2.3km',
    price: 220,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80',
    brandInitial: 'A',
    brandColor: '#000000',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b4',
    name: 'Converse Chuck 70 Hi',
    store: 'Vintage Kicks',
    distance: '3.1km',
    price: 80,
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&q=80',
    brandInitial: 'C',
    brandColor: '#374151',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b5',
    name: 'Reebok Classic Leather',
    store: 'Classic Store',
    distance: '1.9km',
    price: 110,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    brandInitial: 'R',
    brandColor: '#FF5722',
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
  {
    id: 'b6',
    name: 'Asics Gel-Kayano 29',
    store: 'RunFast Shop',
    distance: '2.7km',
    price: 160,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',
    brandInitial: 'G',
    brandColor: '#1976D2',
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
  {
    id: 'b7',
    name: 'New Balance 990v5',
    store: 'Retro Shop',
    distance: '1.8km',
    price: 175,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    brandInitial: 'N',
    brandColor: '#6B4226',
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
  {
    id: 'b8',
    name: 'Puma Suede Classic',
    store: 'Street Kicks',
    distance: '0.7km',
    price: 95,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80',
    brandInitial: 'P',
    brandColor: '#7B1FA2',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
];

// ─── Ad Banners — 4 items, carousel cycles through ────────────────────────
const AD_BANNERS: AdBanner[] = [
  {
    id: 'ad1',
    brandLabel: 'Adidas',
    tag: 'DROPPING SOON',
    productName: 'Adidas Yeezy Boost 350 V2',
    releaseDate: 'Sat, Mar 29',
    ctaLabel: 'Notify Me',
    ctaVariant: 'primary',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
  },
  {
    id: 'ad2',
    brandLabel: 'Adidas',
    tag: 'AD',
    productName: 'Yeezy Boost 350 V2',
    releaseDate: 'Sat, Mar 25',
    ctaLabel: 'Get By 70% 🔥',
    ctaVariant: 'discount',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  },
  {
    id: 'ad3',
    brandLabel: 'Puma',
    tag: 'DROPPING SOON',
    productName: 'Puma RS-X Reinvention',
    releaseDate: 'Mon, Apr 4',
    ctaLabel: 'Notify Me',
    ctaVariant: 'primary',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
  },
  {
    id: 'ad4',
    brandLabel: 'Nike',
    tag: 'AD',
    productName: 'Air Max 97 Silver Bullet',
    releaseDate: 'Sun, Apr 2',
    ctaLabel: 'Shop Now 🛒',
    ctaVariant: 'discount',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  },
];

// ─── Followed Stores — 6 items ────────────────────────────────────────────
const STORES: FollowedStore[] = [
  {
    id: 's1',
    name: 'New Balance',
    location: 'Kicks City',
    distance: '0.8km',
    avatar: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    stockStatus: 'In Stock',
    price: 185,
    isFollowing: true,
    isWishlisted: false,
    brandInitial: 'N',
    brandColor: '#6B4226',
  },
  {
    id: 's2',
    name: 'Nike Factory',
    location: 'Sneaker Mall',
    distance: '1.5km',
    avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80',
    stockStatus: 'Low Stock',
    price: 200,
    isFollowing: true,
    isWishlisted: true,
    brandInitial: 'N',
    brandColor: '#111111',
  },
  {
    id: 's3',
    name: 'Adidas Outlet',
    location: 'City Center',
    distance: '2.0km',
    avatar: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80',
    stockStatus: 'In Stock',
    price: 210,
    isFollowing: true,
    isWishlisted: false,
    brandInitial: 'A',
    brandColor: '#000000',
  },
  {
    id: 's4',
    name: 'Puma Store',
    location: 'Fashion Street',
    distance: '1.2km',
    avatar: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80',
    stockStatus: 'Dropping Soon',
    price: 140,
    isFollowing: false,
    isWishlisted: false,
    brandInitial: 'P',
    brandColor: '#7B1FA2',
  },
  {
    id: 's5',
    name: 'Jordan House',
    location: 'Downtown',
    distance: '0.5km',
    avatar: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    stockStatus: 'In Stock',
    price: 260,
    isFollowing: true,
    isWishlisted: true,
    brandInitial: 'J',
    brandColor: '#C41E3A',
  },
  {
    id: 's6',
    name: 'Converse Lab',
    location: 'West Side',
    distance: '3.1km',
    avatar: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&q=80',
    stockStatus: 'In Stock',
    price: 85,
    isFollowing: false,
    isWishlisted: false,
    brandInitial: 'C',
    brandColor: '#374151',
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────
export function useDiscover() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Default');
  const [nearbyProducts, setNearbyProducts] = useState<NearbyProduct[]>(NEARBY);
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>(BRANDS);
  const [adBanners] = useState<AdBanner[]>(AD_BANNERS);
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>(STORES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const greeting = getGreeting();
  const userName = 'Sonny';

  const handleFilterChange = useCallback((f: FilterCategory) => setActiveFilter(f), []);

  const toggleWishlist = useCallback((id: string) => {
    setNearbyProducts(prev =>
      prev.map(p => p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p)
    );
  }, []);

  const toggleBrandWishlist = useCallback((id: string) => {
    setBrandProducts(prev =>
      prev.map(b => b.id === id ? { ...b, isWishlisted: !b.isWishlisted } : b)
    );
  }, []);

  const toggleStoreWishlist = useCallback((id: string) => {
    setFollowedStores(prev =>
      prev.map(s => s.id === id ? { ...s, isWishlisted: !s.isWishlisted } : s)
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
    adBanners,
    followedStores,
    isRefreshing,
    greeting,
    userName,
    handleFilterChange,
    toggleWishlist,
    toggleBrandWishlist,
    toggleStoreWishlist,
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