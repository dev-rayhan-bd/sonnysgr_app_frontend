// components/order/OrderDetailProduct.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  name: string
  size: string
  gender: string
  imageColor: string
  storeName: string
  storeDistance: string
  status: string
}

const OrderDetailProduct: React.FC<Props> = ({
  name, size, gender, imageColor, storeName, storeDistance, status,
}) => (
  <View className="flex-row items-center gap-3 px-4 py-4">
    <View
      className="w-16 h-16 rounded-2xl"
      style={{ backgroundColor: imageColor }}
    />
    <View className="flex-1">
      <View className="flex-row items-center gap-2 mb-0.5">
        <Text className="text-sm font-extrabold text-gray-900" numberOfLines={1}>
          {name}
        </Text>
        <View className="bg-red-100 px-2 py-0.5 rounded-full">
          <Text className="text-red-500 text-[10px] font-extrabold">{status.toUpperCase()}</Text>
        </View>
      </View>
      <Text className="text-xs text-gray-400">Size {size} · {gender}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">{storeName} · {storeDistance}</Text>
    </View>
  </View>
)

export default OrderDetailProduct