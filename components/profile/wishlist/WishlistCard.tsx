import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { WishlistItem } from '@/services/hooks/profile/useWishlist'

interface WishlistCardProps {
  item: WishlistItem
  isLast: boolean
  onToggleLike: (id: string) => void
}

const STOCK_BG: Record<WishlistItem['status'], string> = {
  'In Stock': '#22C55E',
  'Low Stock': '#F97316',
  'Sold Out': '#6B7280',
}

export default function WishlistCard({
  item,
  isLast,
  onToggleLike,
}: WishlistCardProps) {
  const stockColor = STOCK_BG[item.status]

  return (
    <View
      className={`flex-row items-center px-4 py-3 bg-white ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      <View className="w-[120px] h-[120px] rounded-xl overflow-hidden bg-gray-100 mr-3">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View
          className="absolute top-2 left-2 px-2 py-[3px] rounded-full"
          style={{ backgroundColor: stockColor }}
        >
          <Text className="text-white text-[10px] font-extrabold">
            {item.status}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => onToggleLike(item.id)}
          activeOpacity={0.7}
          className="absolute top-2 right-2 w-8 h-8 items-center justify-center"
        >
          <Ionicons
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isLiked ? '#FF3B6B' : '#fff'}
          />
        </TouchableOpacity>

        {item.isPriceDropped && (
          <View className="absolute bottom-0 left-0 right-0 py-[3px] items-center bg-red-500">
            <Text className="text-white text-[9px] font-extrabold">
              Price Drop
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1">
        <Text className="text-[10px] font-semibold text-green-500 tracking-widest uppercase">
          {item.productType}
        </Text>

        <Text className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-[2px]">
          {item.brand}
        </Text>

        <Text numberOfLines={1} className="text-[14px] font-bold text-gray-900 mt-[1px]">
          {item.name}
        </Text>

        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
          <Text className="text-[12px] text-gray-500">Saved in size {item.size}</Text>
        </View>

        <Text className="text-[11px] text-gray-400 mt-[1px]">
          Available at {item.storesNearby} store{item.storesNearby !== 1 ? 's' : ''} near you
        </Text>

        <View className="flex-row items-center gap-2 mt-[5px]">
          <Text className="text-[15px] font-bold text-gray-900">${item.price}</Text>
          {item.originalPrice && (
            <Text className="text-[12px] text-gray-400 line-through">${item.originalPrice}</Text>
          )}
          {item.discount && (
            <Text className="text-[12px] font-semibold text-green-500">
              ${item.discount} off
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}
