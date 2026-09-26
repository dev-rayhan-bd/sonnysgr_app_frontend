import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseContainer from '@/components/shared/BaseContainer'
import { useInventory } from '@/services/hooks/reseller/listing/useListing'

const Inventory = () => {
  const { stats, inventory, activeTab, setActiveTab, tabs, tabCounts } = useInventory()
  const insets = useSafeAreaInsets()

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={{ flex: 1 }}>
        {/* ── Header ─────────────────────────────────────────── */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <Text style={styles.headerTitle}>My listings</Text>
          <TouchableOpacity style={styles.addItemBtn}>
            <Feather name="plus" size={16} color="#FFF" />
            <Text style={styles.addItemText}>Add item</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* ── Summary card ─────────────────────────────────── */}
          <View style={styles.summaryCard}>
            <SummaryItem label="Total" value={stats.total} color="#111827" />
            <SummaryItem label="Visible to stores" value={stats.visible} color="#22C55E" />
            <SummaryItem label="Private" value={stats.privateCount} color="#F59E0B" />
            <SummaryItem label="Open requests" value={stats.liveRequests} color="#2563EB" />
          </View>

          {/* ── Search bar ───────────────────────────────────── */}
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Search your listings"
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* ── Tabs ─────────────────────────────────────────── */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabChip, isActive && styles.tabChipActive]}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab} ({tabCounts[tab]})
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          {/* ── Visibility / Sort row ────────────────────────── */}
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterDropdownText}>Visibility: All</Text>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterDropdownText}>Sort: Newest</Text>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* ── Listing cards ────────────────────────────────── */}
          <View style={styles.listContainer}>
            {inventory.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <View style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />

                  <View style={styles.infoSection}>
                    <Text style={styles.brandText}>{item.brand}</Text>
                    <View style={styles.nameRow}>
                      <Text style={styles.nameText} numberOfLines={1}>
                        {item.name}
                      </Text>
                      {item.isVisible ? (
                        <View style={styles.visibleTag}>
                          <Ionicons name="eye" size={11} color="#22C55E" />
                          <Text style={styles.visibleTagText}>Visible to stores</Text>
                        </View>
                      ) : (
                        <View style={styles.privateTag}>
                          <Ionicons name="lock-closed" size={11} color="#9CA3AF" />
                          <Text style={styles.privateTagText}>Private</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.metaText}>
                      {item.condition === 'Deadstock' ? 'New / unworn' : item.condition} · Size {item.size}
                    </Text>

                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.priceText}>${item.price}</Text>
                        <Text style={styles.askingLabel}>Asking price</Text>
                      </View>
                      <View style={styles.actionRow}>
                        <TouchableOpacity>
                          <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 14 }}>
                          <Feather name="more-vertical" size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.activityRow}>
                  {item.views > 0 && (
                    <View style={styles.activityLeft}>
                      <Ionicons name="bar-chart-outline" size={13} color="#9CA3AF" />
                      <Text style={styles.activityText}>{item.views} store views</Text>
                    </View>
                  )}
                  {item.requests > 0 && (
                    <View style={styles.requestBadge}>
                      <Ionicons name="chatbubble-ellipses" size={12} color="#22C55E" />
                      <Text style={styles.requestBadgeText}>
                        {item.requests} open request{item.requests === 1 ? '' : 's'}
                      </Text>
                      <Ionicons name="chevron-forward" size={13} color="#22C55E" />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* ── Footer note ──────────────────────────────────── */}
          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark" size={16} color="#22C55E" />
            <Text style={styles.footerNoteText}>Private listings are hidden from stores.</Text>
          </View>
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

const SummaryItem = ({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) => (
  <View style={styles.summaryItem}>
    <Text style={[styles.summaryValue, { color }]}>{value}</Text>
    <Text style={styles.summaryLabel}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#111827' },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22C55E',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addItemText: { color: '#FFF', fontWeight: '700', fontSize: 13 },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },

  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
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
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabScroll: { gap: 10, marginBottom: 16 },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  tabChipActive: { backgroundColor: '#111827' },
  tabText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  tabTextActive: { color: '#FFF' },

  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterDropdownText: { fontSize: 12, fontWeight: '600', color: '#374151' },

  listContainer: { gap: 16 },
  cardWrapper: { marginBottom: 4 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  itemImage: { width: 72, height: 72, borderRadius: 12, backgroundColor: '#F3F4F6' },
  infoSection: { flex: 1, marginLeft: 12 },
  brandText: { fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.5 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  nameText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#111827' },
  visibleTag: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  visibleTagText: { fontSize: 11, fontWeight: '600', color: '#22C55E' },
  privateTag: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  privateTagText: { fontSize: 11, fontWeight: '600', color: '#9CA3AF' },
  metaText: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  priceText: { fontSize: 18, fontWeight: '800', color: '#111827' },
  askingLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  editText: { fontSize: 13, fontWeight: '700', color: '#22C55E' },

  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  activityLeft: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  activityText: { fontSize: 12, color: '#9CA3AF' },
  requestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  requestBadgeText: { fontSize: 11, fontWeight: '700', color: '#22C55E' },

  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  footerNoteText: { fontSize: 12, color: '#166534', fontWeight: '500' },
})

export default Inventory