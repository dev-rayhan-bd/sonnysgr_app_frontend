// components/order/RefundEligibilityBanner.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  isEligible: boolean
  note: string
}

const RefundEligibilityBanner: React.FC<Props> = ({ isEligible, note }) => (
  <View
    className={`mx-4 rounded-2xl px-4 py-3 flex-row items-start gap-2 ${
      isEligible ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
    }`}
  >
    <Ionicons
      name={isEligible ? 'checkmark-circle' : 'close-circle'}
      size={18}
      color={isEligible ? '#22C55E' : '#EF4444'}
      style={{ marginTop: 1 }}
    />
    <View className="flex-1">
      <Text className={`text-xs font-extrabold mb-0.5 ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
        {isEligible ? 'Eligible for Refund' : 'Not Eligible for Refund'}
      </Text>
      <Text className={`text-xs ${isEligible ? 'text-green-600' : 'text-red-500'}`}>{note}</Text>
    </View>
  </View>
)

export default RefundEligibilityBanner