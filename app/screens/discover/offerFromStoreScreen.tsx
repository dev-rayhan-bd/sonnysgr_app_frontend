// screens/discover/offerFromStoreScreen.tsx
import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { useOfferFromStore } from '@/services/hooks/discover/useOfferFromStore'
import OfferHeroCard from '@/components/discover/notifications/OfferHeroCard'
import OfferStoreStats from '@/components/discover/notifications/OfferStoreStats'
import OfferBreakdown from '@/components/discover/notifications/OfferBreakDown'
import OfferActionButtons from '@/components/discover/notifications/OfferActionButtons'
import BaseContainer from '@/components/shared/BaseContainer'

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const OfferFromStoreSkeleton: React.FC = () => (
  <BaseContainer backgroundColor="#fff">
    <View className="pt-10">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-3 border-b border-gray-100">
        <View className="w-6 h-6 bg-gray-200 rounded-full" />
        <View className="flex-1 items-center">
          <View className="w-40 h-4 bg-gray-200 rounded-lg" />
        </View>
        <View className="w-14 h-3 bg-gray-100 rounded-lg" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Banner skeleton */}
        <View className="mx-4 mt-4 bg-amber-50 rounded-2xl h-20" />

        {/* Product card skeleton */}
        <View className="mx-4 mt-4 rounded-2xl border border-gray-100 h-24" />

        {/* Offer amount card — dark bg matches real card */}
        <View className="mx-4 mt-4 bg-zinc-950 rounded-[32px] items-center justify-center" style={{ height: 220 }}>
          <ActivityIndicator size="large" color="#22C55E" />
        </View>

        {/* Store stats skeleton */}
        <View className="mx-4 mt-6 gap-2">
          <View className="w-32 h-3 bg-gray-200 rounded-lg" />
          <View className="h-28 bg-gray-100 rounded-2xl mt-2" />
        </View>

        {/* Breakdown skeleton */}
        <View className="mx-4 mt-6 gap-3">
          <View className="w-24 h-3 bg-gray-200 rounded-lg" />
          <View className="h-3 bg-gray-100 rounded-lg" />
          <View className="h-3 bg-gray-100 rounded-lg" />
          <View className="h-3 bg-gray-200 rounded-lg w-1/2 self-end" />
        </View>

        {/* Button skeletons */}
        <View className="px-4 mt-8 gap-3">
          <View className="h-14 bg-green-100 rounded-2xl" />
          <View className="h-14 bg-gray-100 rounded-2xl" />
          <View className="h-10 bg-gray-50 rounded-2xl" />
        </View>
      </ScrollView>
    </View>
  </BaseContainer>
)

// ─── Counter Offer Modal ──────────────────────────────────────────────────────

interface CounterOfferModalProps {
  visible: boolean
  storeName: string
  currentOffer: number
  onClose: () => void
  onSubmit: (price: number) => void
}

const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  visible,
  storeName,
  currentOffer,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const parsedValue = parseFloat(value)
  const isValid = !isNaN(parsedValue) && parsedValue > 0

  const handleSubmit = async () => {
    if (!isValid) {
      setError('Please enter a valid price.')
      return
    }
    if (parsedValue <= currentOffer) {
      setError(`Counter must be above the store's offer of $${currentOffer}.`)
      return
    }
    setError('')
    setSubmitting(true)
    // TODO: replace with your real API call
    await new Promise(r => setTimeout(r, 900))
    setSubmitting(false)
    onSubmit(parsedValue)
  }

  const handleClose = () => {
    setValue('')
    setError('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        className="flex-1 bg-black/50 justify-end"
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity activeOpacity={1}>
            <View className="bg-white rounded-t-3xl px-6 pt-5 pb-10">
              {/* Drag handle */}
              <View className="w-10 h-1 rounded-full bg-gray-200 self-center mb-5" />

              {/* Header */}
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-lg font-black text-gray-900">Make Counter Offer</Text>
                <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Feather name="x" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text className="text-xs text-gray-400 mb-6">
                {storeName} offered ${currentOffer.toFixed(2)}. Enter your asking price below.
              </Text>

              {/* Price input */}
              <View className={`flex-row items-center border-2 rounded-2xl px-4 py-3.5 gap-2 ${error ? 'border-red-400' : 'border-gray-200'}`}>
                <Text className="text-xl font-bold text-gray-400">$</Text>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    setValue(text.replace(/[^0-9.]/g, ''))
                    setError('')
                  }}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="#D1D5DB"
                  className="flex-1 text-2xl font-black text-gray-900"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>

              {/* Error */}
              {!!error && (
                <View className="flex-row items-center gap-1.5 mt-2">
                  <Feather name="alert-circle" size={12} color="#EF4444" />
                  <Text className="text-xs text-red-500">{error}</Text>
                </View>
              )}

              {/* Live hint */}
              {!error && isValid && parsedValue > currentOffer && (
                <Text className="text-xs text-green-600 mt-2">
                  +${(parsedValue - currentOffer).toFixed(2)} above current offer
                </Text>
              )}

              {/* Submit */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={submitting}
                activeOpacity={0.85}
                className={`mt-6 rounded-2xl py-4 items-center justify-center flex-row gap-2 ${submitting ? 'bg-gray-200' : 'bg-gray-900'}`}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Feather name="send" size={15} color="#fff" />
                    <Text className="text-white font-bold text-sm">Send Counter Offer</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleClose} className="items-center mt-3 py-2">
                <Text className="text-gray-400 text-sm">Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const OfferFromStoreScreen: React.FC = () => {
  const router = useRouter()
  const { id: notificationId } = useLocalSearchParams<{ id: string }>()
  const { offer, loading } = useOfferFromStore(notificationId)

  const [counterModalVisible, setCounterModalVisible] = useState(false)

  const handleAccept = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Offer Accepted! 🎉',
      text2: `You'll receive $${offer?.netPayout.toFixed(2)} within 24 hrs`,
    })
    router.back()
  }, [offer, router])

  const handleCounter = useCallback(() => {
    setCounterModalVisible(true)
  }, [])

  const handleCounterSubmit = useCallback((price: number) => {
    setCounterModalVisible(false)
    setTimeout(() => {
      Toast.show({
        type: 'info',
        text1: 'Counter Offer Sent!',
        text2: `You asked for $${price.toFixed(2)}. We'll notify you when ${offer?.store.name} responds.`,
        visibilityTime: 4000,
      })
    }, 350)
  }, [offer])

  const handleDecline = useCallback(() => {
    Toast.show({
      type: 'error',
      text1: 'Offer Declined',
      text2: 'The store has been notified.',
    })
    router.back()
  }, [router])

  // ✅ Skeleton instead of null — eliminates blank screen flash
  if (loading || !offer) return <OfferFromStoreSkeleton />

  return (
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
            <Text className="text-center text-base font-bold text-gray-900">
              Offer from a Store
            </Text>
          </View>
          <Text className="text-xs text-gray-400 w-16 text-right">Just now</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          {/* ── Store wants to buy banner ── */}
          <View className="mx-4 mt-4 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-4 flex-row items-start gap-3">
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
      </View>

      {/* ── Counter Offer Modal ── */}
      <CounterOfferModal
        visible={counterModalVisible}
        storeName={offer.store.name}
        currentOffer={offer.storeOffer}
        onClose={() => setCounterModalVisible(false)}
        onSubmit={handleCounterSubmit}
      />
    </BaseContainer>
  )
}

export default OfferFromStoreScreen