import React from 'react';
import { View, StyleSheet } from 'react-native';

import BaseContainer from '@/components/shared/BaseContainer';
import OrdersHeader from '@/components/retailer/orders/OrdersHeader';
import OrdersTabs from '@/components/retailer/orders/OrdersTabs';
import OrdersList from '@/components/retailer/orders/OrdersList';
import { useOrders } from '@/services/hooks/retailer/orders/useOrders';


export const OrdersScreen: React.FC = () => {
    const {
        activeTab,
        tabCounts,
        filteredOrders,
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
    } = useOrders();

    return (
        <BaseContainer backgroundColor="#fff" scrollable={false}>
            <View style={styles.container}>

                {/* ── Fixed top ── */}
                <View style={styles.topSection}>
                    <OrdersHeader
                        onSearchPress={handleSearch}
                        onFilterPress={handleFilter}
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
                    isRefreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onConfirmOrder={handleConfirmOrder}
                    onMarkReady={handleMarkReady}
                    onMarkPickedUp={handleMarkPickedUp}
                    onViewDetails={handleViewDetails}
                    onViewHoldDetails={handleViewHoldDetails}
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