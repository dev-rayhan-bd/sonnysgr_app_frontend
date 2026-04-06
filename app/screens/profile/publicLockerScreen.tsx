import React, { useCallback } from 'react'
import { ScrollView, Share, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { usePublicLocker } from '@/services/hooks/profile/usePublicLocker'
import PublicLockerHeader from '@/components/profile/locker/PublicLockerHeader'
import PublicLockerFilter from '@/components/profile/locker/PublicLockerFilter'
import PublicLockerGrid from '@/components/profile/locker/PublicLockerGrid'
import type { PublicLockerItem } from '@/types/lockerbrowser'
import BaseContainer from '@/components/shared/BaseContainer'
import { View } from 'react-native'
const PublicLockerScreen: React.FC = () => {
    const router = useRouter()
    const { lockerId, username } = useLocalSearchParams<{ lockerId: string; username: string }>()

    const {
        profile,
        filters,
        activeFilter,
        setActiveFilter,
        filteredItems,
        filterCounts,
        toggleFollow,
    } = usePublicLocker(lockerId)

    const handleBack = useCallback(() => {
        if (router.canGoBack()) router.back()
    }, [router])

    const handleShare = useCallback(async () => {
        try {
            await Share.share({
                message: `Check out ${profile.username}'s locker on GoSNKR! 👟`,
                url: `https://gosnkr.com/locker/${profile.username}`,
            })
        } catch (_) { }
    }, [profile.username])

    const handleItemPress = useCallback((_item: PublicLockerItem) => {
        // TODO: navigate to your item detail screen once created
        // router.push({ pathname: '/screens/profile/itemDetailScreen', params: { itemId: _item.id } })
    }, [])

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'></View>
            <PublicLockerHeader
                profile={profile}
                onBack={handleBack}
                onShare={handleShare}
                onFollow={toggleFollow}
            />

            <PublicLockerFilter
                filters={filters}
                activeFilter={activeFilter}
                filterCounts={filterCounts}
                onSelect={setActiveFilter}
            />

            {/* Scrollable masonry grid */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
            >
                <PublicLockerGrid items={filteredItems} onItemPress={handleItemPress} />
            </ScrollView>
        </BaseContainer>
    )
}

export default PublicLockerScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 10,
    },
    scrollContent: {
        flexGrow: 1,
    },
})