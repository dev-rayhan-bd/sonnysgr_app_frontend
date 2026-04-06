// screens/discover/holdWithDepositScreen.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import BaseContainer from '@/components/shared/BaseContainer'

const useHoldProduct = (productId: string, size: string) => {
  return {
    loading: false,
    product: {
      productId,
      name: "Air Jordan 4 'Black Cat'",
      colorway: 'Retro OG Colorway',
      size,
      imageUrl: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
      fullPrice: 220.0,
      depositPercent: 20,
      store: {
        name: "Sonny's Kicks",
        initials: 'SK',
        rating: 4.9,
        distance: '1.1 mi',
        closingTime: '9:00 PM',
      },
    },
  }
}

const HOLD_DURATIONS = [
  { label: '24 hours', hours: 24, deposit: 30 },
  { label: '48 hours', hours: 48, deposit: 50 },
  { label: '72 hours', hours: 72, deposit: 75 },
]

const HoldWithDepositScreen: React.FC = () => {
  const router = useRouter()
  const { productId, size } = useLocalSearchParams<{ productId: string; size: string }>()
  const { product, loading } = useHoldProduct(productId, size)

  const [selectedHours, setSelectedHours] = useState(48)
  const [placing, setPlacing] = useState(false)

  const selectedDuration = HOLD_DURATIONS.find(d => d.hours === selectedHours)!

  const handlePlaceHold = useCallback(async () => {
    setPlacing(true)
    await new Promise(r => setTimeout(r, 1000))
    setPlacing(false)
    Toast.show({
      type: 'success',
      text1: 'Hold Placed! 🔒',
      text2: `Your pair is reserved for ${selectedHours} hrs.`,
      visibilityTime: 4500,
    })
    router.push("/screens/order/paymentScreen")
  }, [selectedHours, router])

  if (loading || !product) {
    return (
      <BaseContainer backgroundColor="#fff">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </BaseContainer>
    )
  }

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="pt-10">

        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#111" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-gray-900">Hold with Deposit</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="x" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          {/* ── Steps indicator ── */}
          <View className="flex-row items-center justify-center px-6 py-4 gap-2">
            {/* Step 1 */}
            <View className="items-center gap-1">
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                <Feather name="credit-card" size={14} color="#16a34a" />
              </View>
              <Text className="text-[10px] text-green-700 font-semibold">Pay Deposit</Text>
            </View>

            {/* connector */}
            <View className="flex-1 flex-row items-center mb-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Feather name="chevron-right" size={12} color="#d1d5db" />
            </View>

            {/* Step 2 */}
            <View className="items-center gap-1">
              <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center">
                <Feather name="shopping-bag" size={14} color="#fff" />
              </View>
              <Text className="text-[10px] text-green-600 font-semibold">Store Holds It</Text>
            </View>

            {/* connector */}
            <View className="flex-1 flex-row items-center mb-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Feather name="chevron-right" size={12} color="#d1d5db" />
            </View>

            {/* Step 3 */}
            <View className="items-center gap-1">
              <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                <Feather name="shopping-cart" size={14} color="#9ca3af" />
              </View>
              <Text className="text-[10px] text-gray-400 font-semibold text-center">Pick Up &{'\n'}Pay Rest</Text>
            </View>
          </View>

          {/* ── Product row ── */}
          <View className="mx-4 flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3">
            <Image
              source={{ uri: product.imageUrl }}
              className="w-16 h-12"
              resizeMode="contain"
            />
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5 mb-0.5">
                <View className="bg-red-500 rounded px-1.5 py-0.5">
                  <Text className="text-white text-[9px] font-black">New</Text>
                </View>
                <View className="bg-gray-100 rounded px-1.5 py-0.5">
                  <Text className="text-gray-600 text-[9px] font-semibold">With Tags</Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{product.name}</Text>
              <Text className="text-xs text-gray-400">Size {product.size} · Black · 1 unit</Text>
            </View>
            <Text className="text-base font-black text-gray-900">${product.fullPrice.toFixed(0)}</Text>
          </View>

          {/* ── Store hold policy ── */}
          <View className="mx-4 mt-4">
            <Text className="text-xs font-bold text-gray-900 mb-3">
              {product.store.name}'s Hold Policy
            </Text>
            <View className="bg-gray-50 rounded-2xl px-4 py-1">
              {[
                { label: 'Hold Duration', value: `${selectedHours} hours` },
                { label: 'Item Reserved', value: `Size ${product.size} · Black · 1 unit` },
                { label: 'Deposit Amount', value: `$${selectedDuration.deposit}.00` },
                { label: 'Deposit Applied To', value: 'Final purchase price', green: true },
                { label: 'Deposit Refundable?', value: 'No — store policy', red: true },
              ].map((row, i, arr) => (
                <View
                  key={row.label}
                  className={`flex-row justify-between items-center py-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Text className="text-xs text-gray-500 flex-1">{row.label}</Text>
                  <Text className={`text-xs font-semibold ${row.green ? 'text-green-600' : row.red ? 'text-red-500' : 'text-gray-900'}`}>
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Info note ── */}
          <View className="mx-4 mt-3 flex-row items-start gap-2 bg-blue-50 rounded-xl px-3 py-2.5">
            <Feather name="info" size={13} color="#3B82F6" style={{ marginTop: 1 }} />
            <Text className="text-xs text-blue-700 leading-relaxed flex-1">
              Deposit is non-refundable. Store holds your item for exactly {selectedHours} hours.
            </Text>
          </View>

          {/* ── Hold duration selector ── */}
          <View className="px-4 mt-5">
            <Text className="text-xs font-bold text-gray-900 mb-3">Select Hold Duration</Text>
            <View className="flex-row gap-2">
              {HOLD_DURATIONS.map(d => {
                const selected = selectedHours === d.hours
                return (
                  <TouchableOpacity
                    key={d.hours}
                    onPress={() => setSelectedHours(d.hours)}
                    activeOpacity={0.7}
                    className={`flex-1 items-center py-3 rounded-2xl border-2 ${
                      selected ? 'border-gray-900 bg-white' : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <Text className={`text-[11px] font-semibold mb-0.5 ${selected ? 'text-gray-900' : 'text-gray-400'}`}>
                      {d.label}
                    </Text>
                    <Text className={`text-sm font-black ${selected ? 'text-gray-900' : 'text-gray-400'}`}>
                      ${d.deposit}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <View className="h-36" />
        </ScrollView>

        {/* ── Sticky CTA ── */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handlePlaceHold}
            disabled={placing}
            activeOpacity={0.85}
            className={`rounded-2xl py-4 items-center justify-center flex-row gap-2 ${placing ? 'bg-gray-300' : 'bg-gray-900'}`}
          >
            {placing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Feather name="lock" size={16} color="#fff" />
                <Text className="text-white font-black text-base">
                  Pay ${selectedDuration.deposit}.00 Deposit
                </Text>
              </>
            )}
          </TouchableOpacity>
          <Text className="text-center text-[10px] text-gray-400 mt-2">
            By paying the deposit you agree to the store's hold policy.
          </Text>
        </View>

      </View>
    </BaseContainer>
  )
}

export default HoldWithDepositScreen