// components/discover/trending/TrendingLocalCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { TrendingLocalProduct } from '@/services/hooks/discover/useTrending'

interface Props {
  product: TrendingLocalProduct
  onPress: () => void
}

const TrendingLocalCard: React.FC<Props> = ({ product, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="bg-white rounded-2xl overflow-hidden shadow-sm mr-3"
    style={{ width: 150 }}
  >
    <View className="w-full h-36 bg-gray-200 relative">
      {product.imageUri
        ? <Image source={{ uri: product.imageUri }} className="w-full h-full" resizeMode="cover" />
        : <View className="w-full h-full bg-gray-200" />
      }
      <View className="absolute top-2 left-2 flex-row items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full">
        <Ionicons name="location-outline" size={10} color="#fff" />
        <Text className="text-white text-[10px] font-bold">{product.location}</Text>
      </View>
    </View>
    <View className="p-2.5">
      <Text className="text-xs text-gray-400 font-semibold">{product.brand}</Text>
      <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{product.name}</Text>
      <Text className="text-sm font-extrabold text-gray-900 mt-1">${product.price}</Text>
    </View>
  </TouchableOpacity>
)

export default TrendingLocalCard