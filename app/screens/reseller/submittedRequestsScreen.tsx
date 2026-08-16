// app/screens/reseller/submittedRequestsScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['All', 'Pending', 'Accepted', 'Declined']

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Pending:  { color: '#f59e0b', bg: '#fffbeb' },
  Accepted: { color: '#22c55e', bg: '#f0fdf4' },
  Declined: { color: '#ef4444', bg: '#fef2f2' },
  Countered:{ color: '#3b82f6', bg: '#eff6ff' },
}

const REQUESTS = [
  { id: '1', product: 'Air Jordan 1 Retro High', seller: 'marcus_kicks', myOffer: 190, askingPrice: 220, status: 'Pending', date: 'Aug 16' },
  { id: '2', product: 'Yeezy 350 V2 "Zebra"', seller: 'sarahsneaks', myOffer: 250, askingPrice: 290, status: 'Accepted', date: 'Aug 14' },
  { id: '3', product: 'Travis Scott x Nike', seller: 'jpcollects', myOffer: 520, askingPrice: 580, status: 'Declined', date: 'Aug 10' },
  { id: '4', product: 'Nike Dunk Low Panda', seller: 'kickvault', myOffer: 100, askingPrice: 110, status: 'Countered', date: 'Aug 8' },
]

export default function SubmittedRequestsScreen() {
  const router = useRouter()
  const [tab, setTab] = useState('All')

  const filtered = tab === 'All' ? REQUESTS : REQUESTS.filter(r => r.status === tab)

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Offers</Text>
        <View style={{ width: 22 }} />
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
        keyExtractor={r => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const cfg = STATUS_CONFIG[item.status] ?? { color: '#6b7280', bg: '#f3f4f6' }
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/screens/reseller/requestDetailsScreen' as any)}
              activeOpacity={0.85}
            >
              <View style={styles.imageBox} />
              <View style={styles.info}>
                <Text style={styles.productName} numberOfLines={1}>{item.product}</Text>
                <Text style={styles.seller}>@{item.seller}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.myOffer}>My offer: <Text style={styles.offerAmt}>${item.myOffer}</Text></Text>
                  <Text style={styles.asking}>Ask: ${item.askingPrice}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
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
  tabs: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, backgroundColor: '#fff' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  tabActive: { backgroundColor: '#0a0a0a' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  tabTextActive: { color: '#fff' },
  list: { padding: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 14, gap: 12, alignItems: 'center' },
  imageBox: { width: 64, height: 64, backgroundColor: '#f9fafb', borderRadius: 12 },
  info: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  seller: { fontSize: 12, color: '#6b7280', marginBottom: 6 },
  priceRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  myOffer: { fontSize: 12, color: '#374151' },
  offerAmt: { fontWeight: '700', color: '#0a0a0a' },
  asking: { fontSize: 12, color: '#9ca3af' },
  right: { alignItems: 'flex-end', gap: 8 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 11, color: '#9ca3af' },
})
