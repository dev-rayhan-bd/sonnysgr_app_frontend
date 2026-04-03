// components/notifications/NotificationItem.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { Notification } from '@/services/hooks/discover/useNotifications'

interface NotificationItemProps {
  item: Notification
  onPress: (id: string) => void
}

// ─── Icon by type ─────────────────────────────────────────────────────────────

const NotifIcon: React.FC<{ icon: Notification['icon']; read: boolean }> = ({
  icon,
  read,
}) => {
  const bg = read ? 'bg-gray-100' : 'bg-green-50'

  const renderIcon = () => {
    switch (icon) {
      case 'restock':
        return <Feather name="bell" size={18} color={read ? '#9CA3AF' : '#22C55E'} />
      case 'order':
        return <Ionicons name="bag-outline" size={18} color={read ? '#9CA3AF' : '#3B82F6'} />
      case 'drop':
        return <MaterialCommunityIcons name="fire" size={18} color={read ? '#9CA3AF' : '#F97316'} />
      case 'store':
        return <Feather name="tag" size={18} color={read ? '#9CA3AF' : '#A855F7'} />
      case 'system':
        return <Feather name="settings" size={18} color={read ? '#9CA3AF' : '#6B7280'} />
    }
  }

  return (
    <View className={`w-10 h-10 rounded-full ${bg} items-center justify-center`}>
      {renderIcon()}
    </View>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const NotificationItem: React.FC<NotificationItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3.5 gap-3"
    >
      {/* Unread dot */}
      <View className="w-2 items-center">
        {!item.read && (
          <View className="w-2 h-2 rounded-full bg-green-500" />
        )}
      </View>

      {/* Icon */}
      <NotifIcon icon={item.icon} read={item.read} />

      {/* Text block */}
      <View className="flex-1">
        <Text
          className={`text-sm leading-snug ${
            item.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'
          }`}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text className="text-xs text-gray-400 mt-0.5 leading-snug" numberOfLines={2}>
          {item.subtitle}
        </Text>
        <Text className="text-[11px] text-gray-400 mt-1">{item.time}</Text>
      </View>

      {/* Chevron */}
      <Feather name="chevron-right" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  )
}

export default NotificationItem