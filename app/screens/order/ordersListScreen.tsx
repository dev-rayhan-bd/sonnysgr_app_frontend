// app/screens/order/ordersListScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['All', 'Active', 'Completed', 'Cancelled']

const STATUS_COLOR: Record<string, string> = {
  'Pickup Ready': '#22c55e',
  'Processing': '#3b82f6',
  'On Hold': '#f59e0b',
  'Completed': '#6b7280',
  'Cancelled': '#ef4444',
}

interface Order {
  id: string
  product: string
  store: string
  size: string
  price: number
  status: string
  date: string
}

const ORDERS: Order[] = [
  { id: 'ORD-001', product: 'Air Jordan 1 Retro High', store: 'Kicks City', size: '10.5', price: 220, status: 'Pickup Ready', date: 'Aug 16' },
  { id: 'ORD-002', product: 'Yeezy Boost 350 V2', store: 'Urban Vault', size: '9', price: 280, status: 'Processing', date: 'Aug 15' },
  { id: 'ORD-003', product: 'Nike Dunk Low', store: 'Street Elite', size: '11', price: 150, status: 'On Hold', date: 'Aug 14' },
  { id: 'ORD-004', product: 'New Balance 550', store: 'Sole House', size: '10', price: 140, status: 'Completed', date: 'Aug 10' },
  { id: 'ORD-005', product: 'Travis Scott x Nike', store: 'Kicks City', size: '10', price: 580, status: 'Completed', date: 'Aug 5' },
  { id: 'ORD-006', product: 'Off-White Blazer', store: 'Urban Vault', size: '9.5', price: 420, status: 'Cancelled', date: 'Aug 1' },
]

export default function OrdersListScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? ORDERS
    : activeTab === 'Active' ? ORDERS.filter(o => ['Pickup Ready', 'Processing', 'On Hold'].includes(o.status))
    : activeTab === 'Completed' ? ORDERS.filter(o => o.status === 'Completed')
    : ORDERS.filter(o => o.status === 'Cancelled')

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={o => o.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/screens/order/orderDetailsScreen')}
            activeOpacity={0.85}
          >
            <View style={styles.imageBox} />
            <View style={styles.info}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.productName} numberOfLines={1}>{item.product}</Text>
              <Text style={styles.store}>{item.store} · Size {item.size}</Text>
              <View style={styles.bottom}>
                <Text style={styles.price}>${item.price}</Text>
                <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[item.status] + '20' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLOR[item.status] }]}>{item.status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.date}>{item.date}</Text>
              <Feather name="chevron-right" size={16} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        )}
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
  list: { padding: 16, gap: 12, paddingBottom: 40 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, gap: 12, alignItems: 'center' },
  imageBox: { width: 72, height: 72, backgroundColor: '#f9fafb', borderRadius: 12 },
  info: { flex: 1 },
  orderId: { fontSize: 11, color: '#9ca3af', marginBottom: 2 },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  store: { fontSize: 12, color: '#6b7280', marginBottom: 6 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 15, fontWeight: '800', color: '#0a0a0a' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  right: { alignItems: 'flex-end', gap: 20 },
  date: { fontSize: 11, color: '#9ca3af' },
})
