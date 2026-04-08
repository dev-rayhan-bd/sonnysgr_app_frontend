import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCountdown } from '@/services/hooks/retailer/refund/useClaims';

interface ClaimsActionBannerProps {
  deadlineIso: string;
}

const ClaimsActionBanner: React.FC<ClaimsActionBannerProps> = ({ deadlineIso }) => {
  const { h, m, s, expired } = useCountdown(deadlineIso);

  if (expired) return null;

  return (
    <View style={{
      backgroundColor: '#FFF7ED',
      borderLeftWidth: 3, borderLeftColor: '#F97316',
      marginHorizontal: 12, marginBottom: 10,
      borderRadius: 8, padding: 10,
      flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <Feather name="alert-circle" size={13} color="#F97316" />
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#C2410C' }}>
            Action Required
          </Text>
        </View>
        <Text style={{ fontSize: 11, color: '#9A3412' }}>
          Respond within 24 hours to avoid auto-approval
        </Text>
      </View>

      <View style={{
        backgroundColor: '#FED7AA', borderRadius: 8,
        paddingHorizontal: 8, paddingVertical: 4,
        marginLeft: 8, flexShrink: 0,
      }}>
        <Text style={{
          fontSize: 12, fontWeight: '700', color: '#C2410C',
          fontVariant: ['tabular-nums'],
        }}>
          {h}:{m}:{s}
        </Text>
      </View>
    </View>
  );
};

export default ClaimsActionBanner;