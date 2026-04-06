// app/screens/store/pickupCompleteScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { usePickupComplete } from '@/services/hooks/order/usePickupComplete'
import StarRating from '@/components/profile/orders/StarRating'
import BaseContainer from '@/components/shared/BaseContainer'
export default function PickupCompleteScreen() {
  const router = useRouter()
  const { storeName, rating, handleRate, handleWriteReview } = usePickupComplete()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-20'>
      <View className="flex-1 items-center justify-center px-6">

        {/* Success icon */}
        <View className="w-20 h-20 rounded-full bg-green-500 items-center justify-center mb-6">
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>

        <Text className="text-2xl font-extrabold text-gray-900 mb-2">Pickup Complete!</Text>
        <Text className="text-sm text-gray-400 mb-1">Enjoy your new kicks! 👟</Text>
        <Text className="text-base font-bold text-gray-900 mb-6">{storeName}</Text>

        {/* Rating */}
        <Text className="text-sm text-gray-500 mb-4">How was your experience?</Text>
        <StarRating rating={rating} onRate={handleRate} size={38} />

        {/* Actions */}
        <View className="w-full mt-10 gap-3">
          <TouchableOpacity
            onPress={() => router.push('/tabs/discoverScreen')}
            activeOpacity={0.8}
            style={{ borderRadius: 16 }}
            className="w-full bg-black py-5 items-center justify-center rounded-2xl"
          >
            <Text className="text-white text-base font-extrabold">Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleWriteReview}
            activeOpacity={0.8}
            className="w-full py-4 items-center justify-center rounded-2xl border border-gray-200"
          >
            <Text className="text-gray-900 text-base font-semibold">Write a Review</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    </BaseContainer>
  )
}