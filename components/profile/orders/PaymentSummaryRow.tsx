// components/order/PaymentSummaryRow.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  label: string
  value: string
  highlight?: boolean
  green?: boolean
  red?: boolean
}

const PaymentSummaryRow: React.FC<Props> = ({ label, value, highlight, green, red }) => (
  <View className="flex-row justify-between py-2">
    <Text className={`text-sm ${highlight ? 'font-extrabold text-gray-900' : 'text-gray-400'}`}>
      {label}
    </Text>
    <Text
      className={`text-sm font-bold ${
        green ? 'text-green-500' : red ? 'text-red-500' : highlight ? 'text-gray-900' : 'text-gray-700'
      }`}
    >
      {value}
    </Text>
  </View>
)

export default PaymentSummaryRow