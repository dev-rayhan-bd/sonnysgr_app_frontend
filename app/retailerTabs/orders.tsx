import React from 'react';
import { View, StyleSheet } from 'react-native';

import BaseContainer from '@/components/shared/BaseContainer';
import OrdersHeader from '@/components/retailer/orders/OrdersHeader';
import OrdersSummary from '@/components/retailer/orders/OrdersSummary';
import OrdersTabs from '@/components/retailer/orders/OrdersTabs';
import OrdersList from '@/components/retailer/orders/OrdersList';
import { useOrders } from '@/services/hooks/retailer/orders/useOrders';


export const OrdersScreen: React.FC = () => {
    const {
        activeTab,
        tabCounts,
        filteredOrders,
        recentActivity,
        ordersToday,
        avgPrepMinutes,
        isRefreshing,
        handleTabChange,
        handleRefresh,
        handleConfirmOrder,
        handleMarkReady,
        handleMarkPickedUp,
        handleViewDetails,
        handleViewHoldDetails,
        handleSearch,
        handleFilter,
        handleViewAllActivity,
    } = useOrders();

    return (
        <BaseContainer backgroundColor="#fff" scrollable={false}>
            <View style={styles.container}>

                {/* ── Fixed top ── */}
                <View style={styles.topSection}>
                    <OrdersHeader
                        storeLabel="Sonny's Kicks · Novi"
                        onLocationPress={() => console.log('switch location')}
                        onSearchPress={handleSearch}
                        onFilterPress={handleFilter}
                    />
                    <OrdersSummary
                        ordersToday={ordersToday}
                        avgPrepMinutes={avgPrepMinutes}
                    />
                    <OrdersTabs
                        activeTab={activeTab}
                        tabCounts={tabCounts}
                        onTabChange={handleTabChange}
                    />
                </View>

                {/* ── Scrollable list ── */}
                <OrdersList
                    orders={filteredOrders}
                    recentActivity={recentActivity}
                    isRefreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onConfirmOrder={handleConfirmOrder}
                    onMarkReady={handleMarkReady}
                    onMarkPickedUp={handleMarkPickedUp}
                    onViewDetails={handleViewDetails}
                    onViewHoldDetails={handleViewHoldDetails}
                    onViewAllActivity={handleViewAllActivity}
                />

            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 150,
    },
    topSection: {
        backgroundColor: '#fff',
    },
});

export default OrdersScreen;