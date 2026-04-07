// app/screens/order/refundStatusScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRefundStatus } from '@/services/hooks/profile/useRefundStatus'
import RefundProgressStep from '@/components/profile/orders/RefundProgressStep'
import BaseContainer from '@/components/shared/BaseContainer'
export default function RefundStatusScreen() {
  const router = useRouter()
  const { data, handleContactSupport } = useRefundStatus()

  return (
  <BaseContainer scrollable backgroundColor='#fff'>
    <View className='pt-10'>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100 ">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-gray-900">Refund Status</Text>
          <Text className="text-xs text-gray-400">{data.orderStep}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Product + amount */}
        <View className="bg-white mx-4 mt-4 rounded-2xl px-4 py-4 shadow-sm flex-row items-center gap-3">
          <View className="flex-1">
            <Text className="text-sm font-bold text-gray-900">{data.productName}</Text>
            <Text className="text-xs text-gray-400 mt-0.5">
              Size {data.productSize} · {data.productGender}
            </Text>
          </View>
          <Text className="text-base font-extrabold text-green-500">
            +${data.refundAmount.toFixed(2)}
          </Text>
        </View>

        {/* Refund progress */}
        <View className="bg-white mx-4 mt-3 rounded-2xl px-4 pt-4 pb-2 shadow-sm">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Refund Progress
          </Text>
          {data.steps.map((step, i) => (
            <RefundProgressStep
              key={step.id}
              step={step}
              isLast={i === data.steps.length - 1}
            />
          ))}
        </View>

        {/* Estimated timeline */}
        <View className="bg-white mx-4 mt-3 rounded-2xl px-4 py-4 shadow-sm gap-2">
          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text className="text-sm text-gray-600">
              Refund expected by <Text className="font-bold text-gray-900">{data.estimatedDate}</Text>
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="card-outline" size={16} color="#9CA3AF" />
            <Text className="text-sm text-gray-600">
              Return to Visa <Text className="font-bold text-gray-900">{data.paymentRef}</Text>
            </Text>
          </View>
        </View>

        {/* Help */}
        <TouchableOpacity
          onPress={handleContactSupport}
          className="bg-white mx-4 mt-3 rounded-2xl px-4 py-4 shadow-sm flex-row items-center gap-3"
        >
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="headset-outline" size={20} color="#6B7280" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-gray-900">Need help with your refund?</Text>
            <Text className="text-xs text-gray-400 mt-0.5">Contact support</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#D1D5DB" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom actions */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100 gap-3">
        <TouchableOpacity
          onPress={() => router.push('/screens/profile/orderScreen')}
          activeOpacity={0.85}
          className="bg-gray-900 py-4 rounded-2xl items-center"
        >
          <Text className="text-white text-sm font-extrabold">Back to Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContactSupport} className="py-2 items-center">
          <Text className="text-sm text-gray-400 font-semibold">Contact Support</Text>
        </TouchableOpacity>
      </View>
      </View>
 </BaseContainer>
  )
}