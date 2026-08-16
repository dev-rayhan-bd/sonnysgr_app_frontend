// app/screens/reseller/requestDetailsScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const TIMELINE = [
  { label: 'Offer Sent', date: 'Aug 16, 9:12 AM', done: true },
  { label: 'Seller Viewed', date: 'Aug 16, 10:45 AM', done: true },
  { label: 'Response Pending', date: 'Waiting...', done: false },
]

export default function RequestDetailsScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offer Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View style={styles.statusBanner}>
          <Feather name="clock" size={18} color="#f59e0b" />
          <Text style={styles.statusText}>Awaiting Response</Text>
          <Text style={styles.expiresText}>Expires in 14h 30m</Text>
        </View>

        {/* Product */}
        <View style={styles.productCard}>
          <View style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Air Jordan 1 Retro High OG</Text>
            <Text style={styles.productMeta}>Size 10.5 · New</Text>
          </View>
        </View>

        {/* Offer breakdown */}
        <Text style={styles.sectionTitle}>Offer Summary</Text>
        <View style={styles.breakdown}>
          {[
            ['My Offer', '$190'],
            ['Asking Price', '$220'],
            ['Market Value', '$230'],
            ['Potential Saving', '$30'],
          ].map(([label, value]) => (
            <View key={label} style={styles.bRow}>
              <Text style={styles.bLabel}>{label}</Text>
              <Text style={styles.bValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Seller */}
        <Text style={styles.sectionTitle}>Seller</Text>
        <TouchableOpacity style={styles.sellerCard} onPress={() => router.push('/screens/reseller/resellerProfileScreen' as any)}>
          <View style={styles.sellerAvatar}><Text style={styles.sellerAvatarText}>MK</Text></View>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>marcus_kicks</Text>
            <Text style={styles.sellerMeta}>4.9★ · 1.2K sales</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#9ca3af" />
        </TouchableOpacity>

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Timeline</Text>
        {TIMELINE.map((step, i) => (
          <View key={step.label} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={[styles.dot, step.done && styles.dotDone]}>
                {step.done && <Feather name="check" size={10} color="#fff" />}
              </View>
              {i < TIMELINE.length - 1 && <View style={[styles.line, step.done && styles.lineDone]} />}
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>{step.label}</Text>
              <Text style={styles.stepDate}>{step.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.withdrawBtn} onPress={() => router.back()}>
          <Text style={styles.withdrawText}>Withdraw Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBtn} onPress={() => router.push('/screens/messages/chatScreen' as any)}>
          <Feather name="message-circle" size={16} color="#fff" />
          <Text style={styles.messageBtnText}>Message Seller</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  statusBanner: { backgroundColor: '#fffbeb', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  statusText: { fontSize: 15, fontWeight: '700', color: '#f59e0b', flex: 1 },
  expiresText: { fontSize: 12, color: '#f59e0b' },
  productCard: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', padding: 14, gap: 12, marginBottom: 24 },
  productImage: { width: 72, height: 72, backgroundColor: '#f9fafb', borderRadius: 12 },
  productInfo: { flex: 1, justifyContent: 'center' },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 4 },
  productMeta: { fontSize: 12, color: '#6b7280' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', marginBottom: 12 },
  breakdown: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, marginBottom: 24 },
  bRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  bLabel: { fontSize: 14, color: '#6b7280' },
  bValue: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  sellerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 16, padding: 14, gap: 12, marginBottom: 24 },
  sellerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  sellerAvatarText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  sellerInfo: { flex: 1 },
  sellerName: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  sellerMeta: { fontSize: 12, color: '#6b7280' },
  timelineRow: { flexDirection: 'row', gap: 14 },
  timelineLeft: { alignItems: 'center', width: 24 },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#f3f4f6', borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  line: { width: 2, flex: 1, backgroundColor: '#f3f4f6', marginVertical: 4, minHeight: 28 },
  lineDone: { backgroundColor: '#22c55e' },
  timelineContent: { flex: 1, paddingBottom: 20 },
  stepLabel: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  stepLabelDone: { color: '#0a0a0a' },
  stepDate: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 12, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  withdrawBtn: { flex: 1, paddingVertical: 16, borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' },
  withdrawText: { fontSize: 15, fontWeight: '700', color: '#374151' },
  messageBtn: { flex: 1, flexDirection: 'row', gap: 6, paddingVertical: 16, borderRadius: 14, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  messageBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
})
