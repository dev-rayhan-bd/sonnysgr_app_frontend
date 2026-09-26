import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseContainer from '@/components/shared/BaseContainer'
import { useDashboard } from '@/services/hooks/reseller/dashboard/useDashboard'

const Dashboard = () => {
  const { stats, requests, activities } = useDashboard()
  const insets = useSafeAreaInsets()

  return (
    <BaseContainer backgroundColor="#F9FAFB">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              GO<Text style={{ color: '#22C55E' }}>SNKR</Text>
            </Text>
            <Text style={styles.subHeading}>Hi Marcus</Text>
            <Text style={styles.subLabel}>Reseller dashboard</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/screens/reseller/notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#111827" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.trustedBadge}>
          <Ionicons name="checkmark-circle" size={14} color="#FFF" />
          <Text style={styles.trustedText}>Trusted reseller</Text>
        </View>

        {/* ── Stats grid ─────────────────────────────────────── */}
        <View style={styles.statsGrid}>
          <StatCard label="Active listings" value={stats.activeListings} color="#22C55E" />
          <StatCard label="Awaiting your reply" value={stats.storeRequests} color="#FB923C" />
          <StatCard label="Deals in progress" value={stats.dealsActive} color="#60A5FA" />
          <StatCard label="Completed sales · This month" value={`$${stats.revenue.toLocaleString()}`} color="#22C55E" />
        </View>

        {/* ── Action row ─────────────────────────────────────── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addItemBtn}>
            <AntDesign name="plus" size={16} color="#FFF" />
            <Text style={styles.addItemText}>Add item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanBtn}>
            <MaterialCommunityIcons name="barcode-scan" size={16} color="#111827" />
            <Text style={styles.scanText}>Scan barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.analyticsText}>View analytics ›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Needs your response ────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Needs your response</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all ({requests.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestList}>
          {requests.slice(0, 2).map((request) => (
            <View key={request.id} style={styles.requestRow}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>
                  {request.storeName
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.requestTopRow}>
                  <Text style={styles.storeName}>{request.storeName}</Text>
                  <View style={styles.newOfferBadge}>
                    <Text style={styles.newOfferText}>New offer</Text>
                  </View>
                </View>
                <Text style={styles.timeText}>{request.time}</Text>
                <Text style={styles.itemName}>{request.item}</Text>
                <Text style={styles.itemMeta}>
                  Size {request.size} · {request.condition}
                </Text>

                <View style={styles.offerRow}>
                  <View>
                    <Text style={styles.offerLabel}>Store offer</Text>
                    <Text style={styles.price}>${request.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.reviewBtn}>
                    <Text style={styles.reviewBtnText}>Review offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── Recent activity ────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
        </View>

        <View style={styles.activityContainer}>
          {activities.map((activity, idx) => (
            <View
              key={activity.id}
              style={[
                styles.activityItem,
                idx === activities.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>

        {/* ── Seller reputation ──────────────────────────────── */}
        <View style={styles.trustCard}>
          <View style={styles.trustHeader}>
            <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
            <Text style={styles.trustTitle}>Trust score</Text>
            <Text style={styles.trustValue}>98/100</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '98%' }]} />
          </View>
          <View style={styles.trustStatsRow}>
            <View>
              <Text style={styles.trustStatValue}>96%</Text>
              <Text style={styles.trustStatLabel}>Response rate</Text>
            </View>
            <View>
              <Text style={styles.trustStatValue}>47</Text>
              <Text style={styles.trustStatLabel}>Completed deals</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.trustFooterLink}>How this is calculated ›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Manage listings ────────────────────────────────── */}
        <TouchableOpacity
          style={styles.manageListingsCard}
          onPress={() => router.push('/resellerTabs/listing')}
        >
          <View style={styles.manageListingsIcon}>
            <Ionicons name="list-outline" size={20} color="#111827" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.manageListingsTitle}>Manage listings</Text>
            <Text style={styles.manageListingsSubtitle}>Update sizes, prices and availability</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>
    </BaseContainer>
  )
}

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color: string
}) => (
  <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
    <Text style={[styles.statValue, { color: '#111827' }]}>{value}</Text>
    <Text style={[styles.statLabel, { color }]}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  logo: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5, color: '#111827' },
  subHeading: { fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 8 },
  subLabel: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
  },

  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    marginBottom: 16,
    marginTop: -36,
  },
  trustedText: { color: '#FFF', fontSize: 11, fontWeight: '700' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 },
  statCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },

  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, marginBottom: 24 },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addItemText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  scanText: { color: '#111827', fontWeight: '600', fontSize: 13 },
  analyticsText: { color: '#22C55E', fontWeight: '600', fontSize: 13, marginLeft: 'auto' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  viewAll: { color: '#22C55E', fontWeight: '600', fontSize: 13 },

  requestList: { gap: 12, marginBottom: 24 },
  requestRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    gap: 12,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  requestTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { fontWeight: '700', fontSize: 14, color: '#111827' },
  newOfferBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newOfferText: { color: '#D97706', fontSize: 10, fontWeight: '700' },
  timeText: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  itemName: { fontWeight: '600', fontSize: 14, color: '#111827', marginTop: 8 },
  itemMeta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  offerLabel: { fontSize: 11, color: '#9CA3AF' },
  price: { fontSize: 18, fontWeight: '800', color: '#111827' },
  reviewBtn: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  reviewBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },

  activityContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 10,
  },
  activityDot: { width: 8, height: 8, borderRadius: 4 },
  activityMessage: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 18 },
  activityTime: { fontSize: 11, color: '#9CA3AF' },

  trustCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  trustHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  trustTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#111827' },
  trustValue: { fontSize: 16, fontWeight: '800', color: '#22C55E' },
  progressBarBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, marginBottom: 14, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: '#22C55E', borderRadius: 3 },
  trustStatsRow: { flexDirection: 'row', gap: 32, marginBottom: 12 },
  trustStatValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
  trustStatLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  trustFooterLink: { fontSize: 12, color: '#22C55E', fontWeight: '600' },

  manageListingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom:15,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  manageListingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageListingsTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  manageListingsSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
})

export default Dashboard