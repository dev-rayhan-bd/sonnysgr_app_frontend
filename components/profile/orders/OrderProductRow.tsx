// components/store/OrderProductRow.tsx
import React from 'react'
import { View, Text, Image } from 'react-native'

interface Props {
  name: string
  size: string
  price: number
  imageUri?: string
}

const OrderProductRow: React.FC<Props> = ({ name, size, price, imageUri }) => (
  <View className="flex-row items-center gap-3 py-4">
    <View className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden">
      {imageUri
        ? <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
        : <View className="w-full h-full bg-gray-200" />
      }
    </View>
    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900">{name}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">{size}</Text>
    </View>
    <Text className="text-base font-extrabold text-gray-900">${price.toFixed(2)}</Text>
  </View>
)

export default OrderProductRow