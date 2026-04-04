// components/discover/storeProfile/StoreTrustBadges.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

interface Props {
  isVerified: boolean
  isFastPickup: boolean
  isTopRated: boolean
}

const StoreTrustBadges: React.FC<Props> = ({ isVerified, isFastPickup, isTopRated }) => (
  <View className="flex-row gap-2 flex-wrap py-3">
    {isVerified && (
      <View className="flex-row items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
        <Ionicons name="shield-checkmark-outline" size={13} color="#22C55E" />
        <Text className="text-white text-xs font-bold">Verified Store</Text>
      </View>
    )}
    {isFastPickup && (
      <View className="flex-row items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
        <Feather name="zap" size={13} color="#F59E0B" />
        <Text className="text-white text-xs font-bold">Fast Pickup</Text>
      </View>
    )}
    {isTopRated && (
      <View className="flex-row items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
        <Ionicons name="trophy-outline" size={13} color="#3B82F6" />
        <Text className="text-white text-xs font-bold">Top Rated</Text>
      </View>
    )}
  </View>
)

export default StoreTrustBadges