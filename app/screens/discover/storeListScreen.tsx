// screens/discover/storeListScreen.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoreListItem {
  storeId: string
  name: string
  initials: string
  address: string
  distance: string
  distanceMi: number
  rating: number
  reviewCount: number
  price: number
  stockCount: number
  closingTime: string
  isOpen: boolean
  sizes: string[]
}

// ─── Mock hook — replace with your real API ───────────────────────────────────
const useStoreList = (productId: string) => {
  return {
    loading: false,
    productName: "Air Jordan 4 'Black Cat'",
    stores: [
      {
        storeId: 'store-1',
        name: "Sonny's Kicks",
        initials: 'SK',
        address: '1234 Collins Ave, Miami, FL',
        distance: '1.1 mi',
        distanceMi: 1.1,
        rating: 4.9,
        reviewCount: 142,
        price: 220,
        stockCount: 2,
        closingTime: '9:00 PM',
        isOpen: true,
        sizes: ['8', '9', '10', '10.5', '11'],
      },
      {
        storeId: 'store-2',
        name: 'Kicks City',
        initials: 'KC',
        address: '550 Brickell Ave, Miami, FL',
        distance: '2.5 mi',
        distanceMi: 2.5,
        rating: 4.7,
        reviewCount: 98,
        price: 225,
        stockCount: 5,
        closingTime: '8:00 PM',
        isOpen: true,
        sizes: ['9', '9.5', '10', '11', '12'],
      },
      {
        storeId: 'store-3',
        name: 'Jordan Hub',
        initials: 'JH',
        address: '890 NW 7th St, Miami, FL',
        distance: '4.2 mi',
        distanceMi: 4.2,
        rating: 4.5,
        reviewCount: 67,
        price: 215,
        stockCount: 1,
        closingTime: '7:00 PM',
        isOpen: true,
        sizes: ['10.5'],
      },
      {
        storeId: 'store-4',
        name: 'SneakerVault',
        initials: 'SV',
        address: '3200 N Miami Ave, Miami, FL',
        distance: '6.0 mi',
        distanceMi: 6.0,
        rating: 4.3,
        reviewCount: 44,
        price: 230,
        stockCount: 3,
        closingTime: '10:00 PM',
        isOpen: false,
        sizes: ['8.5', '9', '10', '11'],
      },
    ] as StoreListItem[],
  }
}

// ─── Sort options ─────────────────────────────────────────────────────────────

type SortKey = 'distance' | 'price' | 'rating'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'distance', label: 'Nearest' },
  { key: 'price', label: 'Lowest Price' },
  { key: 'rating', label: 'Top Rated' },
]

// ─── Store card ───────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500']

const StoreCard: React.FC<{
  store: StoreListItem
  colorIndex: number
  onPress: () => void
}> = ({ store, colorIndex, onPress }) => {
  const avatarColor = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
  const isLowStock = store.stockCount <= 2

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="mx-4 mb-3 rounded-3xl border border-gray-100 bg-white overflow-hidden"
      style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
    >
      {/* Top row */}
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
        <View className={`w-12 h-12 rounded-2xl ${avatarColor} items-center justify-center`}>
          <Text className="text-white font-black text-sm">{store.initials}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-black text-gray-900">{store.name}</Text>
            {!store.isOpen && (
              <View className="bg-red-100 rounded-full px-2 py-0.5">
                <Text className="text-red-500 text-[10px] font-bold">Closed</Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center gap-2 mt-0.5">
            <Feather name="star" size={11} color="#F59E0B" />
            <Text className="text-xs text-amber-500 font-bold">{store.rating}</Text>
            <Text className="text-xs text-gray-400">· {store.reviewCount} reviews</Text>
          </View>
        </View>
        {/* Price */}
        <View className="items-end">
          <Text className="text-lg font-black text-gray-900">${store.price}</Text>
          <Text className="text-[10px] text-gray-400">{store.distance}</Text>
        </View>
      </View>

      {/* Address */}
      <View className="flex-row items-center gap-2 px-4 pb-3">
        <Feather name="map-pin" size={12} color="#9CA3AF" />
        <Text className="text-xs text-gray-400 flex-1">{store.address}</Text>
        <Text className="text-xs text-gray-400">Until {store.closingTime}</Text>
      </View>

      {/* Sizes strip */}
      <View className="flex-row items-center gap-2 px-4 pb-3 flex-wrap">
        {store.sizes.map(s => (
          <View key={s} className="bg-gray-100 rounded-lg px-2.5 py-1">
            <Text className="text-xs text-gray-600 font-semibold">{s}</Text>
          </View>
        ))}
      </View>

      {/* Bottom bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
        {isLowStock ? (
          <View className="flex-row items-center gap-1">
            <Feather name="alert-circle" size={12} color="#F97316" />
            <Text className="text-xs text-orange-500 font-bold">Only {store.stockCount} left</Text>
          </View>
        ) : (
          <View className="flex-row items-center gap-1">
            <Feather name="check-circle" size={12} color="#22C55E" />
            <Text className="text-xs text-green-600 font-semibold">{store.stockCount} in stock</Text>
          </View>
        )}
        <View className="flex-row items-center gap-1">
          <Text className="text-xs text-gray-600 font-semibold">View Store</Text>
          <Feather name="chevron-right" size={13} color="#6B7280" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const StoreListScreen: React.FC = () => {
  const router = useRouter()
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const { stores, productName, loading } = useStoreList(productId)

  const [sortKey, setSortKey] = useState<SortKey>('distance')
  const [search, setSearch] = useState('')

  const sortedStores = [...stores]
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === 'distance') return a.distanceMi - b.distanceMi
      if (sortKey === 'price') return a.price - b.price
      if (sortKey === 'rating') return b.rating - a.rating
      return 0
    })

  const handleStorePress = useCallback((store: StoreListItem) => {
    // Navigate to the reserve for pickup screen for this specific store
    router.push(
      `/screens/discover/reserveForPickupScreen?productId=${productId}&storeId=${store.storeId}&size=10.5` as any
    )
  }, [productId, router])

  if (loading) {
    return (
      <BaseContainer backgroundColor="#fff">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22C55E" />
        </View>
      </BaseContainer>
    )
  }

  return (
    <BaseContainer scrollable backgroundColor="#ffff">
      <View className="pt-10">

        {/* ── Header ── */}
        <View className="flex-row items-center px-4 pt-2 pb-3 bg-white border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Feather name="arrow-left" size={22} color="#111" />
          </TouchableOpacity>
          <View className="flex-1 px-3">
            <Text className="text-center text-base font-bold text-gray-900" numberOfLines={1}>
              {stores.length} Stores Have This
            </Text>
            <Text className="text-center text-xs text-gray-400 mt-0.5" numberOfLines={1}>
              {productName}
            </Text>
          </View>
          <View className="w-6" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          {/* ── Search ── */}
          <View className="mx-4 mt-4 flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3">
            <Feather name="search" size={16} color="#9CA3AF" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search stores or areas..."
              placeholderTextColor="#D1D5DB"
              className="flex-1 text-sm text-gray-800"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Feather name="x" size={15} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* ── Sort pills ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
          >
            {SORT_OPTIONS.map(opt => {
              const active = sortKey === opt.key
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => setSortKey(opt.key)}
                  activeOpacity={0.75}
                  className={`px-4 py-2 rounded-full border ${
                    active ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-gray-500'}`}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          {/* ── Store list ── */}
          {sortedStores.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Feather name="search" size={36} color="#D1D5DB" />
              <Text className="text-sm text-gray-400 mt-3 font-medium">No stores match your search</Text>
            </View>
          ) : (
            sortedStores.map((store, i) => (
              <StoreCard
                key={store.storeId}
                store={store}
                colorIndex={i}
                onPress={() => handleStorePress(store)}
              />
            ))
          )}

          <View className="h-10" />
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

export default StoreListScreen