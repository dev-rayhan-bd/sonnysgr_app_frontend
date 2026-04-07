import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OrdersHeaderProps {
    onSearchPress: () => void;
    onFilterPress: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ onSearchPress, onFilterPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Orders</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onFilterPress} style={styles.iconBtn}>
                    {/* Filter funnel icon */}
                    <Ionicons name="filter-outline" size={22} color="#222" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onSearchPress} style={styles.iconBtn}>
                    <Ionicons name="search-outline" size={22} color="#222" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconBtn: {
        padding: 6,
    },
});

export default OrdersHeader;