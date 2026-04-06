import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { VipProfile } from '@/types/vip'

interface VipProgressBarProps {
  profile: VipProfile
  progressPercent: number
}

const VipProgressBar: React.FC<VipProgressBarProps> = ({ profile, progressPercent }) => (
  <View style={styles.container}>
    <View style={styles.labelRow}>
      <Text style={styles.label}>Progress to {profile.nextTier}</Text>
      <Text style={styles.targetLabel}>{profile.nextTier} at {profile.nextTierPoints.toLocaleString()}</Text>
    </View>

    {/* Track */}
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progressPercent}%` }]} />
    </View>

    {/* Points below */}
    <View style={styles.pointsRow}>
      <Text style={styles.currentPoints}>
        {profile.points.toLocaleString()} / {profile.nextTierPoints.toLocaleString()}
      </Text>
      <Text style={styles.remaining}>
        {(profile.nextTierPoints - profile.points).toLocaleString()} pts to go
      </Text>
    </View>
  </View>
)

export default VipProgressBar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  targetLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  track: {
    height: 10,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 10,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  currentPoints: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '700',
  },
  remaining: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
})