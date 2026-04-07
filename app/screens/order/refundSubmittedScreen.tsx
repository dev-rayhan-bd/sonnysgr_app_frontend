// app/screens/order/refundSubmittedScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useRefundSubmitted } from '@/services/hooks/profile/useRefundSubmitted'
import BaseContainer from '@/components/shared/BaseContainer'
export default function RefundSubmittedScreen() {
  const router = useRouter()
  const { data } = useRefundSubmitted()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

          {/* Step indicator */}
          <View className="items-center pt-6 pb-2">
            <Text className="text-xs text-gray-400 font-semibold">Step 1 of 4</Text>
          </View>

          {/* Success hero */}
          <View className="items-center px-6 py-6">
            <View className="w-20 h-20 rounded-full bg-green-500 items-center justify-center mb-5">
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <Text className="text-2xl font-extrabold text-gray-900 mb-1">Refund Submitted</Text>
            <Text className="text-sm text-gray-400 text-center">
              Your request has been received.
            </Text>
          </View>

          {/* Request details */}
          <View className="bg-gray-50 mx-4 rounded-2xl px-4 py-4 mb-4">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Request Details
            </Text>
            {[
              { label: 'Refund Amount', value: `$${data.refundAmount.toFixed(2)}`, green: true },
              { label: 'Request ID', value: data.requestId },
              { label: 'Reason', value: data.reason },
              { label: 'Submitted', value: data.submittedAt },
              { label: 'Est. Return', value: data.estimatedReturn },
            ].map(row => (
              <View key={row.label} className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-sm text-gray-400">{row.label}</Text>
                <Text className={`text-sm font-bold ${(row as any).green ? 'text-green-500' : 'text-gray-900'}`}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>

          {/* What happens next */}
          <View className="mx-4 mb-6">
            <Text className="text-sm font-extrabold text-gray-900 mb-3">What happens next</Text>
            {data.steps.map((step, i) => (
              <View key={step.id} className="flex-row gap-3 mb-3">
                <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center mt-0.5">
                  <Text className="text-white text-xs font-extrabold">{i + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-gray-600 leading-relaxed">{step.label}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View className="px-4 gap-3">
            <TouchableOpacity
              onPress={() => router.push('/screens/order/refundStatusScreen')}
              className="bg-green-500 py-4 rounded-2xl items-center"
            >
              <Text className="text-white text-sm font-extrabold">Track Refund Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/screens/profile/orderScreen')}
              className="py-3 items-center"
            >
              <Text className="text-sm text-gray-400 font-semibold">Back to Orders</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
    </BaseContainer>
  )
}