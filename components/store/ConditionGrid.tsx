import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  CONDITIONS,
  ProductCondition,
} from '@/services/hooks/store/useSellToStore'

interface Props {
  selected: ProductCondition | null
  onSelect: (c: ProductCondition) => void
}

const ConditionGrid: React.FC<Props> = ({ selected, onSelect }) => (
  <View className="flex-row flex-wrap gap-2">
    {CONDITIONS.map(({ label, sub }) => {
      const active = selected === label
      return (
        <TouchableOpacity
          key={label}
          onPress={() => onSelect(label)}
          activeOpacity={0.8}
          className={`rounded-xl border px-4 py-3 items-center ${
            active
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white'
          }`}
          style={{ width: '48%' }}
        >
          <Text
            className={`text-sm font-bold ${
              active ? 'text-green-600' : 'text-gray-800'
            }`}
          >
            {label}
          </Text>
          <Text
            className={`text-xs mt-0.5 ${
              active ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {sub}
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
)

export default ConditionGrid
