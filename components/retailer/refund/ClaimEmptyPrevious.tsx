import React from 'react';
import { View, Text } from 'react-native';

const ClaimEmptyPrevious: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#fff',
      marginHorizontal: 12, borderRadius: 16,
      borderWidth: 1, borderColor: '#E5E7EB',
      paddingVertical: 28, paddingHorizontal: 16,
      alignItems: 'center', marginBottom: 16,
    }}>
      <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
        No previous claims.{'\n'}
        <Text style={{ fontSize: 12 }}>Your refund history will appear here.</Text>
      </Text>
    </View>
  );
};

export default ClaimEmptyPrevious;