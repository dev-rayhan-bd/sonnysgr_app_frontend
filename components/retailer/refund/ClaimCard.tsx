import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RefundClaim } from '@/services/hooks/retailer/refund/useClaims';

interface ClaimCardProps {
  claim: RefundClaim;
  timeLabel?: string; // e.g. "just now"
  onReviewPress?: (claim: RefundClaim) => void;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim, timeLabel, onReviewPress }) => {
  const { customer, order } = claim;

  return (
    <View style={{
      backgroundColor: '#fff',
      marginHorizontal: 12, borderRadius: 16,
      borderWidth: 1, borderColor: '#E5E7EB',
      padding: 14, marginBottom: 12,
    }}>
      {/* ── Customer row ── */}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        gap: 10, marginBottom: 12,
      }}>
        {/* Avatar */}
        <View style={{
          backgroundColor: customer.avatarColor,
          borderRadius: 20, width: 36, height: 36,
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
            {customer.avatarLabel}
          </Text>
        </View>

        {/* Name + handle */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#111' }}>
              {customer.name}
            </Text>
            <Feather name="star" size={11} color="#F59E0B" fill="#F59E0B" />
          </View>
          <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>
            {customer.handle}
          </Text>
        </View>

        {/* Timestamp */}
        {timeLabel && (
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{timeLabel}</Text>
        )}
      </View>

      {/* ── Product row ── */}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        gap: 10, marginBottom: 12,
      }}>
        {order.imageUri ? (
          <Image
            source={{ uri: order.imageUri }}
            style={{ width: 56, height: 56, borderRadius: 10 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{
            width: 56, height: 56, borderRadius: 10,
            backgroundColor: order.imageBg,
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Feather name="package" size={22} color="rgba(255,255,255,0.4)" />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#111' }} numberOfLines={1}>
            {order.productName}
          </Text>
          <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
            Size {order.size} · {order.gender}
          </Text>
        </View>

        <Text style={{ fontSize: 15, fontWeight: '800', color: '#EF4444' }}>
          ${order.depositAmount.toFixed(2)}
        </Text>
      </View>

      {/* ── Meta info ── */}
      <View style={{
        borderTopWidth: 1, borderTopColor: '#F3F4F6',
        paddingTop: 10, gap: 5,
      }}>
        {[
          { label: 'Reason',    value: claim.reason },
          { label: 'Submitted', value: claim.submittedAt },
          { label: 'Claim #',   value: claim.claimNumber },
        ].map(row => (
          <View key={row.label} style={{
            flexDirection: 'row', justifyContent: 'space-between',
          }}>
            <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{row.label}</Text>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#111' }}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      {/* ── Review link ── */}
      <TouchableOpacity
        onPress={() => onReviewPress?.(claim)}
        style={{ marginTop: 10, alignItems: 'flex-end' }}
      >
        <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600' }}>
          Review Full Claim →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClaimCard;