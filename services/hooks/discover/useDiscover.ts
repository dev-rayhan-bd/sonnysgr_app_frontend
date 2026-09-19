import { useCallback, useMemo, useState } from 'react'
import type { Audience, ProductType } from '@/types/catalog'

export type FilterCategory =
  | 'Sneakers'
  | 'Clothing'
  | "Men's"
  | "Women's"
  | "Kids'"
  | 'Custom'

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
  'Sneakers',
  'Clothing',
  "Men's",
  "Women's",
  "Kids'",
  'Custom',
]

const NEARBY: NearbyProduct[] = [
  {
    id: 'n1',
    name: 'Air Jordan 4 "Black Cat"',
    brand: 'Jordan',
    store: 'Kicks City',
    distance: '0.9km',
    price: 220,
    size: 'US 10',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n2',
    name: 'Nike Air Max 97 OG',
    brand: 'Nike',
    store: 'Sneaker Lab',
    distance: '1.2km',
    price: 180,
    size: 'US 9.5',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    productType: 'Sneakers',
    audience: "Women's",
    stockStatus: 'Low Stock',
    isWishlisted: true,
  },
  {
    id: 'n3',
    name: 'Essentials Pullover Hoodie',
    brand: 'Fear of God',
    store: 'Wardrobe Society',
    distance: '1.1km',
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
    distance: '0.7km',
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
    name: 'New Balance 550 White',
    brand: 'New Balance',
    store: 'Retro Shop',
    distance: '1.8km',
    price: 140,
    size: 'US 10.5',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
  {
    id: 'n6',
    name: 'Stussy Varsity Jacket',
    brand: 'Stussy',
    store: 'Union Archive',
    distance: '1.4km',
    price: 195,
    size: 'L',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
  {
    id: 'n7',
    name: 'Adidas Firebird Track Pants',
    brand: 'Adidas',
    store: 'Originals Corner',
    distance: '3.0km',
    price: 75,
    size: 'Kids L',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80',
    productType: 'Clothing',
    audience: "Kids'",
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'n8',
    name: 'Adidas UltraBoost 22',
    brand: 'Adidas',
    store: 'Boost Zone',
    distance: '2.5km',
    price: 190,
    size: 'US 11.5',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
]

const BRANDS: BrandProduct[] = [
  {
    id: 'b1',
    name: 'Jordan 1 Retro High OG',
    brand: 'Jordan',
    store: 'Flight Club',
    distance: '1.5mi',
    price: 250,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28a?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    brandInitial: 'J',
    brandColor: '#C41E3A',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b2',
    name: 'Nike Tech Fleece Set',
    brand: 'Nike',
    store: 'Sportswear Hub',
    distance: '0.3km',
    price: 190,
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    brandInitial: 'N',
    brandColor: '#111111',
    stockStatus: 'Low Stock',
    isWishlisted: true,
  },
  {
    id: 'b3',
    name: 'Adidas Essentials Fleece',
    brand: 'Adidas',
    store: 'Boost Zone',
    distance: '2.3km',
    price: 88,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    productType: 'Clothing',
    audience: "Women's",
    brandInitial: 'A',
    brandColor: '#000000',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b4',
    name: 'Converse Chuck 70 Hi',
    brand: 'Converse',
    store: 'Vintage Kicks',
    distance: '3.1km',
    price: 80,
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&q=80',
    productType: 'Sneakers',
    audience: "Women's",
    brandInitial: 'C',
    brandColor: '#374151',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
  {
    id: 'b5',
    name: 'Reebok Classics Track Top',
    brand: 'Reebok',
    store: 'Classic Store',
    distance: '1.9km',
    price: 110,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
    productType: 'Clothing',
    audience: 'Unisex',
    brandInitial: 'R',
    brandColor: '#FF5722',
    stockStatus: 'Low Stock',
    isWishlisted: false,
  },
  {
    id: 'b6',
    name: 'Asics Gel-Kayano 29',
    brand: 'Asics',
    store: 'RunFast Shop',
    distance: '2.7km',
    price: 160,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',
    productType: 'Sneakers',
    audience: "Men's",
    brandInitial: 'G',
    brandColor: '#1976D2',
    stockStatus: 'Dropping Soon',
    isWishlisted: false,
  },
  {
    id: 'b7',
    name: 'New Balance Athletics Tee',
    brand: 'New Balance',
    store: 'Retro Shop',
    distance: '1.8km',
    price: 54,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
    productType: 'Clothing',
    audience: "Men's",
    brandInitial: 'N',
    brandColor: '#6B4226',
    stockStatus: 'In Stock',
    isWishlisted: true,
  },
  {
    id: 'b8',
    name: 'Puma Suede Classic',
    brand: 'Puma',
    store: 'Street Kicks',
    distance: '0.7km',
    price: 95,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80',
    productType: 'Sneakers',
    audience: "Kids'",
    brandInitial: 'P',
    brandColor: '#7B1FA2',
    stockStatus: 'In Stock',
    isWishlisted: false,
  },
]

const AD_BANNERS: AdBanner[] = [
  {
    id: 'ad1',
    brandLabel: 'Fear of God',
    tag: 'DROPPING SOON',
    productName: 'Essentials Spring Capsule',
    productType: 'Clothing',
    releaseDate: 'Sat, Apr 12',
    ctaLabel: 'Notify Me',
    ctaVariant: 'primary',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
  {
    id: 'ad2',
    brandLabel: 'Nike',
    tag: 'AD',
    productName: 'Nike Tech Fleece',
    productType: 'Clothing',
    releaseDate: 'Sat, Apr 5',
    ctaLabel: 'Save 30%',
    ctaVariant: 'discount',
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=600&q=80',
  },
  {
    id: 'ad3',
    brandLabel: 'Puma',
    tag: 'DROPPING SOON',
    productName: 'Puma RS-X Reinvention',
    productType: 'Sneakers',
    releaseDate: 'Mon, Apr 14',
    ctaLabel: 'Notify Me',
    ctaVariant: 'primary',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
  },
  {
    id: 'ad4',
    brandLabel: 'Stussy',
    tag: 'AD',
    productName: 'Workwear Capsule',
    productType: 'Clothing',
    releaseDate: 'Sun, Apr 6',
    ctaLabel: 'Shop Now',
    ctaVariant: 'discount',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  },
]

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
    featuredTypes: ['Sneakers', 'Clothing'],
  },
  {
    id: 's2',
    name: 'Nike Sportswear',
    location: 'Market Street',
    distance: '1.5km',
    avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1506629905607-c29d0cd7c32d?w=400&q=80',
    stockStatus: 'Low Stock',
    price: 200,
    isFollowing: true,
    isWishlisted: true,
    brandInitial: 'N',
    brandColor: '#111111',
    featuredTypes: ['Clothing'],
  },
  {
    id: 's3',
    name: 'Adidas Originals',
    location: 'City Center',
    distance: '2.0km',
    avatar: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    stockStatus: 'In Stock',
    price: 210,
    isFollowing: true,
    isWishlisted: false,
    brandInitial: 'A',
    brandColor: '#000000',
    featuredTypes: ['Sneakers', 'Clothing'],
  },
  {
    id: 's4',
    name: 'Wardrobe Society',
    location: 'Fashion Street',
    distance: '1.2km',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    stockStatus: 'Dropping Soon',
    price: 140,
    isFollowing: false,
    isWishlisted: false,
    brandInitial: 'W',
    brandColor: '#7C2D12',
    featuredTypes: ['Clothing'],
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
    featuredTypes: ['Sneakers'],
  },
  {
    id: 's6',
    name: 'Stussy Lab',
    location: 'West Side',
    distance: '3.1km',
    avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&q=80',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    stockStatus: 'In Stock',
    price: 85,
    isFollowing: false,
    isWishlisted: false,
    brandInitial: 'S',
    brandColor: '#374151',
    featuredTypes: ['Clothing'],
  },
]

export function useDiscover() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Sneakers')
  const [searchQuery, setSearchQuery] = useState('')
  const [nearbyInventory, setNearbyInventory] = useState<NearbyProduct[]>(NEARBY)
  const [brandInventory, setBrandInventory] = useState<BrandProduct[]>(BRANDS)
  const [adBanners] = useState<AdBanner[]>(AD_BANNERS)
  const [followedStores, setFollowedStores] = useState<FollowedStore[]>(STORES)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const greeting = getGreeting()
  const userName = 'Sonny'

  const handleFilterChange = useCallback((filter: FilterCategory) => {
    setActiveFilter(filter)
  }, [])

  const matchesFilter = useCallback(
    (item: { productType: ProductType; audience: Audience }) => {
      switch (activeFilter) {
        case 'Sneakers':
        case 'Clothing':
          return item.productType === activeFilter
        case "Men's":
        case "Women's":
        case "Kids'":
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
      prev.map((item) =>
        item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item,
      ),
    )
  }, [])

  const toggleBrandWishlist = useCallback((id: string) => {
    setBrandInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item,
      ),
    )
  }, [])

  const toggleStoreWishlist = useCallback((id: string) => {
    setFollowedStores((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item,
      ),
    )
  }, [])

  const toggleFollow = useCallback((id: string) => {
    setFollowedStores((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item,
      ),
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
    searchQuery,
    setSearchQuery,
    nearbyProducts,
    brandProducts,
    adBanners,
    followedStores,
    isRefreshing,
    greeting,
    userName,
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