// components/store/OrderSummaryRow.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  label: string
  value: string
  bold?: boolean
}

const OrderSummaryRow: React.FC<Props> = ({ label, value, bold }) => (
  <View className="flex-row justify-between py-1.5">
    <Text className={`text-sm ${bold ? 'font-extrabold text-gray-900' : 'text-gray-400'}`}>
      {label}
    </Text>
    <Text className={`text-sm ${bold ? 'font-extrabold text-gray-900' : 'text-gray-700'}`}>
      {value}
    </Text>
  </View>
)

export default OrderSummaryRow