// components/store/OrderStatusTimeline.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { OrderStatusStep } from '@/services/hooks/order/useOrderStatus'

interface Props {
  steps: OrderStatusStep[]
}

const OrderStatusTimeline: React.FC<Props> = ({ steps }) => (
  <View className="px-4 py-4">
    {steps.map((step, i) => (
      <View key={step.id} className="flex-row gap-3">
        {/* Left: icon + line */}
        <View className="items-center" style={{ width: 28 }}>
          <View className={`w-7 h-7 rounded-full items-center justify-center ${
            step.done    ? 'bg-green-500' :
            step.active  ? 'bg-gray-900'  : 'bg-gray-200'
          }`}>
            {step.done ? (
              <Ionicons name="checkmark" size={14} color="#fff" />
            ) : step.active ? (
              <View className="w-3 h-3 rounded-full bg-white" />
            ) : null}
          </View>
          {i < steps.length - 1 && (
            <View className={`w-0.5 flex-1 my-1 ${step.done ? 'bg-green-400' : 'bg-gray-200'}`} style={{ minHeight: 24 }} />
          )}
        </View>

        {/* Right: text */}
        <View className={`flex-1 pb-4 ${step.active ? 'bg-green-50 rounded-2xl p-3 -ml-1' : ''}`}>
          <Text className={`text-sm font-bold ${
            step.done ? 'text-gray-900' : step.active ? 'text-gray-900' : 'text-gray-400'
          }`}>
            {step.label}
          </Text>
          {step.time ? (
            <Text className="text-xs text-gray-400 mt-0.5">{step.time}</Text>
          ) : null}
          {step.detail ? (
            <Text className="text-xs text-green-700 mt-1 font-medium">{step.detail}</Text>
          ) : null}
        </View>
      </View>
    ))}
  </View>
)

export default OrderStatusTimeline