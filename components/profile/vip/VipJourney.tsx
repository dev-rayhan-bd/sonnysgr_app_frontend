import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { TierLevel, VipTier } from '@/types/vip'

interface VipJourneyProps {
  tiers: TierLevel[]
  currentTier: VipTier
}

const VipJourney: React.FC<VipJourneyProps> = ({ tiers, currentTier }) => {
  const currentIndex = tiers.findIndex((t) => t.tier === currentTier)

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Journey</Text>

      <View style={styles.row}>
        {tiers.map((tier, idx) => {
          const isActive = tier.tier === currentTier
          const isPast = idx < currentIndex
          const isLast = idx === tiers.length - 1

          return (
            <React.Fragment key={tier.tier}>
              {/* Tier node */}
              <View style={styles.tierNode}>
                <View style={[
                  styles.circle,
                  isActive && { borderColor: tier.color, backgroundColor: tier.color + '22' },
                  isPast  && { borderColor: tier.color, backgroundColor: tier.color + '44' },
                  !isActive && !isPast && styles.circleInactive,
                ]}>
                  <Text style={styles.emoji}>{tier.emoji}</Text>
                </View>
                <Text style={[
                  styles.tierLabel,
                  isActive && { color: tier.color },
                  isPast   && { color: tier.color + 'AA' },
                  !isActive && !isPast && styles.tierLabelInactive,
                ]}>
                  {tier.tier}
                </Text>
              </View>

              {/* Connector line */}
              {!isLast && (
                <View style={[
                  styles.line,
                  isPast && styles.lineActive,
                ]} />
              )}
            </React.Fragment>
          )
        })}
      </View>
    </View>
  )
}

export default VipJourney

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierNode: {
    alignItems: 'center',
    gap: 6,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1F2937',
    backgroundColor: '#111827',
  },
  circleInactive: {
    borderColor: '#1F2937',
    backgroundColor: '#0F172A',
  },
  emoji: {
    fontSize: 22,
  },
  tierLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  tierLabelInactive: {
    color: '#374151',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#1F2937',
    marginBottom: 18,
  },
  lineActive: {
    backgroundColor: '#F59E0B',
  },
})