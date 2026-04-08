import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useRadiusPromotion } from '@/services/hooks/retailer/home/useRadiusPromotion';

export default function RadiusPromotionScreen() {
  const { 
    radius, setRadius, message, setMessage, 
    subMessage, setSubMessage, customerCount, handleSend 
  } = useRadiusPromotion();

  return (
    <BaseContainer backgroundColor="#fff">
      <View className="pt-10 flex-1">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
          <Text style={s.headerTitle}>Radius Promotion</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Info Banner */}
          <View style={s.infoBanner}>
            <MaterialCommunityIcons name="bullhorn-variant-outline" size={20} color="#10B981" />
            <Text style={s.infoText}>
              Target nearby customers who haven't followed you yet. Great for foot traffic.
            </Text>
          </View>

          {/* Map Visualization Placeholder */}
          <View style={s.mapContainer}>
             <View style={s.radiusCircle}>
                <View style={s.innerCircle}>
                   <MaterialCommunityIcons name="storefront" size={24} color="#4B5563" />
                </View>
             </View>
             <View style={s.milesBadge}><Text style={s.milesBadgeText}>{radius}</Text></View>
          </View>

          <Text style={s.sectionLabel}>Target Radius</Text>
          <View style={s.radiusRow}>
            {['5 miles', '10 miles', '25 miles'].map((r) => (
              <TouchableOpacity 
                key={r} 
                onPress={() => setRadius(r)}
                style={[s.radiusTab, radius === r && s.radiusTabActive]}
              >
                <Text style={[s.radiusTabText, radius === r && s.radiusTabTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Range Info */}
          <View style={s.rangeInfo}>
            <Feather name="users" size={14} color="#10B981" />
            <Text style={s.rangeText}>~{customerCount} customers in range</Text>
          </View>

          <Text style={s.sectionLabel}>PROMOTION MESSAGE</Text>
          <TextInput 
            style={s.input}
            placeholder="e.g. Come visit us! 20% off today only"
            value={message}
            onChangeText={setMessage}
          />
          <TextInput 
            style={[s.input, { marginTop: 12 }]}
            value={subMessage}
            onChangeText={setSubMessage}
          />

          {/* Beta Banner */}
          <View style={s.betaBanner}>
             <Text style={s.betaTitle}>Free during beta · Limited to 3/month</Text>
             <Text style={s.betaSub}>Your balance: 2 remaining this month</Text>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={s.footer}>
          <TouchableOpacity style={s.sendBtn} onPress={handleSend}>
            <Text style={s.sendBtnText}>Send to ~{customerCount} people</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  infoBanner: { flexDirection: 'row', backgroundColor: '#ECFDF5', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#D1FAE5', marginBottom: 20 },
  infoText: { flex: 1, marginLeft: 10, color: '#065F46', fontSize: 13, lineHeight: 18 },
  mapContainer: { height: 200, backgroundColor: '#E5E7EB', borderRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: 24 },
  radiusCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, justifyContent: 'center', alignItems: 'center' },
  milesBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  milesBadgeText: { fontSize: 12, fontWeight: '700', color: '#065F46' },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: '#6B7280', marginTop: 10, marginBottom: 12, letterSpacing: 0.5 },
  radiusRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  radiusTab: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  radiusTabActive: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  radiusTabText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  radiusTabTextActive: { color: '#10B981', fontWeight: '700' },
  rangeInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 24 },
  rangeText: { marginLeft: 6, color: '#10B981', fontSize: 13, fontWeight: '700' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 14 },
  betaBanner: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, marginTop: 24, borderWidth: 1, borderColor: '#D1FAE5' },
  betaTitle: { color: '#065F46', fontSize: 13, fontWeight: '700' },
  betaSub: { color: '#065F46', fontSize: 11, opacity: 0.7, marginTop: 2 },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  sendBtn: { backgroundColor: '#22C55E', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});