import React, { useState, useRef } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import BaseContainer from '@/components/shared/BaseContainer'
import { useMessages } from '@/services/hooks/reseller/messages/useMessages'

const FILTERS = ['All', 'Unread', 'Buying', 'Selling'] as const
type Filter = (typeof FILTERS)[number]

const STATUS_STYLES: Record<string, { bg: string; color: string; icon?: any }> = {
  'Deal Accepted': { bg: '#F0FDF4', color: '#22C55E', icon: 'checkmark-circle' },
  'Offer Sent': { bg: '#EFF6FF', color: '#3B82F6' },
  Negotiating: { bg: '#FFFBEB', color: '#F59E0B' },
  Paid: { bg: '#F0FDF4', color: '#22C55E', icon: 'checkmark-circle' },
  Shipped: { bg: '#F5F3FF', color: '#8B5CF6' },
}

const Messages = () => {
  const { chats, unreadTotal, toggleRead, archiveChat, muteChat } = useMessages()
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const swipeRefs = useRef<Record<string, Swipeable | null>>({})

  const filteredChats = chats.filter((chat) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Unread') return chat.unreadCount > 0
    if (activeFilter === 'Buying') return chat.role === 'Buying'
    if (activeFilter === 'Selling') return chat.role === 'Selling'
    return true
  })

  const closeOthers = (exceptId: string) => {
    Object.entries(swipeRefs.current).forEach(([id, ref]) => {
      if (id !== exceptId) ref?.close()
    })
  }

  const handleLongPress = (chatId: string, storeName: string) => {
    Alert.alert(storeName, undefined, [
      { text: 'Mute', onPress: () => muteChat(chatId) },
      { text: 'Archive', onPress: () => archiveChat(chatId) },
      { text: 'Delete', style: 'destructive', onPress: () => archiveChat(chatId) },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  const renderRightActions = (chatId: string) => (
    <TouchableOpacity
      style={styles.swipeArchiveBtn}
      onPress={() => {
        archiveChat(chatId)
        swipeRefs.current[chatId]?.close()
      }}
    >
      <Ionicons name="archive-outline" size={20} color="#FFF" />
      <Text style={styles.swipeActionText}>Archive</Text>
    </TouchableOpacity>
  )

  const renderLeftActions = (chatId: string, isUnread: boolean) => (
    <TouchableOpacity
      style={styles.swipeUnreadBtn}
      onPress={() => {
        toggleRead(chatId)
        swipeRefs.current[chatId]?.close()
      }}
    >
      <Ionicons name={isUnread ? 'mail-open-outline' : 'mail-unread-outline'} size={20} color="#FFF" />
      <Text style={styles.swipeActionText}>{isUnread ? 'Read' : 'Unread'}</Text>
    </TouchableOpacity>
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BaseContainer backgroundColor="#fff">
        <View className="pt-10 flex-1">
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Messages</Text>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={22} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Small filter chips, no large banner */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
                {filter === 'Unread' && unreadTotal > 0 ? (
                  <View style={styles.filterCountBadge}>
                    <Text style={styles.filterCountText}>{unreadTotal}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listContainer}>
              {filteredChats.map((chat) => {
                const status = STATUS_STYLES[chat.itemContext.status] || STATUS_STYLES['Offer Sent']
                return (
                  <Swipeable
                    key={chat.id}
                    ref={(ref) => { swipeRefs.current[chat.id] = ref }}
                    onSwipeableWillOpen={() => closeOthers(chat.id)}
                    renderRightActions={() => renderRightActions(chat.id)}
                    renderLeftActions={() => renderLeftActions(chat.id, chat.unreadCount > 0)}
                    overshootRight={false}
                    overshootLeft={false}
                  >
                    <TouchableOpacity
                      style={styles.chatItem}
                      onPress={() => router.push('/screens/messages/chatScreen')}
                      onLongPress={() => handleLongPress(chat.id, chat.storeName)}
                      activeOpacity={0.7}
                      delayLongPress={350}
                    >
                      <View style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                          <Ionicons name="business" size={18} color="#fff" />
                        </View>
                        {chat.isOnline ? <View style={styles.onlineDot} /> : null}
                      </View>

                      <View style={styles.messageDetails}>
                        <View style={styles.nameRow}>
                          <Text style={styles.storeName} numberOfLines={1}>{chat.storeName}</Text>
                          <Text style={styles.timeText}>{chat.time}</Text>
                        </View>

                        <Text style={styles.lastMessage} numberOfLines={1}>
                          {chat.lastMessage}
                        </Text>

                        {status.icon ? (
                          <View style={styles.dealAcceptedRow}>
                            <Ionicons name={status.icon} size={13} color={status.color} />
                            <Text style={[styles.dealAcceptedText, { color: status.color }]}>
                              {chat.itemContext.status}
                            </Text>
                          </View>
                        ) : null}

                        {/* Product preview card — tappable, opens the listing */}
                        <TouchableOpacity
                          style={styles.productPreview}
                          onPress={() => router.push('/screens/product/productScreen')}
                          activeOpacity={0.7}
                        >
                          <Image source={{ uri: chat.itemContext.image }} style={styles.contextImage} />
                          <View style={styles.productInfo}>
                            <Text style={styles.productName} numberOfLines={1}>{chat.itemContext.name}</Text>
                            <Text style={styles.productMeta}>
                              Size {chat.itemContext.size} · {chat.itemContext.offer}
                            </Text>
                          </View>
                          {!status.icon ? (
                            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                              <Text style={[styles.statusText, { color: status.color }]}>
                                {chat.itemContext.status}
                              </Text>
                            </View>
                          ) : null}
                        </TouchableOpacity>
                      </View>

                      {chat.unreadCount > 0 ? (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </Swipeable>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </BaseContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  filterScroll: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    gap: 6,
  },
  filterChipActive: { backgroundColor: '#111827' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#4B5563' },
  filterTextActive: { color: '#FFF' },
  filterCountBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  listContainer: { paddingBottom: 100 },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  avatarContainer: { position: 'relative' },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#064E3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    top: 1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  messageDetails: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  storeName: { fontSize: 15, fontWeight: 'bold', color: '#111827', flex: 1, marginRight: 8 },
  timeText: { fontSize: 11, color: '#9CA3AF' },
  lastMessage: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
  dealAcceptedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  dealAcceptedText: { fontSize: 12, fontWeight: '700' },
  // Stacked product preview card, below the message text
  productPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 6,
    gap: 8,
  },
  contextImage: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#E5E7EB' },
  productInfo: { flex: 1 },
  productName: { fontSize: 12, fontWeight: '600', color: '#111827' },
  productMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  unreadBadge: {
    backgroundColor: '#22C55E',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 6,
  },
  unreadBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  // Swipe actions
  swipeArchiveBtn: {
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    width: 84,
    gap: 4,
  },
  swipeUnreadBtn: {
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    width: 84,
    gap: 4,
  },
  swipeActionText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
})

export default Messages