// components/notifications/offer/OfferActionButtons.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props {
  netPayout: number
  onAccept: () => void
  onCounter: () => void
  onDecline: () => void
}

const OfferActionButtons: React.FC<Props> = ({
  netPayout,
  onAccept,
  onCounter,
  onDecline,
}) => (
  <View className="px-4 mt-6 gap-3">
    {/* Accept */}
    <TouchableOpacity
      onPress={onAccept}
      activeOpacity={0.85}
      className="bg-green-500 rounded-xl py-4 flex-row items-center justify-center gap-2"
    >
      <Feather name="check" size={16} color="#fff" />
      <Text className="text-white font-bold text-sm">
        Accept Offer (${netPayout.toFixed(2)})
      </Text>
    </TouchableOpacity>

    {/* Counter */}
    <TouchableOpacity
      onPress={onCounter}
      activeOpacity={0.85}
      className="border border-gray-300 rounded-xl py-4 flex-row items-center justify-center gap-2"
    >
      <Feather name="edit-2" size={14} color="#374151" />
      <Text className="text-gray-800 font-semibold text-sm">Make Counter Offer</Text>
    </TouchableOpacity>

    {/* Decline */}
    <TouchableOpacity
      onPress={onDecline}
      activeOpacity={0.85}
      className="flex-row items-center justify-center gap-1.5 py-3"
    >
      <Feather name="x" size={14} color="#EF4444" />
      <Text className="text-red-500 font-semibold text-sm">Decline Offer</Text>
    </TouchableOpacity>
  </View>
)

export default OfferActionButtons