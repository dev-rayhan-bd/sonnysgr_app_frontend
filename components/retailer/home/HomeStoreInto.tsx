import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface StoreInfo {
  name: string;
  location: string;
  isVerified: boolean;
}

interface HomeStoreInfoProps {
  store: StoreInfo;
  onVerifiedPress?: () => void;
}

const HomeStoreInfo: React.FC<HomeStoreInfoProps> = ({ store, onVerifiedPress }) => {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 4, paddingBottom: 14,
      backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
    }}>
      <View>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111' }}>{store.name}</Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{store.location}</Text>
      </View>

      {store.isVerified && (
        <TouchableOpacity
          onPress={onVerifiedPress}
          style={{
            backgroundColor: '#00C853', borderRadius: 20,
            paddingHorizontal: 12, paddingVertical: 6,
            flexDirection: 'row', alignItems: 'center', gap: 5,
          }}
        >
          <Feather name="check" size={12} color="#fff" strokeWidth={3} />
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Verified Store</Text>
          <Feather name="chevron-right" size={12} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeStoreInfo;