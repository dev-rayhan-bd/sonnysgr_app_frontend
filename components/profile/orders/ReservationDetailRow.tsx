// components/store/ReservationDetailRow.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  label: string
  value: string
}

const ReservationDetailRow: React.FC<Props> = ({ label, value }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
    <Text className="text-sm text-gray-400">{label}</Text>
    <Text className="text-sm font-bold text-gray-900">{value}</Text>
  </View>
)

export default ReservationDetailRow