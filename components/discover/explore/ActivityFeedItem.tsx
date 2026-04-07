// components/discover/trending/ActivityFeedItem.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { ActivityItem } from '@/services/hooks/discover/useTrending'

interface Props {
  item: ActivityItem
  isLast?: boolean
  onPress: () => void
}

const ActivityFeedItem: React.FC<Props> = ({ item, isLast, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className={`flex-row items-center gap-3 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
  >
    <View
      className="w-10 h-10 rounded-full items-center justify-center"
      style={{ backgroundColor: item.avatarColor }}
    >
      <Text className="text-white text-xs font-extrabold">{item.avatarInitials}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-sm text-gray-900 leading-snug" numberOfLines={2}>
        <Text className="font-bold">{item.handle}</Text>
        {' '}{item.action}{' '}
        <Text className="font-bold text-gray-700">{item.target}</Text>
        {item.store
          ? <Text className="text-gray-400"> at {item.store}</Text>
          : null
        }
      </Text>
      <Text className="text-[11px] text-gray-400 mt-0.5">{item.timeAgo}</Text>
    </View>
    {item.imageUri && (
      <View className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden">
        <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
      </View>
    )}
  </TouchableOpacity>
)

export default ActivityFeedItem