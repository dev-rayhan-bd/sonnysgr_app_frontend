// app/screens/store/paymentScreen.tsx
import React from 'react'
import {
  View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { usePayment } from '@/services/hooks/order/usePayment'
import PaymentCardRow from '@/components/profile/orders/PaymentCardRow'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'
const AMOUNT = 243.65

export default function PaymentScreen() {
  const router = useRouter()
  const { cards, selectedCard, setSelectedCard, loading, handlePayNow, handleGPay } = usePayment(AMOUNT)

  return (
     <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
      {/* Nav */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-bold text-gray-900 text-center">Payment</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Amount */}
        <View className="items-center pt-6 pb-4">
          <Text className="text-4xl font-extrabold text-gray-900">${AMOUNT.toFixed(2)}</Text>
          <Text className="text-sm text-gray-400 mt-1">Air Jordan 4 'Black Cat' · Size 10.5</Text>
        </View>

        {/* Pay Instantly */}
        <View className="px-4">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Pay Instantly
          </Text>
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              onPress={handleGPay}
              className="flex-1 bg-gray-900 py-3.5 rounded-2xl items-center justify-center"
            >
              <Text className="text-white font-bold text-sm">Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGPay}
              className="flex-1 border border-gray-200 py-3.5 rounded-2xl items-center justify-center"
            >
              <Text className="text-gray-900 font-bold text-sm">G Pay</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-3 mb-5">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-xs text-gray-400">or pay with card</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Saved Cards */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Saved Cards
          </Text>
          {cards.map(card => (
            <PaymentCardRow
              key={card.id}
              card={card}
              selected={selectedCard === card.id}
              onSelect={() => setSelectedCard(card.id)}
            />
          ))}

          {/* Add new card */}
          <TouchableOpacity
            onPress={() => router.push('/screens/order/addCardScreen')}
            className="flex-row items-center gap-2 py-3"
          >
            <Feather name="plus" size={16} color="#22C55E" />
            <Text className="text-sm font-semibold text-green-600">Add new card</Text>
            <View className="flex-row gap-1 ml-auto">
              {['VISA', 'MC', 'MA'].map(b => (
                <View key={b} className="bg-gray-100 px-1.5 py-0.5 rounded">
                  <Text className="text-[10px] font-bold text-gray-500">{b}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {/* Security note */}
          <View className="flex-row items-center gap-1.5 mt-2">
            <Ionicons name="shield-checkmark-outline" size={13} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">
              Payments are encrypted and secure. GoSNKR never stores your full card details.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Pay button */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
        <Button
          text={loading ? 'Processing...' : `Pay $${AMOUNT.toFixed(2)}`}
          onPress={() => handlePayNow(() => router.push('/screens/discover/reserveForPickupScreen'))}
          useGradient
          gradientColors={['#1a1a1a', '#111827']}
          borderRadius={16}
          paddingVertical={18}
          fontSize={15}
          fontWeight="800"
          disabled={loading}
        />
      </View>
     </View>
    </BaseContainer>
  )
}