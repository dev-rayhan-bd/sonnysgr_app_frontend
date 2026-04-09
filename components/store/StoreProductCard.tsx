import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { StoreProduct } from '@/services/hooks/store/useStoreProfile'

interface Props {
  product: StoreProduct
  onPress?: () => void
}

const StoreProductCard: React.FC<Props> = ({ product, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="bg-white rounded-2xl overflow-hidden mr-3"
    style={{ width: 150 }}
  >
    <View className="w-full h-36 bg-gray-200 relative">
      {product.imageUri ? (
        <Image source={{ uri: product.imageUri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <View className="w-full h-full bg-gray-200" />
      )}
      {product.badge && (
        <View
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: product.badgeColor ?? '#22C55E' }}
        >
          <Text className="text-white text-[10px] font-extrabold">{product.badge}</Text>
        </View>
      )}
    </View>

    <View className="p-2.5">
      <Text className="text-[10px] font-bold uppercase tracking-widest text-green-500">
        {product.productType}
      </Text>
      <Text className="text-xs font-bold text-gray-900 mt-1" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="text-[11px] text-gray-400 mt-0.5">
        {product.audience} · Size {product.size}
      </Text>
      <Text className="text-sm font-extrabold text-gray-900 mt-1">${product.price}</Text>
    </View>
  </TouchableOpacity>
)

export default StoreProductCard
