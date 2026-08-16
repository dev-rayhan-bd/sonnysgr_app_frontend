// app/screens/order/orderDetailScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useOrderDetail } from '@/services/hooks/profile/useOrderDetails'
import OrderDetailHeader from '@/components/profile/orders/OrderDetailsHeader'
import OrderDetailProduct from '@/components/profile/orders/OrderDetailProduct'
import PaymentSummaryRow from '@/components/profile/orders/PaymentSummaryRow'
import OrderTimeline from '@/components/profile/orders/OrderTimeline'
import BaseContainer from '@/components/shared/BaseContainer'
export default function OrderDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { order, handleCopy, handleContactStore } = useOrderDetail(id)

  return (
<BaseContainer scrollable backgroundColor='#fff'>
<View className='pt-10'>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-bold text-gray-900 text-center">Order Detail</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Status header */}
        <View className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm">
          <OrderDetailHeader
            orderNumber={order.orderNumber}
            status={order.status}
            cancelledDate={order.cancelledDate}
            cancelledTime={order.cancelledTime}
            onCopy={handleCopy}
          />

          {/* Product */}
          <OrderDetailProduct
            name={order.productName}
            size={order.productSize}
            gender={order.productGender}
            imageColor={order.productImageColor}
            storeName={order.storeName}
            storeDistance={order.storeDistance}
            status={order.status}
          />
        </View>

        {/* Payment summary */}
        <View className="bg-white mx-4 mt-3 rounded-2xl px-4 py-2 shadow-sm">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest py-2">
            Payment Summary
          </Text>
          <PaymentSummaryRow label="Item Price"    value={`$${order.itemPrice.toFixed(2)}`} />
          <PaymentSummaryRow label="Deposit Paid"  value={`$${order.depositPaid.toFixed(2)}`} />
          <PaymentSummaryRow label="Remaining"     value={`$${order.remaining.toFixed(2)}`} />
          <View className="h-px bg-gray-100 my-1" />
          <PaymentSummaryRow label="Total Charged" value={`$${order.totalCharged.toFixed(2)}`} highlight />
          <PaymentSummaryRow label="Refund Eligible" value={`$${order.refundEligible.toFixed(2)}`} green />
        </View>

        {/* Why cancelled */}
        <View className="bg-amber-50 border border-amber-100 mx-4 mt-3 rounded-2xl px-4 py-3">
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="information-circle-outline" size={16} color="#F59E0B" />
            <Text className="text-xs font-extrabold text-amber-700">Why was this cancelled?</Text>
          </View>
          <Text className="text-xs text-amber-600 leading-relaxed">{order.cancellationReason}</Text>
        </View>

        {/* Order timeline */}
        <View className="bg-white mx-4 mt-3 rounded-2xl shadow-sm">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-2">
            Order Timeline
          </Text>
          <OrderTimeline steps={order.timeline} />
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100 gap-3">
        <TouchableOpacity
          onPress={() => router.push(`/screens/order/refundRequestScreen?id=${order.id}`)}
          activeOpacity={0.85}
          className="bg-green-500 py-4 rounded-2xl items-center"
        >
          <Text className="text-white text-sm font-extrabold">
            Request Refund ${order.refundEligible.toFixed(2)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContactStore} className="py-3 items-center">
          <View className="flex-row items-center gap-2">
            <Ionicons name="call-outline" size={15} color="#6B7280" />
            <Text className="text-sm text-gray-500 font-semibold">Contact Store</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-[10px] text-gray-300 text-center">
          Refund requests must be submitted within 7 days of cancellation.
        </Text>
      </View>
      </View>
      {/* Report an Issue — dispute flow */}
      <TouchableOpacity
        onPress={() => router.push('/screens/order/submitDisputeScreen')}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, marginHorizontal: 16, marginTop: 8, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' }}
      >
        <Feather name="alert-circle" size={14} color="#6b7280" />
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>Report an Issue</Text>
      </TouchableOpacity>
    </BaseContainer>
  )
}