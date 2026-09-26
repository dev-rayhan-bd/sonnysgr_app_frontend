// components/profile/FavoriteBrands.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { ProfileData } from '@/services/hooks/profile/useProfile'

interface FavoriteBrandsProps {
  brands: ProfileData['favoriteBrands']
  followedStoresCount: number
  onEdit: () => void
  onFollowedStores: () => void
}

const FavoriteBrands: React.FC<FavoriteBrandsProps> = ({
  brands,
  followedStoresCount,
  onEdit,
  onFollowedStores,
}) => (
  <View
    className="bg-white rounded-2xl px-4 py-4 mb-4"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    }}
  >
    <View className="flex-row justify-between items-center mb-3.5">
      <Text className="text-base font-extrabold text-gray-900">Brands & stores</Text>
      <TouchableOpacity onPress={onEdit} className="flex-row items-center gap-0.5">
        <Text className="text-xs font-bold text-green-600">Manage</Text>
        <Feather name="chevron-right" size={13} color="#16A34A" />
      </TouchableOpacity>
    </View>

    <Text className="text-xs text-gray-400 font-semibold mb-2.5">Favorite brands</Text>
    <View className="flex-row flex-wrap gap-2 mb-4">
      {brands.map((brand) => (
        <View key={brand.id} className="bg-gray-100 rounded-full px-4 py-2">
          <Text className="text-xs font-bold text-gray-800">{brand.label}</Text>
        </View>
      ))}
    </View>

    <View style={{ height: 1, backgroundColor: '#F3F4F6' }} className="mb-3.5" />

    <TouchableOpacity
      onPress={onFollowedStores}
      activeOpacity={0.7}
      className="flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-2.5">
        <Feather name="home" size={17} color="#6B7280" />
        <Text className="text-sm font-semibold text-gray-700">Followed stores</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <Text className="text-sm font-bold text-gray-400">{followedStoresCount}</Text>
        <Feather name="chevron-right" size={16} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  </View>
)

export default FavoriteBrands