// components/profilesetup/StoreCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { Store } from '@/services/hooks/profilesetup/useFollowStores'

interface Props {
  store: Store
  onToggleFollow: (id: string) => void
}

export default function StoreCard({ store, onToggleFollow }: Props) {
  return (
    <View style={styles.card}>
      {/* Store icon */}
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>{store.emoji}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{store.name}</Text>

        {/* Rating row */}
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>{store.rating}</Text>
          <Text style={styles.reviews}>· {store.reviewCount} reviews</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.distance}>{store.distance}</Text>
        </View>

        {/* Tags */}
        <Text style={styles.tags} numberOfLines={1}>
          {store.tags.join(' · ')}
        </Text>
      </View>

      {/* Follow button */}
      <TouchableOpacity
        style={[styles.followBtn, store.following && styles.followingBtn]}
        onPress={() => onToggleFollow(store.id)}
        activeOpacity={0.75}
      >
        <Text style={[styles.followText, store.following && styles.followingText]}>
          {store.following ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  star: {
    fontSize: 10,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  reviews: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  dot: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  distance: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  tags: {
    fontSize: 11,
    color: '#6B7280',
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexShrink: 0,
  },
  followingBtn: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  followText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  followingText: {
    color: '#FFFFFF',
  },
})