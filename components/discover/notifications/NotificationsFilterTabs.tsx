// components/discover/notifications/NotificationsFilterTabs.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NotificationCategory } from '@/services/hooks/discover/useNotifications'

interface NotificationFilterTabsProps {
  active: NotificationCategory
  onChange: (tab: NotificationCategory) => void
  unreadCount: number
}

const ROW_1: { label: NotificationCategory; text: string }[] = [
  { label: 'All', text: 'All' },
  { label: 'Unread', text: 'Unread' },
  { label: 'Orders', text: 'Orders' },
]

const ROW_2_ICON = (label: string, color: string) => {
  switch (label) {
    case 'Restocks':
      return <Feather name="refresh-cw" size={13} color={color} />
    case 'Drops':
      return <MaterialCommunityIcons name="water-outline" size={14} color={color} />
    case 'PriceDrops':
      return <Feather name="trending-down" size={13} color={color} />
    case 'Offers':
      return <Feather name="tag" size={13} color={color} />
    default:
      return null
  }
}

const ROW_2: { label: NotificationCategory; text: string }[] = [
  { label: 'Restocks', text: 'Restocks' },
  { label: 'Drops', text: 'Drops' },
  { label: 'PriceDrops', text: 'Price drops' },
  { label: 'Offers', text: 'Offers' },
]

const NotificationFilterTabs: React.FC<NotificationFilterTabsProps> = ({
  active,
  onChange,
  unreadCount,
}) => {
  return (
    <View className="pb-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, gap: 8 }}
      >
        {ROW_1.map(({ label, text }) => {
          const isActive = active === label
          return (
            <TouchableOpacity
              key={label}
              onPress={() => onChange(label)}
              activeOpacity={0.75}
              className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full ${
                isActive ? 'bg-gray-900' : 'bg-white border border-gray-200'
              }`}
            >
              {label === 'Unread' && (
                <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
              )}
              <Text
                className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-700'}`}
              >
                {text}
                {label === 'Unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, gap: 8 }}
      >
        {ROW_2.map(({ label, text }) => {
          const isActive = active === label
          return (
            <TouchableOpacity
              key={label}
              onPress={() => onChange(label)}
              activeOpacity={0.75}
              className={`flex-row items-center gap-1.5 px-3.5 py-1.5 rounded-full ${
                isActive ? 'bg-gray-900' : 'bg-white border border-gray-200'
              }`}
            >
              {ROW_2_ICON(label, isActive ? '#FFFFFF' : '#6B7280')}
              <Text
                className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}
              >
                {text}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default NotificationFilterTabs