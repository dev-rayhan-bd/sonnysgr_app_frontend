// components/profile/MyLocker.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import type { LockerItem } from '@/services/hooks/profile/useProfile'

interface MyLockerProps {
  items: LockerItem[]
  lockerCount: number
  lockerPublic: boolean
  onToggleVisibility: () => void
  onAddItem?: () => void
  onViewAll: () => void
}

const MyLocker: React.FC<MyLockerProps> = ({
  items,
  lockerPublic,
  onToggleVisibility,
  onAddItem,
  onViewAll,
}) => {
  const router = useRouter()

  const handleAddPress = () => {
    if (onAddItem) return onAddItem()
    router.push('/screens/profile/lockerScreen')
  }

  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-row justify-between items-center mb-3.5">
        <Text className="text-base font-extrabold text-gray-900">My locker</Text>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={onViewAll} className="flex-row items-center gap-0.5">
            <Text className="text-xs font-bold text-green-600">Manage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onToggleVisibility}
            activeOpacity={0.7}
            className="flex-row items-center gap-1"
          >
            <Text className="text-xs font-semibold text-gray-500">
              {lockerPublic ? 'Public' : 'Private'}
            </Text>
            <Feather name="chevron-down" size={13} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-xs text-gray-400 mb-3">Your personal collection</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-50"
          >
            <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddPress}
          activeOpacity={0.6}
          className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 items-center justify-center bg-gray-50/50"
        >
          <Feather name="plus" size={22} color="#9CA3AF" />
          <Text className="text-[10px] text-gray-400 font-semibold mt-1">Add item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default MyLocker