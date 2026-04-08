import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useMakeOffer } from '@/services/hooks/retailer/home/useMakeOffer';

const QUICK_OFFERS = ['185', '195', '200', '210', '215'];
const EXPIRY_OPTIONS = ['24 hours', '48 hours', '72 hours'];

export default function MakeOfferScreen() {
  const { 
    offerValue, setOfferValue, 
    note, setNote, 
    expiry, setExpiry, 
    marketData, diffFromStockX,
    isSending, handleSendOffer
  } = useMakeOffer();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View style={{ flex: 1, paddingBottom: 40 }}>
        
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Make an Offer</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Item Card */}
        <View style={s.itemCard}>
          <View style={s.imgPlaceholder}>
            <MaterialCommunityIcons name="shoe-sneaker" size={32} color="#D1D5DB" />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <View style={s.row}>
              <Text style={s.itemName} numberOfLines={1}>Air Jordan 4 'Black Cat'</Text>
              <View style={s.lockerBadge}>
                <Text style={s.lockerBadgeText}>From @sonny's locker</Text>
              </View>
            </View>
            <Text style={s.itemMeta}>DS • Size 10.5</Text>
            <Text style={s.itemMeta}>In locker since Jan 2024</Text>
          </View>
        </View>

        {/* Market Analysis */}
        <View style={s.marketCard}>
          <Text style={s.sectionLabel}>Market value context</Text>
          <View style={s.marketRow}>
            <Text style={s.marketLabel}>StockX avg</Text>
            <Text style={s.marketValue}>${marketData.stockX}</Text>
          </View>
          <View style={s.marketRow}>
            <Text style={s.marketLabel}>GOAT avg</Text>
            <Text style={s.marketValue}>${marketData.goat}</Text>
          </View>
          <View style={s.marketRow}>
            <Text style={s.marketLabel}>GoSNKR listing avg</Text>
            <Text style={s.marketValue}>${marketData.gosnkr}</Text>
          </View>
          <Text style={s.suggestedText}>Suggested offer range: $195–$215</Text>
        </View>

        {/* Offer Input Section */}
        <View style={s.paddingContainer}>
          <Text style={s.sectionLabel}>Your Offer</Text>
          <View style={s.inputContainer}>
            <Text style={s.dollarSign}>$</Text>
            <TextInput
              style={s.offerInput}
              value={offerValue}
              onChangeText={setOfferValue}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          {/* Quick Offer Pills */}
          <View style={s.quickOfferRow}>
            {QUICK_OFFERS.map((val) => (
              <TouchableOpacity 
                key={val} 
                style={s.quickPill} 
                onPress={() => setOfferValue(val)}
              >
                <Text style={s.quickPillText}>${val}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={s.calcText}>
            ${offerValue} = {diffFromStockX}% below StockX avg
          </Text>

          {/* Note Input */}
          <Text style={[s.sectionLabel, { marginTop: 20 }]}>Add a note to the seller? (optional)</Text>
          <TextInput
            style={s.noteInput}
            placeholder="Hi! We'd love to add your pair to our store inventory..."
            multiline
            value={note}
            onChangeText={setNote}
          />

          {/* Expiry Selection */}
          <Text style={[s.sectionLabel, { marginTop: 24 }]}>Offer expires after:</Text>
          <View style={s.expiryRow}>
            {EXPIRY_OPTIONS.map((opt) => (
              <TouchableOpacity 
                key={opt} 
                onPress={() => setExpiry(opt)}
                style={[s.expiryPill, expiry === opt && s.expiryPillActive]}
              >
                <Text style={[s.expiryText, expiry === opt && s.expiryTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[s.submitBtn, isSending && { opacity: 0.8 }]} 
            onPress={handleSendOffer}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.submitBtnText}>Send Offer of ${offerValue} →</Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', marginTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
  paddingContainer: { paddingHorizontal: 16 },
  itemCard: { 
    backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 24, 
    flexDirection: 'row', alignItems: 'center' 
  },
  imgPlaceholder: { width: 70, height: 70, backgroundColor: '#F9FAFB', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 },
  itemName: { fontSize: 16, fontWeight: '800', flex: 0.6 },
  lockerBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  lockerBadgeText: { color: '#10B981', fontSize: 10, fontWeight: '800' },
  itemMeta: { color: '#9CA3AF', fontSize: 13, marginTop: 2 },
  marketCard: { backgroundColor: '#fff', marginHorizontal: 16, padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '800', color: '#4B5563', marginBottom: 12 },
  marketRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  marketLabel: { color: '#9CA3AF', fontSize: 14 },
  marketValue: { fontWeight: '900', fontSize: 14, color: '#111' },
  suggestedText: { color: '#10B981', fontSize: 14, fontWeight: '700', marginTop: 10 },
  inputContainer: { 
    backgroundColor: '#fff', height: 80, borderRadius: 20, borderWidth: 2, 
    borderColor: '#111', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 
  },
  dollarSign: { fontSize: 32, fontWeight: '900', color: '#111', marginRight: 4 },
  offerInput: { flex: 1, fontSize: 48, fontWeight: '900', color: '#111' },
  quickOfferRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  quickPill: { flex: 1, backgroundColor: '#fff', paddingVertical: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  quickPillText: { fontSize: 14, fontWeight: '800', color: '#4B5563' },
  calcText: { textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginTop: 12, fontWeight: '600' },
  noteInput: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 16, height: 100, 
    textAlignVertical: 'top', borderWidth: 1, borderColor: '#F3F4F6', fontSize: 14 
  },
  expiryRow: { flexDirection: 'row', gap: 8, marginBottom: 30 },
  expiryPill: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  expiryPillActive: { backgroundColor: '#111' },
  expiryText: { fontSize: 14, fontWeight: '800', color: '#4B5563' },
  expiryTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: '#111', height: 64, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' }
});