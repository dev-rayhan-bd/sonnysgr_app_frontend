import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseContainer from '@/components/shared/BaseContainer'
import { useRequests } from '@/services/hooks/reseller/requests/useRequests'

const Requests = () => {
  const { requests, summary } = useRequests()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [segment, setSegment] = React.useState<'Open' | 'Unread' | 'History'>('Open')
  const openCount = requests.filter((r) => r.state === 'New' || r.state === 'Pending Response').length
  const unreadCount = summary.newToday

  const visibleRequests =
    segment === 'Unread' ? requests.filter((r) => r.isNew) : segment === 'History' ? [] : requests

  return (
    <BaseContainer backgroundColor="#fff">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 100 }}>
        <Text style={styles.screenTitle}>Store Requests</Text>

        {/* ── Summary alert ──────────────────────────────────── */}
        <View style={styles.summaryAlert}>
          <Ionicons name="notifications" size={16} color="#D97706" />
          <Text style={styles.alertText}>
            <Text style={styles.alertBold}>{openCount} open</Text>
            {'  ·  '}
            <Text style={styles.alertBold}>{unreadCount} unread</Text>
            {'  ·  '}
            <Text style={[styles.alertBold, { color: '#D97706' }]}>
              {summary.expiringSoon} expiring soon
            </Text>
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#D97706" />
        </View>

        {/* ── Search bar ─────────────────────────────────────── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search stores or products"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="sliders" size={16} color="#111827" />
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* ── Segmented control ──────────────────────────────── */}
        <View style={styles.segmentRow}>
          {(['Open', 'Unread', 'History'] as const).map((seg) => {
            const isActive = segment === seg
            const count = seg === 'Open' ? openCount : seg === 'Unread' ? unreadCount : null
            return (
              <TouchableOpacity
                key={seg}
                onPress={() => setSegment(seg)}
                style={[styles.segmentChip, isActive && styles.segmentChipActive]}
              >
                <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                  {seg}
                  {count !== null ? ` (${count})` : ''}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* ── Sort row ───────────────────────────────────────── */}
        <View style={styles.sortRow}>
          <Text style={styles.sortText}>Sort: Expiring first</Text>
          <Ionicons name="chevron-down" size={14} color="#6B7280" />
        </View>

        {/* ── Request cards ──────────────────────────────────── */}
        <View style={styles.listContainer}>
          {visibleRequests.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.push('/screens/reseller/requestDetailsScreen' as any)}
            >
              <View style={styles.storeRow}>
                <View style={styles.storeAvatar}>
                  <Text style={styles.storeAvatarText}>
                    {item.storeName.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.storeName}>{item.storeName}</Text>
                  <Text style={styles.storeSubText}>
                    {item.rating} ★ · {item.distance}
                  </Text>
                </View>
                {item.isExpiring ? (
                  <View style={styles.expiryPill}>
                    <Text style={styles.expiryPillText}>Expires in 2 hours</Text>
                  </View>
                ) : (
                  <View style={styles.buyPill}>
                    <Text style={styles.buyPillText}>
                      {item.tag === 'Buy Request' ? 'Purchase offer' : item.tag}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.itemRow}>
                <View style={styles.itemImagePlaceholder} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <Text style={styles.itemMeta}>
                    Size {item.size} · {item.condition}
                  </Text>
                  <View style={styles.priceCompareRow}>
                    <Text style={styles.priceLabel}>Your asking price:</Text>
                    <Text style={styles.priceValue}>
                      ${Math.round(item.offerPrice * (item.tag === 'Interest Ping' ? 1.27 : 1.19))}
                    </Text>
                  </View>
                  <View style={styles.priceCompareRow}>
                    <Text style={styles.priceLabel}>
                      {item.tag === 'Interest Ping' ? 'Store target:' : 'Store offer:'}
                    </Text>
                    <Text style={styles.offerValue}>${item.offerPrice}</Text>
                  </View>
                </View>
              </View>

              {item.message ? <Text style={styles.messageText}>{item.message}</Text> : null}

              <Text style={styles.footerText}>
                {item.isExpiring ? 'Requests pickup today' : `Requested ${item.time}`}
                <Text style={styles.footerTime}>  {item.time}</Text>
              </Text>

              <View style={styles.actionRow}>
                {item.state === 'New' && item.tag === 'Interest Ping' ? (
                  <>
                    <TouchableOpacity style={[styles.btn, styles.replyBtn]}>
                      <Ionicons name="chatbubble-outline" size={14} color="#22C55E" />
                      <Text style={styles.replyBtnText}>Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.sendOfferBtn]} onPress={(e) => { e.stopPropagation?.(); router.push('/screens/reseller/sendOfferScreen'); }}>
                      <Text style={styles.sendOfferBtnText}>Send offer</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity style={[styles.btn, styles.reviewBtn]}>
                      <Ionicons name="checkmark-circle-outline" size={14} color="#FFF" />
                      <Text style={styles.reviewBtnText}>Review offer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.counterBtn]} onPress={(e) => { e.stopPropagation?.(); router.push('/screens/reseller/sendOfferScreen'); }}>
                      <Ionicons name="swap-horizontal" size={14} color="#111827" />
                      <Text style={styles.counterBtnText}>Counter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.declineBtn]}>
                      <Text style={styles.declineBtnText}>Decline</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  screenTitle: { fontSize: 24, fontWeight: '800', paddingHorizontal: 16, marginBottom: 14, color: '#111827' },

  summaryAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  alertText: { flex: 1, fontSize: 12, color: '#92400E' },
  alertBold: { fontWeight: '700', color: '#92400E' },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filterBtnText: { fontSize: 13, fontWeight: '600', color: '#111827' },

  segmentRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 14 },
  segmentChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  segmentChipActive: { backgroundColor: '#111827' },
  segmentText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  segmentTextActive: { color: '#FFF' },

  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },

  listContainer: { paddingHorizontal: 16, gap: 14 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: 14,
  },

  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  storeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeAvatarText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  storeName: { fontWeight: '700', fontSize: 14, color: '#111827' },
  storeSubText: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  expiryPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  expiryPillText: { fontSize: 10, fontWeight: '700', color: '#D97706' },
  buyPill: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  buyPillText: { fontSize: 10, fontWeight: '700', color: '#22C55E' },

  itemRow: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  itemImagePlaceholder: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#F3F4F6' },
  itemName: { fontWeight: '700', fontSize: 14, color: '#111827' },
  itemMeta: { fontSize: 12, color: '#6B7280', marginTop: 2, marginBottom: 6 },
  priceCompareRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  priceLabel: { fontSize: 11, color: '#9CA3AF' },
  priceValue: { fontSize: 12, fontWeight: '700', color: '#111827' },
  offerValue: { fontSize: 12, fontWeight: '800', color: '#22C55E' },

  messageText: { fontSize: 12, color: '#4B5563', fontStyle: 'italic', marginBottom: 8, lineHeight: 17 },

  footerText: { fontSize: 11, color: '#9CA3AF', marginBottom: 10 },
  footerTime: { color: '#D1D5DB' },

  actionRow: { flexDirection: 'row', gap: 8 },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 40,
    borderRadius: 10,
  },
  replyBtn: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' },
  replyBtnText: { color: '#22C55E', fontWeight: '700', fontSize: 13 },
  sendOfferBtn: { backgroundColor: '#22C55E' },
  sendOfferBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },

  reviewBtn: { backgroundColor: '#22C55E' },
  reviewBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  counterBtn: { backgroundColor: '#F3F4F6' },
  counterBtnText: { color: '#111827', fontWeight: '700', fontSize: 13 },
  declineBtn: { backgroundColor: '#F3F4F6', flex: 0.7 },
  declineBtnText: { color: '#6B7280', fontWeight: '700', fontSize: 13 },
})

export default Requests