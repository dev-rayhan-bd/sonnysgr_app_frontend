// components/discover/following/StoreRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { FollowedStore } from '@/services/hooks/profile/useFollowing'

interface Props {
  store: FollowedStore
  isLast: boolean
  onVisit?: () => void
  onToggleNotif?: () => void
}

const StoreRow: React.FC<Props> = ({ store, isLast, onVisit, onToggleNotif }) => (
  <View className={`flex-row items-center px-4 py-4 gap-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    {/* Avatar */}
    <View
      className="w-14 h-14 rounded-2xl items-center justify-center"
      style={{ backgroundColor: store.brandColor }}
    >
      <Text className="text-white text-base font-extrabold">{store.initials}</Text>
    </View>

    {/* Info */}
    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900">{store.name}</Text>
      <Text className="text-xs text-green-500 font-medium mt-0.5">
        {store.itemsNearYou} items in your size
      </Text>
      <Text className="text-xs text-gray-400">{store.distance}</Text>
    </View>

    {/* Bell */}
    <TouchableOpacity onPress={onToggleNotif} className="p-2">
      <Ionicons
        name={store.notificationsOn ? 'notifications' : 'notifications-off-outline'}
        size={20}
        color={store.notificationsOn ? '#22C55E' : '#9CA3AF'}
      />
    </TouchableOpacity>

    {/* Visit button — matches BrandRow Buy button style */}
    <TouchableOpacity
      onPress={onVisit}
      className="bg-gray-900 px-5 py-2 rounded-full"
    >
      <Text className="text-white text-sm font-extrabold">Visit</Text>
    </TouchableOpacity>
  </View>
)

export default StoreRow
