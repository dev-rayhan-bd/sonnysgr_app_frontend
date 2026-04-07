// app/screens/order/refundRequestScreen.tsx
import React from 'react'
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useRefundRequest } from '@/services/hooks/profile/useRefundRequest'
import RefundEligibilityBanner from '@/components/profile/orders/RefundEligibilityBanner'
import BaseContainer from '@/components/shared/BaseContainer'

export default function RefundRequestScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const {
    eligibility, reasons,
    selectedReason, setReason,
    notes, setNotes,
    loading, handleSubmit,
  } = useRefundRequest()

  return (
<BaseContainer scrollable backgroundColor='#fff'>
<View className='pt-10'>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-gray-900">Refund Request</Text>
          <Text className="text-xs text-gray-400">Step 2 of 4</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Product card */}
        <View className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm">
          <View className="flex-row items-center gap-3 p-4">
            <View
              className="w-16 h-16 rounded-2xl"
              style={{ backgroundColor: eligibility.productImageColor }}
            />
            <View className="flex-1">
              <Text className="text-sm font-extrabold text-gray-900">{eligibility.productName}</Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                Size {eligibility.productSize} · {eligibility.productGender}
              </Text>
              <Text className="text-sm font-extrabold text-green-500 mt-1">
                Paid: ${eligibility.amountPaid.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Deposit summary */}
        <View className="bg-white mx-4 mt-3 rounded-2xl px-4 py-3 shadow-sm">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Deposit Summary
          </Text>
          {[
            { label: 'Deposit Paid',   value: `$${eligibility.depositPaid.toFixed(2)}` },
            { label: 'Hold Duration',  value: eligibility.holdDuration },
            { label: 'Hold Expires',   value: eligibility.holdExpires },
          ].map(row => (
            <View key={row.label} className="flex-row justify-between py-1.5">
              <Text className="text-sm text-gray-400">{row.label}</Text>
              <Text className="text-sm font-bold text-gray-900">{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Eligibility */}
        <View className="mt-3">
          <RefundEligibilityBanner
            isEligible={eligibility.isEligible}
            note={eligibility.policyNote}
          />
        </View>

        {/* Store policy */}
        <View className="bg-white mx-4 mt-3 rounded-2xl px-4 py-3 shadow-sm">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Store Policy
          </Text>
          <Text className="text-xs text-gray-500 leading-relaxed">{eligibility.storePolicy}</Text>
        </View>

        {/* Continue */}
        <View className="px-4 mt-5">
          <TouchableOpacity
            onPress={() => router.push(`/screens/order/refundReasonScreen?id=${id}`)}
            className="bg-green-500 py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-sm font-extrabold">Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            className="py-3 items-center"
          >
            <Text className="text-sm text-gray-400 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
</BaseContainer>
  )
}