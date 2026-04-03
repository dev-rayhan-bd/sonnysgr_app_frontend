// screens/RestockAlertScreen.tsx
import React, { useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView, // Added missing import
} from 'react-native'
import Toast from 'react-native-toast-message' // Using the library directly
import { useRouter } from 'expo-router'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRestockAlert } from '@/services/hooks/discover/useReStockAlert'
import RestockHeroBadge from '@/components/discover/notifications/ReStockHeroBadge'
import RestockActionButtons from '@/components/discover/notifications/ReStockActionButtons'
import RestockStoreInfo from '@/components/discover/notifications/ReStockStoreInfo'
import RestockWatchlistPairs from '@/components/discover/notifications/ReStockWatchListPairs'

interface RestockAlertScreenProps {
  notificationId: string
}

const RestockAlertScreen: React.FC<RestockAlertScreenProps> = ({ notificationId }) => {
  const router = useRouter()
  const { alert, watchlistPairs, loading } = useRestockAlert(notificationId)

  // ─── Toast Callbacks ────────────────────────────────────────────────────────

  const handleBuyNow = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Added to Bag!',
      text2: `${alert?.name} is ready for checkout.`,
      props: { icon: 'shopping-bag' } // You can pass custom props if your config supports it
    })
    // router.push(`/checkout/${alert?.productId}`)
  }, [alert])

  const handleHold = useCallback(() => {
    Toast.show({
      type: 'info', // Or your custom type
      text1: 'Hold Placed!',
      text2: 'Your pair is reserved with a deposit.',
    })
  }, [])

  const handleReserve = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Reserved for Pickup',
      text2: `Head to ${alert?.store.name} before closing.`,
    })
  }, [alert])

  const handleSeeOtherStores = useCallback(() => {
    router.push(`/`)
  }, [alert])

  if (loading || !alert) return null 

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* ── Header ── */}
      <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Feather name="chevron-left" size={24} color="#111" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-center text-base font-bold text-gray-900">
            Restock Alert
          </Text>
        </View>
        <Text className="text-xs text-gray-400">Just now</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* ── Hero card ── */}
        <View className="mx-4 mt-4 rounded-3xl bg-gray-900 overflow-hidden">
          <RestockHeroBadge />

          {/* Product image */}
          <View className="items-center py-5">
            <Image
              source={{ uri: alert.imageUrl }}
              className="w-56 h-36"
              resizeMode="contain"
            />
          </View>

          {/* Name + colorway */}
          <View className="items-center px-6 pb-6">
            <Text className="text-white text-xl font-bold text-center leading-snug">
              {alert.name}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">{alert.colorway}</Text>
            
            {/* Size pill */}
            <View className="mt-4 bg-green-500 rounded-full px-5 py-1.5">
              <Text className="text-white text-xs font-bold">{alert.size}</Text>
            </View>
          </View>

          {/* Store info inside card */}
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
            <Text className="text-gray-400 text-sm line-through">Was ${alert.originalPrice}</Text>
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
    </SafeAreaView>
  )
}

export default RestockAlertScreen