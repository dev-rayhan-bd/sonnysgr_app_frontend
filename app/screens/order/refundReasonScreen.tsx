// app/screens/order/refundReasonScreen.tsx
import React from 'react'
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useRefundRequest } from '@/services/hooks/profile/useRefundRequest'
import RefundReasonOption from '@/components/profile/orders/RefundReasonOption'
import BaseContainer from '@/components/shared/BaseContainer'
export default function RefundReasonScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const {
    reasons, selectedReason, setReason,
    notes, setNotes, loading, handleSubmit,
  } = useRefundRequest()

  return (
<BaseContainer scrollable backgroundColor='#fff'>
<View className='pt-10'>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100 ">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-gray-900">Refund Request</Text>
          <Text className="text-xs text-gray-400">Step 3 of 4</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-4 pt-5">

          {/* Amount */}
          <View className="items-center mb-6">
            <Text className="text-4xl font-extrabold text-gray-900">$44.00</Text>
            <Text className="text-xs text-gray-400 mt-1">
              Returns to your original payment method
            </Text>
          </View>

          {/* Reasons */}
          <Text className="text-sm font-bold text-gray-700 mb-3">Reason for Refund</Text>
          {reasons.map(r => (
            <RefundReasonOption
              key={r}
              reason={r}
              selected={selectedReason === r}
              onSelect={() => setReason(r)}
            />
          ))}

          {/* Notes */}
          <Text className="text-sm font-bold text-gray-700 mt-4 mb-2">
            Additional Notes (optional)
          </Text>
          <View className="bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-1">
            <TextInput
              placeholder="Describe your issue..."
              placeholderTextColor="#9CA3AF"
              value={notes}
              onChangeText={setNotes}
              multiline
              maxLength={250}
              className="text-sm text-gray-700 min-h-16"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
          <Text className="text-xs text-gray-400 text-right mb-2">{notes.length} / 250</Text>
          <Text className="text-xs text-gray-400 mb-6">
            ⏱ Refunds typically process in 3-5 business days.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100 gap-3">
        <TouchableOpacity
          onPress={() => handleSubmit(() => router.push(`/screens/order/refundSubmittedScreen?id=${id}`))}
          disabled={loading}
          activeOpacity={0.85}
          className="bg-green-500 py-4 rounded-2xl items-center"
        >
          <Text className="text-white text-sm font-extrabold">
            {loading ? 'Submitting...' : 'Submit Refund Request '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} className="py-2 items-center">
          <Text className="text-sm text-gray-400 font-semibold">Back</Text>
        </TouchableOpacity>
      </View>
      </View>
    </BaseContainer>
  )
}