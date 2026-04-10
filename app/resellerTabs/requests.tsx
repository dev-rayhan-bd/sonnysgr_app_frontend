import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'
import { useRequests } from '@/services/hooks/reseller/requests/useRequests'

const Requests = () => {
  const { requests, activeTab, setActiveTab, summary, tabs, tabCounts } = useRequests()

  return (
    <BaseContainer backgroundColor="#fff">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-10 pt-10 pb-20 mb-20">
          <Text style={styles.screenTitle}>Store Requests</Text>

          <View style={styles.summaryAlert}>
            <View style={styles.alertIconRow}>
              <Ionicons name="notifications-outline" size={16} color="#B45309" />
              <Text style={styles.alertText}>
                <Text style={{ fontWeight: 'bold' }}>{summary.total} requests</Text> ·{' '}
                {summary.newToday} new today ·
                <Text style={{ color: '#B45309', fontWeight: 'bold' }}>
                  {' '}
                  {summary.expiringSoon} expiring soon
                </Text>
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab} ({tabCounts[tab]})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.listContainer}>
            {requests.map((item) => (
              <View key={item.id} style={[styles.cardContainer, item.isExpiring && styles.expiringBorder]}>
                {item.isExpiring && item.expiryText ? (
                  <View style={styles.expiryHeader}>
                    <Ionicons name="warning-outline" size={14} color="#EF4444" />
                    <Text style={styles.expiryText}>{item.expiryText}</Text>
                  </View>
                ) : null}

                <View style={styles.cardContent}>
                  <View style={styles.storeRow}>
                    <View style={styles.storeAvatar} />
                    <View style={{ flex: 1 }}>
                      <View style={styles.nameBadgeRow}>
                        <Text style={styles.storeName}>{item.storeName}</Text>
                        {item.isNew ? (
                          <View style={styles.newTag}>
                            <Text style={styles.newTagText}>NEW</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.storeSubText}>
                        {item.rating} star store · {item.location} · {item.distance}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.itemRow}>
                    <View style={styles.itemImagePlaceholder} />
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.productTypeBadge,
                          {
                            backgroundColor:
                              item.productType === 'Clothing' ? '#EFF6FF' : '#F0FDF4',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.productTypeText,
                            {
                              color: item.productType === 'Clothing' ? '#1D4ED8' : '#22C55E',
                            },
                          ]}
                        >
                          {item.productType}
                        </Text>
                      </View>
                      <Text style={styles.itemName}>{item.itemName}</Text>
                      <Text style={styles.itemMeta}>
                        {item.condition} · Size {item.size}
                      </Text>
                      <Text style={styles.itemPrice}>${item.offerPrice}</Text>
                    </View>
                  </View>

                  {item.message ? <Text style={styles.messageText}>{item.message}</Text> : null}

                  <View
                    style={[
                      styles.typeTag,
                      { backgroundColor: item.tag === 'Price Check' ? '#FFFBEB' : '#F0FDF4' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeTagText,
                        { color: item.tag === 'Price Check' ? '#D97706' : '#22C55E' },
                      ]}
                    >
                      {item.tag}
                    </Text>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.btn, styles.acceptBtn]}>
                      <Text style={styles.acceptBtnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.counterBtn]}>
                      <Text style={styles.counterBtnText}>Counter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.declineBtn]}>
                      <Text style={styles.declineBtnText}>Decline</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.footerText}>
                    Requested {item.time} via {item.source}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  screenTitle: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 20 },
  summaryAlert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  alertIconRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  alertText: { fontSize: 12, color: '#92400E', marginLeft: 8 },
  markReadText: { fontSize: 11, color: '#6B7280', textDecorationLine: 'underline' },
  tabScroll: { paddingHorizontal: 16, marginVertical: 20 },
  tabChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 10 },
  tabChipActive: { backgroundColor: '#000' },
  tabText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  tabTextActive: { color: '#FFF' },
  listContainer: { paddingHorizontal: 16 },
  cardContainer: { backgroundColor: '#FFF', borderRadius: 20, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#F3F4F6' },
  expiringBorder: { borderColor: '#FECACA', borderWidth: 2 },
  expiryHeader: { flexDirection: 'row', backgroundColor: '#FEF2F2', padding: 10, alignItems: 'center' },
  expiryText: { color: '#EF4444', fontSize: 11, fontWeight: '600', marginLeft: 6 },
  cardContent: { padding: 16 },
  storeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  storeAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#111827' },
  nameBadgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  storeName: { fontWeight: 'bold', fontSize: 15 },
  storeSubText: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  newTag: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  newTagText: { color: '#D97706', fontSize: 10, fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', marginBottom: 15 },
  itemImagePlaceholder: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#F3F4F6', marginRight: 12 },
  productTypeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, marginBottom: 8 },
  productTypeText: { fontSize: 10, fontWeight: '700' },
  itemName: { fontWeight: 'bold', fontSize: 14 },
  itemMeta: { fontSize: 12, color: '#6B7280', marginVertical: 2 },
  itemPrice: { fontSize: 16, fontWeight: '900' },
  messageText: { fontSize: 13, color: '#4B5563', fontStyle: 'italic', marginBottom: 12, lineHeight: 18 },
  typeTag: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 15 },
  typeTagText: { fontSize: 11, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  acceptBtn: { backgroundColor: '#22C55E', marginRight: 8 },
  acceptBtnText: { color: '#FFF', fontWeight: 'bold' },
  counterBtn: { backgroundColor: '#111827', marginRight: 8 },
  counterBtnText: { color: '#FFF', fontWeight: 'bold' },
  declineBtn: { backgroundColor: '#F3F4F6' },
  declineBtnText: { color: '#6B7280', fontWeight: 'bold' },
  footerText: { textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 15 },
})

export default Requests
