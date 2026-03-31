// app/profilesetup/followStoresScreen.tsx
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useFollowStores } from '@/services/hooks/profilesetup/useFollowStores'
import Button from '@/components/shared/Button'
import StoreCard from '@/components/profilesetup/StoreCard'
import ShowPicture from '@/components/shared/ShowPicture'
import StoresMapIcon from '@/assets/images/profilesetup/stores_map.svg'
import BaseContainer from '@/components/shared/BaseContainer'
import StatsBar from '@/components/profilesetup/StatsBar'
export default function FollowStoresScreen() {
    const { stores, toggleFollow, handleContinue, loading } = useFollowStores()

    const onContinue = () => {
        handleContinue(() => router.push('/profilesetup/enableNotificationScreen'))
    }

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View style={styles.container}>
                {/* Top Section: Hero SVG map + Header */}
                <View style={styles.topSection}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Follow stores near you</Text>
                        <Text style={styles.subheading}>
                            Get new arrival & drop alerts from stores you follow.
                        </Text>
                    </View>

                    <View style={styles.heroWrapper}>
                        <ShowPicture
                            SvgComponent={StoresMapIcon}
                            width={300}
                            height={300}
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </View>

                    {/* 👇 ADD HERE */}
                    <StatsBar
                        nearby={stores.length}
                        following={stores.filter(s => s.following).length}
                        newDrops={71}
                    />
                </View>

                {/* Nearby stores label */}
                <Text style={styles.sectionLabel}>Nearby Stores</Text>

                {/* Store list */}
                <View style={styles.storeList}>
                    {stores.map((store, index) => (
                        <View key={store.id} style={styles.storeCardWrapper}>
                            <StoreCard store={store} onToggleFollow={toggleFollow} />
                            {index < stores.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                {/* Sticky footer */}
                <View style={styles.footer}>
                    <Button
                        text={loading ? 'Saving...' : 'Continue'}
                        onPress={onContinue}
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
                </View>
            </View>
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // centers horizontally
        paddingHorizontal: 20,
        paddingTop: 60, // top spacing
        backgroundColor: '#fff',
    },
    topSection: {
        alignItems: 'center', // centers header and hero
        marginBottom: 20,
    },
    header: {
        alignItems: 'center', // center text
        marginBottom: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: '900',
        color: '#111827',
        marginBottom: 6,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        textAlign: 'center',
    },
    heroWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
        alignSelf: 'flex-start', // keeps label aligned to left
    },
    storeList: {
        width: '100%',
    },
    storeCardWrapper: {
        width: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    footer: {
        width: '100%',
        paddingVertical: 12,
        paddingBottom: 28,

        backgroundColor: '#FFFFFF',
    },
})