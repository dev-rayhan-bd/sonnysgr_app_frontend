import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ClaimOrder,CancelledBy } from '@/services/hooks/retailer/refund/useClaims';

interface ReviewClaimOrderProps {
  order: ClaimOrder;
}

const cancelledByLabel: Record<CancelledBy, { text: string; color: string }> = {
  store:    { text: 'Store (you)', color: '#EF4444' },
  customer: { text: 'Customer',   color: '#F97316' },
  system:   { text: 'System',     color: '#9CA3AF' },
};

const ReviewClaimOrder: React.FC<ReviewClaimOrderProps> = ({ order }) => {
  const cancelInfo = cancelledByLabel[order.cancelledBy];

  return (
    <View style={{
      backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
      padding: 16,
    }}>
      {/* Product row */}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        gap: 10, marginBottom: 16,
      }}>
        {order.imageUri ? (
          <Image
            source={{ uri: order.imageUri }}
            style={{ width: 60, height: 60, borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{
            width: 60, height: 60, borderRadius: 12,
            backgroundColor: order.imageBg,
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Feather name="package" size={26} color="rgba(255,255,255,0.35)" />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#111' }} numberOfLines={2}>
            {order.productName}
          </Text>
          <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
            Size {order.size} · {order.gender}
          </Text>
          {order.sku && (
            <Text style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>{order.sku}</Text>
          )}
        </View>
      </View>

      {/* Order meta */}
      {[
        { label: 'Hold Placed',  value: order.holdPlacedAt,                       color: '#111' },
        { label: 'Deposit Paid', value: `$${order.depositAmount.toFixed(2)}`,      color: '#111' },
        { label: 'Cancelled By', value: cancelInfo.text,                           color: cancelInfo.color },
      ].map(row => (
        <View key={row.label} style={{
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 8,
        }}>
          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{row.label}</Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: row.color }}>
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ReviewClaimOrder;