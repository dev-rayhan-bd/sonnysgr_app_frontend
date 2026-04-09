import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import type { CartItem as CartItemType } from '@/services/hooks/cart/useCart'

interface CartItemProps {
  item: CartItemType
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
}

const CartItemCard: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View className="flex-row bg-[#F9FAFB] rounded-3xl p-5 mb-5 shadow-md items-center">
      <View className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden mr-4">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <Text className="text-xs font-bold tracking-widest text-green-500 uppercase">
          {item.productType}
        </Text>

        <Text
          className="text-lg font-extrabold text-gray-900 mt-1"
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text className="text-sm text-gray-400 mt-1">
          {item.brand} · {item.colorway}
        </Text>

        <Text className="text-sm text-gray-400 mt-0.5">
          Size {item.size} · {item.store} ({item.distance})
        </Text>

        <Text className="text-xs text-gray-300 mt-0.5">{item.sku}</Text>

        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-xl font-extrabold text-gray-900">
            ${item.price}
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => onDecrement(item.id)}
              className="w-10 h-10 rounded-full border border-gray-300 items-center justify-center"
            >
              <Text className="text-gray-700 text-xl">-</Text>
            </TouchableOpacity>

            <Text className="text-lg font-bold text-gray-900 w-6 text-center">
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              className="w-10 h-10 rounded-full bg-black items-center justify-center"
            >
              <Text className="text-white text-xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        className="absolute top-4 right-4 w-9 h-9 bg-red-100 rounded-full items-center justify-center"
      >
        <Text className="text-red-500 text-base">X</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartItemCard
