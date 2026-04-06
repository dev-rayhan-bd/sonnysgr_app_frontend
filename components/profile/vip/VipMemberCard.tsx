import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { VipProfile, TierLevel } from '@/types/vip'

interface VipMemberCardProps {
  profile: VipProfile
  tierConfig: TierLevel
}

const VipMemberCard: React.FC<VipMemberCardProps> = ({ profile, tierConfig }) => (
  <View style={styles.card}>
    {/* Tier label */}
    <View style={styles.tierRow}>
      <Text style={[styles.tierLabel, { color: tierConfig.color }]}>
        {profile.tier.toUpperCase()} MEMBER
      </Text>
      <Text style={styles.crownEmoji}>👑</Text>
    </View>

    {/* Avatar */}
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {profile.name.split(' ').map((n) => n[0]).join('')}
      </Text>
    </View>

    {/* Name */}
    <Text style={styles.name}>{profile.name}</Text>
    <Text style={styles.since}>Member since {profile.memberSince}</Text>

    {/* Points */}
    <Text style={styles.points}>{profile.points.toLocaleString()}</Text>
    <Text style={styles.pointsLabel}>points</Text>
  </View>
)

export default VipMemberCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1200',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#92400E',
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  tierLabel: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  crownEmoji: {
    fontSize: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#92400E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F59E0B',
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  since: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
    marginBottom: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: '900',
    color: '#F59E0B',
    letterSpacing: -1,
    lineHeight: 52,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
  },
})