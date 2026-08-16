// app/screens/discover/liveShoppingFeedScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

interface LiveFeed {
  id: string
  user: string
  store: string
  action: 'bought' | 'saved' | 'reviewed'
  item: string
  price?: number
  timeAgo: string
  avatar: string
}

const FEED: LiveFeed[] = [
  { id: '1', user: 'Marcus L.', store: 'Kicks City', action: 'bought', item: 'Air Jordan 1 Retro High', price: 220, timeAgo: '2m ago', avatar: 'ML' },
  { id: '2', user: 'Sarah K.', store: 'Urban Vault', action: 'saved', item: 'Yeezy Boost 350 V2', timeAgo: '5m ago', avatar: 'SK' },
  { id: '3', user: 'James P.', store: 'Street Elite', action: 'reviewed', item: 'Nike Dunk Low', timeAgo: '12m ago', avatar: 'JP' },
  { id: '4', user: 'Aisha M.', store: 'Sole House', action: 'bought', item: 'New Balance 550', price: 140, timeAgo: '18m ago', avatar: 'AM' },
  { id: '5', user: 'Chris R.', store: 'Kicks City', action: 'saved', item: 'Travis Scott x Nike', timeAgo: '25m ago', avatar: 'CR' },
  { id: '6', user: 'Dana B.', store: 'Premium Threads', action: 'bought', item: 'Supreme Hoodie FW23', price: 320, timeAgo: '33m ago', avatar: 'DB' },
]

const ACTION_COLOR = { bought: '#22c55e', saved: '#3b82f6', reviewed: '#f59e0b' }
const ACTION_ICON: Record<string, any> = { bought: 'shopping-bag', saved: 'heart', reviewed: 'star' }

export default function LiveShoppingFeedScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<'live' | 'trending'>('live')

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.liveDot} />
          <Text style={styles.headerTitle}>Live Feed</Text>
        </View>
        <TouchableOpacity>
          <Feather name="filter" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['live', 'trending'] as const).map(t => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'live' ? '🔴 Live' : '🔥 Trending'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={FEED}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            <View style={styles.feedContent}>
              <View style={styles.feedRow}>
                <Text style={styles.userName}>{item.user}</Text>
                <View style={[styles.actionPill, { backgroundColor: ACTION_COLOR[item.action] + '20' }]}>
                  <Feather name={ACTION_ICON[item.action]} size={10} color={ACTION_COLOR[item.action]} />
                  <Text style={[styles.actionText, { color: ACTION_COLOR[item.action] }]}>{item.action}</Text>
                </View>
              </View>
              <Text style={styles.itemName}>{item.item}</Text>
              <View style={styles.feedMeta}>
                <Text style={styles.storeName}>@ {item.store}</Text>
                {item.price && <Text style={styles.price}>${item.price}</Text>}
              </View>
            </View>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, paddingBottom: 12 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12, backgroundColor: '#f3f4f6' },
  tabActive: { backgroundColor: '#0a0a0a' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  tabTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  feedItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 14, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  feedContent: { flex: 1 },
  feedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  userName: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  actionPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  actionText: { fontSize: 11, fontWeight: '600' },
  itemName: { fontSize: 13, color: '#374151', marginBottom: 2 },
  feedMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  storeName: { fontSize: 12, color: '#6b7280' },
  price: { fontSize: 13, fontWeight: '700', color: '#0a0a0a' },
  timeAgo: { fontSize: 11, color: '#9ca3af' },
  separator: { height: 1, backgroundColor: '#f3f4f6' },
})
