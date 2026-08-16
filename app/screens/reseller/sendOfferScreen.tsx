// app/screens/reseller/sendOfferScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const QUICK_AMOUNTS = [150, 175, 190, 200]

export default function SendOfferScreen() {
  const router = useRouter()
  const [offerAmount, setOfferAmount] = useState('190')
  const [note, setNote] = useState('')
  const [expiryHours, setExpiryHours] = useState(24)

  const marketPrice = 220

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Offer</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Listing card */}
        <View style={styles.listingCard}>
          <View style={styles.listingImage} />
          <View style={styles.listingInfo}>
            <Text style={styles.listingName}>Air Jordan 1 Retro High OG</Text>
            <Text style={styles.listingMeta}>Size 10.5 · New</Text>
            <Text style={styles.listingAsking}>Asking: $220</Text>
          </View>
        </View>

        {/* Offer input */}
        <Text style={styles.sectionTitle}>Your Offer</Text>
        <View style={styles.offerInputRow}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            value={offerAmount}
            onChangeText={setOfferAmount}
            keyboardType="numeric"
            style={styles.offerInput}
          />
        </View>

        {/* Market context */}
        <View style={styles.marketRow}>
          <Text style={styles.marketLabel}>Market Price</Text>
          <Text style={styles.marketValue}>${marketPrice}</Text>
          <View style={styles.savingBadge}>
            <Text style={styles.savingText}>
              {((1 - Number(offerAmount) / marketPrice) * 100).toFixed(0)}% below
            </Text>
          </View>
        </View>

        {/* Quick amounts */}
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map(amt => (
            <TouchableOpacity
              key={amt}
              style={[styles.quickBtn, offerAmount === String(amt) && styles.quickBtnActive]}
              onPress={() => setOfferAmount(String(amt))}
            >
              <Text style={[styles.quickBtnText, offerAmount === String(amt) && styles.quickBtnTextActive]}>${amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expiry */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Offer Expires In</Text>
        <View style={styles.expiryRow}>
          {[12, 24, 48, 72].map(h => (
            <TouchableOpacity
              key={h}
              style={[styles.expiryBtn, expiryHours === h && styles.expiryBtnActive]}
              onPress={() => setExpiryHours(h)}
            >
              <Text style={[styles.expiryBtnText, expiryHours === h && styles.expiryBtnTextActive]}>{h}h</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Add a Note (Optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="E.g. Willing to bundle if you have other sizes..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={3}
          style={styles.noteInput}
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => router.push('/screens/reseller/submittedRequestsScreen' as any)}
        >
          <Text style={styles.sendBtnText}>Send Offer · ${offerAmount}</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  listingCard: { flexDirection: 'row', backgroundColor: '#f9fafb', borderRadius: 16, padding: 14, gap: 12, marginBottom: 24 },
  listingImage: { width: 72, height: 72, backgroundColor: '#e5e7eb', borderRadius: 12 },
  listingInfo: { flex: 1, justifyContent: 'center' },
  listingName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 4 },
  listingMeta: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  listingAsking: { fontSize: 13, fontWeight: '700', color: '#0a0a0a' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', marginBottom: 12 },
  offerInputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 12 },
  dollarSign: { fontSize: 32, fontWeight: '700', color: '#0a0a0a', marginRight: 4 },
  offerInput: { fontSize: 40, fontWeight: '800', color: '#0a0a0a', flex: 1 },
  marketRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  marketLabel: { fontSize: 13, color: '#6b7280' },
  marketValue: { fontSize: 13, fontWeight: '600', color: '#0a0a0a' },
  savingBadge: { backgroundColor: '#fef2f2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  savingText: { fontSize: 12, fontWeight: '600', color: '#ef4444' },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center' },
  quickBtnActive: { backgroundColor: '#0a0a0a' },
  quickBtnText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  quickBtnTextActive: { color: '#fff' },
  expiryRow: { flexDirection: 'row', gap: 10 },
  expiryBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center' },
  expiryBtnActive: { backgroundColor: '#0a0a0a' },
  expiryBtnText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  expiryBtnTextActive: { color: '#fff' },
  noteInput: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 14, fontSize: 14, color: '#0a0a0a', minHeight: 90, borderWidth: 1, borderColor: '#e5e7eb' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  sendBtn: { backgroundColor: '#0a0a0a', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  sendBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
