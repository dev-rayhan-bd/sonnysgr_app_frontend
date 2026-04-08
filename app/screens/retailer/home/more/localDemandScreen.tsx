import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useLocalDemand } from '@/services/hooks/retailer/home/useLocalDemand';

export default function LocalDemandScreen() {
    const { timeFrame, setTimeFrame, demandData } = useLocalDemand();

    const getRankIcon = (rank: number) => {
        const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
        return <MaterialCommunityIcons name="medal" size={24} color={colors[rank - 1]} />;
    };

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View className="pt-10 flex-1 pb-10">
                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
                    <Text style={s.headerTitle}>Local Demand</Text>
                    <View style={s.locationBadge}>
                        <Feather name="map-pin" size={12} color="#10B981" />
                        <Text style={s.locationText}>Miami, FL · 10 mi</Text>
                    </View>
                </View>

                {/* Hero Info Banner */}
                <View style={s.infoBanner}>
                    <Feather name="bar-chart-2" size={20} color="#10B981" />
                    <Text style={s.infoText}>
                        See what nearby sneaker buyers are searching for — and stock what they want.
                    </Text>
                </View>

                {/* Time Filters */}
                <View style={s.filterRow}>
                    {['This Week', 'This Month', 'Last 3 Months'].map(f => (
                        <TouchableOpacity
                            key={f}
                            onPress={() => setTimeFrame(f)}
                            style={[s.filterTab, timeFrame === f && s.filterTabActive]}
                        >
                            <Text style={[s.filterTabText, timeFrame === f && s.filterTabTextActive]}>
                                {f} {timeFrame === f && '✓'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitle}>Top Searched Near You 🔥</Text>
                    <Text style={s.updatedText}>Updated today</Text>
                </View>

                {/* Demand List */}
                <View style={{ paddingHorizontal: 16 }}>
                    {demandData.map((item) => (
                        <View key={item.rank} style={s.demandCard}>
                            <View style={s.rankContainer}>{getRankIcon(item.rank)}</View>

                            <View style={s.imgPlaceholder}>
                                <MaterialCommunityIcons name="shoe-sneaker" size={24} color="#9CA3AF" />
                            </View>

                            <View style={s.itemMain}>
                                <Text style={s.itemName}>{item.name}</Text>
                                <Text style={s.itemSub}>Searched {item.searches} times</Text>
                            </View>

                            <View style={s.stockInfo}>
                                <View style={s.stockTrack}>
                                    <View style={[s.stockBar, { width: `${item.stockLevel * 100}%` as any }]} />
                                </View>
                                <Text style={[s.stockStatus, { color: item.inStock ? '#10B981' : '#EF4444' }]}>
                                    {item.inStock ? 'In stock ✓' : 'Not in stock'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Opportunity Tip */}
                <View style={s.tipCard}>
                    <View style={s.tipHeader}>
                        <Feather name="zap" size={18} color="#F59E0B" />
                        <Text style={s.tipTitle}>
                            Nike Dunk Low 'Panda' is #2 in your area but not in your inventory.
                        </Text>
                    </View>
                    <TouchableOpacity style={s.tipBtn}>
                        <Text style={s.tipBtnText}>View sourcing options →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BaseContainer>
    );
}

const s = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900' },
    locationBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
    locationText: { color: '#10B981', fontSize: 12, fontWeight: '700', marginLeft: 4 },
    infoBanner: { flexDirection: 'row', backgroundColor: '#ECFDF5', margin: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#D1FAE5' },
    infoText: { flex: 1, marginLeft: 10, color: '#065F46', fontSize: 13, lineHeight: 18 },
    filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 24 },
    filterTab: { backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
    filterTabActive: { backgroundColor: '#111' },
    filterTabText: { fontSize: 13, color: '#4B5563', fontWeight: '600' },
    filterTabTextActive: { color: '#fff' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '900' },
    updatedText: { fontSize: 12, color: '#9CA3AF' },
    demandCard: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    rankContainer: { width: 30, alignItems: 'center' },
    imgPlaceholder: { width: 50, height: 50, backgroundColor: '#F9FAFB', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 },
    itemMain: { flex: 1 },
    itemName: { fontSize: 14, fontWeight: '800', color: '#111' },
    itemSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    stockInfo: { alignItems: 'flex-end' },
    stockTrack: { width: 50, height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, marginBottom: 6 },
    stockBar: { height: 4, backgroundColor: '#10B981', borderRadius: 2 },
    stockStatus: { fontSize: 10, fontWeight: '700' },
    tipCard: { backgroundColor: '#FEFCE8', margin: 16, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#FEF3C7' },
    tipHeader: { flexDirection: 'row', alignItems: 'flex-start' },
    tipTitle: { flex: 1, marginLeft: 10, fontSize: 13, fontWeight: '700', color: '#854D0E', lineHeight: 18 },
    tipBtn: { marginTop: 12, marginLeft: 28 },
    tipBtnText: { color: '#D97706', fontSize: 13, fontWeight: '800' }
});