// components/store/promotion/PromotionTypeCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { PromotionTypeOption, PromotionType } from '@/services/hooks/retailer/promote/useCreatePromotion'

interface Props {
  option: PromotionTypeOption
  selected: boolean
  onSelect: () => void
  isLast?: boolean
}

const PromotionTypeCard: React.FC<Props> = ({ option, selected, onSelect, isLast }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.8}
    className={`flex-row items-center px-4 py-4 border rounded-2xl mb-2 ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'
    }`}
  >
    {/* Icon */}
    <View
      className="w-10 h-10 rounded-xl items-center justify-center mr-3"
      style={{ backgroundColor: option.bgColor }}
    >
      <Text className="text-lg">{option.icon}</Text>
    </View>

    {/* Text */}
    <View className="flex-1">
      <Text className={`text-sm font-bold ${selected ? 'text-gray-900' : 'text-gray-800'}`}>
        {option.id}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">{option.description}</Text>
    </View>

    {/* Check */}
    {selected && (
      <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
    )}
  </TouchableOpacity>
)

export default PromotionTypeCard