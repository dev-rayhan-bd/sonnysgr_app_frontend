import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useOfferSuccess } from '@/services/hooks/retailer/home/useOfferSuccess';

export default function OfferSuccessScreen() {
  const { timeLeft, handleWithdraw, offerDetails } = useOfferSuccess();

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={s.container} className='pt-10'>
        
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Make an Offer</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Success Icon & Message */}
        <View style={s.centerContent}>
          <View style={s.successCircle}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
          <Text style={s.mainTitle}>Offer Sent!</Text>
          <Text style={s.subTitle}>
            You offered {offerDetails.amount} to {offerDetails.seller} for their {offerDetails.item}.
          </Text>
        </View>

        {/* Summary Card */}
        <View style={s.summaryCard}>
          <View style={s.itemRow}>
            <View style={s.imgPlaceholder}>
              <MaterialCommunityIcons name="shoe-sneaker" size={24} color="#D1D5DB" />
            </View>
            <View style={s.itemTextContent}>
              <Text style={s.itemName}>Air Jordan 4 'Black Cat'</Text>
              <Text style={s.offerLabel}>Your offer: <Text style={s.offerAmount}>{offerDetails.amount}</Text></Text>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.statusRow}>
            <Text style={s.statusLabel}>Expires in:</Text>
            <Text style={s.timerText}>{timeLeft}</Text>
          </View>
          
          <View style={s.statusRow}>
            <Text style={s.waitingText}>Waiting for {offerDetails.seller} to respond</Text>
            <MaterialCommunityIcons name="dots-horizontal" size={18} color="#9CA3AF" />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={s.footer}>
          <TouchableOpacity 
            style={s.primaryBtn}
            onPress={() => router.push('/')}
          >
            <Text style={s.primaryBtnText}>View in Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={s.secondaryBtn}
            onPress={handleWithdraw}
          >
            <Text style={s.secondaryBtnText}>Withdraw Offer</Text>
          </TouchableOpacity>
        </View>

      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#111' },
  centerContent: { alignItems: 'center', marginTop: 40, paddingHorizontal: 40 },
  successCircle: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#22C55E', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 24 
  },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#111', marginBottom: 12 },
  subTitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
  summaryCard: { 
    backgroundColor: '#fff', margin: 24, padding: 20, borderRadius: 24,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  imgPlaceholder: { width: 50, height: 50, backgroundColor: '#F9FAFB', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  itemTextContent: { marginLeft: 16 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#4B5563' },
  offerLabel: { fontSize: 16, color: '#111', fontWeight: '600', marginTop: 2 },
  offerAmount: { fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 16 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  timerText: { fontSize: 14, fontWeight: '900', color: '#111' },
  waitingText: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  footer: { paddingHorizontal: 24, marginTop: 'auto' },
  primaryBtn: { 
    backgroundColor: '#111', height: 60, borderRadius: 18, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  secondaryBtn: { 
    backgroundColor: '#F3F4F6', height: 60, borderRadius: 18, 
    justifyContent: 'center', alignItems: 'center' 
  },
  secondaryBtnText: { color: '#EF4444', fontSize: 15, fontWeight: '700' }
});