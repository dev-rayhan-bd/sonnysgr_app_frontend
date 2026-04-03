import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

interface WishlistHeaderProps {
  activeFilterCount: number
  onBack?: () => void
  onFilterOpen: () => void
}

export default function WishlistHeader({
  activeFilterCount,
  onBack,
  onFilterOpen,
}: WishlistHeaderProps) {
  const handleBack = onBack ?? (() => router.back())

  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-2 bg-white">
      {/* ── Back ── */}
      <TouchableOpacity onPress={handleBack} activeOpacity={0.7} className="p-1 -ml-1">
        <Ionicons name="chevron-back" size={24} color="#111827" />
      </TouchableOpacity>

      {/* ── Title ── */}
      <Text className="text-2xl font-extrabold text-gray-900">Wishlist</Text>

      {/* ── Filter icon with active badge ── */}
      <TouchableOpacity
        onPress={onFilterOpen}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        className="relative p-1"
      >
        <Feather name="filter" size={20} color="#374151" />
        {activeFilterCount > 0 && (
          <View className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full items-center justify-center">
            <Text className="text-white text-[9px] font-bold">
              {activeFilterCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}