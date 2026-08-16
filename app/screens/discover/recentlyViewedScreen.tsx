// app/screens/discover/recentlyViewedScreen.tsx
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

interface RecentItem {
  id: string
  name: string
  store: string
  price: number
  size: string
  viewedAgo: string
  condition: 'NEW' | 'PRE-OWNED'
}

const RECENT_ITEMS: RecentItem[] = [
  { id: '1', name: 'Travis Scott x Nike', store: 'Kicks City', price: 580, size: '10', viewedAgo: '2 min ago', condition: 'NEW' },
  { id: '2', name: 'Off-White Blazer Mid', store: 'Urban Vault', price: 420, size: '9.5', viewedAgo: '15 min ago', condition: 'NEW' },
  { id: '3', name: 'Air Jordan 4 "Black Cat"', store: 'Street Elite', price: 310, size: '11', viewedAgo: '1 hr ago', condition: 'PRE-OWNED' },
  { id: '4', name: 'Yeezy Boost 350 V2', store: 'Sole House', price: 280, size: '10', viewedAgo: '3 hrs ago', condition: 'NEW' },
  { id: '5', name: 'New Balance 550', store: 'Kicks City', price: 140, size: '9', viewedAgo: 'Yesterday', condition: 'NEW' },
]

export default function RecentlyViewedScreen() {
  const router = useRouter()

  const renderItem = ({ item }: { item: RecentItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push('/screens/product/productScreen')}
      activeOpacity={0.85}
    >
      <View style={styles.imageBox} />
      <View style={styles.info}>
        <Text style={styles.viewedAgo}>{item.viewedAgo}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.store}>{item.store}</Text>
        <View style={styles.bottom}>
          <Text style={styles.size}>Size {item.size}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Feather name="x" size={16} color="#9ca3af" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recently Viewed</Text>
        <TouchableOpacity>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={RECENT_ITEMS}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  clearAll: { fontSize: 14, color: '#22c55e', fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  separator: { height: 12 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', padding: 12, gap: 12, alignItems: 'center' },
  imageBox: { width: 80, height: 80, backgroundColor: '#f9fafb', borderRadius: 12 },
  info: { flex: 1 },
  viewedAgo: { fontSize: 11, color: '#9ca3af', marginBottom: 2 },
  name: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', lineHeight: 20, marginBottom: 2 },
  store: { fontSize: 12, color: '#6b7280', marginBottom: 6 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  size: { fontSize: 12, fontWeight: '600', color: '#22c55e' },
  price: { fontSize: 15, fontWeight: '800', color: '#0a0a0a' },
  removeBtn: { padding: 4 },
})
