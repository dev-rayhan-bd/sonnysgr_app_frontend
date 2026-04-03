// components/notifications/restock/RestockActionButtons.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  onBuyNow: () => void
  onHold: () => void
  onReserve: () => void
  onSeeOtherStores: () => void
}

const RestockActionButtons: React.FC<Props> = ({
  onBuyNow,
  onHold,
  onReserve,
  onSeeOtherStores,
}) => (
  <View className="px-4 mt-6 gap-3">
    {/* Buy Now */}
    <TouchableOpacity
      onPress={onBuyNow}
      activeOpacity={0.85}
      className="bg-gray-900 rounded-xl py-4 flex-row items-center justify-center gap-2"
    >
      <Feather name="shopping-bag" size={16} color="#fff" />
      <Text className="text-white font-bold text-sm">Buy Now — Secure This Pair →</Text>
    </TouchableOpacity>

    {/* Hold with Deposit */}
    <TouchableOpacity
      onPress={onHold}
      activeOpacity={0.85}
      className="bg-blue-600 rounded-xl py-4 flex-row items-center justify-center gap-2"
    >
      <MaterialCommunityIcons name="lock-outline" size={16} color="#fff" />
      <Text className="text-white font-bold text-sm">Hold with Deposit</Text>
    </TouchableOpacity>

    {/* Reserve for Pickup */}
    <TouchableOpacity
      onPress={onReserve}
      activeOpacity={0.85}
      className="bg-green-500 rounded-xl py-4 flex-row items-center justify-center gap-2"
    >
      <Feather name="map-pin" size={16} color="#fff" />
      <Text className="text-white font-bold text-sm">Reserve for Pickup</Text>
    </TouchableOpacity>

    {/* See other stores — text link */}
    <TouchableOpacity onPress={onSeeOtherStores} activeOpacity={0.7} className="items-center py-1">
      <Text className="text-green-500 text-sm font-medium underline">
        See if other stores have it
      </Text>
    </TouchableOpacity>
  </View>
)

export default RestockActionButtons