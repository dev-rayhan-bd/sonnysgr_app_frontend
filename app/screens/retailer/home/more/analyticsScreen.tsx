import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useAnalytics } from '@/services/hooks/retailer/home/useAnalyticsMore';

export default function AnalyticsScreen() {
    const { timePeriod, stats } = useAnalytics();

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View className="pt-10 flex-1 pb-10">
                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
                    <Text style={s.headerTitle}>Analytics</Text>
                    <TouchableOpacity><Feather name="download" size={20} color="#111" /></TouchableOpacity>
                </View>

                {/* Filter Selector */}
                <View style={s.filterRow}>
                    <TouchableOpacity style={s.filterButton}>
                        <Text style={s.filterText}>{timePeriod}</Text>
                        <Feather name="chevron-down" size={14} color="#111" />
                    </TouchableOpacity>
                    <Text style={s.vsText}>vs Yesterday</Text>
                </View>

                {/* Main Revenue Card */}
                <View style={s.blackCard}>
                    <Text style={s.cardLabel}>TODAY'S REVENUE</Text>
                    <Text style={s.revenueValue}>{stats.revenue}</Text>
                    <Text style={s.revenueChange}>↑ {stats.revenueChange}</Text>

                    {/* Simple Sparkline Placeholder */}
                    <View style={s.sparkline} />

                    <View style={s.cardStatsRow}>
                        <View style={s.cardStatItem}><Text style={s.cardStatNum}>{stats.orders}</Text><Text style={s.cardStatLabel}>Orders</Text></View>
                        <View style={s.cardStatItem}><Text style={s.cardStatNum}>{stats.pickups}</Text><Text style={s.cardStatLabel}>Pickups</Text></View>
                        <View style={s.cardStatItem}><Text style={s.cardStatNum}>{stats.holds}</Text><Text style={s.cardStatLabel}>Holds</Text></View>
                    </View>
                </View>

                {/* Metric Grid */}
                <View style={s.metricGrid}>
                    {stats.metrics.map((m, i) => (
                        <View key={i} style={s.metricCard}>
                            <View style={[s.metricIcon, { backgroundColor: i === 0 ? '#DCFCE7' : i === 1 ? '#DBEAFE' : i === 2 ? '#FEF3C7' : '#EDE9FE' }]}>
                                <Feather name={i === 0 ? "eye" : i === 1 ? "box" : i === 2 ? "search" : "refresh-cw"} size={16} color="#111" />
                            </View>
                            <Text style={s.metricLabel}>{m.label}</Text>
                            <View style={s.metricValueRow}>
                                <Text style={s.metricValue}>{m.value}</Text>
                                <Text style={[s.metricChange, { color: m.type === 'up' ? '#10B981' : m.type === 'stable' ? '#F59E0B' : '#8B5CF6' }]}>{m.change}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Orders This Week Chart Placeholder */}
                <View style={s.sectionCard}>
                    <Text style={s.sectionTitle}>Orders This Week</Text>
                    <View style={s.chartPlaceholder} />
                    <View style={s.chartLabels}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <Text key={d} style={s.dayLabel}>{d}</Text>)}
                    </View>
                </View>

                {/* Conversion Funnel */}
                <View style={s.sectionCard}>
                    <Text style={s.sectionTitle}>Conversion Funnel</Text>
                    {stats.funnel.map((item, i) => (
                        <View key={i} style={s.funnelItem}>
                            <View style={s.funnelLabelRow}>
                                <Text style={s.funnelLabel}>{item.count} {item.label}</Text>
                                <Text style={s.funnelPercent}>{item.percentage}</Text>
                            </View>
                            <View style={s.progressTrack}>
                                {/* The cast to 'any' or 'DimensionValue' fixes the overload error */}
                                <View style={[s.progressBar, { width: item.percentage as any }]} />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </BaseContainer>
    );
}

const s = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900' },
    filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
    filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
    filterText: { fontSize: 13, fontWeight: '700', marginRight: 4 },
    vsText: { fontSize: 12, color: '#6B7280' },
    blackCard: { backgroundColor: '#111', margin: 16, borderRadius: 24, padding: 24, alignItems: 'center' },
    cardLabel: { color: '#10B981', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    revenueValue: { color: '#fff', fontSize: 48, fontWeight: '900', marginVertical: 8 },
    revenueChange: { color: '#10B981', fontSize: 13, fontWeight: '700' },
    sparkline: { width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: '#333', marginVertical: 20 },
    cardStatsRow: { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20 },
    cardStatItem: { flex: 1, alignItems: 'center' },
    cardStatNum: { color: '#fff', fontSize: 18, fontWeight: '800' },
    cardStatLabel: { color: '#6B7280', fontSize: 11, marginTop: 4 },
    metricGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
    metricCard: { width: '45%', backgroundColor: '#fff', margin: '2.5%', padding: 16, borderRadius: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    metricIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    metricLabel: { fontSize: 12, color: '#6B7280', fontWeight: '600', marginBottom: 4 },
    metricValueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    metricValue: { fontSize: 20, fontWeight: '800' },
    metricChange: { fontSize: 10, fontWeight: '700' },
    sectionCard: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 24 },
    sectionTitle: { fontSize: 14, fontWeight: '800', marginBottom: 20 },
    chartPlaceholder: { height: 120, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    dayLabel: { fontSize: 10, color: '#9CA3AF' },
    funnelItem: { marginBottom: 16 },
    funnelLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    funnelLabel: { fontSize: 12, fontWeight: '600', color: '#4B5563' },
    funnelPercent: { fontSize: 12, fontWeight: '800' },
    progressTrack: { height: 8, backgroundColor: '#F3F4F6', borderRadius: 4 },
    progressBar: { height: 8, backgroundColor: '#10B981', borderRadius: 4 },
});