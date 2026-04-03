// components/orders/OrderGroup.tsx
import React from 'react'
import { View, Text } from 'react-native'
import OrderCard from './OrderCard'
import type { Order } from '@/services/hooks/profile/useOrders'

interface OrderGroupProps {
  group: string
  items: Order[]
  onPressOrder: (id: string) => void
}

const OrderGroup: React.FC<OrderGroupProps> = ({ group, items, onPressOrder }) => {
  return (
    <View className="mb-3">
      {/* Section label */}
      <Text className="text-[11px] font-bold text-gray-400 tracking-widest px-4 pt-4 pb-2 uppercase">
        {group}
      </Text>

      {/* Card */}
      <View
        className="bg-white mx-4 rounded-2xl overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        {items.map((order, index) => (
          <View key={order.id}>
            <OrderCard order={order} onPress={onPressOrder} />
            {index < items.length - 1 && (
              <View className="h-px bg-gray-100 mx-4" />
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default OrderGroup