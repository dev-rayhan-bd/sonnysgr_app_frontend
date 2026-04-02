import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import {
  DEFAULT_FILTERS,
  SearchFilters,
} from "@/services/hooks/search/useSearch";

export interface StoreProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  isHot?: boolean;
  sizes: string[];
}

export interface Store {
  id: string;
  name: string;
  stock: number;
  latitude: number;
  longitude: number;
  distance: string;
  hours: string;
  tag: string;
  rating: number;
  isFollowing?: boolean;
  products: StoreProduct[];
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MOCK_STORES: Store[] = [
  {
    id: "1",
    name: "Sneaker District",
    stock: 42,
    latitude: 40.7545,
    longitude: -73.984,
    distance: "0.8 mi away",
    hours: "Open until 8 PM",
    tag: "Authorized Retailer",
    rating: 4.7,
    isFollowing: false,
    products: [
      { id: "p1", name: "Air Jordan 4\nBlack Cat", price: "$210", image: "", isHot: true, sizes: ["10", "10.5", "11"] },
      { id: "p2", name: "Nike Dunk Low\nPanda", price: "$120", image: "", sizes: ["10", "10.5", "11"] },
      { id: "p3", name: "New Balance 550", price: "$110", image: "", sizes: ["10", "10.5", "11"] },
    ],
  },
  {
    id: "2",
    name: "KITH Flagship",
    stock: 28,
    latitude: 40.7575,
    longitude: -73.9765,
    distance: "1.3 mi away",
    hours: "Open until 7 PM",
    tag: "Exclusive Drops",
    rating: 4.8,
    isFollowing: true,
    products: [
      { id: "p4", name: "Yeezy Boost\n350 V2", price: "$280", image: "", isHot: true, sizes: ["9.5", "10", "11"] },
      { id: "p5", name: "Air Max 1\n'86 OG", price: "$160", image: "", sizes: ["10", "10.5"] },
      { id: "p6", name: "New Balance\n2002R", price: "$150", image: "", sizes: ["9", "10", "11"] },
    ],
  },
  {
    id: "3",
    name: "Stadium Goods",
    stock: 65,
    latitude: 40.7495,
    longitude: -73.9945,
    distance: "2.2 mi away",
    hours: "Open until 7 PM",
    tag: "Premium Resale",
    rating: 4.9,
    isFollowing: true,
    products: [
      { id: "p7", name: "Air Jordan 1\nRetro High", price: "$180", image: "", isHot: true, sizes: ["10", "10.5", "11"] },
      { id: "p8", name: "Nike Dunk Low\nPanda", price: "$120", image: "", sizes: ["10", "10.5", "11"] },
      { id: "p9", name: "New Balance 550", price: "$110", image: "", sizes: ["10", "10.5", "11"] },
    ],
  },
  {
    id: "4",
    name: "Atmos NYC",
    stock: 33,
    latitude: 40.7515,
    longitude: -73.977,
    distance: "1.9 mi away",
    hours: "Open until 6 PM",
    tag: "Collab Specialist",
    rating: 4.6,
    isFollowing: false,
    products: [
      { id: "p10", name: "Air Max 95\nAtmos", price: "$195", image: "", isHot: true, sizes: ["9", "10", "11"] },
      { id: "p11", name: "Travis Scott\nJordan 1", price: "$650", image: "", sizes: ["10", "10.5"] },
      { id: "p12", name: "Dunk Low\nVersatile", price: "$130", image: "", sizes: ["9.5", "10", "11"] },
    ],
  },
];

const DEFAULT_REGION: MapRegion = {
  latitude: 40.7525,
  longitude: -73.9857,
  latitudeDelta: 0.018,
  longitudeDelta: 0.018,
};

export function useMap() {
  const [query, setQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [region, setRegion] = useState<MapRegion>(DEFAULT_REGION);
  const [stores] = useState<Store[]>(MOCK_STORES);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeFilterCount =
    (filters.size !== "Default" ? 1 : 0) +
    filters.brands.length +
    filters.stores.length;

  const [filteredStores, setFilteredStores] = useState<Store[]>(MOCK_STORES);

  // ── Filter + search stores ────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = query.trim().toLowerCase();

      let result = stores.filter((s) => {
        // ── Brand filter ──
        if (
          filters.brands.length > 0 &&
          !s.products.some((p) =>
            filters.brands.some((b) =>
              p.name.toLowerCase().includes(b.toLowerCase()),
            ),
          )
        ) {
          return false;
        }

        // ── Store filter ──
        if (
          filters.stores.length > 0 &&
          !filters.stores.some((fs) =>
            s.name.toLowerCase().includes(fs.toLowerCase()),
          )
        ) {
          return false;
        }

        // ── Search query ──
        if (!q) return true;
        const name = s.name.toLowerCase();
        const tag = s.tag.toLowerCase();
        return (
          name.startsWith(q) ||
          tag.startsWith(q) ||
          name.split(" ").some((w) => w.startsWith(q)) ||
          tag.split(" ").some((w) => w.startsWith(q))
        );
      });

      setFilteredStores(result);
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, stores, filters]);

  const handleQueryChange = useCallback((text: string) => setQuery(text), []);
  const handleClearQuery = useCallback(() => setQuery(""), []);

  const handleSelectStore = useCallback((store: Store) => setSelectedStore(store), []);
  const handleCloseStore = useCallback(() => setSelectedStore(null), []);

  const handleToggleFollow = useCallback((storeId: string) => {
    setSelectedStore((prev) =>
      prev?.id === storeId ? { ...prev, isFollowing: !prev.isFollowing } : prev,
    );
  }, []);

  const handleGoToCurrentLocation = useCallback(async () => {
    setIsFetchingLocation(true);
    setLocationError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { setLocationError("Location permission denied."); return; }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setRegion((prev) => ({
        ...prev,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));
    } catch {
      setLocationError("Could not get your location.");
    } finally {
      setIsFetchingLocation(false);
    }
  }, []);

  const handleOpenFilterModal = useCallback(() => setIsFilterModalOpen(true), []);
  const handleCloseFilterModal = useCallback(() => setIsFilterModalOpen(false), []);

  // ── Apply filters ─────────────────────────────────────────────────────────
  const handleApplyFilters = useCallback((applied: SearchFilters) => {
    setFilters(applied);
    setIsFilterModalOpen(false);
  }, []);

  const handleResetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return {
    query, handleQueryChange, handleClearQuery,
    filters, activeFilterCount,
    isFilterModalOpen, handleOpenFilterModal, handleCloseFilterModal,
    handleApplyFilters, handleResetFilters,                           // 👈 new
    region, setRegion, filteredStores, nearbyCount: filteredStores.length,
    selectedStore, handleSelectStore, handleCloseStore, handleToggleFollow,
    isFetchingLocation, locationError, handleGoToCurrentLocation,
  };
}