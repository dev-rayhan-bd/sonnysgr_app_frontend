// app/screens/retailer/promote/promotionDetailsScreen.tsx
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const DAILY_STATS = [
  { day: 'Mon', reach: 180, clicks: 12 },
  { day: 'Tue', reach: 220, clicks: 18 },
  { day: 'Wed', reach: 195, clicks: 14 },
  { day: 'Thu', reach: 310, clicks: 26 },
  { day: 'Fri', reach: 280, clicks: 22 },
  { day: 'Sat', reach: 255, clicks: 20 },
]

const maxReach = Math.max(...DAILY_STATS.map(d => d.reach))

export default function PromotionDetailsScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Promotion Details</Text>
        <TouchableOpacity>
          <Feather name="edit-2" size={18} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.promoName}>Summer Clearance</Text>
              <Text style={styles.promoType}>Radius Promotion · 0.5 mi radius</Text>
            </View>
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>
          </View>
          <Text style={styles.promoDates}>Aug 10 – Aug 20, 2026</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>5 days remaining</Text>
            <Text style={styles.progressPct}>50%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        {/* KPIs */}
        <View style={styles.kpiGrid}>
          {[
            { icon: 'eye', label: 'Reach', value: '1,240', color: '#3b82f6' },
            { icon: 'mouse-pointer', label: 'Clicks', value: '112', color: '#8b5cf6' },
            { icon: 'percent', label: 'CTR', value: '9.0%', color: '#f59e0b' },
            { icon: 'shopping-bag', label: 'Conversions', value: '28', color: '#22c55e' },
          ].map(kpi => (
            <View key={kpi.label} style={styles.kpiCard}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '15' }]}>
                <Feather name={kpi.icon as any} size={18} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
            </View>
          ))}
        </View>

        {/* Daily reach bar chart */}
        <Text style={styles.sectionTitle}>Daily Reach</Text>
        <View style={styles.chart}>
          {DAILY_STATS.map(d => (
            <View key={d.day} style={styles.chartCol}>
              <Text style={styles.chartValue}>{d.reach}</Text>
              <View style={styles.barWrap}>
                <View style={[styles.bar, { height: Math.round((d.reach / maxReach) * 80) }]} />
              </View>
              <Text style={styles.chartDay}>{d.day}</Text>
            </View>
          ))}
        </View>

        {/* Settings summary */}
        <Text style={styles.sectionTitle}>Campaign Settings</Text>
        <View style={styles.settingsCard}>
          {[
            ['Discount', '20% off all items'],
            ['Radius', '0.5 miles from store'],
            ['Budget', '$60 total · $6/day'],
            ['Spent', '$45 of $60'],
            ['Audience', 'All nearby users'],
          ].map(([label, value]) => (
            <View key={label} style={styles.settingsRow}>
              <Text style={styles.settingsLabel}>{label}</Text>
              <Text style={styles.settingsValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.pauseBtn}>
            <Feather name="pause" size={16} color="#f59e0b" />
            <Text style={styles.pauseBtnText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.endBtn} onPress={() => router.back()}>
            <Feather name="x-circle" size={16} color="#ef4444" />
            <Text style={styles.endBtnText}>End Campaign</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40, gap: 20 },
  heroCard: { backgroundColor: '#0a0a0a', borderRadius: 20, padding: 20, gap: 8 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  promoName: { fontSize: 20, fontWeight: '800', color: '#fff' },
  promoType: { fontSize: 13, color: '#9ca3af', marginTop: 2 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#14532d', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#22c55e' },
  activeText: { fontSize: 12, fontWeight: '700', color: '#22c55e' },
  promoDates: { fontSize: 13, color: '#6b7280' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 12, color: '#9ca3af' },
  progressPct: { fontSize: 12, color: '#22c55e', fontWeight: '700' },
  progressBar: { height: 4, backgroundColor: '#374151', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 2 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiCard: { width: '47.5%', backgroundColor: '#f9fafb', borderRadius: 16, padding: 14, gap: 4, alignItems: 'center' },
  kpiIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  kpiValue: { fontSize: 22, fontWeight: '800', color: '#0a0a0a' },
  kpiLabel: { fontSize: 12, color: '#6b7280' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, height: 140 },
  chartCol: { alignItems: 'center', gap: 4, flex: 1 },
  chartValue: { fontSize: 9, color: '#9ca3af' },
  barWrap: { height: 80, justifyContent: 'flex-end' },
  bar: { width: 20, backgroundColor: '#0a0a0a', borderRadius: 4 },
  chartDay: { fontSize: 11, color: '#9ca3af' },
  settingsCard: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, gap: 0 },
  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  settingsLabel: { fontSize: 14, color: '#6b7280' },
  settingsValue: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  actions: { flexDirection: 'row', gap: 10 },
  pauseBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fffbeb', borderRadius: 12, paddingVertical: 14, borderWidth: 1, borderColor: '#fde68a' },
  pauseBtnText: { fontSize: 14, fontWeight: '700', color: '#f59e0b' },
  endBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fef2f2', borderRadius: 12, paddingVertical: 14, borderWidth: 1, borderColor: '#fecaca' },
  endBtnText: { fontSize: 14, fontWeight: '700', color: '#ef4444' },
})
