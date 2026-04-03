// components/notifications/offer/OfferBreakdown.tsx
import React from 'react'
import { View, Text } from 'react-native'
import type { StoreOffer } from '@/services/hooks/discover/useOfferFromStore'

interface Props {
  offer: StoreOffer
}

const Row: React.FC<{ label: string; value: string; valueColor?: string; bold?: boolean }> = ({
  label,
  value,
  valueColor = 'text-gray-700',
  bold = false,
}) => (
  <View className="flex-row items-center justify-between py-2">
    <Text className={`text-sm ${bold ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
      {label}
    </Text>
    <Text className={`text-sm font-semibold ${bold ? 'text-gray-900 font-black' : valueColor}`}>
      {value}
    </Text>
  </View>
)

const OfferBreakdown: React.FC<Props> = ({ offer }) => (
  <View className="mx-4 mt-6">
    <Text className="text-sm font-bold text-gray-900 mb-1">If you accept</Text>

    <View className="border-t border-gray-100">
      <Row label="Store offers" value={`$${offer.storeOffer.toFixed(2)}`} />
      <Row
        label={`GoSNKR fee (${offer.platformFeePercent}%)`}
        value={`-$${offer.platformFee.toFixed(2)}`}
        valueColor="text-red-500"
      />
      <View className="border-t border-gray-200 mt-1" />
      <Row
        label="You receive"
        value={`$${offer.netPayout.toFixed(2)}`}
        valueColor="text-green-600"
        bold
      />
    </View>
  </View>
)

export default OfferBreakdown