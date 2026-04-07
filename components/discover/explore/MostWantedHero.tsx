// components/discover/trending/MostWantedHero.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { TrendingProduct } from '@/services/hooks/discover/useTrending'

interface Props {
  product: TrendingProduct
  onPress: () => void
}

const MostWantedHero: React.FC<Props> = ({ product, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="bg-gray-900 rounded-3xl overflow-hidden mt-4"
    style={{ minHeight: 200 }}
  >
    {product.imageUri && (
      <Image
        source={{ uri: product.imageUri }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ opacity: 0.4 }}
      />
    )}
    <View className="absolute top-4 right-4 bg-orange-500 px-3 py-1 rounded-full">
      <Text className="text-white text-[10px] font-extrabold">#1 Most Wanted</Text>
    </View>
    <View className="p-5 justify-end" style={{ minHeight: 200 }}>
      <Text className="text-white/50 text-xs font-semibold">{product.brand}</Text>
      <Text className="text-white text-xl font-extrabold mt-0.5">{product.name}</Text>
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-white text-lg font-extrabold">${product.price}</Text>
        {product.change && (
          <View className="flex-row items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
            <Ionicons
              name={product.change === 'up' ? 'trending-up' : 'trending-down'}
              size={14}
              color={product.change === 'up' ? '#22C55E' : '#EF4444'}
            />
            <Text
              className="text-xs font-bold"
              style={{ color: product.change === 'up' ? '#22C55E' : '#EF4444' }}
            >
              {product.changeValue}%
            </Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
)

export default MostWantedHero