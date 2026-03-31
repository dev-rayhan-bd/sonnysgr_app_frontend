import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FollowedStore } from '@/services/hooks/discover/useDiscover';

interface DiscoverStoresProps {
  stores: FollowedStore[];
  onManagePress?: () => void;
  onStorePress?: (store: FollowedStore) => void;
  onFollowToggle?: (storeId: string) => void;
}

const StoreCard: React.FC<{
  store: FollowedStore;
  onPress?: () => void;
  onFollowToggle?: () => void;
}> = ({ store, onPress, onFollowToggle }) => (
  <TouchableOpacity style={styles.storeCard} onPress={onPress} activeOpacity={0.88}>
    {/* Store Image */}
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: store.image }}
        style={styles.storeImage}
        resizeMode="cover"
      />
      {/* Online indicator */}
      <View style={styles.onlineIndicator} />
    </View>

    {/* Info */}
    <View style={styles.storeInfo}>
      <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={11} color="#aaa" />
        <Text style={styles.locationText}>
          {store.location} · {store.distance}
        </Text>
      </View>
    </View>

    {/* Follow Button */}
    <TouchableOpacity
      style={[styles.followBtn, store.isFollowing && styles.followBtnActive]}
      onPress={onFollowToggle}
      activeOpacity={0.8}
    >
      <Text style={[styles.followBtnText, store.isFollowing && styles.followBtnTextActive]}>
        {store.isFollowing ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

export const DiscoverStores: React.FC<DiscoverStoresProps> = ({
  stores,
  onManagePress,
  onStorePress,
  onFollowToggle,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>From Followed Stores</Text>
        <TouchableOpacity onPress={onManagePress} activeOpacity={0.7}>
          <Text style={styles.manageText}>Manage →</Text>
        </TouchableOpacity>
      </View>

      {/* Store Cards */}
      {stores.map(store => (
        <StoreCard
          key={store.id}
          store={store}
          onPress={() => onStorePress?.(store)}
          onFollowToggle={() => onFollowToggle?.(store.id)}
        />
      ))}

      {stores.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="storefront-outline" size={36} color="#ddd" />
          <Text style={styles.emptyText}>No followed stores yet</Text>
          <Text style={styles.emptySubtext}>Follow stores to see their drops here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  manageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00D46A',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
  },
  storeImage: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00D46A',
    borderWidth: 2,
    borderColor: '#fff',
  },
  storeInfo: {
    flex: 1,
    gap: 3,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '500',
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  followBtnActive: {
    backgroundColor: '#00D46A15',
    borderColor: '#00D46A',
  },
  followBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  followBtnTextActive: {
    color: '#00D46A',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ccc',
  },
  emptySubtext: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },
});

export default DiscoverStores;