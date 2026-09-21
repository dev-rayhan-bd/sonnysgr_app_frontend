import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Order } from '@/types/Orders';

interface RecentActivityProps {
    orders: Order[];
    onViewAll: () => void;
    onOrderPress: (orderId: string) => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ orders, onViewAll, onOrderPress }) => {
    if (orders.length === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Recent Activity</Text>
                <TouchableOpacity onPress={onViewAll} hitSlop={8}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {orders.map((order) => (
                <TouchableOpacity
                    key={order.id}
                    style={styles.row}
                    activeOpacity={0.7}
                    onPress={() => onOrderPress(order.id)}
                >
                    <View style={styles.imgWrapper}>
                        {order.imageUrl ? (
                            <Image source={{ uri: order.imageUrl }} style={styles.img} resizeMode="cover" />
                        ) : (
                            <View style={styles.imgPlaceholder} />
                        )}
                    </View>

                    <View style={styles.info}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>
                                {order.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                            </Text>
                        </View>
                        <Text style={styles.productName} numberOfLines={1}>{order.productName}</Text>
                        <Text style={styles.meta}>
                            #{order.orderNumber} · ${order.price} · {order.completedDate ?? order.cancelledDate}
                        </Text>
                    </View>

                    <Feather name="chevron-right" size={18} color="#D1D5DB" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        paddingHorizontal: 4,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: '800',
        color: '#111',
    },
    viewAll: {
        fontSize: 12,
        fontWeight: '700',
        color: '#00C853',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 8,
        gap: 10,
    },
    imgWrapper: {
        width: 48,
        height: 48,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F0F0F0',
        flexShrink: 0,
    },
    img: { width: 48, height: 48 },
    imgPlaceholder: { width: 48, height: 48, backgroundColor: '#E8E8E8' },
    info: { flex: 1, minWidth: 0 },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 1,
        marginBottom: 3,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#555',
    },
    productName: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111',
        marginBottom: 2,
    },
    meta: {
        fontSize: 11,
        color: '#9CA3AF',
    },
});

export default RecentActivity;