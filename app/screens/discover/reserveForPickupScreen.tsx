// screens/discover/reserveForPickupScreen.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import BaseContainer from '@/components/shared/BaseContainer'

const useReserveProduct = (productId: string, size: string) => {
  return {
    loading: false,
    product: {
      productId,
      name: "Air Jordan 4 'Black Cat'",
      size,
      gender: "Men's",
      price: 220.0,
      imageUrl: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
    },
    store: {
      name: "Sonny's Kicks",
      initials: 'SK',
      address: '1234 Collins Ave, Miami, FL 33139',
      distance: '1.1 miles away',
      status: 'Open',
      closingTime: '9 PM',
      reservationExpiresHours: 24,
    },
  }
}

const TIME_SLOTS = [
  { time: '11:00 AM', popular: false, unavailable: false },
  { time: '11:30 AM', popular: false, unavailable: false },
  { time: '12:00 PM', popular: false, unavailable: false },
  { time: '12:30 PM', popular: false, unavailable: false },
  { time: '1:00 PM',  popular: false, unavailable: false },
  { time: '1:30 PM',  popular: false, unavailable: false },
  { time: '2:00 PM',  popular: true,  unavailable: false },
  { time: '2:30 PM',  popular: false, unavailable: false },
  { time: '3:00 PM',  popular: false, unavailable: true  },
  { time: '3:30 PM',  popular: false, unavailable: false },
  { time: '4:00 PM',  popular: false, unavailable: false },
  { time: '4:30 PM',  popular: false, unavailable: false },
]

const ReserveForPickupScreen: React.FC = () => {
  const router = useRouter()
  const { productId, size } = useLocalSearchParams<{ productId: string; size: string }>()
  const { product, store, loading } = useReserveProduct(productId, size)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [reserving, setReserving] = useState(false)

  const handleDirections = useCallback(() => {
    const encoded = encodeURIComponent(store?.address ?? '')
    Linking.openURL(`https://maps.google.com/?q=${encoded}`)
  }, [store])

  const handleReserve = useCallback(async () => {
    if (!selectedSlot) return
    setReserving(true)
    await new Promise(r => setTimeout(r, 1000))
    setReserving(false)
    Toast.show({
      type: 'success',
      text1: 'Reserved! See you soon 👟',
      text2: `Pick up at ${store?.name} at ${selectedSlot}.`,
      visibilityTime: 4500,
    })
    router.push("/screens/order/orderConfirmedScreen")
  }, [selectedSlot, store, router])

  if (loading || !product || !store) {
    return (
      <BaseContainer backgroundColor="#fff">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22C55E" />
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
          <Text className="text-base font-bold text-gray-900">Reserve for Pickup</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="x" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          {/* ── Product row ── */}
          <View className="mx-4 mt-2 flex-row items-center gap-3 bg-gray-50 rounded-2xl p-3">
            <Image
              source={{ uri: product.imageUrl }}
              className="w-14 h-11"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                {product.name}
              </Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <Feather name="map-pin" size={10} color="#9ca3af" />
                <Text className="text-[11px] text-gray-400">
                  {store.name} · {store.distance}
                </Text>
              </View>
            </View>
            <Text className="text-base font-black text-gray-900">${product.price.toFixed(0)}</Text>
          </View>

          {/* ── Store card ── */}
          <View className="mx-4 mt-3 flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full bg-green-500 items-center justify-center">
                <Text className="text-white text-[11px] font-black">{store.initials}</Text>
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">{store.name}</Text>
                <View className="flex-row items-center gap-1 mt-0.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <Text className="text-[11px] text-green-600 font-medium">
                    {store.status} · Closes {store.closingTime}
                  </Text>
                </View>
                <Text className="text-[10px] text-gray-400 mt-0.5">{store.distance}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleDirections}
              activeOpacity={0.75}
              className="flex-row items-center gap-1 border border-gray-200 rounded-xl px-3 py-1.5"
            >
              <Feather name="navigation" size={11} color="#374151" />
              <Text className="text-xs font-semibold text-gray-700">Get Directions</Text>
            </TouchableOpacity>
          </View>

          {/* ── Time slot picker ── */}
          <View className="px-4 mt-5">
            <Text className="text-sm font-bold text-gray-900 mb-0.5">Select Pickup Time</Text>
            <Text className="text-xs text-gray-400 mb-3">Today — Saturday, Mar 29</Text>

            <View className="flex-row flex-wrap gap-2">
              {TIME_SLOTS.map(slot => {
                const isSelected = selectedSlot === slot.time
                return (
                  <TouchableOpacity
                    key={slot.time}
                    onPress={() => !slot.unavailable && setSelectedSlot(slot.time)}
                    activeOpacity={slot.unavailable ? 1 : 0.7}
                    disabled={slot.unavailable}
                    style={{ width: '30.5%' }}
                    className={`items-center py-2.5 rounded-xl border ${
                      isSelected
                        ? 'border-gray-900 bg-gray-900'
                        : slot.unavailable
                        ? 'border-gray-100 bg-gray-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        isSelected
                          ? 'text-white'
                          : slot.unavailable
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      {slot.time}
                    </Text>
                    {slot.popular && !isSelected && (
                      <Text className="text-[9px] text-green-500 font-semibold mt-0.5">
                        Popular
                      </Text>
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          {/* ── Instructions ── */}
          <View className="mx-4 mt-5 gap-2.5">
            <View className="flex-row items-start gap-2">
              <Feather name="info" size={13} color="#9ca3af" style={{ marginTop: 1 }} />
              <Text className="text-xs text-gray-400 leading-relaxed flex-1">
                Show your QR code or order number at the counter. Staff will verify and retrieve your pair.
              </Text>
            </View>
            <View className="flex-row items-start gap-2">
              <Feather name="clock" size={13} color="#f59e0b" style={{ marginTop: 1 }} />
              <Text className="text-xs text-amber-600 leading-relaxed flex-1">
                No-show after 2 hours reservation may be cancelled.
              </Text>
            </View>
          </View>

          <View className="h-36" />
        </ScrollView>

        {/* ── Sticky CTA ── */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleReserve}
            disabled={!selectedSlot || reserving}
            activeOpacity={0.85}
            className={`rounded-2xl py-4 items-center justify-center ${
              !selectedSlot ? 'bg-gray-100' : reserving ? 'bg-gray-300' : 'bg-gray-900'
            }`}
          >
            {reserving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                className={`font-black text-base ${
                  !selectedSlot ? 'text-gray-400' : 'text-white'
                }`}
              >
                {selectedSlot ? `Reserve for ${selectedSlot}` : 'Select a pickup time'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </BaseContainer>
  )
}

export default ReserveForPickupScreen