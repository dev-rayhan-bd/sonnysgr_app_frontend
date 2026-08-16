// app/screens/retailer/home/more/storeSubscriptionScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'Forever free',
    features: ['Up to 20 listings', 'Basic analytics', 'Standard visibility', 'Email support'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: '/month',
    features: ['Unlimited listings', 'Advanced analytics', 'Priority visibility', 'Drop campaigns', 'Sync integrations', 'Priority support'],
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 149,
    period: '/month',
    features: ['Everything in Pro', 'Multi-branch management', 'Reseller sourcing', 'Custom promotions', 'Dedicated manager'],
    highlight: false,
  },
]

export default function StoreSubscriptionScreen() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const currentPlan = 'starter'

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Billing toggle */}
        <View style={styles.billingToggle}>
          {(['monthly', 'annual'] as const).map(cycle => (
            <TouchableOpacity
              key={cycle}
              style={[styles.billingBtn, billingCycle === cycle && styles.billingBtnActive]}
              onPress={() => setBillingCycle(cycle)}
            >
              <Text style={[styles.billingBtnText, billingCycle === cycle && styles.billingBtnTextActive]}>
                {cycle === 'monthly' ? 'Monthly' : 'Annual (Save 20%)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plans */}
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan
          const price = billingCycle === 'annual' && plan.price > 0
            ? Math.round(plan.price * 0.8) : plan.price

          return (
            <View key={plan.id} style={[styles.planCard, plan.highlight && styles.planCardHighlight]}>
              {plan.highlight && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <Text style={[styles.planName, plan.highlight && styles.planNameLight]}>{plan.name}</Text>
                <View>
                  <Text style={[styles.planPrice, plan.highlight && styles.planPriceLight]}>
                    {price === 0 ? 'Free' : `$${price}`}
                  </Text>
                  {price > 0 && (
                    <Text style={[styles.planPeriod, plan.highlight && styles.planPeriodLight]}>{plan.period}</Text>
                  )}
                </View>
              </View>

              {plan.features.map(f => (
                <View key={f} style={styles.featureRow}>
                  <Feather name="check" size={14} color={plan.highlight ? '#22c55e' : '#374151'} />
                  <Text style={[styles.featureText, plan.highlight && styles.featureTextLight]}>{f}</Text>
                </View>
              ))}

              <TouchableOpacity
                style={[
                  styles.planBtn,
                  isCurrent ? styles.planBtnCurrent : plan.highlight ? styles.planBtnHighlight : styles.planBtnDefault,
                ]}
                onPress={() => !isCurrent && router.push('/screens/retailer/pro/goProCheckoutScreen' as any)}
                disabled={isCurrent}
              >
                <Text style={[styles.planBtnText, isCurrent && styles.planBtnTextCurrent, plan.highlight && !isCurrent && styles.planBtnTextHighlight]}>
                  {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40, gap: 16 },
  billingToggle: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 3, marginBottom: 8 },
  billingBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  billingBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  billingBtnText: { fontSize: 13, fontWeight: '600', color: '#9ca3af' },
  billingBtnTextActive: { color: '#0a0a0a' },
  planCard: { borderRadius: 20, borderWidth: 1, borderColor: '#f3f4f6', padding: 20, gap: 10 },
  planCardHighlight: { backgroundColor: '#0a0a0a', borderColor: '#0a0a0a' },
  popularBadge: { alignSelf: 'flex-start', backgroundColor: '#22c55e', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 4 },
  popularText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  planName: { fontSize: 20, fontWeight: '800', color: '#0a0a0a' },
  planNameLight: { color: '#fff' },
  planPrice: { fontSize: 24, fontWeight: '800', color: '#0a0a0a', textAlign: 'right' },
  planPriceLight: { color: '#fff' },
  planPeriod: { fontSize: 12, color: '#6b7280', textAlign: 'right' },
  planPeriodLight: { color: '#9ca3af' },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 14, color: '#374151' },
  featureTextLight: { color: '#d1d5db' },
  planBtn: { marginTop: 8, paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  planBtnDefault: { borderColor: '#e5e7eb', backgroundColor: '#fff' },
  planBtnHighlight: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  planBtnCurrent: { borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
  planBtnText: { fontSize: 15, fontWeight: '700', color: '#0a0a0a' },
  planBtnTextHighlight: { color: '#fff' },
  planBtnTextCurrent: { color: '#9ca3af' },
})
