import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import {
  NEXT_STEPS,
  useDealConfirmed,
} from '@/services/hooks/store/useDealConfirmed'

export default function DealConfirmedScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{
    shoeName?: string
    agreedPrice?: string
    buyerName?: string
  }>()

  const shoeName = params.shoeName || 'Your item'
  const buyerName = params.buyerName || 'The store'
  const parsedPrice = Number(params.agreedPrice)
  const agreedPrice = Number.isFinite(parsedPrice) ? parsedPrice : 0

  const { handleViewTransaction } = useDealConfirmed({
    shoeName,
    agreedPrice,
    buyerName,
  })

  const formattedPrice = agreedPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <BaseContainer backgroundColor="#FFFFFF" scrollable>
      <View className="pt-12 px-4 pb-10 min-h-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="x" size={20} color="#111827" />
        </TouchableOpacity>

        <View className="items-center mt-8">
          <View className="w-24 h-24 rounded-full bg-green-50 items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-green-500 items-center justify-center">
              <Feather name="check" size={32} color="#FFFFFF" />
            </View>
          </View>

          <Text className="text-3xl font-black text-gray-900 mt-6 text-center">
            Deal confirmed!
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2 leading-5 px-8">
            {buyerName} accepted the deal. Your sale is now locked in.
          </Text>
        </View>

        <View className="mt-8 rounded-[28px] bg-gray-950 px-5 py-6">
          <Text className="text-[10px] font-bold text-gray-500 tracking-[2px] uppercase">
            Your payout
          </Text>
          <Text className="text-5xl font-black text-white mt-2">${formattedPrice}</Text>

          <View className="h-px bg-gray-800 my-5" />

          <Text className="text-xs text-gray-500 mb-1">ITEM</Text>
          <Text className="text-base font-extrabold text-white">{shoeName}</Text>

          <View className="flex-row items-center gap-2 mt-4">
            <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center">
              <Feather name="shopping-bag" size={14} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-[10px] text-gray-500 uppercase tracking-wider">Buyer</Text>
              <Text className="text-sm font-bold text-gray-200">{buyerName}</Text>
            </View>
          </View>
        </View>

        <Text className="text-[10px] font-bold text-gray-400 tracking-[1.6px] uppercase mt-8 mb-3">
          What happens next
        </Text>

        <View className="rounded-2xl bg-gray-50 px-4 overflow-hidden">
          {NEXT_STEPS.map((step, index) => (
            <View
              key={step}
              className={`flex-row gap-3 py-4 ${
                index !== NEXT_STEPS.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <View className="w-7 h-7 rounded-full bg-white border border-gray-200 items-center justify-center">
                <Text className="text-[11px] font-black text-gray-800">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-sm text-gray-700 leading-5">{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleViewTransaction}
          activeOpacity={0.85}
          className="h-14 rounded-2xl bg-green-500 items-center justify-center mt-8"
        >
          <Text className="text-white text-sm font-black">View Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/tabs/discoverScreen')}
          activeOpacity={0.8}
          className="h-12 items-center justify-center mt-2"
        >
          <Text className="text-sm font-bold text-gray-400">Back to Discover</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}
