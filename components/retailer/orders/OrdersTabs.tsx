import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export type OrderTab = 'Needs Action' | 'Holds' | 'Ready' | 'History';

export interface TabCounts {
    'Needs Action': number;
    Holds: number;
    Ready: number;
    History: number;
}

interface OrdersTabsProps {
    activeTab: OrderTab;
    tabCounts: TabCounts;
    onTabChange: (tab: OrderTab) => void;
}

const TABS: OrderTab[] = ['Needs Action', 'Holds', 'Ready', 'History'];

const OrdersTabs: React.FC<OrdersTabsProps> = ({ activeTab, tabCounts, onTabChange }) => {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab;
                    const count = tabCounts[tab];
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => onTabChange(tab)}
                            style={[styles.tab, isActive && styles.activeTab]}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab}
                            </Text>
                            {count > 0 && (
                                <View style={[styles.badge, isActive && styles.activeBadge]}>
                                    <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>
                                        {count}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        backgroundColor: '#F3F4F6',
    },
    activeTab: {
        backgroundColor: '#111',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeTabText: {
        color: '#fff',
    },
    badge: {
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    activeBadge: {
        backgroundColor: '#00C853',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
    },
    activeBadgeText: {
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
});

export default OrdersTabs;