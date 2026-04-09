import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useInventory } from '@/services/hooks/reseller/listing/useListing';

const Inventory = () => {
    const { stats, inventory, activeTab, setActiveTab } = useInventory();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View className='pt-10 pb-20 mb-20'>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Inventory</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={{ marginRight: 20 }}>
                            <Ionicons name="filter-outline" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="search-outline" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='pt-4 pb-20'>

                        {/* Top Stats Summary */}
                        <View style={styles.summaryBar}>
                            <SummaryItem label="Total" value={stats.total} color="#111827" />
                            <SummaryItem label="Visible" value={stats.visible} color="#22C55E" />
                            <SummaryItem label="Pending" value={stats.pending} color="#F59E0B" />
                            <SummaryItem label="Sold" value={stats.sold} color="#6B7280" />
                        </View>

                        {/* Filter Tabs */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                            {['All (24)', 'Visible to Stores (16)', 'Private (5)'].map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <TouchableOpacity
                                        key={tab}
                                        onPress={() => setActiveTab(tab)}
                                        style={[styles.tabChip, isActive && styles.tabChipActive]}
                                    >
                                        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        {/* Inventory List */}
                        <View style={styles.listContainer}>
                            {inventory.map((item) => (
                                <View key={item.id} style={styles.cardWrapper}>
                                    <View style={styles.itemCard}>
                                        {/* Sneaker Image */}
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                                            <View style={[styles.statusIndicator, { backgroundColor: item.isVisible ? '#22C55E' : '#9CA3AF' }]}>
                                                <Ionicons
                                                    name={item.isPrivate ? "lock-closed" : "eye"}
                                                    size={10}
                                                    color="white"
                                                />
                                            </View>
                                        </View>

                                        {/* Info Section */}
                                        <View style={styles.infoSection}>
                                            <Text style={styles.brandText}>{item.brand}</Text>
                                            <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                                            <Text style={styles.metaText}>{item.condition} · Size {item.size}</Text>

                                            <View style={styles.priceRow}>
                                                <Text style={styles.priceText}>${item.price}</Text>
                                                <Text style={styles.marketPrice}>Market: ~${item.marketPrice}</Text>
                                            </View>
                                        </View>

                                        {/* Action Column */}
                                        <View style={styles.actionColumn}>
                                            <TouchableOpacity style={[styles.visibilityBtn, { backgroundColor: item.isVisible ? '#F0FDF4' : '#F3F4F6' }]}>
                                                <Ionicons
                                                    name={item.isVisible ? "eye-outline" : "eye-off-outline"}
                                                    size={18}
                                                    color={item.isVisible ? "#22C55E" : "#9CA3AF"}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.moreBtn}>
                                                <Feather name="more-vertical" size={18} color="#9CA3AF" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Activity Sub-text */}
                                    {(item.views > 0 || item.requests > 0) && (
                                        <View style={styles.activityRow}>
                                            <Ionicons name="eye" size={12} color="#6B7280" />
                                            <Text style={styles.activityText}>
                                                {item.views} stores viewed · {item.requests} request
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </BaseContainer>
    );
};

// Sub-components
const SummaryItem = ({ label, value, color }: any) => (
    <View style={styles.summaryItem}>
        <Text style={[styles.summaryValue, { color }]}>{value}</Text>
        <Text style={styles.summaryLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF'
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, marginLeft: 20 },
    headerIcons: { flexDirection: 'row' },
    summaryBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#F9FAFB',
        marginHorizontal: -16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
    },
    summaryItem: { alignItems: 'center' },
    summaryValue: { fontSize: 16, fontWeight: 'bold' },
    summaryLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    tabScroll: { paddingHorizontal: 16, marginVertical: 20 },
    tabChip: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        marginRight: 10
    },
    tabChipActive: { backgroundColor: '#111827' },
    tabText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
    tabTextActive: { color: '#FFF' },
    listContainer: { paddingHorizontal: 16 },
    cardWrapper: { marginBottom: 15 },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    imageContainer: { position: 'relative' },
    itemImage: { width: 85, height: 85, borderRadius: 15, backgroundColor: '#F3F4F6' },
    statusIndicator: {
        position: 'absolute', bottom: -4, right: -4,
        width: 20, height: 20, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#FFF'
    },
    infoSection: { flex: 1, marginLeft: 15 },
    brandText: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold' },
    nameText: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginVertical: 2 },
    metaText: { fontSize: 12, color: '#6B7280' },
    priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    priceText: { fontSize: 16, fontWeight: '900', color: '#111827' },
    marketPrice: { fontSize: 11, color: '#9CA3AF', marginLeft: 8 },
    actionColumn: { alignItems: 'center', justifyContent: 'space-between', height: 75 },
    visibilityBtn: { padding: 8, borderRadius: 12 },
    moreBtn: { padding: 4 },
    activityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 12 },
    activityText: { fontSize: 11, color: '#22C55E', fontWeight: '600', marginLeft: 6 },
});

export default Inventory;