import { useState, useCallback } from 'react';

export type FilterCategory = 'For You' | 'Jordans' | 'Nike' | 'Adidas' | 'New Balance' | 'Puma';

export interface SneakerProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  store: string;
  distance: string;
  tag?: 'In Stock' | 'Low Stock' | 'New Arrival' | 'Sale';
  tagColor?: string;
  isWishlisted?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  product: string;
  price: number;
  tag: 'In Stock' | 'Low Stock';
  tagColor: string;
}

export interface FollowedStore {
  id: string;
  name: string;
  location: string;
  distance: string;
  image: string;
  isFollowing: boolean;
}

export interface AdBanner {
  id: string;
  brand: string;
  title: string;
  subtitle: string;
  discount: string;
  backgroundColor: string;
  image: string;
  ctaLabel: string;
}

const FILTER_CATEGORIES: FilterCategory[] = [
  'For You', 'Jordans', 'Nike', 'Adidas', 'New Balance', 'Puma',
];

const NEARBY_PRODUCTS: SneakerProduct[] = [
  {
    id: '1',
    name: 'Air Jordan 4 "Black Cat"',
    brand: 'Jordan',
    price: 230,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=200&q=80',
    store: 'Kicks Cty',
    distance: '1.1km',
    tag: 'In Stock',
    tagColor: '#00C853',
    isWishlisted: false,
  },
  {
    id: '2',
    name: 'Nike Air Max 97',
    brand: 'Nike',
    price: 180,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
    store: 'Sneaker Jam',
    distance: '1.3km',
    tag: 'Low Stock',
    tagColor: '#FF6D00',
    isWishlisted: true,
  },
];

const BRAND_PRODUCTS: Brand[] = [
  {
    id: '1',
    name: 'Jordan 1 Retro',
    logo: 'Jordan',
    product: 'Kicks Cty · 1.1km',
    price: 190,
    tag: 'In Stock',
    tagColor: '#00C853',
  },
  {
    id: '2',
    name: 'Nike SB Dunk',
    logo: 'Nike',
    product: 'Supreme Store · 1.3km',
    price: 190,
    tag: 'Low Stock',
    tagColor: '#FF6D00',
  },
  {
    id: '3',
    name: 'Adidas Yeezy Boost 350 V2',
    logo: 'Adidas',
    product: 'Confirmed · 2.0km',
    price: 320,
    tag: 'In Stock',
    tagColor: '#00C853',
  },
];

const AD_BANNER: AdBanner = {
  id: 'ad-1',
  brand: 'Adidas',
  title: 'Yeezy Boost 350 V2',
  subtitle: 'Sat, Mar 25',
  discount: 'Get By 70%',
  backgroundColor: '#1a1a2e',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  ctaLabel: 'Get By 70%',
};

const FOLLOWED_STORES: FollowedStore[] = [
  {
    id: '1',
    name: 'New Balance',
    location: 'Apple City',
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&q=80',
    isFollowing: true,
  },
];

export function useDiscover() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('For You');
  const [nearbyProducts, setNearbyProducts] = useState<SneakerProduct[]>(NEARBY_PRODUCTS);
  const [brandProducts] = useState<Brand[]>(BRAND_PRODUCTS);
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>(FOLLOWED_STORES);
  const [adBanner] = useState<AdBanner>(AD_BANNER);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userName = 'Sonny';

  const handleFilterChange = useCallback((filter: FilterCategory) => {
    setActiveFilter(filter);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setNearbyProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, isWishlisted: !p.isWishlisted } : p
      )
    );
  }, []);

  const toggleFollowStore = useCallback((storeId: string) => {
    setFollowedStores(prev =>
      prev.map(s =>
        s.id === storeId ? { ...s, isFollowing: !s.isFollowing } : s
      )
    );
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsRefreshing(false);
  }, []);

  return {
    // State
    activeFilter,
    nearbyProducts,
    brandProducts,
    followedStores,
    adBanner,
    isRefreshing,
    userName,
    filterCategories: FILTER_CATEGORIES,

    // Actions
    handleFilterChange,
    toggleWishlist,
    toggleFollowStore,
    handleRefresh,
  };
}