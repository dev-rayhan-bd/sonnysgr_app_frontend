import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

interface OrdersHeaderProps {
    storeLabel: string;
    onLocationPress?: () => void;
    onSearchPress: () => void;
    onFilterPress: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
    storeLabel,
    onLocationPress,
    onSearchPress,
    onFilterPress,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.title}>Order Management</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={onFilterPress} style={styles.iconBtn}>
                        <Ionicons name="filter-outline" size={22} color="#222" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSearchPress} style={styles.iconBtn}>
                        <Ionicons name="search-outline" size={22} color="#222" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={onLocationPress}
                activeOpacity={0.7}
                style={styles.locationRow}
            >
                <Feather name="map-pin" size={13} color="#9CA3AF" />
                <Text style={styles.locationText}>{storeLabel}</Text>
                <Feather name="chevron-down" size={14} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.retailerPill}>
                <Feather name="briefcase" size={12} color="#6B7280" />
                <Text style={styles.retailerPillText}>Retailer view</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconBtn: {
        padding: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    locationText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    retailerPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 5,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 8,
    },
    retailerPillText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7280',
    },
});

export default OrdersHeader;