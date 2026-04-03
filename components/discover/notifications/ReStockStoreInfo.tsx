// components/notifications/restock/RestockStoreInfo.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { StoreInfo } from '@/services/hooks/discover/useReStockAlert'

interface Props {
  store: StoreInfo
}

const RestockStoreInfo: React.FC<Props> = ({ store }) => (
  <View className="flex-row items-center justify-between px-4 py-3 border-t border-gray-700 mt-2">
    <View className="flex-row items-center gap-2">
      {/* Store avatar */}
      <View className="w-7 h-7 rounded-full bg-green-500 items-center justify-center">
        <Text className="text-white text-[10px] font-bold">{store.initials}</Text>
      </View>
      <Text className="text-white text-xs font-semibold">{store.name}</Text>
      <Text className="text-gray-400 text-xs">· {store.distance}</Text>
    </View>
    <View className="flex-row items-center gap-1">
      <Feather name="clock" size={11} color="#9CA3AF" />
      <Text className="text-gray-400 text-xs">Open until {store.closingTime}</Text>
    </View>
  </View>
)

export default RestockStoreInfo