import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ReviewClaimActionsProps {
  depositAmount: number;
  isProcessing?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

const ReviewClaimActions: React.FC<ReviewClaimActionsProps> = ({
  depositAmount,
  isProcessing = false,
  onApprove,
  onReject,
}) => {
  return (
    <View style={{ padding: 16, gap: 10 }}>
      {/* Approve */}
      <TouchableOpacity
        onPress={onApprove}
        disabled={isProcessing}
        activeOpacity={0.85}
        style={{
          backgroundColor: isProcessing ? '#86EFAC' : '#00C853',
          borderRadius: 14, paddingVertical: 16,
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'row', gap: 8,
        }}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
            Approve Refund — ${depositAmount.toFixed(2)}
          </Text>
        )}
      </TouchableOpacity>

      {/* Reject */}
      <TouchableOpacity
        onPress={onReject}
        disabled={isProcessing}
        activeOpacity={0.7}
        style={{ paddingVertical: 6, alignItems: 'center' }}
      >
        <Text style={{
          fontSize: 13, fontWeight: '600',
          color: isProcessing ? '#FCA5A5' : '#EF4444',
        }}>
          Reject Claim
        </Text>
      </TouchableOpacity>

      {/* Disclaimer */}
      <Text style={{ fontSize: 10, color: '#D1D5DB', textAlign: 'center' }}>
        Approving will release ${depositAmount.toFixed(2)} back to the customer's App wallet.
      </Text>
    </View>
  );
};

export default ReviewClaimActions;