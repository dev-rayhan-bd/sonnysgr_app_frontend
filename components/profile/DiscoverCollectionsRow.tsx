// components/profile/DiscoverCollectionsRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface DiscoverCollectionsRowProps {
  onPress: () => void
}

const DiscoverCollectionsRow: React.FC<DiscoverCollectionsRowProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 mb-3"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    }}
  >
    <View className="flex-row items-center gap-3">
      <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center">
        <Feather name="grid" size={18} color="#22C55E" />
      </View>
      <View>
        <Text className="text-sm font-bold text-gray-900">Discover collections</Text>
        <Text className="text-xs text-gray-400 mt-0.5">Curated drops, trends and more</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={18} color="#D1D5DB" />
  </TouchableOpacity>
)

export default DiscoverCollectionsRow