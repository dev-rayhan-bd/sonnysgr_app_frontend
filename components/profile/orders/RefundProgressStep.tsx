// components/order/RefundProgressStep.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { RefundStatusStep } from '@/services/hooks/profile/useRefundStatus'

interface Props {
  step: RefundStatusStep
  isLast: boolean
}

const RefundProgressStep: React.FC<Props> = ({ step, isLast }) => (
  <View className="flex-row gap-3">
    <View className="items-center" style={{ width: 28 }}>
      <View className={`w-7 h-7 rounded-full items-center justify-center ${
        step.status === 'done'   ? 'bg-green-500' :
        step.status === 'active' ? 'bg-gray-900'  : 'bg-gray-200'
      }`}>
        {step.status === 'done'   && <Ionicons name="checkmark" size={14} color="#fff" />}
        {step.status === 'active' && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
      </View>
      {!isLast && (
        <View
          className="w-0.5 my-1"
          style={{ flex: 1, minHeight: 24, backgroundColor: step.status === 'done' ? '#22C55E' : '#E5E7EB' }}
        />
      )}
    </View>

    <View className={`flex-1 pb-5 ${step.status === 'active' ? 'bg-green-50 rounded-2xl p-3 -ml-1' : ''}`}>
      <View className="flex-row items-center justify-between">
        <Text className={`text-sm font-bold ${
          step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
        }`}>
          {step.label}
        </Text>
        {step.detail && (
          <View className="bg-green-500 px-2.5 py-0.5 rounded-full">
            <Text className="text-white text-[10px] font-extrabold">{step.detail}</Text>
          </View>
        )}
      </View>
      <Text className="text-xs text-gray-400 mt-0.5">{step.date}</Text>
    </View>
  </View>
)

export default RefundProgressStep