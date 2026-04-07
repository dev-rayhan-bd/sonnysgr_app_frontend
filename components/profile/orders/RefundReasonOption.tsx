// components/order/RefundReasonOption.tsx
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import type { RefundReason } from '@/services/hooks/profile/useRefundRequest'

interface Props {
  reason: RefundReason
  selected: boolean
  onSelect: () => void
}

const RefundReasonOption: React.FC<Props> = ({ reason, selected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.8}
    className={`flex-row items-center px-4 py-4 rounded-2xl mb-2 border ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'
    }`}
  >
    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
      selected ? 'border-green-500' : 'border-gray-300'
    }`}>
      {selected && <View className="w-2.5 h-2.5 rounded-full bg-green-500" />}
    </View>
    <Text className={`text-sm font-semibold ${selected ? 'text-green-700' : 'text-gray-700'}`}>
      {reason}
    </Text>
  </TouchableOpacity>
)

export default RefundReasonOption