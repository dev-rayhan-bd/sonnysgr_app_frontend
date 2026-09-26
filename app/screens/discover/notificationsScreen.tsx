// app/screens/discover/notificationsScreen.tsx
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'

import { useNotifications } from '@/services/hooks/discover/useNotifications'
import NotificationFilterTabs from '@/components/discover/notifications/NotificationsFilterTabs'
import NotificationGroup from '@/components/discover/notifications/NotificationGroup'
import BaseContainer from '@/components/shared/BaseContainer'

const NotificationsScreen = () => {
  const navigation = useNavigation()
  const {
    grouped,
    activeCategory,
    unreadCount,
    setActiveCategory,
    markAllRead,
    markRead,
  } = useNotifications()

  return (
    <BaseContainer backgroundColor="#fff">
      <View className="pt-10 flex-1">
        {/* ── Top bar ── */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#374151" />
          </TouchableOpacity>

          <Text className="text-base font-extrabold text-gray-900">Notifications</Text>

          <TouchableOpacity
            onPress={() => router.push('/screens/discover/notificationsSettingsScreen')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="settings" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* ── Unread count + Mark all read ── */}
        <View className="flex-row items-center justify-between px-4 pb-1">
          <Text className="text-sm font-bold text-green-600">
            {unreadCount} unread
          </Text>
          <TouchableOpacity onPress={markAllRead}>
            <Text className="text-sm font-bold text-green-600">Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* ── Category pills ── */}
        <NotificationFilterTabs
          active={activeCategory}
          onChange={setActiveCategory}
          unreadCount={unreadCount}
        />

        {/* ── Grouped list ── */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {grouped.length === 0 ? (
            <View className="items-center justify-center py-24">
              <Feather name="bell-off" size={40} color="#D1D5DB" />
              <Text className="text-sm text-gray-400 mt-4 font-medium">
                No notifications here
              </Text>
            </View>
          ) : (
            grouped.map(({ group, items }) => (
              <NotificationGroup
                key={group}
                group={group}
                items={items}
                onPressItem={markRead}
              />
            ))
          )}
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

export default NotificationsScreen