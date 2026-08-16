// app/screens/community/userProfileScreen.tsx
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const LOCKER = [
  { id: '1', name: 'Air Jordan 1', price: 220 },
  { id: '2', name: 'Yeezy 350 V2', price: 280 },
  { id: '3', name: 'Nike Dunk Low', price: 150 },
  { id: '4', name: 'Travis Scott x Nike', price: 580 },
]

export default function UserProfileScreen() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('Locker')

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile info */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ML</Text>
          </View>
          <Text style={styles.name}>Marcus L.</Text>
          <Text style={styles.handle}>@marcusl · Miami, FL</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>Pairs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>84</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.followBtn, isFollowing && styles.followingBtn]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['Locker', 'Activity', 'Wishlist'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Locker grid */}
        <View style={styles.grid}>
          {LOCKER.map(item => (
            <TouchableOpacity key={item.id} style={styles.gridItem}>
              <View style={styles.gridImageBox} />
              <Text style={styles.gridName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.gridPrice}>${item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  profileSection: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#fff' },
  name: { fontSize: 20, fontWeight: '800', color: '#0a0a0a', marginBottom: 4 },
  handle: { fontSize: 14, color: '#6b7280', marginBottom: 20 },
  stats: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statItem: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#0a0a0a' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statDivider: { width: 1, height: 32, backgroundColor: '#f3f4f6' },
  followBtn: { backgroundColor: '#0a0a0a', paddingHorizontal: 48, paddingVertical: 12, borderRadius: 12 },
  followingBtn: { backgroundColor: '#f3f4f6' },
  followBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  followingBtnText: { color: '#374151' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#0a0a0a' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  tabTextActive: { color: '#0a0a0a' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12 },
  gridItem: { width: '47%', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#f3f4f6', overflow: 'hidden' },
  gridImageBox: { height: 120, backgroundColor: '#f9fafb' },
  gridName: { fontSize: 12, fontWeight: '600', color: '#0a0a0a', padding: 8, paddingBottom: 2 },
  gridPrice: { fontSize: 13, fontWeight: '800', color: '#22c55e', paddingHorizontal: 8, paddingBottom: 8 },
})
