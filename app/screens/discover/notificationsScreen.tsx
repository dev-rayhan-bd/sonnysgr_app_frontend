// screens/NotificationsScreen.tsx
import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { useNotifications } from '@/services/hooks/discover/useNotifications'
import NotificationBanner from '@/components/discover/notifications/NotificationBanner'
import NotificationFilterTabs from '@/components/discover/notifications/NotificationsFilterTabs'
import NotificationGroup from '@/components/discover/notifications/NotificationGroup'
import BaseContainer from '@/components/shared/BaseContainer'
import { router } from 'expo-router'
const NotificationsScreen = () => {
    const navigation = useNavigation()
    const {
        grouped,
        activeCategory,
        unreadCount,
        setActiveCategory,
        markAllRead,
        clearAll,
        markRead,
    } = useNotifications()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>

            <View className='pt-10'>
                <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Feather name="arrow-left" size={22} color="#374151" />
                    </TouchableOpacity>

                    <Text className="text-base font-extrabold text-gray-900">Notifications</Text>

                    <TouchableOpacity onPress={() => router.push("/screens/discover/notificationsSettingsScreen")}>
                        <Feather name="settings" size={20} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* ── Mark all read ── */}
                <View className="flex-row justify-end px-5 pt-2">
                    <TouchableOpacity onPress={markAllRead}>
                        <Text className="text-xs font-semibold text-green-500">Mark all read</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Unread banner ── */}
                <NotificationBanner unreadCount={unreadCount} onClearAll={clearAll} />

                {/* ── Category pills ── */}
                <NotificationFilterTabs active={activeCategory} onChange={setActiveCategory} />

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