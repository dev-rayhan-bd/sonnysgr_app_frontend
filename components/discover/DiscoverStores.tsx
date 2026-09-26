import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FollowedStore } from '@/services/hooks/discover/useDiscover';

interface DiscoverStoresProps {
  stores: FollowedStore[];
  onManagePress?: () => void;
  onStorePress?: (s: FollowedStore) => void;
  onFollowToggle?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onBuyPress?: (s: FollowedStore) => void;
}

const StoreAvatar = ({
  store,
  onPress,
}: {
  store: FollowedStore;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={{ alignItems: 'center', width: 64, gap: 6 }}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: store.brandColor || '#22C55E',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>
        {store.brandInitial}
      </Text>
    </View>
    <Text style={{ fontSize: 11, fontWeight: '600', color: '#374151', textAlign: 'center' }} numberOfLines={1}>
      {store.name}
    </Text>
  </TouchableOpacity>
);

export const DiscoverStores: React.FC<DiscoverStoresProps> = ({
  stores,
  onManagePress,
  onStorePress,
}) => (
  <View style={{ marginTop: 24, marginBottom: 12 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>Your stores</Text>
      <TouchableOpacity onPress={onManagePress}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#22C55E' }}>Manage</Text>
      </TouchableOpacity>
    </View>

    {stores.length > 0 ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
      >
        {stores.map((s) => (
          <StoreAvatar key={s.id} store={s} onPress={() => onStorePress?.(s)} />
        ))}
      </ScrollView>
    ) : (
      <View style={{ alignItems: 'center', paddingVertical: 30, gap: 8, paddingHorizontal: 20 }}>
        <Ionicons name="storefront-outline" size={28} color="#ddd" />
        <Text style={{ color: '#9CA3AF', fontWeight: '500' }}>No followed stores yet</Text>
      </View>
    )}
  </View>
);

export default DiscoverStores;