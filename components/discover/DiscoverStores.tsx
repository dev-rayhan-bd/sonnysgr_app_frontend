import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FollowedStore } from '@/services/hooks/discover/useDiscover';

interface DiscoverStoresProps {
  stores: FollowedStore[];
  onManagePress?: () => void;
  onStorePress?: (s: FollowedStore) => void;
  onFollowToggle?: (id: string) => void;
  onBuyPress?: (s: FollowedStore) => void;
  /** 'follow' shows Following/Follow pill (Image 1). 'buy' shows In Stock badge + Buy btn (Image 2). Default: 'follow' */
  variant?: 'follow' | 'buy';
}

/**
 * Image 1 variant:
 *   - Store image thumbnail left with green online dot
 *   - Pin icon + "Apple City · 0.8km"
 *   - "Following" outlined green pill right
 *
 * Image 2 variant:
 *   - Same left side
 *   - "In Stock" green badge + "Buy" green button stacked right
 */
export const DiscoverStores: React.FC<DiscoverStoresProps> = ({
  stores,
  onManagePress,
  onStorePress,
  onFollowToggle,
  onBuyPress,
  variant = 'follow',
}) => (
  <View style={styles.section}>
    {/* Header */}
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>From Followed Stores</Text>
      <TouchableOpacity onPress={onManagePress} activeOpacity={0.7}>
        <Text style={styles.manageText}>Manage →</Text>
      </TouchableOpacity>
    </View>

    {stores.map(store => (
      <TouchableOpacity
        key={store.id}
        style={styles.storeRow}
        onPress={() => onStorePress?.(store)}
        activeOpacity={0.88}
      >
        {/* Thumbnail + online dot */}
        <View style={styles.thumbWrap}>
          <Image source={{ uri: store.image }} style={styles.thumb} resizeMode="cover" />
          <View style={styles.onlineDot} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={11} color="#B0B0B0" />
            <Text style={styles.locationText}>
              {store.location} · {store.distance}
            </Text>
          </View>
        </View>

        {/* Right action */}
        {variant === 'follow' ? (
          <TouchableOpacity
            style={[
              styles.followPill,
              store.isFollowing && styles.followPillActive,
            ]}
            onPress={() => onFollowToggle?.(store.id)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.followPillText,
              store.isFollowing && styles.followPillTextActive,
            ]}>
              {store.isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buyColumn}>
            {store.stockStatus && (
              <View style={styles.inStockBadge}>
                <Text style={styles.inStockText}>In Stock</Text>
              </View>
            )}
            {store.price != null && (
              <Text style={styles.storePrice}>${store.price}</Text>
            )}
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => onBuyPress?.(store)}
              activeOpacity={0.8}
            >
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    ))}

    {stores.length === 0 && (
      <View style={styles.empty}>
        <Ionicons name="storefront-outline" size={32} color="#ddd" />
        <Text style={styles.emptyText}>No followed stores yet</Text>
      </View>
    )}
  </View>
);

const THUMB = 52;

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.2,
  },
  manageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00C853',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbWrap: {
    width: THUMB,
    height: THUMB,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EBEBEB',
    flexShrink: 0,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#fff',
  },
  info: {
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
    gap: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#B0B0B0',
    fontWeight: '400',
  },
  // Follow variant
  followPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#C8C8C8',
    backgroundColor: 'transparent',
  },
  followPillActive: {
    borderColor: '#00C853',
    backgroundColor: 'transparent',
  },
  followPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#777',
  },
  followPillTextActive: {
    color: '#00C853',
  },
  // Buy variant
  buyColumn: {
    alignItems: 'flex-end',
    gap: 4,
    flexShrink: 0,
  },
  inStockBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  inStockText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fff',
  },
  storePrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  buyBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  // Empty
  empty: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
});

export default DiscoverStores;