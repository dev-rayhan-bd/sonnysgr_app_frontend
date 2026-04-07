// components/discover/trending/TrendingProductRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { TrendingProduct } from '@/services/hooks/discover/useTrending'

interface Props {
  product: TrendingProduct
  isLast?: boolean
  onPress: () => void
}

const TrendingProductRow: React.FC<Props> = ({ product, isLast, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className={`flex-row items-center gap-3 py-3.5 px-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
  >
    <Text className="text-base font-extrabold text-gray-300 w-5">{product.rank}</Text>
    <View className="w-14 h-14 rounded-xl bg-gray-200 overflow-hidden">
      {product.imageUri
        ? <Image source={{ uri: product.imageUri }} className="w-full h-full" resizeMode="cover" />
        : <View className="w-full h-full bg-gray-200" />
      }
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-400 font-semibold">{product.brand}</Text>
      <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{product.name}</Text>
    </View>
    <View className="items-end gap-1">
      <Text className="text-sm font-extrabold text-gray-900">${product.price}</Text>
      {product.change && (
        <View className="flex-row items-center gap-0.5">
          <Ionicons
            name={product.change === 'up' ? 'arrow-up' : 'arrow-down'}
            size={10}
            color={product.change === 'up' ? '#22C55E' : '#EF4444'}
          />
          <Text
            className="text-[10px] font-bold"
            style={{ color: product.change === 'up' ? '#22C55E' : '#EF4444' }}
          >
            {product.changeValue}%
          </Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
)

export default TrendingProductRow