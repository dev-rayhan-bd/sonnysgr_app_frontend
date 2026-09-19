import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface StoreInfo {
  name: string;
  location: string;
  isVerified: boolean;
  lastSyncedLabel?: string;
}

interface HomeStoreInfoProps {
  store: StoreInfo;
  onVerifiedPress?: () => void;
  onLocationPress?: () => void;
}

const HomeStoreInfo: React.FC<HomeStoreInfoProps> = ({ store, onVerifiedPress, onLocationPress }) => {
  return (
    <View style={{
      paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14,
      backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#F3F4F6', // Top border
  borderTopWidth: 1,
  borderTopColor: '#F3F4F6',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: '900', color: '#111' }}>{store.name}</Text>
        {store.isVerified && (
          <TouchableOpacity
            onPress={onVerifiedPress}
            style={{
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: '#00C853',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Feather name="check" size={10} color="#fff" strokeWidth={3} />
          </TouchableOpacity>
        )}
      </View>

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  }}
>
  {/* Location */}
  <TouchableOpacity
    onPress={onLocationPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,

      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 10,

      paddingHorizontal: 10,
      paddingVertical: 7,
    }}
  >
    <Feather name="map-pin" size={12} color="#000000" />

    <Text
      style={{
        fontSize: 12,
        color: '#000000',
        fontWeight:700
      }}
      numberOfLines={1}
    >
      {store.location}
    </Text>

    <Feather
      name="chevron-right"
      size={12}
      color="#9CA3AF"
    />
  </TouchableOpacity>

  {/* Synced */}
  {store.lastSyncedLabel && (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginLeft: 'auto',
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: '#00C853',
        }}
      />

      <Text
        style={{
          fontSize: 11,
          color: '#00C853',
          fontWeight: '500',
        }}
      >
        {store.lastSyncedLabel}
      </Text>
    </View>
  )}
</View>
    </View>
  );
};

export default HomeStoreInfo;