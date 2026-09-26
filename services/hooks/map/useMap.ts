import { useCallback, useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'
import {
  DEFAULT_FILTERS,
  SearchFilters,
} from '@/services/hooks/search/useSearch'
import type { Audience, ProductType } from '@/types/catalog'

export interface StoreProduct {
  id: string
  name: string
  brand: string
  price: string
  image: string
  isHot?: boolean
  sizes: string[]
  productType: ProductType
  audience: Audience
}

export interface Store {
  id: string
  name: string
  stock: number
  latitude: number
  longitude: number
  distance: string
  hours: string
  tag: string
  rating: number
  isFollowing?: boolean
  products: StoreProduct[]
}

export interface MapRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Sneaker District',
    stock: 42,
    latitude: 40.7545,
    longitude: -73.984,
    distance: '0.8 mi away',
    hours: 'Open until 8 PM',
    tag: 'Authorized Retailer',
    rating: 4.7,
    isFollowing: false,
    products: [
      {
        id: 'p1',
        name: 'Air Jordan 4\nBlack Cat',
        brand: 'Jordan',
        price: '$210',
        image: '',
        isHot: true,
        sizes: ['10', '10.5', '11'],
        productType: 'Sneakers',
        audience: "Men's",
      },
      {
        id: 'p2',
        name: 'Nike Tech\nFleece',
        brand: 'Nike',
        price: '$120',
        image: '',
        sizes: ['M', 'L', 'XL'],
        productType: 'Clothing',
        audience: "Men's",
      },
      {
        id: 'p3',
        name: 'New Balance 550',
        brand: 'New Balance',
        price: '$110',
        image: '',
        sizes: ['10', '10.5', '11'],
        productType: 'Sneakers',
        audience: "Women's",
      },
    ],
  },
  {
    id: '2',
    name: 'Kith Apparel',
    stock: 28,
    latitude: 40.7575,
    longitude: -73.9765,
    distance: '1.3 mi away',
    hours: 'Open until 7 PM',
    tag: 'Streetwear Drops',
    rating: 4.8,
    isFollowing: true,
    products: [
      {
        id: 'p4',
        name: 'Essentials\nHoodie',
        brand: 'Fear of God',
        price: '$280',
        image: '',
        isHot: true,
        sizes: ['S', 'M', 'L'],
        productType: 'Clothing',
        audience: "Men's",
      },
      {
        id: 'p5',
        name: 'Air Max 1\n86 OG',
        brand: 'Nike',
        price: '$160',
        image: '',
        sizes: ['10', '10.5'],
        productType: 'Sneakers',
        audience: "Men's",
      },
      {
        id: 'p6',
        name: 'Stussy\nWork Jacket',
        brand: 'Stussy',
        price: '$150',
        image: '',
        sizes: ['M', 'L'],
        productType: 'Clothing',
        audience: 'Unisex',
      },
    ],
  },
  {
    id: '3',
    name: 'Stadium Goods',
    stock: 65,
    latitude: 40.7495,
    longitude: -73.9945,
    distance: '2.2 mi away',
    hours: 'Open until 7 PM',
    tag: 'Premium Resale',
    rating: 4.9,
    isFollowing: true,
    products: [
      {
        id: 'p7',
        name: 'Air Jordan 1\nRetro High',
        brand: 'Jordan',
        price: '$180',
        image: '',
        isHot: true,
        sizes: ['10', '10.5', '11'],
        productType: 'Sneakers',
        audience: "Men's",
      },
      {
        id: 'p8',
        name: 'Nike Dunk Low\nPanda',
        brand: 'Nike',
        price: '$120',
        image: '',
        sizes: ['10', '10.5', '11'],
        productType: 'Sneakers',
        audience: "Women's",
      },
      {
        id: 'p9',
        name: 'Adidas Firebird\nTrack Pants',
        brand: 'Adidas',
        price: '$110',
        image: '',
        sizes: ['Kids M', 'Kids L'],
        productType: 'Clothing',
        audience: "Kids'",
      },
    ],
  },
  {
    id: '4',
    name: 'Union Archive',
    stock: 33,
    latitude: 40.7515,
    longitude: -73.977,
    distance: '1.9 mi away',
    hours: 'Open until 6 PM',
    tag: 'Curated Apparel',
    rating: 4.6,
    isFollowing: false,
    products: [
      {
        id: 'p10',
        name: 'Air Max 95\nAtmos',
        brand: 'Nike',
        price: '$195',
        image: '',
        isHot: true,
        sizes: ['9', '10', '11'],
        productType: 'Sneakers',
        audience: "Men's",
      },
      {
        id: 'p11',
        name: 'Stussy Varsity\nJacket',
        brand: 'Stussy',
        price: '$650',
        image: '',
        sizes: ['M', 'L'],
        productType: 'Clothing',
        audience: "Men's",
      },
      {
        id: 'p12',
        name: 'Dunk Low\nVersatile',
        brand: 'Nike',
        price: '$130',
        image: '',
        sizes: ['9.5', '10', '11'],
        productType: 'Sneakers',
        audience: "Women's",
      },
    ],
  },
]

const DEFAULT_REGION: MapRegion = {
  latitude: 40.7525,
  longitude: -73.9857,
  latitudeDelta: 0.018,
  longitudeDelta: 0.018,
}

const RADIUS_OPTIONS = ['1 mi', '5 mi', '10 mi', '25 mi']

export function useMap() {
  const [query, setQuery] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [region, setRegion] = useState<MapRegion>(DEFAULT_REGION)
  const [stores] = useState<Store[]>(MOCK_STORES)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const [isFetchingLocation, setIsFetchingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [locationLabel, setLocationLabel] = useState('Novi, MI')

  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // ── New: top-bar chip state (my sizes / open now / radius) ──
  const [mySizes] = useState('US 10, M') // TODO: wire to real profile sizes
  const [isOpenNow, setIsOpenNow] = useState(false)
  const [radiusIndex, setRadiusIndex] = useState(2) // default "10 mi"
  const radiusLabel = RADIUS_OPTIONS[radiusIndex]

  const toggleOpenNow = useCallback(() => setIsOpenNow((v) => !v), [])
  const cycleRadius = useCallback(() => {
    setRadiusIndex((i) => (i + 1) % RADIUS_OPTIONS.length)
  }, [])

  const activeFilterCount =
    filters.productTypes.length +
    (filters.size !== 'Default' ? 1 : 0) +
    filters.brands.length +
    filters.stores.length

  const [filteredStores, setFilteredStores] = useState<Store[]>(MOCK_STORES)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase()

      const result = stores.filter((store) => {
        const hasMatchingProduct = store.products.some((product) => {
          const matchesType =
            filters.productTypes.length === 0 ||
            filters.productTypes.includes(product.productType)

          const matchesAudience =
            filters.size === 'Default' ||
            filters.size === 'Custom' ||
            product.audience === filters.size

          const matchesBrand =
            filters.brands.length === 0 ||
            filters.brands.some((brand) =>
              product.brand.toLowerCase().includes(brand.toLowerCase()),
            )

          return matchesType && matchesAudience && matchesBrand
        })

        if (!hasMatchingProduct) return false

        if (
          filters.stores.length > 0 &&
          !filters.stores.some((selectedStoreName) =>
            store.name.toLowerCase().includes(selectedStoreName.toLowerCase()),
          )
        ) {
          return false
        }

        // Open-now chip filter
        if (isOpenNow && !store.hours.toLowerCase().startsWith('open')) {
          return false
        }

        if (!normalizedQuery) return true

        const haystacks = [
          store.name.toLowerCase(),
          store.tag.toLowerCase(),
          ...store.products.flatMap((product) => [
            product.name.toLowerCase(),
            product.brand.toLowerCase(),
            product.productType.toLowerCase(),
          ]),
        ]

        return haystacks.some((value) => value.includes(normalizedQuery))
      })

      setFilteredStores(result)
    }, 150)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, stores, filters, isOpenNow])

  const handleQueryChange = useCallback((text: string) => setQuery(text), [])
  const handleClearQuery = useCallback(() => setQuery(''), [])

  const handleSelectStore = useCallback((store: Store) => setSelectedStore(store), [])
  const handleCloseStore = useCallback(() => setSelectedStore(null), [])

  const handleToggleFollow = useCallback((storeId: string) => {
    setSelectedStore((prev) =>
      prev?.id === storeId ? { ...prev, isFollowing: !prev.isFollowing } : prev,
    )
  }, [])

  const handleGoToCurrentLocation = useCallback(async () => {
    setIsFetchingLocation(true)
    setLocationError(null)

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setLocationError('Location permission denied.')
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      setRegion((prev) => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))

      // Reverse-geocode to update the "Novi, MI" style pill label
      try {
        const [place] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        if (place?.city) {
          setLocationLabel(`${place.city}, ${place.region ?? ''}`.trim().replace(/,$/, ''))
        }
      } catch {
        // Non-fatal — keep previous label
      }
    } catch {
      setLocationError('Could not get your location.')
    } finally {
      setIsFetchingLocation(false)
    }
  }, [])

  const handleOpenFilterModal = useCallback(() => setIsFilterModalOpen(true), [])
  const handleCloseFilterModal = useCallback(() => setIsFilterModalOpen(false), [])

  const handleApplyFilters = useCallback((applied: SearchFilters) => {
    setFilters(applied)
    setIsFilterModalOpen(false)
  }, [])

  const handleResetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  // ── "Search this area" — re-runs the filter pass against the current
  // region. Since MOCK_STORES is static this just re-triggers the effect;
  // wire this to a real API call keyed off `region` once you have one. ──
  const handleSearchThisArea = useCallback(() => {
    setQuery((q) => q) // no-op trigger; replace with real refetch-by-region
  }, [])

  return {
    query,
    handleQueryChange,
    handleClearQuery,
    filters,
    activeFilterCount,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    handleResetFilters,
    region,
    setRegion,
    filteredStores,
    nearbyCount: filteredStores.length,
    selectedStore,
    handleSelectStore,
    handleCloseStore,
    handleToggleFollow,
    isFetchingLocation,
    locationError,
    locationLabel,
    handleGoToCurrentLocation,
    mySizes,
    isOpenNow,
    toggleOpenNow,
    radiusLabel,
    cycleRadius,
    handleSearchThisArea,
  }
}