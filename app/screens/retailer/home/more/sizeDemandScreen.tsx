import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useSizeDemand } from '@/services/hooks/retailer/home/useSizeDemand';

export default function SizeDemandScreen() {
  const { category, setCategory, sizeHeatMap, stockComparison } = useSizeDemand();

  const getHeatColor = (level: string) => {
    switch(level) {
      case 'max': return '#064E3B'; // Darkest Green
      case 'v-high': return '#10B981'; 
      case 'high': return '#D1FAE5';
      default: return '#F9FAFB'; // Low/Empty
    }
  };

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View className="pt-10 flex-1 pb-10">
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
          <Text style={s.headerTitle}>Size Demand</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Category Tabs */}
        <View style={s.tabContainer}>
          {['Men\'s', 'Women\'s', 'Kids\''].map(t => (
            <TouchableOpacity 
              key={t} 
              onPress={() => setCategory(t)}
              style={[s.tab, category === t && s.tabActive]}
            >
              <Text style={[s.tabText, category === t && s.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hero Card */}
        <View style={s.blackCard}>
          <Text style={s.cardSub}>Most searched size in your area:</Text>
          <Text style={s.cardTitle}>Size 10.5 Men's</Text>
          <Text style={s.cardStat}>2,847 searches this week</Text>
        </View>

        {/* Heat Map Grid */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>Size Demand Distribution</Text>
          <View style={s.grid}>
            {sizeHeatMap.map((item, i) => (
              <View 
                key={i} 
                style={[s.gridItem, { backgroundColor: getHeatColor(item.level) }]}
              >
                <Text style={[s.gridText, (item.level === 'max' || item.level === 'v-high') && { color: '#fff' }]}>
                  {item.size}
                </Text>
              </View>
            ))}
          </View>
          <View style={s.legend}>
             <Text style={s.legendText}>Low</Text>
             <View style={s.legendDots}>
                <View style={[s.dot, { backgroundColor: '#D1FAE5' }]} />
                <View style={[s.dot, { backgroundColor: '#10B981' }]} />
                <View style={[s.dot, { backgroundColor: '#064E3B' }]} />
             </View>
             <Text style={s.legendText}>High demand</Text>
          </View>
        </View>

        {/* Smart Restock Suggestion */}
        <View style={s.suggestionBox}>
           <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#065F46" />
           <Text style={s.suggestionText}>
             <Text style={{ fontWeight: '800' }}>Smart Restock Suggestion{"\n"}</Text>
             Based on demand, consider stocking more Size 10 and 10.5 Men's for Jordan and Nike styles.
           </Text>
        </View>

        {/* Stock vs Demand Chart */}
        <View style={s.sectionCard}>
          <Text style={s.sectionTitle}>Your Stock vs Demand</Text>
          {stockComparison.map((item, i) => (
            <View key={i} style={s.compareRow}>
               <View style={s.compareHeader}>
                  <Text style={s.sizeLabel}>Size {item.size}</Text>
                  <Text style={[s.statusLabel, { color: item.status === 'Understocked' ? '#EF4444' : '#10B981' }]}>
                    {item.status}
                  </Text>
               </View>
               <View style={s.progressTrack}>
                  <View style={[s.demandBar, { width: `${item.demand}%` as any }]} />
                  <View style={[s.stockBar, { width: `${item.stock}%` as any }]} />
               </View>
               <View style={s.compareFooter}>
                  <Text style={s.footerText}>Demand: {item.demand}%</Text>
                  <Text style={s.footerText}>Stock: {item.stock}%</Text>
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
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#111' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#fff' },
  blackCard: { backgroundColor: '#111', margin: 16, borderRadius: 24, padding: 24, alignItems: 'center' },
  cardSub: { color: '#6B7280', fontSize: 12, fontWeight: '600' },
  cardTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginVertical: 8 },
  cardStat: { color: '#10B981', fontSize: 12, fontWeight: '700' },
  section: { padding: 16 },
  sectionLabel: { fontSize: 13, fontWeight: '800', color: '#6B7280', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: { width: '17.5%', aspectRatio: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  gridText: { fontSize: 14, fontWeight: '700', color: '#4B5563' },
  legend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  legendDots: { flexDirection: 'row', gap: 4 },
  dot: { width: 12, height: 12, borderRadius: 3 },
  legendText: { fontSize: 11, color: '#9CA3AF' },
  suggestionBox: { backgroundColor: '#ECFDF5', margin: 16, padding: 16, borderRadius: 16, flexDirection: 'row', borderWidth: 1, borderColor: '#D1FAE5' },
  suggestionText: { flex: 1, marginLeft: 12, color: '#065F46', fontSize: 12, lineHeight: 18 },
  sectionCard: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginBottom: 20 },
  compareRow: { marginBottom: 20 },
  compareHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sizeLabel: { fontSize: 14, fontWeight: '800' },
  statusLabel: { fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 24, backgroundColor: '#F3F4F6', borderRadius: 6, overflow: 'hidden' },
  demandBar: { position: 'absolute', height: '100%', backgroundColor: '#06B6D4', opacity: 0.8 },
  stockBar: { position: 'absolute', height: '100%', backgroundColor: '#10B981', top: 0 },
  compareFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  footerText: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' }
});