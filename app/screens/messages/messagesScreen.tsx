// app/screens/messages/messagesScreen.tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const CONVERSATIONS = [
  { id: '1', name: 'Kicks City', avatar: 'KC', lastMsg: 'Your pickup is ready! Come in anytime before 8pm.', time: '2m', unread: 1, isStore: true },
  { id: '2', name: 'marcus_kicks', avatar: 'MK', lastMsg: 'I can do $185, final offer', time: '15m', unread: 2, isStore: false },
  { id: '3', name: 'Urban Vault', avatar: 'UV', lastMsg: 'Order #ORD-002 confirmed ✓', time: '1h', unread: 0, isStore: true },
  { id: '4', name: 'sarahsneaks', avatar: 'SS', lastMsg: 'Thanks! The pair is in great condition', time: '3h', unread: 0, isStore: false },
  { id: '5', name: 'Street Elite', avatar: 'SE', lastMsg: 'We have your size in stock now', time: 'Yesterday', unread: 0, isStore: true },
]

export default function MessagesScreen() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={16} color="#9ca3af" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search messages..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={c => c.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/screens/messages/chatScreen' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.avatarWrap}>
              <View style={[styles.avatar, item.isStore && styles.avatarStore]}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              {item.isStore && (
                <View style={styles.storeBadge}>
                  <Feather name="shopping-bag" size={8} color="#fff" />
                </View>
              )}
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convHeader}>
                <Text style={styles.convName}>{item.name}</Text>
                <Text style={styles.convTime}>{item.time}</Text>
              </View>
              <Text style={[styles.lastMsg, item.unread > 0 && styles.lastMsgUnread]} numberOfLines={1}>
                {item.lastMsg}
              </Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0a0a0a' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f3f4f6', marginHorizontal: 16, marginBottom: 8, borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, fontSize: 14, color: '#0a0a0a' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  avatarStore: { backgroundColor: '#374151' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  storeBadge: { position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  convInfo: { flex: 1 },
  convHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  convName: { fontSize: 15, fontWeight: '700', color: '#0a0a0a' },
  convTime: { fontSize: 12, color: '#9ca3af' },
  lastMsg: { fontSize: 13, color: '#6b7280' },
  lastMsgUnread: { color: '#0a0a0a', fontWeight: '600' },
  unreadBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  unreadText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  separator: { height: 1, backgroundColor: '#f9fafb', marginLeft: 80 },
})
