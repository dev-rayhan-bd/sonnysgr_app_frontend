// components/order/OrderTimeline.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { OrderTimeline as TimelineItem } from '@/services/hooks/profile/useOrderDetails'

interface Props {
  steps: TimelineItem[]
}

const OrderTimeline: React.FC<Props> = ({ steps }) => (
  <View className="px-4 py-4">
    {steps.map((step, i) => (
      <View key={step.id} className="flex-row gap-3">
        {/* Icon + line */}
        <View className="items-center" style={{ width: 24 }}>
          <View className={`w-6 h-6 rounded-full items-center justify-center ${
            step.cancelled ? 'bg-red-500' : step.done ? 'bg-green-500' : 'bg-gray-200'
          }`}>
            {step.cancelled
              ? <Ionicons name="close" size={12} color="#fff" />
              : step.done
              ? <Ionicons name="checkmark" size={12} color="#fff" />
              : null
            }
          </View>
          {i < steps.length - 1 && (
            <View
              className="w-0.5 my-1"
              style={{
                flex: 1,
                minHeight: 20,
                backgroundColor: step.done ? '#22C55E' : '#E5E7EB',
              }}
            />
          )}
        </View>

        {/* Text */}
        <View className="flex-1 pb-4">
          <Text className={`text-sm font-bold ${step.cancelled ? 'text-red-500' : 'text-gray-900'}`}>
            {step.label}
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">
            {step.date}
            {step.amount ? <Text className="text-gray-600 font-semibold"> {step.amount}</Text> : null}
          </Text>
        </View>
      </View>
    ))}
  </View>
)

export default OrderTimeline