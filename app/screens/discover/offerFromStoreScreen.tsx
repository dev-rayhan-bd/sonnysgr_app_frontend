// screens/OfferFromStoreScreen.tsx
import React, { useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message' // Integrated Toast Message
import { useOfferFromStore } from '@/services/hooks/discover/useOfferFromStore'
import OfferHeroCard from '@/components/discover/notifications/OfferHeroCard'
import OfferStoreStats from '@/components/discover/notifications/OfferStoreStats'
import OfferBreakdown from '@/components/discover/notifications/OfferBreakDown'
import OfferActionButtons from '@/components/discover/notifications/OfferActionButtons'

interface OfferFromStoreScreenProps {
  notificationId: string
}

const OfferFromStoreScreen: React.FC<OfferFromStoreScreenProps> = ({ notificationId }) => {
  const router = useRouter()
  const { offer, loading } = useOfferFromStore(notificationId)

  // ─── Callbacks ─────────────────────────────────────────────────────────────

  const handleAccept = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Offer Accepted! 🎉',
      text2: `You'll receive $${offer?.netPayout.toFixed(2)} within 24 hrs`,
    })
    router.back()
  }, [offer, router])

  const handleCounter = useCallback(() => {
    router.push(`/`)
  }, [offer, router])

  const handleDecline = useCallback(() => {
    Toast.show({
      type: 'error',
      text1: 'Offer Declined',
      text2: 'The store has been notified.',
    })
    router.back()
  }, [router])

  if (loading || !offer) return null

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* ── Header ── */}
      <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()} 
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="chevron-left" size={24} color="#111" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-center text-base font-bold text-gray-900">
            Offer from a Store
          </Text>
        </View>
        <Text className="text-xs text-gray-400 w-16 text-right">Just now</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Store wants to buy banner ── */}
        <View className="mx-4 mt-4 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-4 flex-row items-start gap-3">
          {/* Store avatar */}
          <View className="w-10 h-10 rounded-full bg-amber-400 items-center justify-center">
            <Text className="text-white font-bold text-sm">{offer.store.initials}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-amber-900 leading-snug">
              <Text className="font-bold">{offer.store.name}</Text> wants to buy your pair!
            </Text>
            <Text className="text-xs text-amber-700 mt-1 leading-relaxed">
              They found your {offer.productName} in your public locker and made an offer.
            </Text>
          </View>
        </View>

        {/* ── Product hero card ── */}
        <OfferHeroCard offer={offer} />

        {/* ── Store offer amount card ── */}
        <View className="mx-4 mt-4 bg-zinc-950 rounded-[32px] px-6 py-8 items-center shadow-lg">
          <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-[3px] mb-2">
            STORE OFFER
          </Text>
          <Text className="text-white text-6xl font-black">${offer.storeOffer.toFixed(0)}</Text>
          <Text className="text-zinc-400 text-sm mt-2">{offer.store.name}</Text>
          
          <View className="flex-row items-center gap-3 mt-6 pt-6 border-t border-zinc-800 w-full justify-center">
            <Text className="text-zinc-500 text-xs">Market: ~${offer.marketPrice}</Text>
            <View className="w-1 h-1 rounded-full bg-zinc-700" />
            <Text className="text-zinc-500 text-xs">{offer.discountPercent}% below market</Text>
          </View>
          
          <View className="mt-6 bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-300 text-xs italic text-center leading-relaxed">
              "{offer.storeMessage}"
            </Text>
          </View>
        </View>

        {/* ── About this store ── */}
        <View className="mt-8">
           <Text className="px-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
             About This Store
           </Text>
           <OfferStoreStats store={offer.store} />
        </View>

        {/* ── Payout breakdown ── */}
        <View className="mt-6">
           <OfferBreakdown offer={offer} />
        </View>

        {/* ── Action buttons ── */}
        <View className="px-1 mt-4">
            <OfferActionButtons
            netPayout={offer.netPayout}
            onAccept={handleAccept}
            onCounter={handleCounter}
            onDecline={handleDecline}
            />
        </View>

        {/* Pickup note */}
        <View className="flex-row items-center justify-center px-8 mt-4 gap-2">
            <Feather name="info" size={12} color="#9CA3AF" />
            <Text className="text-center text-[11px] text-gray-400 leading-relaxed">
              Pick up cash at store or deposit to balance within 24h.
            </Text>
        </View>

        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default OfferFromStoreScreen;