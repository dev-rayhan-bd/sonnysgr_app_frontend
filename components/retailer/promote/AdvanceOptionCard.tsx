// components/store/promotion/AudienceOptionCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { AudienceOption } from '@/services/hooks/retailer/promote/useCreatePromotion'

interface Props {
  option: AudienceOption
  selected: boolean
  onSelect: () => void
}

const AudienceOptionCard: React.FC<Props> = ({ option, selected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.8}
    className={`flex-row items-center px-4 py-3.5 rounded-2xl mb-2 border ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'
    }`}
  >
    <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3">
      <Text className="text-base">{option.icon}</Text>
    </View>
    <View className="flex-1">
      <Text className={`text-sm font-bold ${selected ? 'text-green-700' : 'text-gray-900'}`}>
        {option.id}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">{option.description}</Text>
    </View>
    {selected && <Ionicons name="checkmark-circle" size={20} color="#22C55E" />}
  </TouchableOpacity>
)

export default AudienceOptionCard