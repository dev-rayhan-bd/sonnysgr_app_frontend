// app/screens/store/addCardScreen.tsx
import React from 'react'
import {
  View, Text, TouchableOpacity, TextInput,
  ScrollView, Switch, KeyboardAvoidingView, Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useAddCard } from '@/services/hooks/order/useAddCard'
import CreditCardPreview from '@/components/profile/orders/CreditCardPreview'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'
export default function AddCardScreen() {
  const router = useRouter()
  const { form, updateField, formatCardNumber, formatExpiry, handleAddCard } = useAddCard()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          {/* Nav */}
          <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
            <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
              <Feather name="arrow-left" size={22} color="#111827" />
            </TouchableOpacity>
            <Text className="flex-1 text-base font-bold text-gray-900 text-center">Add Card</Text>
            <View style={{ width: 30 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

            {/* Card Preview */}
            <View className="mt-6">
              <CreditCardPreview
                number={form.number}
                name={form.name}
                expiry={form.expiry}
              />
            </View>

            {/* Form */}
            <View className="px-4 gap-3">
              {/* Card number */}
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 py-3.5 gap-3">
                <Feather name="credit-card" size={16} color="#9CA3AF" />
                <TextInput
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={form.number}
                  onChangeText={v => updateField('number', formatCardNumber(v))}
                  className="flex-1 text-sm text-gray-900"
                  maxLength={19}
                />
              </View>

              {/* Name */}
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 py-3.5 gap-3">
                <Feather name="user" size={16} color="#9CA3AF" />
                <TextInput
                  placeholder="Name on card"
                  placeholderTextColor="#9CA3AF"
                  value={form.name}
                  onChangeText={v => updateField('name', v)}
                  className="flex-1 text-sm text-gray-900"
                  autoCapitalize="words"
                />
              </View>

              {/* Expiry + CVV */}
              <View className="flex-row gap-3">
                <View className="flex-1 flex-row items-center border border-gray-200 rounded-2xl px-4 py-3.5">
                  <TextInput
                    placeholder="MM/YY"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={form.expiry}
                    onChangeText={v => updateField('expiry', formatExpiry(v))}
                    className="flex-1 text-sm text-gray-900"
                    maxLength={5}
                  />
                </View>
                <View className="flex-1 flex-row items-center border border-gray-200 rounded-2xl px-4 py-3.5">
                  <TextInput
                    placeholder="CVV"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    secureTextEntry
                    value={form.cvv}
                    onChangeText={v => updateField('cvv', v.slice(0, 4))}
                    className="flex-1 text-sm text-gray-900"
                    maxLength={4}
                  />
                </View>
              </View>

              {/* Save card toggle */}
              <View className="flex-row items-center justify-between py-2">
                <Text className="text-sm font-semibold text-gray-700">Save card for future purchases</Text>
                <Switch
                  value={form.saveCard}
                  onValueChange={v => updateField('saveCard', v)}
                  trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </ScrollView>

          {/* Add Card button */}
          <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
            <Button
              text="Add Card"
              onPress={() => handleAddCard(() => router.back())}
              useGradient
              gradientColors={['#1a1a1a', '#111827']}
              borderRadius={16}
              paddingVertical={18}
              fontSize={15}
              fontWeight="800"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </BaseContainer>
  )
}