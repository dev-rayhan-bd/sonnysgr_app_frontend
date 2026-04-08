import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClaimCustomer } from '@/services/hooks/retailer/refund/useClaims';

interface ReviewClaimCustomerProps {
  customer: ClaimCustomer;
  onViewProfile?: (customerId: string) => void;
}

const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <View key={i} style={{
        width: 11, height: 11,
        backgroundColor: i <= rating ? '#F59E0B' : '#E5E7EB',
        borderRadius: 2,
      }} />
    ))}
    <Text style={{ fontSize: 11, color: '#111', fontWeight: '600', marginLeft: 4 }}>
      {rating} stars
    </Text>
  </View>
);

const ReviewClaimCustomer: React.FC<ReviewClaimCustomerProps> = ({
  customer, onViewProfile,
}) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
      padding: 16,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
        {/* Avatar */}
        <View style={{
          backgroundColor: customer.avatarColor,
          borderRadius: 20, width: 40, height: 40,
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>
            {customer.avatarLabel}
          </Text>
        </View>

        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
            {customer.name}
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
              {customer.totalPurchases} purchases
            </Text>
            <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
              · {customer.pastClaims} past claims
            </Text>
          </View>
          <StarRow rating={customer.rating} />
          <TouchableOpacity
            onPress={() => onViewProfile?.(customer.id)}
            style={{ marginTop: 8 }}
          >
            <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600' }}>
              View Customer Profile →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReviewClaimCustomer;