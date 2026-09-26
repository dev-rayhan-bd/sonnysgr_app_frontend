// app/screens/product/productScreen.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'

// ─── Params passed in from wherever the product card was tapped
// (Discover "Nearby in your size", brand row, store row, ads, etc). ─────────

type ProductScreenParams = {
  productId?: string
  name?: string
  brand?: string
  image?: string
  price?: string
  size?: string
  store?: string
  distance?: string
}

// ─── Data hook — uses whatever the tapped card actually was, with sane
// fallbacks for fields the source list doesn't carry yet (store hours,
// full size run) until those are wired through too. ─────────────────────────

const useProductDetail = (params: ProductScreenParams) => {
  const {
    productId = 'aj4-black-cat',
    name = 'Black Cat',
    brand = 'Air Jordan 4',
    image = 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cat-2020.png',
    price = '220',
    size,
    store = "Sonny's",
    distance = '1.1 mi',
  } = params

  const priceNum = Number(price) || 220
  const defaultSize = size || '10.5'

  return {
    loading: false,
    product: {
      productId,
      brand,
      name,
      imageUrl: image,
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.09),
      backInStock: true,
      sizes: ['9.5', '10', '10.5', '11', '11.5'].map(label => ({
        label,
        available: label !== '11.5',
      })),
      defaultSize,
      availableInSize: 2,
      store: {
        name: store,
        initials: store.slice(0, 2).toUpperCase(),
        location: 'Twelve Oaks Mall',
        distance,
        isOpen: true,
        closesAt: '9 PM',
      },
      alsoBackInSize: [
        {
          id: 'a1',
          name: 'Nike Dunk Low Panda',
          store: 'Kicks City',
          distance: '2.5 mi',
          status: 'In stock',
          price: 120,
          statusColor: 'green' as const,
        },
        {
          id: 'a2',
          name: 'Yeezy Boost 350 Carbon',
          store: 'Jordan Hub',
          distance: '1.3 mi',
          status: 'Low stock',
          price: 320,
          statusColor: 'orange' as const,
        },
      ],
    },
  }
}

// ─── Screen ──────────────────────────────────────────────────────────────────

const ProductScreen: React.FC = () => {
  const router = useRouter()
  const params = useLocalSearchParams<ProductScreenParams>()
  const { product, loading } = useProductDetail(params)

  const [selectedSize, setSelectedSize] = useState(product.defaultSize)

  const handleBuyNow = useCallback(() => {
    router.push(
      `/screens/discover/buyNowScreen?productId=${product.productId}&size=${encodeURIComponent(selectedSize)}` as any
    )
  }, [product, selectedSize, router])

  const handleHold = useCallback(() => {
    router.push(
      `/screens/discover/holdWithDepositScreen?productId=${product.productId}&size=${encodeURIComponent(selectedSize)}` as any
    )
  }, [product, selectedSize, router])

  const handleCompareStores = useCallback(() => {
    router.push(`/screens/discover/storeListScreen?productId=${product.productId}` as any)
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

  const savings = product.originalPrice - product.price

  return (
    <BaseContainer backgroundColor="#fff">
      <View className="flex-1 pt-10">
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#111" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-gray-900">Product details</Text>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="heart" size={20} color="#111" />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="share" size={20} color="#111" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>
          {/* ── Back in stock badge ── */}
          {product.backInStock && (
            <View className="mx-4 mt-1 mb-2 self-start flex-row items-center gap-1.5 bg-green-50 rounded-full px-3 py-1.5">
              <Text>🔥</Text>
              <Text className="text-green-700 text-xs font-bold">Back in stock</Text>
            </View>
          )}

          {/* ── Hero image ── */}
          <View className="items-center justify-center bg-white" style={{ height: 260 }}>
            <Image
              source={{ uri: product.imageUrl }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <View className="absolute bottom-3 right-4 bg-black/60 rounded-full px-2 py-0.5">
              <Text className="text-white text-[10px] font-semibold">1/4</Text>
            </View>
            <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-1.5">
              {[0, 1, 2, 3].map(i => (
                <View key={i} className={`rounded-full w-1.5 h-1.5 ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`} />
              ))}
            </View>
          </View>

          {/* ── Name / price ── */}
          <View className="px-4 mt-3">
            <Text className="text-sm text-gray-500">{product.brand}</Text>
            <Text className="text-xl font-black text-gray-900 mt-0.5">{product.name}</Text>
            <View className="flex-row items-center gap-2 mt-1.5">
              <Text className="text-2xl font-black text-gray-900">${product.price}</Text>
              <Text className="text-base text-gray-400 line-through">${product.originalPrice}</Text>
              <Text className="text-sm font-bold text-green-600">Save ${savings}</Text>
            </View>
          </View>

          {/* ── Size selector ── */}
          <View className="px-4 mt-5">
            <View className="flex-row items-center justify-between mb-2.5">
              <Text className="text-sm font-bold text-gray-900">Select size · US Men</Text>
              <TouchableOpacity>
                <Text className="text-xs font-semibold text-gray-500 underline">Size guide</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-2">
              {product.sizes.map(s => {
                const selected = s.label === selectedSize
                return (
                  <TouchableOpacity
                    key={s.label}
                    disabled={!s.available}
                    onPress={() => setSelectedSize(s.label)}
                    activeOpacity={0.8}
                    className={`flex-1 items-center justify-center py-3 rounded-xl border ${
                      selected
                        ? 'bg-green-500 border-green-500'
                        : s.available
                        ? 'bg-white border-gray-200'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        selected ? 'text-white' : s.available ? 'text-gray-900' : 'text-gray-300 line-through'
                      }`}
                    >
                      {s.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text className="text-xs font-semibold text-green-600 mt-2.5">
              {product.availableInSize} available in US Men {selectedSize}
            </Text>
          </View>

          {/* ── Store row ── */}
          <View className="mx-4 mt-4 flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3">
            <View className="w-9 h-9 rounded-full bg-green-500 items-center justify-center">
              <Text className="text-white text-xs font-black">{product.store.initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">{product.store.name}</Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {product.store.location} · {product.store.distance}
              </Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <Text className="text-xs text-gray-400">
                  {product.store.isOpen ? `Open · Closes ${product.store.closesAt}` : 'Closed'}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-xs font-semibold text-gray-600">View store</Text>
              <Feather name="chevron-right" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* ── Pickup note ── */}
          <View className="mx-4 mt-3 flex-row items-center gap-2">
            <Feather name="shopping-bag" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-400">Pickup at this store</Text>
          </View>
          <Text className="mx-4 text-xs text-gray-300 mt-0.5">Pickup timing shown at checkout</Text>

          {/* ── Hold with deposit ── */}
          <TouchableOpacity
            onPress={handleHold}
            activeOpacity={0.8}
            className="mx-4 mt-5 flex-row items-center gap-3 bg-green-50 rounded-2xl px-4 py-3"
          >
            <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
              <Feather name="lock" size={14} color="#16A34A" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">Hold with a deposit</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                Review the deposit amount, hold deadline and refund policy before paying.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleHold}
            activeOpacity={0.8}
            className="mx-4 mt-2.5 items-center justify-center border border-gray-200 rounded-2xl py-3"
          >
            <Text className="text-sm font-bold text-gray-900">View hold options</Text>
          </TouchableOpacity>

          {/* ── Info rows ── */}
          <View className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {[
              { icon: 'shopping-bag' as const, label: 'Compare other stores', sub: `Prices and availability in US Men ${selectedSize}`, onPress: handleCompareStores },
              { icon: 'file-text' as const, label: 'Product details', sub: undefined, onPress: undefined },
              { icon: 'briefcase' as const, label: 'Pickup information', sub: undefined, onPress: undefined },
              { icon: 'shield' as const, label: 'Returns & store policies', sub: undefined, onPress: undefined },
            ].map((row, i, arr) => (
              <TouchableOpacity
                key={row.label}
                onPress={row.onPress}
                activeOpacity={0.7}
                className={`flex-row items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <Feather name={row.icon} size={16} color="#6B7280" />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-900">{row.label}</Text>
                  {row.sub && <Text className="text-xs text-gray-400 mt-0.5">{row.sub}</Text>}
                </View>
                <Feather name="chevron-right" size={16} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Also back in your size ── */}
          <View className="mt-6 px-4 mb-10">
            <Text className="text-sm font-bold text-gray-900">Also back in your size</Text>
            <Text className="text-xs text-gray-400 mt-0.5 mb-3">From your wishlist</Text>

            {product.alsoBackInSize.map(item => (
              <View
                key={item.id}
                className="flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3 mb-3"
              >
                <View className="w-16 h-16 bg-gray-50 rounded-xl items-center justify-center">
                  <Feather name="image" size={20} color="#D1D5DB" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-xs text-gray-400 mt-0.5">{item.store} · {item.distance}</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <View className={`w-1.5 h-1.5 rounded-full ${item.statusColor === 'green' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <Text className={`text-xs font-semibold ${item.statusColor === 'green' ? 'text-green-600' : 'text-orange-500'}`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View className="items-end gap-2">
                  <Text className="text-sm font-black text-gray-900">${item.price}</Text>
                  <TouchableOpacity className="flex-row items-center gap-1">
                    <Text className="text-xs font-semibold text-gray-600">View item</Text>
                    <Feather name="chevron-right" size={12} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View className="h-28" />
        </ScrollView>

        {/* ── Sticky footer CTA ── */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pt-3 pb-6 bg-white border-t border-gray-100">
          <View className="mb-3">
            <Text className="text-lg font-black text-gray-900">
              ${product.price} · US Men {selectedSize}
            </Text>
            <Text className="text-xs text-gray-400">Before tax</Text>
          </View>
          <TouchableOpacity
            onPress={handleBuyNow}
            activeOpacity={0.85}
            className="bg-green-500 rounded-2xl py-4 items-center justify-center"
          >
            <Text className="text-white font-black text-base">Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  )
}

export default ProductScreen