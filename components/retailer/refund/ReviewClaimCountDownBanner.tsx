import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCountdown } from '@/services/hooks/retailer/refund/useClaims';

interface ReviewClaimCountdownBannerProps {
  deadlineIso: string;
  deadlineDisplay: string; // e.g. "Apr 05, 10:32 AM"
}

const ReviewClaimCountdownBanner: React.FC<ReviewClaimCountdownBannerProps> = ({
  deadlineIso,
  deadlineDisplay,
}) => {
  const { h, m, s } = useCountdown(deadlineIso);

  return (
    <View style={{
      backgroundColor: '#FEF9C3',
      borderBottomWidth: 1, borderBottomColor: '#FDE047',
      paddingHorizontal: 16, paddingVertical: 10,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Feather name="clock" size={13} color="#A16207" />
        <Text style={{ fontSize: 11, color: '#713F12', fontWeight: '500' }}>
          Respond by {deadlineDisplay}
        </Text>
      </View>
      <Text style={{
        fontSize: 12, fontWeight: '700', color: '#A16207',
        fontVariant: ['tabular-nums'],
      }}>
        {h}:{m}:{s} remaining
      </Text>
    </View>
  );
};

export default ReviewClaimCountdownBanner;