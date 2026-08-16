// app/screens/retailer/promote/promotionHistoryScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['All', 'Active', 'Ended']

const STATUS_CFG: Record<string, { color: string; bg: string }> = {
  Active: { color: '#22c55e', bg: '#f0fdf4' },
  Scheduled: { color: '#3b82f6', bg: '#eff6ff' },
  Ended: { color: '#9ca3af', bg: '#f3f4f6' },
}

const PROMOTIONS = [
  { id: '1', name: 'Summer Clearance', type: 'Radius Promo', discount: '20% off', reach: '1,240', spent: '$45', status: 'Active', dates: 'Aug 10 – Aug 20' },
  { id: '2', name: 'Back to School Drop', type: 'Drop Campaign', discount: 'Early access', reach: '860', spent: '$30', status: 'Active', dates: 'Aug 18 – Aug 22' },
  { id: '3', name: 'Jordan Week', type: 'Boost', discount: 'Priority listing', reach: '2,100', spent: '$60', status: 'Ended', dates: 'Aug 1 – Aug 7' },
  { id: '4', name: 'Nike Flash Sale', type: 'Radius Promo', discount: '15% off', reach: '980', spent: '$35', status: 'Ended', dates: 'Jul 25 – Jul 28' },
]

export default function PromotionHistoryScreen() {
  const router = useRouter()
  const [tab, setTab] = useState('All')

  const filtered = tab === 'All' ? PROMOTIONS : PROMOTIONS.filter(p => p.status === tab)

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Promotions</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push('/screens/retailer/promote/radiusPromotionScreen')}
        >
          <Feather name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        {[['$170', 'Total Spent'], ['5,180', 'Total Reach'], ['3.8%', 'Avg. CTR']].map(([val, lbl]) => (
          <View key={lbl} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{val}</Text>
            <Text style={styles.summaryLabel}>{lbl}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map(t => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const cfg = STATUS_CFG[item.status] ?? { color: '#9ca3af', bg: '#f3f4f6' }
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/screens/retailer/promote/promotionDetailsScreen' as any)}
              activeOpacity={0.85}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardInfo}>
                  <Text style={styles.promoName}>{item.name}</Text>
                  <Text style={styles.promoType}>{item.type} · {item.dates}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.cardStats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{item.reach}</Text>
                  <Text style={styles.statLabel}>Reach</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{item.discount}</Text>
                  <Text style={styles.statLabel}>Offer</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{item.spent}</Text>
                  <Text style={styles.statLabel}>Spent</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#9ca3af" style={{ marginTop: 4 }} />
              </View>
            </TouchableOpacity>
          )
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  createBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  summaryRow: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: '#fff' },
  summaryCard: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 14, padding: 12, alignItems: 'center', gap: 2 },
  summaryValue: { fontSize: 18, fontWeight: '800', color: '#0a0a0a' },
  summaryLabel: { fontSize: 11, color: '#9ca3af' },
  tabs: { paddingHorizontal: 16, paddingVertical: 10, gap: 8, backgroundColor: '#fff' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  tabActive: { backgroundColor: '#0a0a0a' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  tabTextActive: { color: '#fff' },
  list: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardInfo: { flex: 1 },
  promoName: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', marginBottom: 2 },
  promoType: { fontSize: 12, color: '#6b7280' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: '700' },
  cardStats: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 15, fontWeight: '700', color: '#0a0a0a' },
  statLabel: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
})
