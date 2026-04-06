// screens/discover/buyNowScreen.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import BaseContainer from '@/components/shared/BaseContainer'

const useBuyNowProduct = (productId: string, size: string) => {
  return {
    loading: false,
    product: {
      productId,
      name: "Air Jordan 4 'Black Cat'",
      colorway: 'Retro OG Colorway',
      size,
      imageUrl: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
      price: 220.0,
      shippingFee: 13.95,
      tax: 18.48,
      total: 252.43,
      estimatedDelivery: '3–5 business days',
      store: {
        name: "Sonny's Kicks",
        initials: 'SK',
        rating: 4.9,
        distance: '1.1 mi',
      },
    },
  }
}

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: 'credit-card' as const },
  { id: 'apple',  label: 'Apple Pay',            icon: 'smartphone'  as const },
  { id: 'wallet', label: 'GoSNKR Wallet',        icon: 'dollar-sign' as const },
]

const BuyNowScreen: React.FC = () => {
  const router = useRouter()
  const { productId, size } = useLocalSearchParams<{ productId: string; size: string }>()
  const { product, loading } = useBuyNowProduct(productId, size)

  const [selectedPayment, setSelectedPayment] = useState('card')
  const [placing, setPlacing] = useState(false)

  const handlePlaceOrder = useCallback(async () => {
    setPlacing(true)
    await new Promise(r => setTimeout(r, 1200))
    setPlacing(false)
    Toast.show({
      type: 'success',
      text1: 'Order Placed! 🎉',
      text2: `Your ${product?.name} is on its way.`,
      visibilityTime: 4000,
    })
    router.push("/screens/order/paymentScreen")
  }, [product, router])

  if (loading || !product) {
    return (
      <BaseContainer backgroundColor="#fff">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22C55E" />
        </View>
      </BaseContainer>
    )
  }

  return (
    // scrollable={true} — BaseContainer's ScrollView is the only scroll container
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="pt-10">

        {/* ── Header ── */}
        <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#111" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-center text-base font-bold text-gray-900">Buy Now</Text>
          </View>
          <View className="w-6" />
        </View>

        {/* ── Product summary card ── */}
        <View className="mx-4 mt-5 rounded-3xl bg-gray-950 overflow-hidden">
          <View className="items-center pt-6 pb-4">
            <Image
              source={{ uri: product.imageUrl }}
              className="w-52 h-36"
              resizeMode="contain"
            />
          </View>
          <View className="px-5 pb-5 items-center">
            <Text className="text-white text-lg font-black text-center">{product.name}</Text>
            <Text className="text-gray-400 text-xs mt-0.5">{product.colorway}</Text>
            <View className="flex-row gap-2 mt-3">
              <View className="bg-zinc-800 rounded-full px-4 py-1">
                <Text className="text-gray-300 text-xs font-semibold">{product.size}</Text>
              </View>
              <View className="bg-green-500/20 rounded-full px-4 py-1">
                <Text className="text-green-400 text-xs font-semibold">In Stock</Text>
              </View>
            </View>
          </View>
          {/* Store strip */}
          <View className="flex-row items-center justify-between px-5 py-3 border-t border-zinc-800">
            <View className="flex-row items-center gap-2">
              <View className="w-7 h-7 rounded-full bg-green-500 items-center justify-center">
                <Text className="text-white text-[10px] font-black">{product.store.initials}</Text>
              </View>
              <Text className="text-gray-300 text-xs font-semibold">{product.store.name}</Text>
              <Text className="text-gray-600 text-xs">· {product.store.distance}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Feather name="star" size={11} color="#F59E0B" />
              <Text className="text-amber-400 text-xs font-bold">{product.store.rating}</Text>
            </View>
          </View>
        </View>

        {/* ── Delivery estimate ── */}
        <View className="mx-4 mt-4 flex-row items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
          <Feather name="truck" size={16} color="#3B82F6" />
          <View>
            <Text className="text-blue-800 text-xs font-bold">Estimated Delivery</Text>
            <Text className="text-blue-600 text-xs mt-0.5">{product.estimatedDelivery}</Text>
          </View>
        </View>



        {/* ── Order summary ── */}
        <View className="px-4 mt-6">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Order Summary
          </Text>
          <View className="bg-gray-50 rounded-2xl px-4 py-2">
            {[
              { label: 'Item price', value: `$${product.price.toFixed(2)}` },
              { label: 'Shipping',   value: `$${product.shippingFee.toFixed(2)}` },
              { label: 'Tax',        value: `$${product.tax.toFixed(2)}` },
            ].map(row => (
              <View
                key={row.label}
                className="flex-row justify-between py-2.5 border-b border-gray-100"
              >
                <Text className="text-sm text-gray-500">{row.label}</Text>
                <Text className="text-sm text-gray-700 font-semibold">{row.value}</Text>
              </View>
            ))}
            <View className="flex-row justify-between py-3">
              <Text className="text-sm font-black text-gray-900">Total</Text>
              <Text className="text-sm font-black text-gray-900">
                ${product.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Secure note ── */}
        <View className="flex-row items-center justify-center gap-1.5 mt-4">
          <Feather name="shield" size={12} color="#9CA3AF" />
          <Text className="text-xs text-gray-400">Secured by GoSNKR Buyer Protection</Text>
        </View>

        {/* ── Spacer for sticky CTA ── */}
        <View className="h-32" />

        {/* ── Sticky CTA ── */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handlePlaceOrder}
            disabled={placing}
            activeOpacity={0.85}
            className={`rounded-2xl py-4 items-center justify-center flex-row gap-2 ${
              placing ? 'bg-gray-300' : 'bg-gray-900'
            }`}
          >
            {placing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Feather name="shopping-bag" size={16} color="#fff" />
                <Text className="text-white font-black text-base">
                  Place Order · ${product.total.toFixed(2)}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </BaseContainer>
  )
}
export default BuyNowScreen