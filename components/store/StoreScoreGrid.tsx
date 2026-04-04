// components/discover/storeProfile/StoreScoreGrid.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface ScoreItem {
  label: string
  value: number
}

interface Props {
  scores: ScoreItem[]
}

const StoreScoreGrid: React.FC<Props> = ({ scores }) => (
  <View className="flex-row flex-wrap mt-3 gap-y-3">
    {scores.map((s, i) => (
      <View key={i} style={{ width: '50%' }} className="items-center">
        <Text className="text-xl font-extrabold text-gray-900">{s.value.toFixed(1)}</Text>
        <Text className="text-xs text-gray-400 mt-0.5">{s.label}</Text>
      </View>
    ))}
  </View>
)

export default StoreScoreGrid