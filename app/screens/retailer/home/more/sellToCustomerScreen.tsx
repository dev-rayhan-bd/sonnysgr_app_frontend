// app/screens/retailer/home/more/sellToCustomerScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const CUSTOMER_REQUESTS = [
  { id: '1', customer: 'Alex M.', product: 'Air Jordan 4 "Black Cat"', size: '10', budget: '$300', distance: '1.2 mi', time: '5 min ago' },
  { id: '2', customer: 'Jamie L.', product: 'Nike Dunk Low Panda', size: '9.5', budget: '$120', distance: '0.8 mi', time: '12 min ago' },
  { id: '3', customer: 'Sam R.', product: 'Yeezy 350 V2 Cream', size: '11', budget: '$250', distance: '2.1 mi', time: '1 hr ago' },
]

export default function SellToCustomerScreen() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Requests</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Info banner */}
      <View style={styles.infoBanner}>
        <Feather name="info" size={16} color="#3b82f6" />
        <Text style={styles.infoText}>Customers near you are looking for sneakers you might have in inventory.</Text>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={16} color="#9ca3af" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by product or size..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={CUSTOMER_REQUESTS}
        keyExtractor={r => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.customerAvatar}>
                <Text style={styles.customerAvatarText}>{item.customer[0]}</Text>
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{item.customer}</Text>
                <View style={styles.distanceRow}>
                  <Feather name="map-pin" size={11} color="#6b7280" />
                  <Text style={styles.distanceText}>{item.distance} away · {item.time}</Text>
                </View>
              </View>
              <View style={styles.budgetBadge}>
                <Text style={styles.budgetText}>Up to {item.budget}</Text>
              </View>
            </View>

            <View style={styles.requestedProduct}>
              <Text style={styles.requestedLabel}>Looking for:</Text>
              <Text style={styles.requestedName}>{item.product}</Text>
              <Text style={styles.requestedSize}>Size {item.size}</Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.matchBtn}>
                <Feather name="check" size={14} color="#22c55e" />
                <Text style={styles.matchBtnText}>I Have This</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.msgBtn} onPress={() => router.push('/screens/messages/chatScreen' as any)}>
                <Feather name="message-circle" size={14} color="#374151" />
                <Text style={styles.msgBtnText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  infoBanner: { flexDirection: 'row', gap: 10, backgroundColor: '#eff6ff', marginHorizontal: 16, marginVertical: 12, borderRadius: 12, padding: 14, alignItems: 'flex-start' },
  infoText: { fontSize: 13, color: '#3b82f6', flex: 1, lineHeight: 19 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 12, borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, fontSize: 14, color: '#0a0a0a' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  customerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  customerAvatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  customerInfo: { flex: 1 },
  customerName: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  distanceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  distanceText: { fontSize: 12, color: '#6b7280' },
  budgetBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  budgetText: { fontSize: 12, fontWeight: '700', color: '#22c55e' },
  requestedProduct: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 12 },
  requestedLabel: { fontSize: 11, color: '#9ca3af', marginBottom: 4 },
  requestedName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  requestedSize: { fontSize: 13, color: '#6b7280' },
  cardActions: { flexDirection: 'row', gap: 10 },
  matchBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#f0fdf4', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#22c55e' },
  matchBtnText: { fontSize: 14, fontWeight: '700', color: '#22c55e' },
  msgBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#f3f4f6', paddingVertical: 12, borderRadius: 12 },
  msgBtnText: { fontSize: 14, fontWeight: '700', color: '#374151' },
})
