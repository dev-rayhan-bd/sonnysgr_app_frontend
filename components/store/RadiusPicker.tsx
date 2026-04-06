import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RADIUS_OPTIONS, RadiusMiles } from '@/services/hooks/store/useSellToStore'

interface Props {
  selected: RadiusMiles
  onSelect: (r: RadiusMiles) => void
}

const RadiusPicker: React.FC<Props> = ({ selected, onSelect }) => (
  <View className="flex-row gap-2">
    {RADIUS_OPTIONS.map(r => {
      const active = selected === r
      return (
        <TouchableOpacity
          key={r}
          onPress={() => onSelect(r)}
          activeOpacity={0.8}
          className={`flex-1 py-2 rounded-full border items-center ${
            active
              ? 'bg-gray-900 border-gray-900'
              : 'bg-white border-gray-200'
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              active ? 'text-white' : 'text-gray-500'
            }`}
          >
            {r} miles
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
)

export default RadiusPicker