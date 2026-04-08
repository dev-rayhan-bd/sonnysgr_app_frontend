import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useSourceInventory } from '@/services/hooks/retailer/home/useSourceInventory';
const FILTERS = ['All', 'Nearby Only', 'DS Only', 'Bulk Lots'];

export default function SourceInventoryScreen() {
  const { activeFilter, setActiveFilter, resellers, opportunityCount } = useSourceInventory();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View className="pt-10 flex-1 pb-10">
        
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Source Inventory</Text>
          <TouchableOpacity>
            <Feather name="search" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Green Info Banner */}
        <View style={s.greenBanner}>
          <View style={s.iconContainer}>
            <MaterialCommunityIcons name="store-search" size={20} color="#065F46" />
          </View>
          <Text style={s.greenBannerText}>
            Find inventory from trusted resellers to stock your store. Direct sourcing, no middleman.
          </Text>
        </View>

        {/* Yellow Opportunity Alert */}
        <View style={s.yellowBanner}>
          <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#854D0E" />
          <Text style={s.yellowBannerText}>
            {opportunityCount} resellers have pairs your customers are searching for
          </Text>
          <TouchableOpacity>
            <Text style={s.viewLink}>View →</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Scroll */}
        <View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={s.filterContainer}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                onPress={() => setActiveFilter(filter)}
                style={[s.filterPill, activeFilter === filter && s.filterPillActive]}
              >
                <Text style={[s.filterText, activeFilter === filter && s.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dynamic Reseller List */}
        {resellers.map((reseller) => (
          <View key={reseller.id} style={s.card}>
            
            {/* Reseller Profile Info */}
            <View style={s.cardHeader}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{reseller.initials}</Text>
              </View>
              <View style={s.headerInfo}>
                <View style={s.nameRow}>
                  <Text style={s.resellerName}>{reseller.name}</Text>
                  <View style={s.trustedBadge}>
                    <Text style={s.trustedText}>Trusted ✓</Text>
                  </View>
                </View>
                <Text style={s.subText}>
                  {reseller.location} - {reseller.distance}  •  {reseller.rating} ★  •  {reseller.deals} deals
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={s.profileLink}>View Profile →</Text>
              </TouchableOpacity>
            </View>

            {/* Inventory Item Preview */}
            <View style={s.inventoryRow}>
              {[1, 2, 3].map((_, i) => (
                <View key={i} style={s.itemBox}>
                  <View style={s.dsBadge}><Text style={s.dsText}>DS</Text></View>
                  <MaterialCommunityIcons name="shoe-sneaker" size={28} color="#D1D5DB" />
                  <Text style={s.sizeLabel}>10.5</Text>
                </View>
              ))}
              <View style={s.moreBox}>
                <Text style={s.moreText}>3 more →</Text>
              </View>
            </View>

            {/* Price & Action Button */}
            <View style={s.cardFooter}>
              <Text style={s.priceRange}>{reseller.priceRange}</Text>
              <TouchableOpacity 
                style={s.pingBtn}
                onPress={() => router.push('/')}
              >
                <Text style={s.pingBtnText}>Ping Reseller →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
  greenBanner: { 
    flexDirection: 'row', 
    backgroundColor: '#ECFDF5', 
    margin: 16, 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#D1FAE5',
    alignItems: 'center'
  },
  iconContainer: { backgroundColor: '#fff', padding: 6, borderRadius: 10, marginRight: 12 },
  greenBannerText: { flex: 1, color: '#065F46', fontSize: 13, lineHeight: 18, fontWeight: '500' },
  yellowBanner: { 
    flexDirection: 'row', 
    backgroundColor: '#FEFCE8', 
    padding: 12, 
    marginHorizontal: 16, 
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: 8 
  },
  yellowBannerText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#854D0E', marginLeft: 8 },
  viewLink: { fontSize: 12, fontWeight: '800', color: '#D97706' },
  filterContainer: { paddingHorizontal: 16, marginVertical: 16 },
  filterPill: { 
    backgroundColor: '#F3F4F6', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginRight: 8 
  },
  filterPillActive: { backgroundColor: '#111' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  filterTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 28, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  headerInfo: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  resellerName: { fontSize: 16, fontWeight: '800', color: '#111' },
  trustedBadge: { backgroundColor: '#22C55E', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
  trustedText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  subText: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  profileLink: { fontSize: 12, fontWeight: '700', color: '#22C55E' },
  inventoryRow: { flexDirection: 'row', gap: 10, marginTop: 20, marginBottom: 20 },
  itemBox: { 
    width: 75, 
    height: 75, 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  dsBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#22C55E', borderRadius: 4, paddingHorizontal: 4 },
  dsText: { color: '#fff', fontSize: 8, fontWeight: '900' },
  sizeLabel: { position: 'absolute', bottom: 6, fontSize: 10, fontWeight: '800', color: '#111' },
  moreBox: { width: 75, height: 75, backgroundColor: '#F3F4F6', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  moreText: { fontSize: 12, fontWeight: '700', color: '#9CA3AF' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceRange: { fontSize: 16, fontWeight: '900', color: '#111' },
  pingBtn: { backgroundColor: '#111', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16 },
  pingBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' }
});