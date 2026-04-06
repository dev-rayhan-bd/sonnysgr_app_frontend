import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { PublicLockerProfile } from '@/types/lockerbrowser'

interface PublicLockerHeaderProps {
  profile: PublicLockerProfile
  onBack: () => void
  onShare: () => void
  onFollow: () => void
}

const PublicLockerHeader: React.FC<PublicLockerHeaderProps> = ({
  profile,
  onBack,
  onShare,
  onFollow,
}) => (
  <View style={styles.container}>
    {/* Top nav row */}
    <View style={styles.navRow}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.iconBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Feather name="chevron-left" size={22} color="#111827" />
      </TouchableOpacity>

      <Text style={styles.navTitle}>{profile.username}'s Locker</Text>

      <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
        <Feather name="share-2" size={18} color="#111827" />
      </TouchableOpacity>
    </View>

    {/* Profile row */}
    <View style={styles.profileRow}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{profile.initials}</Text>
      </View>

      {/* Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.role}>{profile.role}</Text>
        <Text style={styles.meta}>
          {profile.location} · {profile.badge} {profile.memberSince}
        </Text>
        <Text style={styles.followers}>{profile.followerCount} followers</Text>
      </View>

      {/* Follow button */}
      <TouchableOpacity
        onPress={onFollow}
        style={[styles.followBtn, profile.isFollowing && styles.followBtnActive]}
      >
        <Feather
          name={profile.isFollowing ? 'user-check' : 'user-plus'}
          size={14}
          color={profile.isFollowing ? '#fff' : '#111827'}
        />
        <Text style={[styles.followText, profile.isFollowing && styles.followTextActive]}>
          {profile.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>

    {/* Stats row */}
    <View style={styles.statsRow}>
      <View style={styles.statCell}>
        <Text style={styles.statValue}>{profile.stats.totalPairs}</Text>
        <Text style={styles.statLabel}>Pairs</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCell}>
        <Text style={[styles.statValue, styles.statGreen]}>
          ${profile.stats.estimatedValue.toLocaleString()}
        </Text>
        <Text style={styles.statLabel}>Est. Value</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCell}>
        <Text style={styles.statValue}>{profile.stats.avgCondition}★</Text>
        <Text style={styles.statLabel}>Avg Condition</Text>
      </View>
    </View>

    {/* Store owner demo banner */}
    <TouchableOpacity style={styles.demoBanner} activeOpacity={0.8}>
      <Feather name="refresh-cw" size={13} color="#fff" />
      <Text style={styles.demoBannerText}>Switch to Store Owner View (Demo)</Text>
    </TouchableOpacity>
  </View>
)

export default PublicLockerHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  username: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  role: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  meta: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  followers: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#111827',
    alignSelf: 'flex-start',
  },
  followBtnActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
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
    marginHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  statGreen: {
    color: '#22C55E',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#22C55E',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 8,
  },
  demoBannerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
})