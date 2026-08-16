// app/screens/retailer/pro/proDashboardScreen.tsx
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const METRICS = [
  { label: 'Profile Views', value: '1,284', change: '+18%', up: true },
  { label: 'Search Impressions', value: '4,712', change: '+32%', up: true },
  { label: 'Conversion Rate', value: '6.2%', change: '+1.4%', up: true },
  { label: 'Revenue (30d)', value: '$8,340', change: '-2%', up: false },
]

const PRO_TOOLS = [
  { icon: 'bar-chart-2', label: 'Analytics', route: '/screens/retailer/home/analytics/analyticsScreen' },
  { icon: 'map', label: 'Local Demand', route: '/screens/retailer/home/more/localDemandScreen' },
  { icon: 'activity', label: 'Size Demand', route: '/screens/retailer/home/more/sizeDemandScreen' },
  { icon: 'zap', label: 'Drop Manager', route: '/screens/retailer/home/more/dropManagerScreen' },
  { icon: 'radio', label: 'Radius Promo', route: '/screens/retailer/home/more/radiusPromotionScreen' },
  { icon: 'users', label: 'Sourcing', route: '/screens/retailer/home/more/sourceInventoryScreen' },
]

export default function ProDashboardScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.proBadge}>
          <Feather name="award" size={14} color="#f59e0b" />
          <Text style={styles.proBadgeText}>PRO</Text>
        </View>
        <TouchableOpacity>
          <Feather name="settings" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Pro hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Kicks City Pro</Text>
        <Text style={styles.heroSub}>Trial active · 12 days remaining</Text>
        <View style={styles.trialBar}>
          <View style={[styles.trialFill, { width: '14%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Metrics */}
        <Text style={styles.sectionTitle}>Performance (Last 30 days)</Text>
        <View style={styles.metricsGrid}>
          {METRICS.map(m => (
            <View key={m.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{m.value}</Text>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <View style={[styles.changeBadge, { backgroundColor: m.up ? '#f0fdf4' : '#fef2f2' }]}>
                <Feather name={m.up ? 'trending-up' : 'trending-down'} size={10} color={m.up ? '#22c55e' : '#ef4444'} />
                <Text style={[styles.changeText, { color: m.up ? '#22c55e' : '#ef4444' }]}>{m.change}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pro Tools */}
        <Text style={styles.sectionTitle}>Pro Tools</Text>
        <View style={styles.toolsGrid}>
          {PRO_TOOLS.map(tool => (
            <TouchableOpacity
              key={tool.label}
              style={styles.toolCard}
              onPress={() => router.push(tool.route as any)}
            >
              <View style={styles.toolIcon}>
                <Feather name={tool.icon as any} size={22} color="#0a0a0a" />
              </View>
              <Text style={styles.toolLabel}>{tool.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upsell upgrade */}
        <View style={styles.upgradeCard}>
          <Feather name="award" size={20} color="#f59e0b" />
          <View style={styles.upgradeInfo}>
            <Text style={styles.upgradeTitle}>Upgrade to keep Pro</Text>
            <Text style={styles.upgradeSub}>12 days left in your trial</Text>
          </View>
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => router.push('/screens/retailer/pro/goProCheckoutScreen' as any)}
          >
            <Text style={styles.upgradeBtnText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#0a0a0a' },
  proBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#1f2937', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  proBadgeText: { fontSize: 12, fontWeight: '800', color: '#f59e0b' },
  hero: { backgroundColor: '#0a0a0a', paddingHorizontal: 20, paddingBottom: 28 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroSub: { fontSize: 13, color: '#9ca3af', marginBottom: 12 },
  trialBar: { height: 4, backgroundColor: '#374151', borderRadius: 2, overflow: 'hidden' },
  trialFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 2 },
  scroll: { padding: 16, gap: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricCard: { width: '47.5%', backgroundColor: '#fff', borderRadius: 16, padding: 14, gap: 4 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#0a0a0a' },
  metricLabel: { fontSize: 12, color: '#6b7280' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, marginTop: 2 },
  changeText: { fontSize: 11, fontWeight: '700' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  toolCard: { width: '30%', backgroundColor: '#fff', borderRadius: 16, padding: 14, alignItems: 'center', gap: 8 },
  toolIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  toolLabel: { fontSize: 12, fontWeight: '600', color: '#0a0a0a', textAlign: 'center' },
  upgradeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbeb', borderRadius: 16, padding: 16, gap: 12, borderWidth: 1, borderColor: '#fde68a' },
  upgradeInfo: { flex: 1 },
  upgradeTitle: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  upgradeSub: { fontSize: 12, color: '#f59e0b' },
  upgradeBtn: { backgroundColor: '#0a0a0a', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  upgradeBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
})
