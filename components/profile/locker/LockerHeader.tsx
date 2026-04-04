import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface LockerHeaderProps {
  username: string
  pairCount: number
  isPublic: boolean
  onBack: () => void
  onShare: () => void
  onToggleVisibility: () => void
}

const LockerHeader: React.FC<LockerHeaderProps> = ({
  username,
  pairCount,
  isPublic,
  onBack,
  onShare,
  onToggleVisibility,
}) => (
  <View className="px-4 pt-14 pb-4 bg-white">
    {/* Top row */}
    <View className="flex-row items-center justify-between mb-1">
      {/* Back */}
      <TouchableOpacity
        onPress={onBack}
        className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Feather name="chevron-left" size={20} color="#111827" />
      </TouchableOpacity>

      {/* Title */}
      <View className="items-center flex-1 mx-3">
        <Text className="text-base font-black text-gray-900 tracking-tight">GoSNKR Locker</Text>
        <Text className="text-xs font-semibold text-green-500 mt-0.5">{username}</Text>
      </View>

      {/* Right actions */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onShare}
          className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
        >
          <Feather name="share-2" size={16} color="#374151" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onToggleVisibility}
          className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
        >
          <Feather name={isPublic ? 'unlock' : 'lock'} size={16} color="#374151" />
        </TouchableOpacity>
      </View>
    </View>

    {/* Subtitle row */}
    <View className="flex-row items-center justify-center gap-3 mt-1">
      <Text className="text-xs font-semibold text-gray-500">{pairCount} pairs</Text>

      {/* ✅ StyleSheet instead of conditional className */}
      <View style={[styles.badge, isPublic ? styles.badgePublic : styles.badgePrivate]}>
        <Text style={styles.badgeText}>{isPublic ? 'Public' : 'Private'}</Text>
      </View>
    </View>
  </View>
)

export default LockerHeader

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgePublic: {
    backgroundColor: '#22C55E',
  },
  badgePrivate: {
    backgroundColor: '#9CA3AF',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
})