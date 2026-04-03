// components/orders/OrderFilterTabs.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import type { OrderFilter } from '@/services/hooks/profile/useOrders'

const TABS: OrderFilter[] = ['All', 'Completed', 'Active', 'Pick Up Ready', 'Holds', 'Cancelled']

interface OrderFilterTabsProps {
  active: OrderFilter
  onChange: (filter: OrderFilter) => void
}

const OrderFilterTabs: React.FC<OrderFilterTabsProps> = ({ active, onChange }) => {
  return (
    <View className="border-b border-gray-100 bg-white">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {TABS.map(tab => {
          const isActive = tab === active
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onChange(tab)}
              className="mr-6 py-3"
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {tab}
              </Text>
              {/* Active underline */}
              {isActive && (
                <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full" />
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default OrderFilterTabs