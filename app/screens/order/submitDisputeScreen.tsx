// app/screens/order/submitDisputeScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const REASONS = [
  'Item not as described',
  'Wrong item received',
  'Item not received',
  'Item damaged on arrival',
  'Counterfeit item',
  'Other',
]

export default function SubmitDisputeScreen() {
  const router = useRouter()
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [description, setDescription] = useState('')

  const canSubmit = selectedReason && description.length > 10

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Dispute</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Order summary */}
        <View style={styles.orderCard}>
          <View style={styles.orderImageBox} />
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>ORD-001</Text>
            <Text style={styles.orderProduct}>Air Jordan 1 Retro High</Text>
            <Text style={styles.orderStore}>Kicks City · Size 10.5</Text>
          </View>
          <Text style={styles.orderPrice}>$220</Text>
        </View>

        <Text style={styles.sectionTitle}>What's the issue?</Text>

        {REASONS.map(reason => (
          <TouchableOpacity
            key={reason}
            style={[styles.reasonRow, selectedReason === reason && styles.reasonRowActive]}
            onPress={() => setSelectedReason(reason)}
          >
            <View style={[styles.radio, selectedReason === reason && styles.radioActive]}>
              {selectedReason === reason && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.reasonText, selectedReason === reason && styles.reasonTextActive]}>{reason}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Describe the issue</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Please provide as much detail as possible..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={5}
          style={styles.textarea}
          textAlignVertical="top"
        />

        <View style={styles.evidenceSection}>
          <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Feather name="camera" size={24} color="#9ca3af" />
            <Text style={styles.uploadText}>Tap to add photos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
          onPress={() => canSubmit && router.push('/screens/order/disputeStatusScreen' as any)}
          disabled={!canSubmit}
        >
          <Text style={styles.submitBtnText}>Submit Dispute</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  orderCard: { flexDirection: 'row', backgroundColor: '#f9fafb', borderRadius: 16, padding: 14, gap: 12, alignItems: 'center', marginBottom: 24 },
  orderImageBox: { width: 60, height: 60, backgroundColor: '#e5e7eb', borderRadius: 10 },
  orderInfo: { flex: 1 },
  orderId: { fontSize: 11, color: '#9ca3af' },
  orderProduct: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  orderStore: { fontSize: 12, color: '#6b7280' },
  orderPrice: { fontSize: 16, fontWeight: '800', color: '#0a0a0a' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', marginBottom: 12 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  reasonRowActive: { backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 12, borderBottomColor: 'transparent', marginHorizontal: -12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#0a0a0a' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0a0a0a' },
  reasonText: { fontSize: 14, color: '#374151' },
  reasonTextActive: { fontWeight: '600', color: '#0a0a0a' },
  textarea: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 14, fontSize: 14, color: '#0a0a0a', minHeight: 120, borderWidth: 1, borderColor: '#e5e7eb' },
  evidenceSection: { marginTop: 24 },
  uploadBox: { height: 100, backgroundColor: '#f9fafb', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 8 },
  uploadText: { fontSize: 13, color: '#9ca3af' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  submitBtn: { backgroundColor: '#0a0a0a', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: '#e5e7eb' },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
