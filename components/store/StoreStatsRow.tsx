// components/discover/storeProfile/StoreStatsRow.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface StatItem {
  label: string
  value: string | number
}

interface Props {
  stats: StatItem[]
}

const StoreStatsRow: React.FC<Props> = ({ stats }) => (
  <View className="flex-row justify-around py-4 border-b border-white/10">
    {stats.map((s, i) => (
      <View key={i} className="items-center">
        <Text className="text-white text-lg font-extrabold">{s.value}</Text>
        <Text className="text-white/50 text-xs font-medium mt-0.5">{s.label}</Text>
      </View>
    ))}
  </View>
)

export default StoreStatsRow