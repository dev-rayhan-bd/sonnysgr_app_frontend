// components/discover/explore/ExploreProductCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { ExploreProduct } from '@/services/hooks/discover/useExplore'

interface Props {
  product: ExploreProduct
  onPress: () => void
}

const ExploreProductCard: React.FC<Props> = ({ product, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="bg-white rounded-2xl overflow-hidden shadow-sm"
    style={{ width: '48%' }}
  >
    <View className="w-full aspect-square bg-gray-100 relative">
      {product.imageUri
        ? <Image source={{ uri: product.imageUri }} className="w-full h-full" resizeMode="cover" />
        : <View className="w-full h-full bg-gray-200" />
      }
      {product.badge && (
        <View
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: product.badgeColor }}
        >
          <Text className="text-white text-[10px] font-extrabold">{product.badge}</Text>
        </View>
      )}
    </View>
    <View className="p-3">
      <Text className="text-[11px] text-gray-400 font-semibold">{product.brand}</Text>
      <Text className="text-sm font-bold text-gray-900 mt-0.5" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="text-base font-extrabold text-gray-900 mt-1">${product.price}</Text>
    </View>
  </TouchableOpacity>
)

export default ExploreProductCard