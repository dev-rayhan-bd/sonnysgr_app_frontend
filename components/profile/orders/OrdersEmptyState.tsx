// components/orders/OrdersEmptyState.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface OrdersEmptyStateProps {
  message?: string
}

const OrdersEmptyState: React.FC<OrdersEmptyStateProps> = ({
  message = 'No more orders this month',
}) => {
  return (
    <View className="items-center justify-center py-16">
      <MaterialCommunityIcons name="shoe-sneaker" size={40} color="#E5E7EB" />
      <Text className="text-sm text-gray-400 mt-4 font-medium">{message}</Text>
    </View>
  )
}

export default OrdersEmptyState