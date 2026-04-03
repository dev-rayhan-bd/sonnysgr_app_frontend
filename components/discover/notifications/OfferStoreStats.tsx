// components/notifications/offer/OfferStoreStats.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { OfferStore } from '@/services/hooks/discover/useOfferFromStore'

interface Props {
  store: OfferStore
}

const Stat: React.FC<{ value: string | number; label: string }> = ({ value, label }) => (
  <View className="items-center flex-1">
    <Text className="text-base font-black text-gray-900">{value}</Text>
    <Text className="text-[11px] text-gray-400 mt-0.5">{label}</Text>
  </View>
)

const OfferStoreStats: React.FC<Props> = ({ store }) => (
  <View className="mx-4 mt-4">
    <Text className="text-sm font-bold text-gray-900 mb-3">About This Store</Text>

    {/* Store header */}
    <View className="flex-row items-center gap-3 mb-4">
      <View className="w-10 h-10 rounded-full bg-amber-400 items-center justify-center">
        <Text className="text-white font-bold text-sm">{store.initials}</Text>
      </View>
      <View>
        <Text className="text-sm font-bold text-gray-900">{store.name}</Text>
        <Text className="text-xs text-gray-400">
          {store.city} · {store.distance} away
        </Text>
      </View>
      {/* Rating */}
      <View className="flex-row items-center gap-1 ml-auto">
        <Feather name="star" size={12} color="#F59E0B" />
        <Text className="text-sm font-bold text-gray-800">{store.rating}</Text>
      </View>
    </View>

    {/* Stats row */}
    <View className="flex-row border border-gray-100 rounded-2xl py-4">
      <Stat value={store.purchases} label="Purchases" />
      <View className="w-px bg-gray-100" />
      <Stat value={store.reviews} label="Reviews" />
      <View className="w-px bg-gray-100" />
      <Stat value={`${store.yearsOnPlatform}yr`} label="On GoSNKR" />
    </View>
  </View>
)

export default OfferStoreStats