// components/notifications/NotificationGroup.tsx
import React from 'react'
import { View, Text } from 'react-native'
import NotificationItem from './NotificationItem'
import type { Notification, NotificationGroup as GroupType } from '@/services/hooks/discover/useNotifications'

interface NotificationGroupProps {
  group: GroupType
  items: Notification[]
  onPressItem: (id: string) => void
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({
  group,
  items,
  onPressItem,
}) => {
  return (
    <View className="mb-2">
      {/* Section label */}
      <Text className="text-[11px] font-bold text-gray-400 tracking-widest px-4 pt-4 pb-1">
        {group}
      </Text>

      {/* Items card */}
      <View className="bg-white mx-4 rounded-2xl overflow-hidden"
        style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
      >
        {items.map((item, index) => (
          <View key={item.id}>
            <NotificationItem item={item} onPress={onPressItem} />
            {index < items.length - 1 && (
              <View className="h-px bg-gray-100 ml-16" />
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default NotificationGroup