import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export type OrderTab = 'All' | 'New' | 'Holding' | 'Ready' | 'Complete';

export interface TabCounts {
    All: number;
    New: number;
    Holding: number;
    Ready: number;
    Complete: number;
}

interface OrdersTabsProps {
    activeTab: OrderTab;
    tabCounts: TabCounts;
    onTabChange: (tab: OrderTab) => void;
}

const TABS: OrderTab[] = ['All', 'New', 'Holding', 'Ready', 'Complete'];

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
        gap: 4,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        gap: 5,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#111',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666',
    },
    activeTabText: {
        color: '#fff',
    },
    badge: {
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    activeBadge: {
        backgroundColor: '#444',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#444',
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