// components/notifications/NotificationBanner.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface NotificationBannerProps {
  unreadCount: number
  onClearAll: () => void
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  unreadCount,
  onClearAll,
}) => {
  if (unreadCount === 0) return null

  return (
    <View className="flex-row justify-between items-center px-5 py-2.5 bg-green-50 border-b border-green-100">
      <Text className="text-xs font-semibold text-green-700">
        {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
      </Text>
      <TouchableOpacity onPress={onClearAll}>
        <Text className="text-xs font-semibold text-gray-400">Clear all</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationBanner