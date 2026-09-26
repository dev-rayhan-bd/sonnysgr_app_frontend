// components/discover/notifications/NotificationGroup.tsx
import React from 'react'
import { View, Text } from 'react-native'
import NotificationItem from './NotificationItem'
import type { Notification, NotificationGroup as GroupType } from '@/services/hooks/discover/useNotifications'

interface NotificationGroupProps {
  group: GroupType
  items: Notification[]
  onPressItem: (id: string) => void
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({ group, items, onPressItem }) => {
  return (
    <View>
      <Text className="text-sm font-extrabold text-gray-900 px-4 pt-4 pb-1">{group}</Text>

      {items.map((item, index) => (
        <View key={item.id}>
          <NotificationItem item={item} onPress={onPressItem} />
          {index < items.length - 1 && <View className="h-px bg-gray-100 mx-4" />}
        </View>
      ))}
    </View>
  )
}

export default NotificationGroup