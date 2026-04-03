// screens/NotificationSettingsScreen.tsx
import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import BaseContainer from '@/components/shared/BaseContainer'
import { useNotificationSettings } from '@/services/hooks/discover/useNotificationSettings'
import SettingsSectionCard from '@/components/discover/notificationsettings/SettingsSectionCard'
import Button from '@/components/shared/Button'

const NotificationSettingsScreen = () => {
    const navigation = useNavigation()
    const {
        sections,
        pushEnabled,
        saving,
        toggleSetting,
        togglePushNotifications,
        saveSettings,
    } = useNotificationSettings()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                <View className="flex-row items-center px-4 py-3 bg-white  relative">

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="mr-3 z-10"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Feather name="arrow-left" size={22} color="#374151" />
                    </TouchableOpacity>

                    <Text className="absolute left-0 right-0 text-center text-base font-extrabold text-gray-900">
                        Settings
                    </Text>

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 48 }}
                >
                    {sections.map(section => (
                        <SettingsSectionCard
                            key={section.id}
                            section={section}
                            masterEnabled={pushEnabled}
                            onToggle={
                                section.id === 'global'
                                    ? (_sid, _iid) => togglePushNotifications()
                                    : toggleSetting
                            }
                        />
                    ))}

                    {/* ── Save button ── */}
                    <View className="px-4 mt-2">
                        <Button
                            text={saving ? 'Saving…' : 'Save Preferences'}
                            onPress={saveSettings}
                            backgroundColor='#000'
                            disabled={saving}
                            borderRadius={14}
                            paddingVertical={16}
                        />
                    </View>
                </ScrollView>
            </View>
        </BaseContainer>

    )
}

export default NotificationSettingsScreen