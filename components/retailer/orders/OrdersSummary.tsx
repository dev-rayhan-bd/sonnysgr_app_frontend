import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OrdersSummaryProps {
    ordersToday: number;
    avgPrepMinutes: number;
}

const OrdersSummary: React.FC<OrdersSummaryProps> = ({ ordersToday, avgPrepMinutes }) => (
    <View style={styles.row}>
        <Text style={styles.text}>{ordersToday} orders today</Text>
        <View style={styles.right}>
            <Feather name="bar-chart-2" size={13} color="#9CA3AF" />
            <Text style={styles.text}>Avg. prep {avgPrepMinutes} min</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
});

export default OrdersSummary;