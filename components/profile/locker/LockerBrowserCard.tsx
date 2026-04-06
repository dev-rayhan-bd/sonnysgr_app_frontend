import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { LockerPreview } from '@/types/lockerbrowser'

const BADGE_COLORS: Record<string, string> = {
  BESNKR: '#22C55E',
  PRO: '#3B82F6',
  VERIFIED: '#8B5CF6',
}

interface LockerBrowserCardProps {
  locker: LockerPreview
  onPress: (locker: LockerPreview) => void
  onFollowPress: (id: string) => void
}

const LockerBrowserCard: React.FC<LockerBrowserCardProps> = ({
  locker,
  onPress,
  onFollowPress,
}) => (
  <View  className='pb-20'>
    <TouchableOpacity
      onPress={() => onPress(locker)}
      activeOpacity={0.92}
      style={styles.card}
    >
      {/* Preview image strip */}
      <View style={styles.imageStrip}>
        {locker.previewImages.slice(0, 3).map((uri, i) => (
          <Image
            key={i}
            source={{ uri }}
            style={[styles.previewImage, i === 0 && styles.previewImageFirst]}
            resizeMode="cover"
          />
        ))}
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Left: avatar + info */}
        <View style={styles.leftRow}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{locker.initials}</Text>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.username} numberOfLines={1}>{locker.username}</Text>
              {locker.badge && (
                <View style={[styles.badge, { backgroundColor: BADGE_COLORS[locker.badge] }]}>
                  <Text style={styles.badgeText}>{locker.badge}</Text>
                </View>
              )}
            </View>
            <Text style={styles.meta}>{locker.location} · {locker.followerCount} followers</Text>
          </View>
        </View>

        {/* Follow button */}
        <TouchableOpacity
          onPress={() => onFollowPress(locker.id)}
          style={[styles.followBtn, locker.isFollowing && styles.followBtnActive]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.followText, locker.isFollowing && styles.followTextActive]}>
            {locker.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCell}>
          <Text style={styles.statValue}>{locker.totalPairs}</Text>
          <Text style={styles.statLabel}>Pairs</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCell}>
          <Text style={[styles.statValue, styles.statGreen]}>
            ${locker.estimatedValue.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Est. Value</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCell}>
          <Text style={styles.statValue}>{locker.avgCondition}★</Text>
          <Text style={styles.statLabel}>Avg Cond.</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
)

export default LockerBrowserCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  imageStrip: {
    flexDirection: 'row',
    height: 110,
  },
  previewImage: {
    flex: 1,
    height: 110,
    marginLeft: 2,
  },
  previewImageFirst: {
    marginLeft: 0,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  username: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  meta: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#111827',
  },
  followBtnActive: {
    backgroundColor: '#111827',
  },
  followText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  followTextActive: {
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 8,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
  },
  statGreen: {
    color: '#22C55E',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#F3F4F6',
  },
})