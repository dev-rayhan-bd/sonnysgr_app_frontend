import React from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';

import BaseContainer from '@/components/shared/BaseContainer';
import HomeHeader from '@/components/retailer/home/HomeHeader';
import HomeStoreInfo from '@/components/retailer/home/HomeStoreInto';
import DashboardHeader from '@/components/retailer/home/DashboardHeader';
import HomeStats from '@/components/retailer/home/HomeStats';
import HomeAlert from '@/components/retailer/home/HomeAlert';
import HomeActions from '@/components/retailer/home/HomeActions';
import HomeRecentOrders from '@/components/retailer/home/HomeRecentOrders';
import HomeLiveSync from '@/components/retailer/home/HomeLiveSync';
import { useHome } from '@/services/hooks/retailer/home/useHome';
import { router } from 'expo-router';

export const HomeScreen: React.FC = () => {
    const {
        storeInfo,
        stats,
        stockAlerts,
        actions,
        recentOrders,
        syncStatus,
        isRefreshing,
        handleRefresh,
        handleViewAllOrders,
        handleViewAlert,
    } = useHome();

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View style={styles.container}>

                {/* ── Fixed top (white) ── */}
                <View style={styles.topSection}>
                    <HomeHeader
                        notificationCount={5}
                        avatarLabel="SK"
                        onBellPress={() => router.push("/screens/retailer/home/notifications/notificationsScreen")}
                        onAvatarPress={() => console.log('avatar')}
                    />
                    <HomeStoreInfo
                        store={storeInfo}
                        onVerifiedPress={() => console.log('verified')}
                        onLocationPress={() => console.log('location')}
                    />
                </View>

                {/* ── Scrollable body ── */}
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            tintColor="#00C853"
                            colors={['#00C853']}
                        />
                    }
                >
                    <View style={{ backgroundColor: '#fff' }}>
                        <DashboardHeader
                            filterLabel="Today"
                            onFilterPress={() => console.log('filter')}
                        />
                        <HomeStats stats={stats} />
                        <HomeAlert alerts={stockAlerts} onView={handleViewAlert} />
                        <HomeActions actions={actions} />
                    </View>

                    <HomeRecentOrders
                        orders={recentOrders}
                        onViewAll={handleViewAllOrders}
                        onOrderPress={order => console.log('order pressed', order.id)}
                    />
                </ScrollView>

                {/* ── Pinned Live Sync bar ── */}
                <HomeLiveSync
                    syncStatus={syncStatus}
                    onViewStatus={() => console.log('view sync status')}
                />
            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 40, paddingBottom: 150
    },
    topSection: {
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
    },
});

export default HomeScreen;