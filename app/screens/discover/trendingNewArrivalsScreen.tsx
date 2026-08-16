// app/screens/discover/trendingNewArrivalsScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['All', 'Nike', 'Jordan', 'Adidas', 'New Balance', 'Yeezy']

const ITEMS = [
  { id: '1', name: 'Air Jordan 4 Retro "Red Thunder"', brand: 'Jordan', store: 'Kicks City', price: 210, size: '10', isNew: true, tag: 'Trending' },
  { id: '2', name: 'Nike Dunk Low "Panda"', brand: 'Nike', store: 'Urban Vault', price: 110, size: '9.5', isNew: true, tag: 'Hot' },
  { id: '3', name: 'Adidas Samba OG', brand: 'Adidas', store: 'Street Elite', price: 100, size: '10', isNew: true, tag: null },
  { id: '4', name: 'New Balance 1906R', brand: 'New Balance', store: 'Sole House', price: 160, size: '11', isNew: true, tag: 'New' },
  { id: '5', name: 'Yeezy 700 V3', brand: 'Yeezy', store: 'Kicks City', price: 200, size: '10.5', isNew: true, tag: 'Limited' },
  { id: '6', name: 'Air Max 1 "Anniversary"', brand: 'Nike', store: 'Premium Threads', price: 130, size: '9', isNew: true, tag: null },
]

export default function TrendingNewArrivalsScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? ITEMS : ITEMS.filter(i => i.brand === activeTab)

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending & New Arrivals</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={20} color="#374151" />
        </TouchableOpacity>
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
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/screens/product/productScreen')}
            activeOpacity={0.85}
          >
            <View style={styles.imageBox}>
              {item.tag && (
                <View style={[styles.tagBadge, item.tag === 'Hot' && { backgroundColor: '#ef4444' }, item.tag === 'Limited' && { backgroundColor: '#8b5cf6' }]}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.heartBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Feather name="heart" size={14} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.brandLabel}>{item.brand}</Text>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.storeName}>{item.store}</Text>
              <View style={styles.cardBottom}>
                <Text style={styles.sizeText}>Sz {item.size}</Text>
                <Text style={styles.priceText}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0a0a0a' },
  tabs: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  tabActive: { backgroundColor: '#0a0a0a' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  tabTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  row: { gap: 12, marginBottom: 12 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', overflow: 'hidden' },
  imageBox: { height: 160, backgroundColor: '#f9fafb', position: 'relative' },
  tagBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#22c55e', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  cardInfo: { padding: 10 },
  brandLabel: { fontSize: 11, color: '#9ca3af', marginBottom: 2 },
  itemName: { fontSize: 13, fontWeight: '600', color: '#0a0a0a', lineHeight: 18, marginBottom: 2 },
  storeName: { fontSize: 11, color: '#6b7280', marginBottom: 6 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sizeText: { fontSize: 12, fontWeight: '600', color: '#22c55e' },
  priceText: { fontSize: 15, fontWeight: '800', color: '#0a0a0a' },
})
