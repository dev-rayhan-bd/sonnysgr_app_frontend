// components/personalize/StepIndicator.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  current: number
  total: number
}

export default function StepIndicator({ current, total }: Props) {
  const fillPercent = Math.round((current / total) * 100)

  return (
    <View className="items-center gap-y-1.5 mb-6">
      <Text className="text-xs font-medium text-gray-400">
        Step {current} of {total}
      </Text>
      <View className="w-28 h-[3px] bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${fillPercent}%` }}
        />
      </View>
    </View>
  )
}