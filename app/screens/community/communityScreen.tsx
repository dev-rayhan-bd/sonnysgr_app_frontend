// app/screens/community/communityScreen.tsx
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TABS = ['For You', 'Following', 'Trending']

const POSTS = [
  { id: '1', user: 'Marcus L.', handle: '@marcusl', avatar: 'ML', content: 'Just copped the Air Jordan 4 "Red Thunder" at Kicks City 🔥 Condition is immaculate.', likes: 42, comments: 8, timeAgo: '2h', product: 'Air Jordan 4 "Red Thunder"' },
  { id: '2', user: 'Sarah K.', handle: '@sarahk', avatar: 'SK', content: 'Huge W at Urban Vault today. Got the Yeezy 350 V2 in my size after months of waiting. The in-store pickup was flawless!', likes: 67, comments: 14, timeAgo: '4h', product: 'Yeezy 350 V2' },
  { id: '3', user: 'James P.', handle: '@jamesp', avatar: 'JP', content: 'Dunk Low "Panda" restock at Street Elite rn. Sizes 8-12 still available as of 3pm.', likes: 103, comments: 31, timeAgo: '6h', product: null },
]

export default function CommunityScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('For You')

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/screens/community/discoverUsersScreen' as any)}>
            <Feather name="users" size={22} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="edit-3" size={22} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={POSTS}
        keyExtractor={p => p.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.handle}>{item.handle} · {item.timeAgo}</Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={18} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            {item.product && (
              <TouchableOpacity
                style={styles.productChip}
                onPress={() => router.push('/screens/product/productScreen')}
              >
                <Feather name="tag" size={12} color="#22c55e" />
                <Text style={styles.productChipText}>{item.product}</Text>
                <Feather name="chevron-right" size={12} color="#22c55e" />
              </TouchableOpacity>
            )}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.action}>
                <Feather name="heart" size={16} color="#6b7280" />
                <Text style={styles.actionCount}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Feather name="message-circle" size={16} color="#6b7280" />
                <Text style={styles.actionCount}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Feather name="share-2" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0a0a0a' },
  headerRight: { flexDirection: 'row', gap: 16 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#0a0a0a' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  tabTextActive: { color: '#0a0a0a' },
  list: { paddingBottom: 40 },
  separator: { height: 8, backgroundColor: '#f9fafb' },
  post: { backgroundColor: '#fff', padding: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  userInfo: { flex: 1 },
  userName: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  handle: { fontSize: 12, color: '#9ca3af' },
  content: { fontSize: 14, color: '#374151', lineHeight: 22, marginBottom: 12 },
  productChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f0fdf4', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 12 },
  productChipText: { fontSize: 13, fontWeight: '600', color: '#22c55e' },
  actions: { flexDirection: 'row', gap: 20 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionCount: { fontSize: 13, color: '#6b7280' },
})
