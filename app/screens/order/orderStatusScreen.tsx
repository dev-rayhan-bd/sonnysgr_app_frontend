import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useOrderStatus } from '@/services/hooks/order/useOrderStatus'
import OrderStatusTimeline from '@/components/profile/orders/OrderStatusTimeline'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'

export default function OrderStatusScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const {
    status,
    handleShowQR,
    handleGetDirections,
    handleContactStore,
    handleShare,
  } = useOrderStatus()

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Scrollable Content */}
      <BaseContainer
        scrollable
        backgroundColor="#fff"
      >
        <View style={{ paddingBottom: 140 }} className='pt-10'>

          {/* Nav */}
          <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
            <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
              <Feather name="arrow-left" size={22} color="#111827" />
            </TouchableOpacity>

            <Text className="flex-1 text-base font-bold text-gray-900 text-center">
              Order Status
            </Text>

            <TouchableOpacity onPress={handleShare} className="p-1">
              <Feather name="share" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Order meta */}
          <View className="px-4 pt-4 pb-2">
            <Text className="text-sm font-bold text-gray-900">
              {status.orderNumber}
            </Text>
            <Text className="text-xs text-gray-400 mt-0.5">
              {status.placedAt}
            </Text>
          </View>

          {/* Status chips */}
          <View className="flex-row gap-2 px-4 mb-4">
            <View className="bg-gray-100 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-bold text-gray-700">
                Hold Confirmed
              </Text>
            </View>

            <View className="bg-gray-900 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-bold text-white">
                {status.statusLabel}
              </Text>
            </View>
          </View>

          {/* Product row */}
          <View className="mx-4 flex-row items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-4">
            <View className="w-14 h-14 rounded-xl bg-gray-200" />

            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">
                {status.productName}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {status.productSize}
              </Text>
              <Text className="text-xs text-gray-400">
                {status.productStore}
              </Text>
            </View>

            <Text className="text-base font-extrabold text-gray-900">
              ${status.price}
            </Text>
          </View>

          {/* Timeline */}
          <OrderStatusTimeline steps={status.steps} />

          {/* Store info */}
          <View className="mx-4 mt-2 bg-green-50 border border-green-100 rounded-2xl px-4 py-3.5">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-10 h-10 rounded-xl bg-green-500 items-center justify-center">
                <Text className="text-white text-xs font-extrabold">SK</Text>
              </View>

              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900">
                  {status.storeName}
                </Text>
                <Text className="text-xs text-gray-400">
                  {status.storeDistance}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2 mb-1">
              <Feather name="calendar" size={13} color="#9CA3AF" />
              <Text className="text-xs text-gray-600 font-medium">
                Pick up by: {status.pickupBy}
              </Text>
            </View>

            <Text className="text-xs text-red-500 font-semibold ml-5">
              {status.timeRemaining}
            </Text>
          </View>

        </View>
        <View
          style={{
            paddingBottom: insets.bottom + 10,
          }}
          className="px-4 pt-3 bg-white "
        >
          <View className="gap-3">

            <Button
              text="Show QR Code"
              onPress={() =>
                handleShowQR(() => router.push('/screens/order/qrCodeScreen'))
              }
              backgroundColor='#000'
              borderRadius={16}
              paddingVertical={16}
              fontSize={15}
              fontWeight="800"
              width="100%"   // ✅ IMPORTANT FIX
            />

            <Button
              text="Get Directions"
              onPress={() =>
                handleGetDirections(() =>
                  router.push('/screens/order/directionsScreen')
                )
              }
              backgroundColor="#22C55E"
              paddingVertical={16}
              fontSize={15}
              fontWeight="700"
              width="100%"   // ✅ IMPORTANT FIX
            />

            <TouchableOpacity
              onPress={handleContactStore}
              className="items-center py-2"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="call-outline" size={15} color="#6B7280" />
                <Text className="text-sm text-gray-500 font-semibold">
                  Contact Store
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </BaseContainer>



    </View>
  )
}