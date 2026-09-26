import { useCallback, useMemo, useState } from 'react'
import type { Audience, ProductType } from '@/types/catalog'

export type FilterCategory =
  | 'All'
  | 'Sneakers'
  | 'Clothing'
  | "Men's"
  | "Women's"
  | 'Custom'

export type FeedTab = 'For You' | 'Following'

export type StockStatus = 'In Stock' | 'Low Stock' | 'Dropping Soon'

export interface NearbyProduct {
  id: string
  name: string
  brand: string
  store: string
  distance: string
  price: number
  size?: string
  year?: string
  image: string
  productType: ProductType
  audience: Audience
  stockStatus: StockStatus
  isWishlisted: boolean
}

export interface BrandProduct {
  id: string
  name: string
  brand: string
  store: string
  distance: string
  price: number
  image: string
  productType: ProductType
  audience: Audience
  brandInitial: string
  brandColor: string
  stockStatus: StockStatus
  isWishlisted: boolean
}

export interface AdBanner {
  id: string
  brandLabel: string
  tag: string
  productName: string
  productType: ProductType
  releaseDate: string
  ctaLabel: string
  ctaVariant: 'primary' | 'discount'
  image: string
}

export interface FollowedStore {
  id: string
  name: string
  location: string
  distance: string
  avatar: string
  image: string
  stockStatus?: StockStatus
  price?: number
  isFollowing: boolean
  isWishlisted: boolean
  brandInitial: string
  brandColor: string
  featuredTypes: ProductType[]
}

const FILTERS: FilterCategory[] = [
  'All',
  'Sneakers',
  'Clothing',
  "Men's",
  "Women's",
]

const NEARBY: NearbyProduct[] = [
  {
    id: 'n1',
    name: 'Air Jordan 4 Black Cat',
    brand: 'Jordan',
    store: 'Sonnys',
    distance: '0.9 mi',
    price: 220,
    size: '10',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n2',
    name: 'New Balance 550',
    brand: 'New Balance',
    store: 'Kicks City',
    distance: '1.2 mi',
    price: 140,
    size: '10',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
  {
    id: 'n3',
    name: 'Essentials Pullover Hoodie',
    brand: 'Fear of God',
    store: 'Wardrobe Society',
    distance: '1.1 mi',
    price: 120,
    size: 'M',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
  {
    id: 'n4',
    name: 'Nike Sportswear Club Tee',
    brand: 'Nike',
    store: 'Street House',
    distance: '0.7 mi',
    price: 38,
    size: 'S',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80',
    productType: 'Clothing',
    audience: "Women's",
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n5',
    name: 'Adidas UltraBoost 22',
    brand: 'Adidas',
    store: 'Boost Zone',
    distance: '2.5 mi',
    price: 190,
    size: '11.5',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
  {
    id: 'n6',
    name: 'Stussy Varsity Jacket',
    brand: 'Stussy',
    store: 'Union Archive',
    distance: '1.4 mi',
    price: 195,
    size: 'L',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
]

const BRANDS: BrandProduct[] = [
  {
    id: 'b1',
    name: 'Fear of God Essentials Pullover Hoodie',
    brand: 'Fear of God',
    store: 'Sonnys',
    distance: '0.8 mi',
    price: 90,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    brandInitial: 'F',
    brandColor: '#111111',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b2',
    name: 'Nike Tech Fleece Full-Zip Hoodie',
    brand: 'Nike',
    store: 'Kicks City',
    distance: '1.5 mi',
    price: 110,
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    brandInitial: 'N',
    brandColor: '#111111',
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
  {
    id: 'b3',
    name: 'Adidas Essentials Fleece',
    brand: 'Adidas',
    store: 'Boost Zone',
    distance: '2.3 mi',
    price: 88,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    productType: 'Clothing',
    audience: "Women's",
    brandInitial: 'A',
    brandColor: '#000000',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
]

const AD_BANNERS: AdBanner[] = [
  {
    id: 'ad1',
    brandLabel: 'Jordan',
    tag: 'UPCOMING DROP',
    productName: 'Jordan 4 Retro',
    productType: 'Sneakers',
    releaseDate: 'Release date - Oct 3',
    ctaLabel: 'Notify me',
    ctaVariant: 'primary',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=600&q=80',
  },
  {
    id: 'ad2',
    brandLabel: 'Sponsored · Sonnys',
    tag: 'AD',
    productName: 'Discover new arrivals',
    productType: 'Clothing',
    releaseDate: 'The latest sneakers and apparel from top brands.',
    ctaLabel: 'Shop store',
    ctaVariant: 'discount',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
]

const STORES: FollowedStore[] = [
  {
    id: 's1',
    name: 'Sonnys',
    location: 'Kicks City',
    distance: '0.8 mi',
    avatar: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    stockStatus: 'In Stock',
    price: 185,
    isFollowing: true,
    isWishlisted: false,
    brandInitial: 'S',
    brandColor: '#111827',
    featuredTypes: ['Sneakers', 'Clothing'],
  },
  {
    id: 's2',
    name: 'Kicks City',
    location: 'Market Street',
    distance: '1.5 mi',
    avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=400&q=80',
    stockStatus: 'Low Stock',
    price: 200,
    isFollowing: true,
    isWishlisted: true,
    brandInitial: 'K',
    brandColor: '#22C55E',
    featuredTypes: ['Clothing'],
  },
  {
    id: 's3',
    name: 'Sneaker Lab',
    location: 'City Center',
    distance: '2.0 mi',
    avatar: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    stockStatus: 'In Stock',
    price: 210,
    isFollowing: true,
    isWishlisted: false,
    brandInitial: 'S',
    brandColor: '#000000',
    featuredTypes: ['Sneakers', 'Clothing'],
  },
]

export function useDiscover() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [feedTab, setFeedTab] = useState<FeedTab>('For You')
  const [searchQuery, setSearchQuery] = useState('')
  const [nearbyInventory, setNearbyInventory] = useState<NearbyProduct[]>(NEARBY)
  const [brandInventory, setBrandInventory] = useState<BrandProduct[]>(BRANDS)
  const [adBanners] = useState<AdBanner[]>(AD_BANNERS)
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>(STORES)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mySizes] = useState('US 10, M')

  const greeting = getGreeting()
  const userName = 'Sonny'

  const handleFilterChange = useCallback((filter: FilterCategory) => {
    setActiveFilter(filter)
  }, [])

  const matchesFilter = useCallback(
    (item: { productType: ProductType; audience: Audience }) => {
      switch (activeFilter) {
        case 'All':
        case 'Custom':
          return true
        case 'Sneakers':
        case 'Clothing':
          return item.productType === activeFilter
        case "Men's":
        case "Women's":
          return item.audience === activeFilter
        default:
          return true
      }
    },
    [activeFilter],
  )

  const matchesSearch = useCallback(
    (item: { name: string; brand: string; store: string }) => {
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.store.toLowerCase().includes(q)
      )
    },
    [searchQuery],
  )

  const nearbyProducts = useMemo(
    () => nearbyInventory.filter((item) => matchesFilter(item) && matchesSearch(item)),
    [nearbyInventory, matchesFilter, matchesSearch],
  )

  const brandProducts = useMemo(
    () => brandInventory.filter((item) => matchesFilter(item) && matchesSearch(item)),
    [brandInventory, matchesFilter, matchesSearch],
  )

  const toggleWishlist = useCallback((id: string) => {
    setNearbyInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item)),
    )
  }, [])

  const toggleBrandWishlist = useCallback((id: string) => {
    setBrandInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item)),
    )
  }, [])

  const toggleStoreWishlist = useCallback((id: string) => {
    setFollowedStores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item)),
    )
  }, [])

  const toggleFollow = useCallback((id: string) => {
    setFollowedStores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFollowing: !item.isFollowing } : item)),
    )
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsRefreshing(false)
  }, [])

  return {
    filters: FILTERS,
    activeFilter,
    feedTab,
    setFeedTab,
    searchQuery,
    setSearchQuery,
    nearbyProducts,
    brandProducts,
    adBanners,
    followedStores,
    isRefreshing,
    greeting,
    userName,
    mySizes,
    handleFilterChange,
    toggleWishlist,
    toggleFollow,
    toggleBrandWishlist,
    toggleStoreWishlist,
    handleRefresh,
  }
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}