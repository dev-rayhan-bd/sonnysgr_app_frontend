// app/screens/profile/transactionHistoryScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['All', 'Purchases', 'Sales', 'Refunds']

const TRANSACTIONS = [
  { id: 'TXN-001', type: 'purchase', product: 'Air Jordan 1 Retro High', store: 'Kicks City', amount: -220, date: 'Aug 16, 2026', status: 'Completed' },
  { id: 'TXN-002', type: 'sale', product: 'Yeezy Boost 350 V2', store: 'Urban Vault', amount: +280, date: 'Aug 12, 2026', status: 'Completed' },
  { id: 'TXN-003', type: 'refund', product: 'Nike Dunk Low', store: 'Street Elite', amount: +150, date: 'Aug 8, 2026', status: 'Refunded' },
  { id: 'TXN-004', type: 'purchase', product: 'New Balance 550', store: 'Sole House', amount: -140, date: 'Aug 5, 2026', status: 'Completed' },
  { id: 'TXN-005', type: 'purchase', product: 'Travis Scott x Nike', store: 'Kicks City', amount: -580, date: 'Jul 28, 2026', status: 'Completed' },
]

const TYPE_ICON: Record<string, any> = { purchase: 'shopping-bag', sale: 'trending-up', refund: 'rotate-ccw' }
const TYPE_COLOR: Record<string, string> = { purchase: '#374151', sale: '#22c55e', refund: '#f59e0b' }

export default function TransactionHistoryScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? TRANSACTIONS
    : activeTab === 'Purchases' ? TRANSACTIONS.filter(t => t.type === 'purchase')
    : activeTab === 'Sales' ? TRANSACTIONS.filter(t => t.type === 'sale')
    : TRANSACTIONS.filter(t => t.type === 'refund')

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity>
          <Feather name="download" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Spent</Text>
        <Text style={styles.balanceValue}>$940</Text>
        <View style={styles.balanceRow}>
          <View style={styles.balanceSub}>
            <Text style={styles.balanceSubLabel}>Sales Earned</Text>
            <Text style={[styles.balanceSubValue, { color: '#22c55e' }]}>+$280</Text>
          </View>
          <View style={styles.balanceSub}>
            <Text style={styles.balanceSubLabel}>Refunds</Text>
            <Text style={[styles.balanceSubValue, { color: '#f59e0b' }]}>+$150</Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={t => t.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: TYPE_COLOR[item.type] + '15' }]}>
              <Feather name={TYPE_ICON[item.type]} size={18} color={TYPE_COLOR[item.type]} />
            </View>
            <View style={styles.info}>
              <Text style={styles.productName} numberOfLines={1}>{item.product}</Text>
              <Text style={styles.storeName}>{item.store}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.amountCol}>
              <Text style={[styles.amount, { color: item.amount > 0 ? '#22c55e' : '#0a0a0a' }]}>
                {item.amount > 0 ? '+' : ''}${Math.abs(item.amount)}
              </Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  balanceCard: { backgroundColor: '#0a0a0a', margin: 16, borderRadius: 20, padding: 20 },
  balanceLabel: { fontSize: 13, color: '#9ca3af', marginBottom: 4 },
  balanceValue: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom: 16 },
  balanceRow: { flexDirection: 'row', gap: 24 },
  balanceSub: { gap: 2 },
  balanceSubLabel: { fontSize: 12, color: '#6b7280' },
  balanceSubValue: { fontSize: 16, fontWeight: '700' },
  tabs: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  tabActive: { backgroundColor: '#0a0a0a' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  tabTextActive: { color: '#fff' },
  list: { padding: 16, paddingBottom: 40 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 14, alignItems: 'center', gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  storeName: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  date: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
  amountCol: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: '800' },
  status: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
})
