// components/discover/notifications/NotificationItem.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import type { Notification } from '@/services/hooks/discover/useNotifications'

interface NotificationItemProps {
  item: Notification
  onPress?: (id: string) => void
}

const NotifIcon: React.FC<{ icon: Notification['icon']; read: boolean }> = ({ icon, read }) => {
  const bg = read ? 'bg-gray-100' : 'bg-white'

  const renderIcon = () => {
    switch (icon) {
      case 'restock':
        return <Feather name="bell" size={18} color={read ? '#9CA3AF' : '#22C55E'} />
      case 'order':
        return <Ionicons name="bag-handle-outline" size={18} color={read ? '#9CA3AF' : '#22C55E'} />
      case 'drop':
        return <MaterialCommunityIcons name="water-outline" size={18} color={read ? '#9CA3AF' : '#3B82F6'} />
      case 'store':
        return <Feather name="tag" size={18} color={read ? '#9CA3AF' : '#A855F7'} />
      case 'system':
        return <Feather name="settings" size={18} color="#9CA3AF" />
    }
  }

  return (
    <View
      className={`w-12 h-12 rounded-xl ${bg} items-center justify-center overflow-hidden`}
      style={{ borderWidth: read ? 0 : 1, borderColor: '#E5E7EB' }}
    >
      {renderIcon()}
    </View>
  )
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item, onPress }) => {
  const router = useRouter()

  const handlePress = () => {
    switch (item.icon) {
      case 'restock':
        router.push(`/screens/discover/reStockAlertScreen?id=${item.id}`)
        break
      case 'store':
        router.push(`/screens/discover/offerFromStoreScreen?id=${item.id}`)
        break
      case 'drop':
        router.push({
          pathname: '/screens/discover/setDropReminderScreen',
          params: {
            id: item.id,
            brand: item.brand ?? '',
            name: item.title,
            dropTime: item.subtitle ?? '',
            imageUri: item.imageUri ?? '',
          },
        })
        break
      case 'order':
        router.push('/screens/order/orderStatusScreen')
        break
      default:
        break
    }
    onPress?.(item.id)
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`flex-row px-4 py-3.5 gap-3 ${!item.read ? 'bg-green-50' : 'bg-white'}`}
    >
      {!item.read && (
        <View className="absolute left-2 top-5 w-2 h-2 rounded-full bg-green-500" />
      )}

      <View className="ml-2">
        {item.imageUri ? (
          <View className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
            <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
          </View>
        ) : (
          <NotifIcon icon={item.icon} read={item.read} />
        )}
      </View>

      <View className="flex-1">
        <Text className="text-sm font-extrabold text-gray-900">{item.title}</Text>
        <Text className="text-xs text-gray-500 mt-0.5 leading-snug">{item.subtitle}</Text>

        {item.price != null && (
          <View className="flex-row items-center gap-1.5 mt-1">
            <Text className="text-sm font-extrabold text-gray-900">${item.price}</Text>
            {item.originalPrice != null && (
              <Text className="text-xs text-gray-400 line-through">${item.originalPrice}</Text>
            )}
          </View>
        )}

        <Text className="text-[11px] text-gray-400 mt-1">{item.time}</Text>
      </View>

      <View className="items-end justify-center">
        {item.action && (
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            className="border border-gray-300 rounded-full px-3 py-1.5"
          >
            <Text className="text-xs font-bold text-gray-800">{item.action.label}</Text>
          </TouchableOpacity>
        )}
        {item.ended && (
          <View className="bg-gray-100 rounded-full px-3 py-1.5">
            <Text className="text-xs font-bold text-gray-500">Offer ended</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default NotificationItem