// components/store/promotion/RadiusMap.tsx
import React from 'react'
import { View, Text } from 'react-native'
import type { RadiusOption } from '@/services/hooks/retailer/promote/useRadiusPromotion'

interface Props {
  radius: RadiusOption
}

const SIZE_MAP: Record<RadiusOption, number> = { 5: 80, 10: 110, 25: 140 }

const RadiusMap: React.FC<Props> = ({ radius }) => {
  const circleSize = SIZE_MAP[radius]

  return (
    <View
      className="mx-4 rounded-3xl bg-gray-100 items-center justify-center overflow-hidden"
      style={{ height: 200 }}
    >
      {/* Outer ring */}
      <View
        className="rounded-full border-2 border-green-200 items-center justify-center"
        style={{ width: circleSize + 60, height: circleSize + 60 }}
      >
        {/* Inner ring */}
        <View
          className="rounded-full border-2 border-green-400 bg-green-100/50 items-center justify-center"
          style={{ width: circleSize, height: circleSize }}
        >
          {/* Store pin */}
          <View className="w-8 h-8 rounded-full bg-white shadow-sm items-center justify-center">
            <Text className="text-base">🏪</Text>
          </View>
        </View>
      </View>

      {/* Radius label */}
      <View className="absolute top-3 right-3 bg-gray-900 px-2.5 py-1 rounded-full">
        <Text className="text-white text-xs font-bold">{radius} miles</Text>
      </View>
    </View>
  )
}

export default RadiusMap