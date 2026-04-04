// components/discover/storeProfile/StoreReviewBar.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  star: number
  percent: number
}

const StoreReviewBar: React.FC<Props> = ({ star, percent }) => (
  <View className="flex-row items-center gap-2 mb-1.5">
    <Text className="text-xs text-gray-500 w-4 text-right">{star}</Text>
    <View className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <View
        className="h-full rounded-full bg-amber-400"
        style={{ width: `${percent}%` }}
      />
    </View>
    <Text className="text-xs text-gray-400 w-7">{percent}%</Text>
  </View>
)

export default StoreReviewBar