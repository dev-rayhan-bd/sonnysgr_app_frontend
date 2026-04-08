import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import BaseContainer from '@/components/shared/BaseContainer';
import ClaimsActionBanner from '@/components/retailer/refund/ClaimSectionBanner';
import ClaimCard from '@/components/retailer/refund/ClaimCard';
import ClaimEmptyPrevious from '@/components/retailer/refund/ClaimEmptyPrevious';
import { useClaims,RefundClaim } from '@/services/hooks/retailer/refund/useClaims';

const SECTION_LABEL = {
  fontSize: 10, fontWeight: '700' as const, color: '#9CA3AF',
  letterSpacing: 0.8, paddingHorizontal: 16,
  paddingTop: 14, paddingBottom: 6,
} as const;

export const RefundClaimsScreen: React.FC = () => {
  const {
    newClaims,
    previousClaims,
    isProcessing,
    handleDismiss,
  } = useClaims();

  const activeClaim = newClaims[0] ?? null;

  const handleReviewPress = (claim: RefundClaim) => {
    router.push({
      pathname: '/screens/retailer/refund/reviewClaimScreen',
      params: { claimId: claim.id },
    });
  };

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View style={styles.container} className='pt-10'>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="#111" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.title}>Refund Claims</Text>
            {newClaims.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{newClaims.length} New</Text>
              </View>
            )}
          </View>
          <View style={{ width: 24 }} />
        </View>

        {/* ── Body ── */}
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Action banner */}
          {activeClaim && (
            <ClaimsActionBanner deadlineIso={activeClaim.deadlineIso} />
          )}

          {/* NEW CLAIMS */}
          <Text style={SECTION_LABEL}>NEW CLAIM</Text>
          {newClaims.length > 0 ? (
            newClaims.map(claim => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                timeLabel="just now"
                onReviewPress={handleReviewPress}
              />
            ))
          ) : (
            <View style={styles.emptyNew}>
              <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>
                No new claims. You're all caught up!
              </Text>
            </View>
          )}

          {/* PREVIOUS CLAIMS */}
          <Text style={SECTION_LABEL}>PREVIOUS CLAIMS</Text>
          {previousClaims.length > 0 ? (
            previousClaims.map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))
          ) : (
            <ClaimEmptyPrevious />
          )}
        </ScrollView>

        {/* ── Bottom actions (only when there's a pending claim) ── */}
        {activeClaim && (
          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={() => handleReviewPress(activeClaim)}
              style={styles.reviewBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.reviewBtnText}>Review This Claim</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDismiss(activeClaim.id)}
              disabled={isProcessing}
              style={styles.dismissBtn}
            >
              <Text style={styles.dismissBtnText}>Dismiss for Now</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Auto-approval will complete in 24hrs on {activeClaim.deadlineDisplay}
            </Text>
          </View>
        )}
      </View>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', paddingHorizontal: 16,
    paddingTop: 16, paddingBottom: 10,
  },
  title:        { fontSize: 17, fontWeight: '700', color: '#111' },
  badge: {
    backgroundColor: '#EF4444', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  badgeText:    { color: '#fff', fontSize: 11, fontWeight: '700' },
  scroll:       { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  emptyNew: {
    backgroundColor: '#fff', marginHorizontal: 12, borderRadius: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
    paddingVertical: 24, paddingHorizontal: 16,
    alignItems: 'center', marginBottom: 12,
  },
  bottomBar: {
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20,
  },
  reviewBtn: {
    backgroundColor: '#111', borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', marginBottom: 10,
  },
  reviewBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  dismissBtn:    { paddingVertical: 6, alignItems: 'center', marginBottom: 6 },
  dismissBtnText: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  disclaimer:    { fontSize: 10, color: '#D1D5DB', textAlign: 'center' },
});

export default RefundClaimsScreen;