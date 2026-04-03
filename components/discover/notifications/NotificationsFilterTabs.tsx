// components/notifications/NotificationFilterTabs.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import type { NotificationCategory } from '@/services/hooks/discover/useNotifications'

const TABS: { label: NotificationCategory; emoji: string }[] = [
  { label: 'All',      emoji: ''   },
  { label: 'Restocks', emoji: '🔔' },
  { label: 'Orders',   emoji: '🛍️' },
  { label: 'Drops',    emoji: '🔥' },
  { label: 'Stores',   emoji: '📍' },
]

interface NotificationFilterTabsProps {
  active: NotificationCategory
  onChange: (tab: NotificationCategory) => void
}

const NotificationFilterTabs: React.FC<NotificationFilterTabsProps> = ({
  active,
  onChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
    >
      {TABS.map(({ label, emoji }) => {
        const isActive = active === label
        return (
          <TouchableOpacity
            key={label}
            onPress={() => onChange(label)}
            activeOpacity={0.75}
            className={`flex-row items-center gap-1 px-4 py-2 rounded-full ${
              isActive ? 'bg-gray-900' : 'bg-white border border-gray-200'
            }`}
            style={
              isActive
                ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 2 }
                : {}
            }
          >
            <Text className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>
              {label}
            </Text>
            {emoji ? <Text className="text-sm">{emoji}</Text> : null}
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default NotificationFilterTabs