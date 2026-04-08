import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useBusinessOverview } from '@/services/hooks/retailer/home/useBusinessOverview';

export default function BusinessOverviewScreen() {
  const { business, locations } = useBusinessOverview();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View className="pt-10 flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Business Overview</Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={s.addBranchText}>+ Add Branch</Text>
          </TouchableOpacity>
        </View>

        {/* Business Identity */}
        <View style={s.identityRow}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{business.initials}</Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={s.businessName}>{business.name}</Text>
            <Text style={s.businessMeta}>{business.locationCount} locations · {business.city}</Text>
            <View style={s.pillRow}>
              <TouchableOpacity style={s.pill}>
                <Text style={s.pillText}>Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.pill}>
                <Text style={s.pillText}>Settings →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={s.statsGrid}>
          <View style={s.statCardDark}>
            <Text style={s.statValueDark}>{business.revenue}</Text>
            <Text style={s.statLabelDark}>Total Revenue Today</Text>
          </View>
          <View style={s.statCardLight}>
            <Text style={s.statValueLight}>{business.orders}</Text>
            <Text style={s.statLabelLight}>Orders Today</Text>
          </View>
          <View style={s.statCardLight}>
            <Text style={s.statValueLight}>{business.listings}</Text>
            <Text style={s.statLabelLight}>Active Listings</Text>
          </View>
          <View style={s.statCardLight}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={s.statValueLight}>{business.rating}</Text>
              <Text style={{ color: '#F59E0B', fontSize: 14 }}>★</Text>
            </View>
            <Text style={s.statLabelLight}>Avg Rating</Text>
          </View>
        </View>

        {/* Locations */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Your Locations</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={s.manageLink}>Manage →</Text>
            </TouchableOpacity>
          </View>

          {locations.map((loc) => (
            <View key={loc.id} style={s.locationCard}>
              <View style={s.locLeft}>
                <View style={s.locAvatar}>
                  <Text style={s.locAvatarText}>{loc.initials}</Text>
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={s.locName}>{loc.name}</Text>
                  <Text style={s.locAddress}>{loc.address}</Text>
                  <View style={s.locStatusRow}>
                    <View style={[s.statusDot, { backgroundColor: loc.isOpen ? '#10B981' : '#EF4444' }]} />
                    <Text style={s.locStatus}>
                      {loc.isOpen ? 'Open' : 'Closed'} · Closes {loc.closesAt}
                    </Text>
                  </View>
                  <Text style={s.locRevenue}>{loc.ordersToday} orders · {loc.revenueToday} today</Text>
                </View>
              </View>
              <View style={s.locActions}>
                <TouchableOpacity
                  style={s.manageBtn}
                  onPress={() => router.push(`/`)}
                >
                  <Text style={s.manageBtnText}>Manage →</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.viewOrdersBtn}
                  onPress={() => router.push(`/`)}
                >
                  <Text style={s.viewOrdersText}>View Orders</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add new branch */}
          <TouchableOpacity
            style={s.addNewCard}
            onPress={() => router.push('/')}
          >
            <Text style={s.addNewText}>+ Add a new branch location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  addBranchText: { fontSize: 13, fontWeight: '800', color: '#10B981' },

  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  businessName: { fontSize: 16, fontWeight: '900' },
  businessMeta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  pill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pillText: { fontSize: 11, fontWeight: '700', color: '#374151' },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  statCardDark: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 16,
  },
  statValueDark: { color: '#fff', fontSize: 20, fontWeight: '900' },
  statLabelDark: { color: '#9CA3AF', fontSize: 11, marginTop: 4 },
  statCardLight: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 16,
  },
  statValueLight: { fontSize: 20, fontWeight: '900', color: '#111' },
  statLabelLight: { color: '#6B7280', fontSize: 11, marginTop: 4 },

  section: { paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '900' },
  manageLink: { fontSize: 12, fontWeight: '800', color: '#10B981' },

  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  locLeft: { flexDirection: 'row', marginBottom: 12 },
  locAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locAvatarText: { color: '#fff', fontWeight: '900', fontSize: 14 },
  locName: { fontSize: 14, fontWeight: '800' },
  locAddress: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  locStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  locStatus: { fontSize: 11, color: '#6B7280' },
  locRevenue: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 4 },
  locActions: { flexDirection: 'row', gap: 10 },
  manageBtn: {
    flex: 1,
    backgroundColor: '#111',
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  viewOrdersBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOrdersText: { color: '#374151', fontSize: 12, fontWeight: '700' },
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