// app/screens/community/communityTrendingScreen.tsx
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TRENDING_PRODUCTS = [
  { rank: 1, name: 'Nike Dunk Low "Panda"', searches: '12.4K', trend: '+28%' },
  { rank: 2, name: 'Yeezy 350 "Carbon"', searches: '9.1K', trend: '+15%' },
  { rank: 3, name: 'Air Jordan 1 High', searches: '7.8K', trend: '+8%' },
  { rank: 4, name: 'Air Max 1', searches: '6.2K', trend: '+5%' },
  { rank: 5, name: 'Dunk Low', searches: '5.9K', trend: '+3%' },
]

const TRENDING_STORES = [
  { id: '1', name: 'Kicks City', location: 'Miami, FL', followers: '2.3K', verified: true },
  { id: '2', name: 'Urban Vault', location: 'New York, NY', followers: '1.8K', verified: true },
  { id: '3', name: 'Street Elite', location: 'Los Angeles, CA', followers: '1.2K', verified: false },
]

export default function CommunityTrendingScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Trending products */}
        <Text style={styles.sectionTitle}>🔥 Top Searches This Week</Text>
        {TRENDING_PRODUCTS.map(item => (
          <TouchableOpacity key={item.rank} style={styles.rankRow}>
            <Text style={styles.rank}>#{item.rank}</Text>
            <View style={styles.imageBox} />
            <View style={styles.rankInfo}>
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.searches}>{item.searches} searches</Text>
            </View>
            <Text style={styles.trend}>{item.trend}</Text>
          </TouchableOpacity>
        ))}

        {/* Trending stores */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>📍 Rising Stores Near You</Text>
        {TRENDING_STORES.map(store => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeRow}
            onPress={() => router.push('/screens/store/storeProfileScreen')}
          >
            <View style={styles.storeAvatar}>
              <Text style={styles.storeAvatarText}>{store.name[0]}</Text>
            </View>
            <View style={styles.storeInfo}>
              <View style={styles.storeNameRow}>
                <Text style={styles.storeName}>{store.name}</Text>
                {store.verified && <Feather name="check-circle" size={14} color="#22c55e" />}
              </View>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
            <View style={styles.followBtn}>
              <Text style={styles.followText}>{store.followers} followers</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0a0a0a', marginBottom: 12 },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  rank: { fontSize: 16, fontWeight: '800', color: '#d1d5db', width: 24, textAlign: 'center' },
  imageBox: { width: 48, height: 48, backgroundColor: '#f9fafb', borderRadius: 10 },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  searches: { fontSize: 12, color: '#6b7280' },
  trend: { fontSize: 13, fontWeight: '700', color: '#22c55e' },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  storeAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  storeAvatarText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  storeInfo: { flex: 1 },
  storeNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  storeName: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  storeLocation: { fontSize: 12, color: '#6b7280' },
  followBtn: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  followText: { fontSize: 12, fontWeight: '600', color: '#374151' },
})
