// screens/discover/reStockAlertScreen.tsx
import React, { useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRestockAlert } from '@/services/hooks/discover/useReStockAlert'
import RestockHeroBadge from '@/components/discover/notifications/ReStockHeroBadge'
import RestockActionButtons from '@/components/discover/notifications/ReStockActionButtons'
import RestockStoreInfo from '@/components/discover/notifications/ReStockStoreInfo'
import RestockWatchlistPairs from '@/components/discover/notifications/ReStockWatchListPairs'
import BaseContainer from '@/components/shared/BaseContainer'

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const RestockAlertSkeleton: React.FC = () => (
  <BaseContainer backgroundColor="#fff">
    <View className="pt-10">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
        <View className="w-6 h-6 bg-gray-200 rounded-full" />
        <View className="flex-1 items-center">
          <View className="w-32 h-4 bg-gray-200 rounded-lg" />
        </View>
        <View className="w-12 h-3 bg-gray-100 rounded-lg" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero card skeleton — same dark bg so it matches the real card */}
        <View className="mx-4 mt-4 rounded-3xl bg-gray-900 overflow-hidden items-center justify-center" style={{ height: 320 }}>
          <ActivityIndicator size="large" color="#22C55E" />
        </View>

        {/* Scarcity row */}
        <View className="flex-row items-center justify-between px-5 mt-4">
          <View className="w-40 h-3 bg-gray-200 rounded-lg" />
          <View className="w-20 h-3 bg-gray-100 rounded-lg" />
        </View>

        {/* Price */}
        <View className="px-5 mt-5 gap-2">
          <View className="w-36 h-10 bg-gray-200 rounded-xl" />
          <View className="w-48 h-3 bg-gray-100 rounded-lg" />
        </View>

        {/* Button skeletons */}
        <View className="px-4 mt-6 gap-3">
          <View className="h-14 bg-gray-200 rounded-2xl" />
          <View className="h-14 bg-gray-100 rounded-2xl" />
          <View className="h-14 bg-gray-100 rounded-2xl" />
        </View>
      </ScrollView>
    </View>
  </BaseContainer>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

const RestockAlertScreen: React.FC = () => {
  const router = useRouter()
  const { id: notificationId } = useLocalSearchParams<{ id: string }>()
  const { alert, watchlistPairs, loading } = useRestockAlert(notificationId)
  const handleBuyNow = useCallback(() => {
    if (!alert) return
    router.push(
      `/screens/discover/buyNowScreen?productId=${alert.productId}&size=${encodeURIComponent(alert.size)}` as any
    )
  }, [alert, router])
  const handleHold = useCallback(() => {
    if (!alert) return
    router.push(
      `/screens/discover/holdWithDepositScreen?productId=${alert.productId}&size=${encodeURIComponent(alert.size)}` as any
    )
  }, [alert, router])

  const handleReserve = useCallback(() => {
    if (!alert) return
    router.push(
      `/screens/discover/reserveForPickupScreen?productId=${alert.productId}&storeId=${alert.store.id}&size=${encodeURIComponent(alert.size)}` as any
    )
  }, [alert, router])

  const handleSeeOtherStores = useCallback(() => {
    if (!alert) return
    router.push(`/screens/discover/storeListScreen?productId=${alert.productId}` as any)
  }, [alert, router])

  // ✅ Skeleton instead of null — eliminates blank screen flash
  if (loading || !alert) return <RestockAlertSkeleton />

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="pt-10">
        <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#111" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-center text-base font-bold text-gray-900">
            Product
            </Text>
          </View>
          <Text className="text-xs text-gray-400">Just now</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          {/* ── Hero card ── */}
          <View className="mx-4 mt-4 rounded-3xl bg-gray-900 overflow-hidden">
            <RestockHeroBadge />

            <View className="items-center py-5">
              <Image
                source={{ uri: alert.imageUrl }}
                className="w-56 h-36"
                resizeMode="contain"
              />
            </View>

            <View className="items-center px-6 pb-6">
              <Text className="text-white text-xl font-bold text-center leading-snug">
                {alert.name}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">{alert.colorway}</Text>
              <View className="mt-4 bg-green-500 rounded-full px-5 py-1.5">
                <Text className="text-white text-xs font-bold">{alert.size}</Text>
              </View>
            </View>

            <RestockStoreInfo store={alert.store} />
          </View>

          {/* ── Scarcity + social proof ── */}
          <View className="flex-row items-center justify-between px-5 mt-4">
            <View className="flex-row items-center gap-1.5">
              <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
              <Text className="text-orange-600 text-xs font-bold uppercase tracking-tight">
                Only {alert.stockLeft} left in this size
              </Text>
            </View>
            <Text className="text-gray-400 text-xs">{alert.viewerCount} viewing</Text>
          </View>

          {/* ── Price ── */}
          <View className="px-5 mt-5">
            <Text className="text-4xl font-black text-gray-900">
              ${alert.currentPrice.toFixed(2)}
            </Text>
            <View className="flex-row items-center gap-2 mt-1">
              <Text className="text-gray-400 text-sm line-through">
                Was ${alert.originalPrice}
              </Text>
              <Text className="text-green-600 text-sm font-bold">
                ${(alert.originalPrice - alert.currentPrice).toFixed(2)} saved
              </Text>
            </View>
          </View>

          {/* ── Action buttons ── */}
          <View className="px-1">
            <RestockActionButtons
              onBuyNow={handleBuyNow}
              onHold={handleHold}
              onReserve={handleReserve}
              onSeeOtherStores={handleSeeOtherStores}
            />
          </View>

          {/* ── Watchlist pairs ── */}
          <RestockWatchlistPairs pairs={watchlistPairs} />

          <View className="h-10" />
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

export default RestockAlertScreen