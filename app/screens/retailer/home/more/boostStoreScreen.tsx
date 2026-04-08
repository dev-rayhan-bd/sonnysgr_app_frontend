import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useBoostStore } from '@/services/hooks/retailer/home/useBoostStore';

export default function BoostStoreScreen() {
  const { currentPlan, handleUpgrade, handleActivateBoost } = useBoostStore();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View className="pt-10 flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
          <Text style={s.headerTitle}>Boost Your Store</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Current Plan Mini-Banner */}
        <View style={s.miniBanner}>
          <View style={s.miniIcon}><MaterialCommunityIcons name="package-variant" size={20} color="#854D0E" /></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.miniTitle}>Free Plan</Text>
            <Text style={s.miniSub}>Basic visibility · 3 radius promos/month</Text>
          </View>
          <TouchableOpacity><Text style={s.upgradeLink}>Upgrade →</Text></TouchableOpacity>
        </View>

        {/* Subscription Tiers */}
        <View style={s.tierSection}>
          {/* Free Tier */}
          <View style={s.planCard}>
             <Text style={s.planLabel}>FREE</Text>
             <Text style={s.price}>$0 <Text style={s.period}>/month</Text></Text>
             <View style={s.featureList}>
                {['Listed in GoSNKR search', 'Customers can buy & pickup', '3 radius promotions/month', 'Basic analytics'].map((f, i) => (
                  <View key={i} style={s.feature}><Feather name="check" size={14} color="#10B981" /><Text style={s.featureText}>{f}</Text></View>
                ))}
             </View>
             <Text style={s.currentPlanLabel}>Current Plan</Text>
          </View>

          {/* Starter Tier */}
          <View style={[s.planCard, s.starterCard]}>
             <View style={s.popularBadge}><Text style={s.popularText}>POPULAR</Text></View>
             <Text style={[s.planLabel, { color: '#3B82F6' }]}>STARTER</Text>
             <Text style={s.price}>$29 <Text style={s.period}>/month</Text></Text>
             <View style={s.featureList}>
                {['Everything in Free +', 'Featured in nearby search results', '10 radius promotions/month', 'Promoted product badges', 'Advanced analytics', 'Priority customer support'].map((f, i) => (
                  <View key={i} style={s.feature}><Feather name="check" size={14} color="#3B82F6" /><Text style={s.featureText}>{f}</Text></View>
                ))}
             </View>
             <TouchableOpacity style={s.starterBtn} onPress={() => handleUpgrade('Starter')}>
                <Text style={s.starterBtnText}>Start Free Trial →</Text>
             </TouchableOpacity>
          </View>

          {/* Pro Tier */}
          <View style={[s.planCard, s.proCard]}>
             <Text style={[s.planLabel, { color: '#10B981' }]}>PRO</Text>
             <Text style={[s.price, { color: '#fff' }]}>$79 <Text style={s.period}>/month</Text></Text>
             <View style={s.featureList}>
                {['Everything in Starter +', 'Sponsored notifications', 'Top-of-search placement', 'Unlimited radius promos', 'Local demand analytics (early access)', 'Dedicated account manager'].map((f, i) => (
                  <View key={i} style={s.feature}><Feather name="check" size={14} color="#10B981" /><Text style={[s.featureText, { color: '#9CA3AF' }]}>{f}</Text></View>
                ))}
             </View>
             <TouchableOpacity style={s.proBtn} onPress={() => handleUpgrade('Pro')}>
                <Text style={s.proBtnText}>Go Pro →</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* One-time Boosts */}
        <Text style={s.sectionHeader}>Or boost once, no subscription</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}>
          <View style={s.boostCard}>
             <MaterialCommunityIcons name="pin" size={24} color="#EF4444" />
             <Text style={s.boostTitle}>Feature My Store</Text>
             <Text style={s.boostPrice}>$9.99</Text>
             <Text style={s.boostSub}>Top results for 7 days</Text>
             <TouchableOpacity style={s.activateBtn} onPress={() => handleActivateBoost('Store Feature')}>
                <Text style={s.activateText}>Activate →</Text>
             </TouchableOpacity>
          </View>

          <View style={s.boostCard}>
             <MaterialCommunityIcons name="bullhorn" size={24} color="#F59E0B" />
             <Text style={s.boostTitle}>Sponsored Notification</Text>
             <Text style={s.boostPrice}>$4.99</Text>
             <Text style={s.boostSub}>Send to 5,000 nearby</Text>
             <TouchableOpacity style={s.activateBtn} onPress={() => handleActivateBoost('Sponsored Notification')}>
                <Text style={s.activateText}>Activate →</Text>
             </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  miniBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#F3F4F6' },
  miniIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEFCE8', justifyContent: 'center', alignItems: 'center' },
  miniTitle: { fontSize: 14, fontWeight: '800' },
  miniSub: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  upgradeLink: { fontSize: 12, fontWeight: '700', color: '#10B981' },
  tierSection: { padding: 16, gap: 20 },
  planCard: { backgroundColor: '#fff', padding: 24, borderRadius: 32, borderWidth: 1, borderColor: '#F3F4F6' },
  starterCard: { borderColor: '#3B82F6', borderWidth: 2 },
  proCard: { backgroundColor: '#111', borderColor: '#111' },
  popularBadge: { position: 'absolute', top: -12, right: 20, backgroundColor: '#3B82F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  popularText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  planLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  price: { fontSize: 32, fontWeight: '900' },
  period: { fontSize: 14, color: '#9CA3AF', fontWeight: '600' },
  featureList: { marginVertical: 24, gap: 12 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureText: { fontSize: 13, color: '#4B5563', fontWeight: '600' },
  currentPlanLabel: { textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontWeight: '700', marginTop: 8 },
  starterBtn: { backgroundColor: '#3B82F6', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  starterBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  proBtn: { backgroundColor: '#10B981', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  proBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  sectionHeader: { fontSize: 13, fontWeight: '800', color: '#6B7280', marginLeft: 16, marginBottom: 16, marginTop: 10 },
  boostCard: { backgroundColor: '#fff', width: 180, padding: 20, borderRadius: 24, marginRight: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  boostTitle: { fontSize: 13, fontWeight: '800', marginTop: 12 },
  boostPrice: { fontSize: 18, fontWeight: '900', marginVertical: 4 },
  boostSub: { fontSize: 11, color: '#9CA3AF', marginBottom: 16 },
  activateBtn: { backgroundColor: '#F3F4F6', height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  activateText: { fontSize: 12, fontWeight: '700', color: '#111' }
});