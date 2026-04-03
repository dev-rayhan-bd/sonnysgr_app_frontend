// components/notifications/offer/OfferHeroCard.tsx
import React from 'react'
import { View, Text, Image } from 'react-native'
import type { StoreOffer } from '@/services/hooks/discover/useOfferFromStore'

interface Props {
  offer: StoreOffer
}

const OfferHeroCard: React.FC<Props> = ({ offer }) => (
  <View className="mx-4 mt-3 rounded-2xl border border-gray-200 flex-row items-center px-4 py-4 gap-4">
    {/* Product image */}
    <Image
      source={{ uri: offer.productImageUrl }}
      className="w-20 h-14"
      resizeMode="contain"
    />

    {/* Info */}
    <View className="flex-1">
      <View className="self-start bg-green-50 border border-green-200 rounded-full px-2 py-0.5 mb-1.5">
        <Text className="text-green-600 text-[10px] font-semibold">From your locker</Text>
      </View>
      <Text className="text-sm font-bold text-gray-900 leading-snug">{offer.productName}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        Your condition: {offer.productCondition}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        In your locker since {offer.inLockerSince}
      </Text>
    </View>
  </View>
)

export default OfferHeroCard