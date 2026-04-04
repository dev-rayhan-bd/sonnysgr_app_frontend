import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import type { FollowedBrand } from '@/services/hooks/profile/useFollowing'
interface Props {
  brand: FollowedBrand
  onPress?: () => void
}

const BrandCard: React.FC<Props> = ({ brand, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="flex-1 items-center py-5 mx-2 mb-4"
  >
    <View
      className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
      style={{ backgroundColor: brand.brandColor }}
    >
      <Text className="text-white text-lg font-extrabold">{brand.initials}</Text>
    </View>
    <Text className="text-sm font-bold text-gray-900">{brand.name}</Text>
    <Text className="text-xs text-green-500 font-medium mt-0.5 text-center">
      {brand.pairsInSize} pairs in your{'\n'}size nearby
    </Text>
  </TouchableOpacity>
)

export default BrandCard