// app/profilesetup/notifications.tsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useNotifications } from '@/services/hooks/profilesetup/useEnableNotification'
import Button from '@/components/shared/Button'
import NotificationToggleRow from '@/components/profilesetup/NotificationToggleRow'
import ShowPicture from '@/components/shared/ShowPicture'
import NotificationHeroIcon from '@/assets/images/profilesetup/notification_hero.svg'
import BaseContainer from '@/components/shared/BaseContainer'
export default function NotificationsScreen() {
    const { settings, loading, toggleSetting, handleEnableNotifications } = useNotifications()

    const onEnable = () => {
        handleEnableNotifications(() => router.push('/profilesetup/pickBrandScreen'))
    }

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
              <View className="flex-1 justify-center px-6 pt-10">
            <View style={styles.heroContainer}>
                <ShowPicture
                    SvgComponent={NotificationHeroIcon}
                    width={400}
                    height={400}
                    preserveAspectRatio="xMidYMid meet"
                />
            </View>
            <View className='bg-gray-50 w-full rounded-2xl px-4 py-3'>
                <Text style={styles.sectionLabel}>NOTIFY ME ABOUT</Text>

                {/* Toggle rows */}
                <View style={styles.toggleList}>
                    {settings.map((item, index) => (
                        <View key={item.id}>
                            <NotificationToggleRow item={item} onToggle={toggleSetting} />
                            {index < settings.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>
            </View>


            {/* Sticky footer */}
            <View style={styles.footer}>
                <Button
                    text={loading ? 'Enabling...' : 'Turn On Notifications'}
                    onPress={onEnable}
                    disabled={loading}
                    variant="solid"
                    backgroundColor="#111827"
                    height={56}
                    borderRadius={14}
                    fontSize={16}
                    fontWeight="700"
                    opacity={loading ? 0.7 : 1}
                    style={{ flex: 0, alignSelf: 'stretch' }}
                />

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() => router.push('/')}
                    activeOpacity={0.7}
                    disabled={loading}
                >
                    <Text style={styles.skipText}>Maybe later</Text>
                </TouchableOpacity>

                <Text style={styles.hint}>
                    You can always change this in Settings → Notifications
                </Text>
            </View>
            </View>
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 16,
    },

    // Hero
    heroContainer: {
        alignItems: 'center',
        marginBottom: 32,
        gap: 10,
    },
    // Section
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    toggleList: {
        borderRadius: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 44,
    },

    // Footer
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 28,
        paddingTop: 12,

        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        gap: 8,
    },
    skipBtn: {
        paddingVertical: 4,
    },
    skipText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    hint: {
        fontSize: 11,
        color: '#D1D5DB',
        textAlign: 'center',
        marginTop: 2,
    },
})