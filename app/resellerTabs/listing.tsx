import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'
import { useInventory } from '@/services/hooks/reseller/listing/useListing'

const Inventory = () => {
  const { stats, inventory, activeTab, setActiveTab, tabs, tabCounts } = useInventory()

  return (
    <BaseContainer backgroundColor="#fff">
      <View className="pt-10 pb-20 mb-20">
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Inventory</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="filter-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="pt-4 pb-20">
            <View style={styles.summaryBar}>
              <SummaryItem label="Total" value={stats.total} color="#111827" />
              <SummaryItem label="Visible" value={stats.visible} color="#22C55E" />
              <SummaryItem label="Private" value={stats.privateCount} color="#F59E0B" />
              <SummaryItem label="Requests" value={stats.liveRequests} color="#2563EB" />
            </View>

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

            <View style={styles.listContainer}>
              {inventory.map((item) => (
                <View key={item.id} style={styles.cardWrapper}>
                  <View style={styles.itemCard}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                      <View
                        style={[
                          styles.statusIndicator,
                          { backgroundColor: item.isVisible ? '#22C55E' : '#9CA3AF' },
                        ]}
                      >
                        <Ionicons
                          name={item.isPrivate ? 'lock-closed' : 'eye'}
                          size={10}
                          color="white"
                        />
                      </View>
                    </View>

                    <View style={styles.infoSection}>
                      <Text style={styles.brandText}>{item.brand}</Text>
                      <View style={styles.badgeRow}>
                        <Text style={styles.nameText} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <View
                          style={[
                            styles.productTypeBadge,
                            {
                              backgroundColor:
                                item.productType === 'Clothing' ? '#EFF6FF' : '#ECFDF5',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.productTypeText,
                              {
                                color: item.productType === 'Clothing' ? '#1D4ED8' : '#047857',
                              },
                            ]}
                          >
                            {item.productType}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.metaText}>
                        {item.condition} · Size {item.size}
                      </Text>

                      <View style={styles.priceRow}>
                        <Text style={styles.priceText}>${item.price}</Text>
                        <Text style={styles.marketPrice}>Market ~${item.marketPrice}</Text>
                      </View>
                    </View>

                    <View style={styles.actionColumn}>
                      <TouchableOpacity
                        style={[
                          styles.visibilityBtn,
                          { backgroundColor: item.isVisible ? '#F0FDF4' : '#F3F4F6' },
                        ]}
                      >
                        <Ionicons
                          name={item.isVisible ? 'eye-outline' : 'eye-off-outline'}
                          size={18}
                          color={item.isVisible ? '#22C55E' : '#9CA3AF'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.moreBtn}>
                        <Feather name="more-vertical" size={18} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {(item.views > 0 || item.requests > 0) && (
                    <View style={styles.activityRow}>
                      <Ionicons name="eye" size={12} color="#6B7280" />
                      <Text style={styles.activityText}>
                        {item.views} store views · {item.requests} request{item.requests === 1 ? '' : 's'}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
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
  headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, marginLeft: 20 },
  headerIcons: { flexDirection: 'row' },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#F9FAFB',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 16, fontWeight: 'bold' },
  summaryLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  tabScroll: { paddingHorizontal: 16, marginVertical: 20 },
  tabChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  tabChipActive: { backgroundColor: '#111827' },
  tabText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  tabTextActive: { color: '#FFF' },
  listContainer: { paddingHorizontal: 16 },
  cardWrapper: { marginBottom: 15 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  imageContainer: { position: 'relative' },
  itemImage: { width: 85, height: 85, borderRadius: 15, backgroundColor: '#F3F4F6' },
  statusIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  infoSection: { flex: 1, marginLeft: 15 },
  brandText: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold' },
  badgeRow: { marginTop: 2 },
  nameText: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  productTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  productTypeText: { fontSize: 10, fontWeight: '700' },
  metaText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  priceText: { fontSize: 16, fontWeight: '900', color: '#111827' },
  marketPrice: { fontSize: 11, color: '#9CA3AF', marginLeft: 8 },
  actionColumn: { alignItems: 'center', justifyContent: 'space-between', height: 75 },
  visibilityBtn: { padding: 8, borderRadius: 12 },
  moreBtn: { padding: 4 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 12 },
  activityText: { fontSize: 11, color: '#22C55E', fontWeight: '600', marginLeft: 6 },
})

export default Inventory
