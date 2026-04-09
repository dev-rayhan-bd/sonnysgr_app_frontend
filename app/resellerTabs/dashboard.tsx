import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useDashboard } from '@/services/hooks/reseller/dashboard/useDashboard';
import { router } from 'expo-router';

const Dashboard = () => {
    const { stats, requests, activities } = useDashboard();

    return (
        <BaseContainer backgroundColor='#fff'>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View className='pt-10 pb-20'>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.logo}>GO<Text style={{ color: '#4ADE80' }}>SNKR</Text></Text>
                        <TouchableOpacity onPress={() => router.push("/screens/reseller/notifications")}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                            <View style={styles.notifBadge} />
                        </TouchableOpacity>
                    </View>

                    {/* Welcome Section */}
                    <View style={styles.welcomeBanner}>
                        <Text style={styles.welcomeText}>Good morning, Marcus 👋</Text>
                        <View style={styles.trustedBadge}>
                            <Text style={styles.trustedText}>Trusted Reseller ✓</Text>
                        </View>
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <StatCard label="Active Listings" value={stats.activeListings} color="#4ADE80" />
                        <StatCard label="Store Requests" value={stats.storeRequests} color="#FB923C" />
                        <StatCard label="Deals Active" value={stats.dealsActive} color="#60A5FA" />
                        <StatCard label="This Month" value={`$${stats.revenue.toLocaleString()}`} color="#4ADE80" />
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.actionRow}>
                        <ActionButton
                            icon={<AntDesign name="plus" size={24} color="#10B981" />}
                            label="Add Pair"
                            bgColor="#ECFDF5"
                        />
                        <ActionButton
                            icon={<MaterialCommunityIcons name="inbox-outline" size={24} color="#D97706" />}
                            label="Requests"
                            bgColor="#FFFBEB"
                            badge={7}
                        />
                        <ActionButton
                            icon={<Ionicons name="list-outline" size={24} color="#2563EB" />}
                            label="My Listings"
                            bgColor="#EFF6FF"
                        />

                        <ActionButton
                            icon={<AntDesign name="line-chart" size={24} color="#4B5563" />}
                            label="Analytics"
                            bgColor="#F3F4F6"
                        />
                    </View>

                    {/* Store Requests */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Store Requests</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.requestCarousel}>
                        {requests.map((req) => (
                            <View key={req.id} style={styles.requestCard}>
                                <View style={styles.storeInfo}>
                                    <View style={styles.avatarPlaceholder} />
                                    <View>
                                        <Text style={styles.storeName}>{req.storeName}</Text>
                                        <Text style={styles.rating}>{req.rating} ★</Text>
                                    </View>
                                </View>
                                <Text style={styles.itemName}>{req.item}</Text>
                                <Text style={styles.itemMeta}>Size {req.size} · {req.condition}</Text>
                                <Text style={styles.price}>${req.price}</Text>
                                <View style={styles.newBadge}>
                                    <Text style={styles.newBadgeText}>New Request</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Recent Activity */}
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.activityContainer}>
                        {activities.map((item) => (
                            <View key={item.id} style={styles.activityItem}>
                                <View style={[styles.activityDot, { backgroundColor: item.color + '20' }]}>
                                    <View style={[styles.dotInner, { backgroundColor: item.color }]} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.activityMessage}>{item.message}</Text>
                                </View>
                                <Text style={styles.activityTime}>{item.time}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Trust Score */}
                    <View style={styles.trustCard}>
                        <View style={styles.trustHeader}>
                            <MaterialIcons name="verified-user" size={20} color="#4ADE80" />
                            <Text style={styles.trustTitle}>Trust Score</Text>
                            <Text style={styles.trustValue}>98/100</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '98%' }]} />
                        </View>
                        <Text style={styles.trustFooter}>Response rate: 96% · 47 deals completed</Text>
                    </View>
                </View>
            </ScrollView>
        </BaseContainer>
    );
};

// Sub-components
const StatCard = ({ label, value, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const ActionButton = ({ icon, label, bgColor, badge }: any) => (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: bgColor }]}>
        {badge && (
            <View style={styles.btnBadge}>
                <Text style={styles.btnBadgeText}>{badge}</Text>
            </View>
        )}
        {icon}
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    scrollContent: { padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    logo: { fontSize: 20, fontWeight: '900', letterSpacing: -1 },
    notifBadge: {
        position: 'absolute', top: 2, right: 2,
        width: 8, height: 8, backgroundColor: '#EF4444',
        borderRadius: 4, borderWidth: 1, borderColor: '#FFF'
    },
    welcomeBanner: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, marginBottom: 20
    },
    welcomeText: { color: '#166534', fontWeight: '600' },
    trustedBadge: { backgroundColor: '#22C55E', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    trustedText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: {
        width: '48%', backgroundColor: '#FFF', padding: 16, borderRadius: 16,
        marginBottom: 12, elevation: 2, shadowColor: '#000',
        shadowOpacity: 0.05, shadowRadius: 10
    },
    statValue: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    actionBtn: { width: '23%', aspectRatio: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', padding: 8 },
    actionLabel: { fontSize: 10, fontWeight: '600', marginTop: 8, textAlign: 'center' },
    btnBadge: {
        position: 'absolute', top: 5, right: 5, backgroundColor: '#F59E0B',
        borderRadius: 10, width: 18, height: 18,
        justifyContent: 'center', alignItems: 'center', zIndex: 1
    },
    btnBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
    viewAll: { color: '#22C55E', fontWeight: '600', fontSize: 13 },
    requestCarousel: { marginBottom: 20 },
    requestCard: {
        width: 240, backgroundColor: '#FFF', padding: 16,
        borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: '#F3F4F6'
    },
    storeInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#111827', marginRight: 10 },
    storeName: { fontWeight: 'bold', fontSize: 14 },
    rating: { fontSize: 12, color: '#F59E0B' },
    itemName: { fontWeight: '600', fontSize: 14, marginBottom: 2 },
    itemMeta: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
    price: { fontSize: 18, fontWeight: 'bold' },
    newBadge: {
        position: 'absolute', bottom: 16, right: 16,
        backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12
    },
    newBadgeText: { color: '#D97706', fontSize: 10, fontWeight: 'bold' },
    activityContainer: { backgroundColor: '#FFF', borderRadius: 20, padding: 8, marginVertical: 15 },
    activityItem: {
        flexDirection: 'row', alignItems: 'center', padding: 12,
        borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
    },
    activityDot: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    dotInner: { width: 10, height: 10, borderRadius: 5 },
    activityMessage: { fontSize: 13, color: '#374151', lineHeight: 18 },
    activityTime: { fontSize: 11, color: '#9CA3AF' },
    trustCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginTop: 10, marginBottom: 30 },
    trustHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    trustTitle: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '600' },
    trustValue: { fontSize: 18, fontWeight: 'bold', color: '#10B981' },
    progressBarBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, marginBottom: 10 },
    progressBarFill: { height: 6, backgroundColor: '#10B981', borderRadius: 3 },
    trustFooter: { fontSize: 11, color: '#9CA3AF', textAlign: 'center' },
});

export default Dashboard;