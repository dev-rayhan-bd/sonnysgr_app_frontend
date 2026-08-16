// app/screens/community/discoverUsersScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const USERS = [
  { id: '1', name: 'Marcus L.', handle: '@marcusl', avatar: 'ML', pairs: 124, followers: '3.2K', isFollowing: false },
  { id: '2', name: 'Sarah K.', handle: '@sarahk', avatar: 'SK', pairs: 87, followers: '1.8K', isFollowing: true },
  { id: '3', name: 'James P.', handle: '@jamesp', avatar: 'JP', pairs: 203, followers: '5.1K', isFollowing: false },
  { id: '4', name: 'Aisha M.', handle: '@aisham', avatar: 'AM', pairs: 56, followers: '892', isFollowing: false },
  { id: '5', name: 'Chris R.', handle: '@chrisr', avatar: 'CR', pairs: 145, followers: '2.4K', isFollowing: true },
]

export default function DiscoverUsersScreen() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(USERS)

  const toggleFollow = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isFollowing: !u.isFollowing } : u))
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.handle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover People</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={16} color="#9ca3af" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search users..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={u => u.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => router.push('/screens/community/userProfileScreen' as any)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.handle}>{item.handle} · {item.pairs} pairs · {item.followers} followers</Text>
            </View>
            <TouchableOpacity
              style={[styles.followBtn, item.isFollowing && styles.followingBtn]}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={[styles.followText, item.isFollowing && styles.followingText]}>
                {item.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f3f4f6', marginHorizontal: 16, marginBottom: 12, borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, fontSize: 14, color: '#0a0a0a' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  userInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#0a0a0a' },
  handle: { fontSize: 12, color: '#6b7280' },
  followBtn: { backgroundColor: '#0a0a0a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  followingBtn: { backgroundColor: '#f3f4f6' },
  followText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  followingText: { color: '#374151' },
  separator: { height: 1, backgroundColor: '#f3f4f6' },
})
