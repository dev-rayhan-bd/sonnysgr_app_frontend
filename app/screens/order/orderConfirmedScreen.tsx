// app/screens/store/orderConfirmedScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useOrderConfirmed } from '@/services/hooks/order/useOrferConfirmed'
import OrderProductRow from '@/components/profile/orders/OrderProductRow'
import OrderSummaryRow from '@/components/profile/orders/OrderSummaryRow'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'
export default function OrderConfirmedScreen() {
  const router = useRouter()
  const { order, handleGetDirections, handleViewQR } = useOrderConfirmed()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Success hero */}
        <View className="items-center pt-10 pb-6 px-4">
          <View className="relative mb-5">
            <View className="w-20 h-20 rounded-full bg-green-500 items-center justify-center">
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <View
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: '#111827' }}
            >
              <Text className="text-white text-xs font-extrabold">{order.avatarInitials}</Text>
            </View>
          </View>
          <Text className="text-2xl font-extrabold text-gray-900">Order Confirmed!</Text>
          <Text className="text-sm text-gray-400 mt-1 text-center">
            Your item is secured. Get ready to pick it up.
          </Text>
          <Text className="text-xs text-green-500 font-bold mt-2">{order.orderNumber}</Text>
        </View>

        {/* Product */}
        <View className="mx-4 bg-white rounded-2xl px-4 shadow-sm border border-gray-100">
          <OrderProductRow
            name={order.productName}
            size={order.productSize}
            price={order.price}
          />
          <View className="border-t border-gray-100 pt-3 pb-4 gap-1">
            <OrderSummaryRow label="Payment"    value={`Visa ••••${order.paymentLast4}`} />
            <OrderSummaryRow label="Service fee" value={`$${order.serviceFee.toFixed(2)}`} />
            <OrderSummaryRow label="Tax"         value={`$${order.tax.toFixed(2)}`} />
            <OrderSummaryRow label="Total Paid"  value={`$${order.total.toFixed(2)}`} bold />
          </View>
        </View>

        {/* Store info */}
        <View className="mx-4 mt-4 bg-green-50 border border-green-100 rounded-2xl px-4 py-3.5">
          <View className="flex-row items-center gap-3 mb-2">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: '#22C55E' }}
            >
              <Text className="text-white text-xs font-extrabold">SK</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">{order.storeName}</Text>
              <Text className="text-xs text-gray-400">{order.storeDistance}</Text>
            </View>
            <View className="bg-green-500 px-3 py-1.5 rounded-full">
              <Text className="text-white text-xs font-bold">Ready in {order.readyIn}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="calendar" size={13} color="#9CA3AF" />
            <Text className="text-xs text-gray-500">
              {order.pickupDate} · {order.pickupTime}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mx-4 mt-5 gap-3">
          <Button
            text="Get Directions"
            onPress={handleGetDirections}
            backgroundColor="#22C55E"
            borderRadius={16}
            paddingVertical={16}
            fontSize={15}
            fontWeight="700"
          />
          <Button
            text="View QR Code"
            onPress={() => handleViewQR(() => router.push('/screens/order/qrCodeScreen'))}
            useGradient
            gradientColors={['#1a1a1a', '#111827']}
            borderRadius={16}
            paddingVertical={16}
            fontSize={15}
            fontWeight="700"
          />
          <TouchableOpacity
            onPress={() => router.push('/tabs/discoverScreen')}
            className="py-4 items-center"
          >
            <Text className="text-sm font-semibold text-gray-400">Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </BaseContainer>
  )
}
