import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import {
  useBusinessOverview,
  type Location,
  type LocationAlert,
} from '@/services/hooks/retailer/home/useBusinessOverview';

export default function BusinessOverviewScreen() {
  const {
    periods,
    period,
    setPeriod,
    business,
    stats,
    ordersNeedingAttention,
    locations,
  } = useBusinessOverview();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View className="flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Business Overview</Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={s.addLocationText}>+ Add Location</Text>
          </TouchableOpacity>
        </View>

        {/* Business Identity */}
        <View style={s.identityRow}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{business.initials}</Text>
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={s.businessName}>{business.name}</Text>
            <Text style={s.businessMeta}>{business.locationCount} locations · {business.city}</Text>
            <View style={s.pillRow}>
              <TouchableOpacity style={s.pill}>
                <Text style={s.pillText}>Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.pill}>
                <Text style={s.pillText}>Business Settings →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Period tabs */}
        <View style={s.periodRow}>
          <View style={s.periodTabs}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriod(p)}
                style={[s.periodTab, period === p && s.periodTabActive]}
              >
                <Text style={[s.periodTabText, period === p && s.periodTabTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.calendarBtn}>
            <Feather name="calendar" size={18} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Gross sales hero card */}
        <View style={s.heroCard}>
          <Text style={s.heroValue}>{stats.grossSales}</Text>
          <View style={s.heroFooterRow}>
            <Text style={s.heroLabel}>Gross sales</Text>
            <View style={s.deltaRow}>
              <Feather
                name={stats.deltaIsPositive ? 'arrow-up-right' : 'arrow-down-right'}
                size={12}
                color={stats.deltaIsPositive ? '#34D399' : '#F87171'}
              />
              <Text style={[s.deltaText, { color: stats.deltaIsPositive ? '#34D399' : '#F87171' }]}>
                {stats.deltaVsPrevious}
              </Text>
              <Text style={s.deltaSubtext}>vs yesterday</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={s.statValue}>{stats.netSales}</Text>
            <Text style={s.statLabel}>Net sales</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statValue}>{stats.orders}</Text>
            <Text style={s.statLabel}>Orders</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statValue}>{stats.avgOrder}</Text>
            <Text style={s.statLabel}>Avg order</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statValue}>{stats.activeListings}</Text>
            <Text style={s.statLabel}>Active listings</Text>
          </View>
        </View>

        {/* Orders need attention alert */}
        {ordersNeedingAttention > 0 && (
          <TouchableOpacity style={s.attentionBanner} activeOpacity={0.85}>
            <Feather name="alert-triangle" size={16} color="#D97706" />
            <Text style={s.attentionText}>{ordersNeedingAttention} orders need attention</Text>
            <Text style={s.attentionLink}>Review →</Text>
          </TouchableOpacity>
        )}

        {/* Locations */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Locations</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={s.compareLink}>Compare →</Text>
            </TouchableOpacity>
          </View>

          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}

          {/* Add new location */}
          <TouchableOpacity style={s.addNewCard} onPress={() => router.push('/')}>
            <Text style={s.addNewText}>+ Add another location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
}

function LocationCard({ location }: { location: Location }) {
  return (
    <View style={s.locationCard}>
      <View style={s.locLeft}>
        <View style={s.locAvatar}>
          <Text style={s.locAvatarText}>{location.initials}</Text>
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <View style={s.locNameRow}>
            <Text style={s.locName}>{location.name}</Text>
            <Feather name="chevron-right" size={16} color="#D1D5DB" />
          </View>
          <Text style={s.locAddress}>{location.address}</Text>
          <View style={s.locStatusRow}>
            <View style={[s.statusDot, { backgroundColor: location.isOpen ? '#10B981' : '#EF4444' }]} />
            <Text style={s.locStatus}>
              {location.isOpen ? 'Open' : 'Closed'} · {location.hoursNote}
            </Text>
          </View>
          <Text style={s.locRevenue}>{location.salesToday} sales · {location.ordersToday} orders</Text>
        </View>
      </View>

      {/* Alert chips */}
      {location.alerts.length > 0 && (
        <View style={s.alertChipsRow}>
          {location.alerts.map((alert, i) => (
            <AlertChip key={i} alert={alert} />
          ))}
        </View>
      )}

      <View style={s.locActions}>
        <TouchableOpacity style={s.manageBtn} onPress={() => router.push('/')}>
          <Text style={s.manageBtnText}>Manage Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.viewOrdersBtn} onPress={() => router.push('/')}>
          <Text style={s.viewOrdersText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.syncedText}>{location.syncedAgo}</Text>
    </View>
  );
}

function AlertChip({ alert }: { alert: LocationAlert }) {
  if (alert.type === 'ready') {
    return (
      <View style={[s.alertChip, s.chipGreen]}>
        <Feather name="check-circle" size={11} color="#059669" />
        <Text style={[s.alertChipText, { color: '#059669' }]}>{alert.count} ready</Text>
      </View>
    );
  }
  if (alert.type === 'overdue') {
    return (
      <View style={[s.alertChip, alert.count > 0 ? s.chipAmber : s.chipGray]}>
        <Feather name={alert.count > 0 ? 'alert-triangle' : 'check-circle'} size={11} color={alert.count > 0 ? '#D97706' : '#9CA3AF'} />
        <Text style={[s.alertChipText, { color: alert.count > 0 ? '#D97706' : '#9CA3AF' }]}>
          {alert.count > 0 ? `${alert.count} overdue` : 'No overdue'}
        </Text>
      </View>
    );
  }
  return (
    <View style={[s.alertChip, s.chipAmber]}>
      <Feather name="alert-triangle" size={11} color="#D97706" />
      <Text style={[s.alertChipText, { color: '#D97706' }]}>{alert.count} low-stock alerts</Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#111827' },
  addLocationText: { fontSize: 13, fontWeight: '800', color: '#10B981' },

  identityRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 18 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  businessName: { fontSize: 16, fontWeight: '900', color: '#111827' },
  businessMeta: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  pill: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  pillText: { fontSize: 11, fontWeight: '700', color: '#374151' },

  periodRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  periodTabs: { flex: 1, flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 14, padding: 4 },
  periodTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  periodTabActive: { backgroundColor: '#111827' },
  periodTabText: { fontSize: 12, fontWeight: '700', color: '#6B7280' },
  periodTabTextActive: { color: '#fff' },
  calendarBtn: {
    width: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroCard: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 20,
    marginBottom: 12,
  },
  heroValue: { color: '#fff', fontSize: 34, fontWeight: '900' },
  heroFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  heroLabel: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deltaText: { fontSize: 13, fontWeight: '800' },
  deltaSubtext: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginBottom: 16 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: '#fff', borderRadius: 18, padding: 16 },
  statValue: { fontSize: 20, fontWeight: '900', color: '#111827' },
  statLabel: { color: '#9CA3AF', fontSize: 11, marginTop: 4, fontWeight: '600' },

  attentionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF7ED',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  attentionText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#9A3412' },
  attentionLink: { fontSize: 13, fontWeight: '800', color: '#059669' },

  section: { paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  compareLink: { fontSize: 12, fontWeight: '800', color: '#10B981' },

  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  locLeft: { flexDirection: 'row', marginBottom: 12 },
  locAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locAvatarText: { color: '#fff', fontWeight: '900', fontSize: 14 },
  locNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locName: { fontSize: 14, fontWeight: '800', color: '#111827', flexShrink: 1 },
  locAddress: { fontSize: 11, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  locStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  locStatus: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
  locRevenue: { fontSize: 12, color: '#111827', fontWeight: '700', marginTop: 4 },

  alertChipsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  alertChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  chipGreen: { backgroundColor: '#ECFDF5' },
  chipAmber: { backgroundColor: '#FFFBEB' },
  chipGray: { backgroundColor: '#F3F4F6' },
  alertChipText: { fontSize: 11, fontWeight: '800' },

  locActions: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  manageBtn: { flex: 1, backgroundColor: '#111827', height: 42, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  manageBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  viewOrdersBtn: { flex: 1, backgroundColor: '#F3F4F6', height: 42, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  viewOrdersText: { color: '#374151', fontSize: 12, fontWeight: '700' },
  syncedText: { fontSize: 10, color: '#D1D5DB', fontWeight: '600', textAlign: 'right' },

  addNewCard: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addNewText: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
});