// app/screens/order/disputeStatusScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const STEPS = [
  { id: 1, label: 'Dispute Submitted', date: 'Aug 16, 10:23 AM', done: true },
  { id: 2, label: 'Under Review', date: 'Aug 16, 11:00 AM', done: true },
  { id: 3, label: 'Store Notified', date: 'Est. 24hrs', done: false },
  { id: 4, label: 'Resolution', date: 'Est. 3-5 days', done: false },
]

export default function DisputeStatusScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dispute Status</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Status hero */}
        <View style={styles.statusHero}>
          <View style={styles.statusIcon}>
            <Feather name="shield" size={32} color="#3b82f6" />
          </View>
          <Text style={styles.statusTitle}>Dispute Under Review</Text>
          <Text style={styles.statusSubtitle}>Case #DSP-2026-001</Text>
          <Text style={styles.statusDesc}>
            We've received your dispute and our team is reviewing the case. You'll be notified of any updates.
          </Text>
        </View>

        {/* Order card */}
        <View style={styles.orderCard}>
          <View style={styles.orderImageBox} />
          <View style={styles.orderInfo}>
            <Text style={styles.orderProduct}>Air Jordan 1 Retro High</Text>
            <Text style={styles.orderStore}>Kicks City · Size 10.5</Text>
            <Text style={styles.orderReason}>Reason: Item not as described</Text>
          </View>
          <Text style={styles.orderPrice}>$220</Text>
        </View>

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Timeline</Text>
        {STEPS.map((step, idx) => (
          <View key={step.id} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, step.done && styles.timelineDotDone]}>
                {step.done && <Feather name="check" size={12} color="#fff" />}
              </View>
              {idx < STEPS.length - 1 && (
                <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
              )}
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineLabel, step.done && styles.timelineLabelDone]}>{step.label}</Text>
              <Text style={styles.timelineDate}>{step.date}</Text>
            </View>
          </View>
        ))}

        {/* Actions */}
        <TouchableOpacity style={styles.contactBtn}>
          <Feather name="message-circle" size={16} color="#374151" />
          <Text style={styles.contactBtnText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  statusHero: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  statusIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statusTitle: { fontSize: 20, fontWeight: '800', color: '#0a0a0a' },
  statusSubtitle: { fontSize: 13, color: '#6b7280' },
  statusDesc: { fontSize: 14, color: '#374151', textAlign: 'center', lineHeight: 22, marginTop: 4 },
  orderCard: { flexDirection: 'row', backgroundColor: '#f9fafb', borderRadius: 16, padding: 14, gap: 12, alignItems: 'center', marginBottom: 24 },
  orderImageBox: { width: 60, height: 60, backgroundColor: '#e5e7eb', borderRadius: 10 },
  orderInfo: { flex: 1 },
  orderProduct: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  orderStore: { fontSize: 12, color: '#6b7280' },
  orderReason: { fontSize: 12, color: '#f59e0b', fontWeight: '600', marginTop: 2 },
  orderPrice: { fontSize: 16, fontWeight: '800', color: '#0a0a0a' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', marginBottom: 16 },
  timelineRow: { flexDirection: 'row', gap: 16, marginBottom: 0 },
  timelineLeft: { alignItems: 'center', width: 28 },
  timelineDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f3f4f6', borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  timelineDotDone: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#f3f4f6', marginVertical: 4, minHeight: 32 },
  timelineLineDone: { backgroundColor: '#22c55e' },
  timelineContent: { flex: 1, paddingBottom: 24 },
  timelineLabel: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  timelineLabelDone: { color: '#0a0a0a' },
  timelineDate: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  contactBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#f3f4f6', borderRadius: 14, paddingVertical: 14, marginTop: 8 },
  contactBtnText: { fontSize: 15, fontWeight: '600', color: '#374151' },
})
