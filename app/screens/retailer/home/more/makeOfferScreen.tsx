import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useMakeOffer } from '@/services/hooks/retailer/home/useMakeOffer';

export default function MakeOfferScreen() {
  const {
    item,
    marketContext,
    quickOffers,
    offerValue,
    setOfferValue,
    note,
    setNote,
    expiryOptions,
    expiry,
    setExpiry,
    costBreakdown,
    isSending,
    handleReviewOffer,
  } = useMakeOffer();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View style={{ flex: 1, paddingBottom: 40 }}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Make an Offer</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Item Card */}
        <View style={s.itemCard}>
          <View style={s.imgPlaceholder}>
            <MaterialCommunityIcons name="shoe-sneaker" size={32} color="#D1D5DB" />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={s.itemMeta}>{item.subtitle}</Text>

            <View style={s.sellerRow}>
              <View style={s.sellerAvatar}>
                <Text style={s.sellerAvatarText}>{item.seller.initials}</Text>
              </View>
              <Text style={s.sellerName}>{item.seller.name}</Text>
              {item.seller.verified && <Feather name="check-circle" size={13} color="#10B981" />}
            </View>
            <Text style={s.sellerMeta}>
              {item.seller.rating} ★ · {item.seller.completedSales} completed sales
            </Text>
          </View>
        </View>

        <View style={s.verifiedRow}>
          <Feather name="shield" size={13} color="#10B981" />
          <Text style={s.verifiedText}>{item.verifiedNote}</Text>
          <View style={{ flex: 1 }} />
          <Feather name="truck" size={13} color="#9CA3AF" />
          <Text style={s.shipText}>{item.shipFromTo}</Text>
          <Feather name="chevron-right" size={14} color="#9CA3AF" />
        </View>

        {/* Market Context */}
        <View style={s.marketCard}>
          <View style={s.marketHeaderRow}>
            <Text style={s.sectionLabel}>Market Context · Size {marketContext.sizeLabel}</Text>
            <View style={s.updatedRow}>
              <Text style={s.updatedText}>Updated {marketContext.updatedAgo}</Text>
              <Feather name="info" size={12} color="#9CA3AF" />
            </View>
          </View>

          <View style={s.marketRow}>
            <Text style={s.marketLabel}>Recent market sale</Text>
            <Text style={s.marketValue}>${marketContext.recentMarketSale}</Text>
          </View>
          <View style={s.marketRow}>
            <Text style={s.marketLabel}>30-day average</Text>
            <Text style={s.marketValue}>${marketContext.thirtyDayAverage}</Text>
          </View>
          <View style={s.marketRow}>
            <Text style={s.marketLabel}>GoSNKR asking average</Text>
            <Text style={s.marketValue}>${marketContext.goSnkrAskingAverage}</Text>
          </View>

          <View style={s.suggestedBanner}>
            <Feather name="bar-chart-2" size={14} color="#059669" />
            <Text style={s.suggestedText}>
              Suggested offer range: ${marketContext.suggestedRangeLow}–${marketContext.suggestedRangeHigh}
            </Text>
          </View>
        </View>

        {/* Offer Input Section */}
        <View style={s.paddingContainer}>
          <Text style={s.offerSectionLabel}>Your offer</Text>
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
            {quickOffers.map((val) => (
              <TouchableOpacity
                key={val}
                style={[s.quickPill, offerValue === val && s.quickPillActive]}
                onPress={() => setOfferValue(val)}
              >
                <Text style={[s.quickPillText, offerValue === val && s.quickPillTextActive]}>${val}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Your Numbers */}
          <View style={s.numbersCard}>
            <View style={s.numbersHeaderRow}>
              <Feather name="dollar-sign" size={16} color="#059669" />
              <Text style={s.numbersTitle}>Your Numbers</Text>
            </View>
            <Text style={s.numbersSubtitle}>See your true cost and potential profit.</Text>

            <View style={s.numberRow}>
              <Text style={s.numberLabel}>Offer</Text>
              <Text style={s.numberValue}>${costBreakdown.offer}</Text>
            </View>
            <View style={s.numberRow}>
              <View style={s.numberLabelRow}>
                <Text style={s.numberLabel}>Buyer protection fee</Text>
                <Feather name="info" size={11} color="#9CA3AF" />
              </View>
              <Text style={s.numberValue}>${costBreakdown.buyerProtectionFee}</Text>
            </View>
            <View style={s.numberRow}>
              <Text style={s.numberLabel}>Shipping (to you)</Text>
              <Text style={s.numberValue}>${costBreakdown.shippingToYou}</Text>
            </View>

            <View style={s.divider} />

            <View style={s.numberRow}>
              <Text style={s.numberLabelStrong}>Total landed cost</Text>
              <Text style={s.numberValueStrong}>${costBreakdown.totalLandedCost}</Text>
            </View>
            <View style={s.numberRow}>
              <View style={s.numberLabelRow}>
                <Text style={s.numberLabel}>Expected store price</Text>
                <Feather name="info" size={11} color="#9CA3AF" />
              </View>
              <Text style={s.numberValue}>${costBreakdown.expectedStorePrice}</Text>
            </View>
            <View style={s.numberRow}>
              <Text style={s.numberLabel}>Projected profit</Text>
              <Text style={s.numberValue}>${costBreakdown.projectedProfit}</Text>
            </View>
            <View style={s.numberRow}>
              <View style={s.numberLabelRow}>
                <Text style={s.numberLabel}>Margin</Text>
                <Feather name="info" size={11} color="#9CA3AF" />
              </View>
              <Text style={s.marginValue}>{costBreakdown.marginPct.toFixed(1)}%</Text>
            </View>
          </View>

          {/* Note Input */}
          <Text style={[s.offerSectionLabel, { marginTop: 22 }]}>Note to seller (optional)</Text>
          <TextInput
            style={s.noteInput}
            placeholder="e.g. Looking to add this to our store. Let me know if you can do $205. Thanks!"
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
            value={note}
            onChangeText={setNote}
          />
          <Text style={s.noteCounter}>{note.length}/500</Text>

          {/* Expiry Selection */}
          <Text style={[s.offerSectionLabel, { marginTop: 12 }]}>Offer expires after</Text>
          <View style={s.expiryRow}>
            {expiryOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => setExpiry(opt)}
                style={[s.expiryPill, expiry === opt && s.expiryPillActive]}
              >
                <Text style={[s.expiryText, expiry === opt && s.expiryTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notice */}
          <View style={s.noticeRow}>
            <Feather name="info" size={13} color="#9CA3AF" />
            <Text style={s.noticeText}>
              You'll only be charged if the seller accepts. Accepted offers are binding.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[s.submitBtn, isSending && { opacity: 0.8 }]}
            onPress={handleReviewOffer}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.submitBtnText}>
                Review Offer · ${costBreakdown.totalLandedCost} Total →
              </Text>
            )}
          </TouchableOpacity>

          <View style={s.protectedFooter}>
            <Feather name="shield" size={12} color="#9CA3AF" />
            <Text style={s.protectedFooterText}>Protected payment through GoSNKR</Text>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' ,paddingTop:40},
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#111827' },
  paddingContainer: { paddingHorizontal: 16 },

  itemCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imgPlaceholder: {
    width: 68,
    height: 68,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: { fontSize: 15, fontWeight: '800', color: '#111827' },
  itemMeta: { color: '#6B7280', fontSize: 12, marginTop: 2, fontWeight: '600' },
  sellerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerAvatarText: { color: '#fff', fontSize: 8, fontWeight: '900' },
  sellerName: { fontSize: 13, fontWeight: '800', color: '#111827' },
  sellerMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 3, fontWeight: '600' },

  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  verifiedText: { fontSize: 11, color: '#059669', fontWeight: '700' },
  shipText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },

  marketCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 22,
    marginBottom: 22,
  },
  marketHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLabel: { fontSize: 14, fontWeight: '800', color: '#111827' },
  updatedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  updatedText: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },
  marketRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  marketLabel: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  marketValue: { fontWeight: '800', fontSize: 13, color: '#111827' },
  suggestedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },
  suggestedText: { color: '#059669', fontSize: 13, fontWeight: '800' },

  offerSectionLabel: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 12 },
  inputContainer: {
    backgroundColor: '#fff',
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dollarSign: { fontSize: 32, fontWeight: '900', color: '#111827', marginRight: 4 },
  offerInput: { flex: 1, fontSize: 48, fontWeight: '900', color: '#111827' },
  quickOfferRow: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 22 },
  quickPill: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  quickPillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  quickPillText: { fontSize: 14, fontWeight: '800', color: '#4B5563' },
  quickPillTextActive: { color: '#fff' },

  numbersCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 4,
  },
  numbersHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  numbersTitle: { fontSize: 14, fontWeight: '900', color: '#111827' },
  numbersSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 4, marginBottom: 16, fontWeight: '600' },
  numberRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  numberLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  numberLabel: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  numberValue: { fontSize: 13, fontWeight: '800', color: '#111827' },
  numberLabelStrong: { fontSize: 14, fontWeight: '900', color: '#111827' },
  numberValueStrong: { fontSize: 15, fontWeight: '900', color: '#111827' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 6 },
  marginValue: { fontSize: 13, fontWeight: '900', color: '#059669' },

  noteInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    height: 90,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    fontSize: 13,
    color: '#111827',
  },
  noteCounter: { textAlign: 'right', fontSize: 10, color: '#D1D5DB', marginTop: 6, fontWeight: '600' },

  expiryRow: { flexDirection: 'row', gap: 8 },
  expiryPill: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  expiryPillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  expiryText: { fontSize: 13, fontWeight: '800', color: '#4B5563' },
  expiryTextActive: { color: '#fff' },

  noticeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 16, marginBottom: 18 },
  noticeText: { flex: 1, fontSize: 11, color: '#9CA3AF', lineHeight: 16, fontWeight: '600' },

  submitBtn: { backgroundColor: '#111827', height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' },

  protectedFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 },
  protectedFooterText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
});