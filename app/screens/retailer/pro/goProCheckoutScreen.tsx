// app/screens/retailer/pro/goProCheckoutScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const PRO_FEATURES = [
  'Unlimited listings',
  'Advanced analytics & demand insights',
  'Priority placement in search',
  'Drop campaign manager',
  'Sync integrations (Shopify, Square)',
  'Reseller sourcing access',
  'Priority customer support',
]

export default function GoProCheckoutScreen() {
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const [selectedCard, setSelectedCard] = useState('visa')

  const monthlyPrice = 49
  const annualPrice = Math.round(monthlyPrice * 0.8)
  const displayPrice = billing === 'annual' ? annualPrice : monthlyPrice

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Go Pro</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Plan hero */}
        <View style={styles.planHero}>
          <View style={styles.proCrown}>
            <Feather name="award" size={24} color="#f59e0b" />
          </View>
          <Text style={styles.planTitle}>GOSNKR Pro</Text>
          <Text style={styles.planSubtitle}>Everything you need to grow your store</Text>
        </View>

        {/* Billing toggle */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.billingBtn, billing === 'monthly' && styles.billingBtnActive]}
            onPress={() => setBilling('monthly')}
          >
            <Text style={[styles.billingBtnText, billing === 'monthly' && styles.billingBtnTextActive]}>Monthly</Text>
            <Text style={[styles.billingPrice, billing === 'monthly' && styles.billingPriceActive]}>${monthlyPrice}/mo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingBtn, billing === 'annual' && styles.billingBtnActive]}
            onPress={() => setBilling('annual')}
          >
            <View style={styles.saveBadge}><Text style={styles.saveBadgeText}>Save 20%</Text></View>
            <Text style={[styles.billingBtnText, billing === 'annual' && styles.billingBtnTextActive]}>Annual</Text>
            <Text style={[styles.billingPrice, billing === 'annual' && styles.billingPriceActive]}>${annualPrice}/mo</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>What's included</Text>
        <View style={styles.featureList}>
          {PRO_FEATURES.map(f => (
            <View key={f} style={styles.featureRow}>
              <View style={styles.checkIcon}>
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Payment method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {[
          { id: 'visa', label: 'Visa ending in 4242', icon: 'credit-card' },
          { id: 'new', label: 'Add new card', icon: 'plus-circle' },
        ].map(card => (
          <TouchableOpacity
            key={card.id}
            style={[styles.cardRow, selectedCard === card.id && styles.cardRowActive]}
            onPress={() => setSelectedCard(card.id)}
          >
            <View style={[styles.cardRadio, selectedCard === card.id && styles.cardRadioActive]}>
              {selectedCard === card.id && <View style={styles.cardRadioDot} />}
            </View>
            <Feather name={card.icon as any} size={18} color="#374151" />
            <Text style={styles.cardLabel}>{card.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Order summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GOSNKR Pro ({billing})</Text>
            <Text style={styles.summaryValue}>${displayPrice}/mo</Text>
          </View>
          {billing === 'annual' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Billed annually</Text>
              <Text style={styles.summaryValue}>${displayPrice * 12}/yr</Text>
            </View>
          )}
          <View style={[styles.summaryRow, { paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' }]}>
            <Text style={styles.totalLabel}>14-day free trial</Text>
            <Text style={styles.totalValue}>$0 today</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          You won't be charged until your 14-day trial ends. Cancel anytime before then.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.push('/screens/retailer/pro/successConfirmationScreen' as any)}
        >
          <Text style={styles.startBtnText}>Start Free Trial</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  planHero: { alignItems: 'center', paddingVertical: 20, gap: 8 },
  proCrown: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fffbeb', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  planTitle: { fontSize: 28, fontWeight: '900', color: '#0a0a0a', letterSpacing: 1 },
  planSubtitle: { fontSize: 15, color: '#6b7280' },
  billingToggle: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  billingBtn: { flex: 1, borderRadius: 16, borderWidth: 1.5, borderColor: '#e5e7eb', padding: 14, alignItems: 'center', gap: 4 },
  billingBtnActive: { borderColor: '#0a0a0a', backgroundColor: '#f9fafb' },
  billingBtnText: { fontSize: 14, fontWeight: '700', color: '#9ca3af' },
  billingBtnTextActive: { color: '#0a0a0a' },
  billingPrice: { fontSize: 13, color: '#9ca3af' },
  billingPriceActive: { color: '#0a0a0a', fontWeight: '600' },
  saveBadge: { backgroundColor: '#22c55e', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginBottom: 4 },
  saveBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 4 },
  featureList: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, gap: 10, marginBottom: 24 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  featureText: { fontSize: 14, color: '#374151', flex: 1 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  cardRowActive: { backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 10, marginHorizontal: -10 },
  cardRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  cardRadioActive: { borderColor: '#0a0a0a' },
  cardRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0a0a0a' },
  cardLabel: { fontSize: 14, fontWeight: '500', color: '#374151' },
  summary: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, gap: 10, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 14, color: '#6b7280' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#22c55e' },
  disclaimer: { fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 18 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  startBtn: { backgroundColor: '#0a0a0a', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  startBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
