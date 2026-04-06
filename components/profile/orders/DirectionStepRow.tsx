// components/store/DirectionStepRow.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { DirectionStep } from '@/services/hooks/order/useDirections'

interface Props {
  step: DirectionStep
  isLast?: boolean
}

const DirectionStepRow: React.FC<Props> = ({ step, isLast }) => (
  <View className={`flex-row items-center gap-3 py-3.5 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
      <Feather name="corner-right-down" size={14} color="#374151" />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-900">{step.instruction}</Text>
    </View>
    <Text className="text-xs text-gray-400 font-medium">{step.distance}</Text>
  </View>
)

export default DirectionStepRow