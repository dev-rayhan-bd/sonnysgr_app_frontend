import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useDemandGaps } from '@/services/hooks/retailer/home/useDemandGaps';

export default function DemandGapsScreen() {
  const { opportunities, handleAddInventory } = useDemandGaps();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View className="pt-10 flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
          <Text style={s.headerTitle}>Demand Gaps</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Black Opportunity Card */}
        <View style={s.blackHero}>
          <MaterialCommunityIcons name="lightbulb-on" size={32} color="#FDE047" />
          <Text style={s.heroTitle}>Opportunity Finder</Text>
          <Text style={s.heroSub}>
            These are shoes customers near you are actively searching for — but no nearby store currently has them.
          </Text>
        </View>

        {/* Opportunity List */}
        <View style={{ padding: 16 }}>
          {opportunities.map((item) => (
            <View key={item.id} style={s.opCard}>
              <View style={[s.badge, { backgroundColor: item.tagCol }]}>
                <Text style={s.badgeText}>{item.tag}</Text>
              </View>

              <View style={s.cardMain}>
                <View style={s.imgBox}>
                  <MaterialCommunityIcons name="shoe-sneaker" size={28} color="#9CA3AF" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.itemName}>{item.name}</Text>
                  <Text style={s.wantedSize}>{item.wantedSize}</Text>
                  
                  <View style={s.statsRow}>
                    <View style={s.statItem}>
                      <Feather name="search" size={12} color="#9CA3AF" />
                      <Text style={s.statText}>{item.searches} searches</Text>
                    </View>
                    <View style={s.statItem}>
                      <Feather name="heart" size={12} color="#9CA3AF" />
                      <Text style={s.statText}>{item.wishlisted} wishlisted</Text>
                    </View>
                  </View>

                  <View style={s.statsRow}>
                    <View style={s.statItem}>
                      <Feather name="shopping-bag" size={12} color="#EF4444" />
                      <Text style={[s.statText, { color: '#EF4444', fontWeight: '700' }]}>{item.storesNearby} stores</Text>
                    </View>
                    <View style={s.statItem}>
                      <Feather name="tag" size={12} color="#9CA3AF" />
                      <Text style={s.statText}>~{item.avgPrice}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Sourcing Banner */}
              <TouchableOpacity style={s.sourceBanner}>
                <Text style={s.sourceText}>
                  ✓ {item.resellersCount} trusted resellers have this pair
                </Text>
                <Text style={s.sourceLink}>Source →</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={s.addBtn} 
                onPress={() => handleAddInventory(item.name)}
              >
                <Text style={s.addBtnText}>Add to Inventory →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Final Smart Suggestion */}
        <View style={s.suggestionCard}>
          <View style={s.suggestionHeader}>
             <MaterialCommunityIcons name="star-four-points" size={16} color="#F59E0B" />
             <Text style={s.suggestionTitle}>Smart Suggestion:</Text>
          </View>
          <Text style={s.suggestionBody}>
            Customers in your area are searching for Nike Dunk Low 'Panda', your store doesn't have it, and 3 trusted resellers on GoSNKR currently do.
          </Text>
          <View style={s.suggestionActions}>
            <TouchableOpacity style={s.sourceActionBtn}>
              <Text style={s.sourceActionText}>Source from Reseller +</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.dismissBtn}>
              <Text style={s.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  blackHero: { backgroundColor: '#111', margin: 16, borderRadius: 24, padding: 24, alignItems: 'center' },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginTop: 12 },
  heroSub: { color: '#9CA3AF', fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 18 },
  opCard: { backgroundColor: '#fff', borderRadius: 24, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  cardMain: { flexDirection: 'row', marginBottom: 16 },
  imgBox: { width: 80, height: 80, backgroundColor: '#F9FAFB', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  itemName: { fontSize: 15, fontWeight: '800' },
  wantedSize: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 11, color: '#6B7280' },
  sourceBanner: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, marginBottom: 12 },
  sourceText: { fontSize: 11, color: '#166534', fontWeight: '600' },
  sourceLink: { fontSize: 11, color: '#10B981', fontWeight: '800' },
  addBtn: { backgroundColor: '#111', height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  suggestionCard: { backgroundColor: '#FEFCE8', margin: 16, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#FEF3C7' },
  suggestionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  suggestionTitle: { color: '#854D0E', fontSize: 13, fontWeight: '800' },
  suggestionBody: { color: '#854D0E', fontSize: 12, lineHeight: 18, marginBottom: 16 },
  suggestionActions: { flexDirection: 'row', gap: 10 },
  sourceActionBtn: { flex: 2, backgroundColor: '#111', height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sourceActionText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  dismissBtn: { flex: 1, backgroundColor: '#F3F4F6', height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  dismissText: { color: '#4B5563', fontSize: 12, fontWeight: '700' }
});