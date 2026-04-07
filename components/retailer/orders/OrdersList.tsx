import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Text } from 'react-native';
import OrderCard from './OrderCard';
import { Order } from '@/types/Orders';

interface OrdersListProps {
    orders: Order[];
    isRefreshing: boolean;
    onRefresh: () => void;
    onConfirmOrder: (orderId: string) => void;
    onMarkReady: (orderId: string) => void;
    onMarkPickedUp: (orderId: string) => void;
    onViewDetails: (orderId: string) => void;
    onViewHoldDetails: (orderId: string) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({
    orders,
    isRefreshing,
    onRefresh,
    onConfirmOrder,
    onMarkReady,
    onMarkPickedUp,
    onViewDetails,
    onViewHoldDetails,
}) => {
    if (orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No orders found</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor="#00C853"
                    colors={['#00C853']}
                />
            }
        >
            {orders.map(order => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onConfirmOrder={onConfirmOrder}
                    onMarkReady={onMarkReady}
                    onMarkPickedUp={onMarkPickedUp}
                    onViewDetails={onViewDetails}
                    onViewHoldDetails={onViewHoldDetails}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        padding: 12,
        gap: 10,
        paddingBottom: 24,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 15,
        color: '#999',
    },
});

export default OrdersList;