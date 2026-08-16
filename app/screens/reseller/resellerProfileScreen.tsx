// app/screens/reseller/resellerProfileScreen.tsx
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const LISTINGS = [
  { id: '1', name: 'Yeezy Boost 350 V2 "Zebra"', size: '10', price: 290, condition: 'NEW' },
  { id: '2', name: 'Jordan 4 "Black Cat"', size: '9.5', price: 320, condition: 'NEW' },
  { id: '3', name: 'New Balance 550', size: '10', price: 145, condition: 'PRE-OWNED' },
]

export default function ResellerProfileScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Listings')

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="share-2" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}><Text style={styles.avatarText}>MK</Text></View>
          <Text style={styles.name}>marcus_kicks</Text>
          <Text style={styles.handle}>@marcus_kicks · Miami, FL</Text>
          <View style={styles.stats}>
            {[['47', 'Listings'], ['1.2K', 'Sales'], ['4.9★', 'Rating']].map(([val, lbl]) => (
              <View key={lbl} style={styles.statItem}>
                <Text style={styles.statValue}>{val}</Text>
                <Text style={styles.statLabel}>{lbl}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.messageBtn} onPress={() => router.push('/screens/messages/chatScreen' as any)}>
              <Feather name="message-circle" size={16} color="#374151" />
              <Text style={styles.messageBtnText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followBtnText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          {['Listings', 'Reviews', 'Activity'].map(tab => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.grid}>
          {LISTINGS.map(item => (
            <TouchableOpacity key={item.id} style={styles.gridCard} onPress={() => router.push('/screens/product/productScreen')}>
              <View style={styles.gridImage} />
              <View style={styles.gridInfo}>
                <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.gridSize}>Sz {item.size}</Text>
                <Text style={styles.gridPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  profileSection: { alignItems: 'center', paddingVertical: 20, paddingHorizontal: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#fff' },
  name: { fontSize: 20, fontWeight: '800', color: '#0a0a0a', marginBottom: 4 },
  handle: { fontSize: 13, color: '#6b7280', marginBottom: 20 },
  stats: { flexDirection: 'row', gap: 32, marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#0a0a0a' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  actionRow: { flexDirection: 'row', gap: 12 },
  messageBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f3f4f6', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  messageBtnText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  followBtn: { backgroundColor: '#0a0a0a', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12 },
  followBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#0a0a0a' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  tabTextActive: { color: '#0a0a0a' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12 },
  gridCard: { width: '47%', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#f3f4f6', overflow: 'hidden' },
  gridImage: { height: 130, backgroundColor: '#f9fafb' },
  gridInfo: { padding: 10 },
  gridName: { fontSize: 12, fontWeight: '600', color: '#0a0a0a', lineHeight: 17, marginBottom: 4 },
  gridSize: { fontSize: 11, color: '#6b7280', marginBottom: 2 },
  gridPrice: { fontSize: 14, fontWeight: '800', color: '#0a0a0a' },
})
