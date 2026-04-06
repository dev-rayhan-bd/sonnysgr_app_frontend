import React from 'react'
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useLockerBrowser } from '@/services/hooks/profile/useLockerBrowser'
import LockerBrowserCard from '@/components/profile/locker/LockerBrowserCard'
import type { LockerPreview } from '@/types/lockerbrowser'
import BaseContainer from '@/components/shared/BaseContainer'
const LockerBrowserScreen: React.FC = () => {
    const router = useRouter()
    const { lockers, searchQuery, setSearchQuery, isRefreshing, refresh, toggleFollow } =
        useLockerBrowser()

    const handleLockerPress = (locker: LockerPreview) => {
        router.push({
            pathname: '/screens/profile/publicLockerScreen',
            params: { lockerId: locker.id, username: locker.username },
        })
    }

    return (
        <BaseContainer backgroundColor='#fff'>
            <View className='pt-10'>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.canGoBack() && router.back()}
                        style={styles.backBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Feather name="chevron-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Community Lockers</Text>
                    <View style={styles.backBtn} />
                </View>

                {/* Search */}
                <View style={styles.searchWrapper}>
                    <Feather name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search by username or city..."
                        placeholderTextColor="#9CA3AF"
                        style={styles.searchInput}
                        returnKeyType="search"
                        autoCapitalize="none"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Feather name="x" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Count */}
                <Text style={styles.count}>{lockers.length} lockers</Text>

                {/* List */}
                <FlatList
                    data={lockers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <LockerBrowserCard
                            locker={item}
                            onPress={handleLockerPress}
                            onFollowPress={toggleFollow}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refresh}
                            tintColor="#22C55E"
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Feather name="inbox" size={40} color="#D1D5DB" />
                            <Text style={styles.emptyText}>No lockers found</Text>
                        </View>
                    }
                />
            </View>
        </BaseContainer>
    )
}

export default LockerBrowserScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 17,
        fontWeight: '900',
        color: '#111827',
        letterSpacing: -0.3,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 8,
    },
    searchIcon: {
        marginRight: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
    },
    count: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    listContent: {
        paddingTop: 4,
        paddingBottom: 100,
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        gap: 12,
    },
    emptyText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '600',
    },
})