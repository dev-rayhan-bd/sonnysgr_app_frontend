import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { VipBenefit } from '@/types/vip'

interface VipBenefitsProps {
  benefits: VipBenefit[]
  currentTier: string
}

const BenefitRow: React.FC<{ benefit: VipBenefit; locked: boolean }> = ({ benefit, locked }) => (
  <View style={[styles.row, locked && styles.rowLocked]}>
    {/* Icon */}
    <View style={[styles.iconCircle, locked && styles.iconCircleLocked]}>
      <Text style={styles.emoji}>{benefit.icon}</Text>
    </View>

    {/* Text */}
    <View style={styles.textBlock}>
      <Text style={[styles.title, locked && styles.titleLocked]}>{benefit.title}</Text>
      <Text style={[styles.desc, locked && styles.descLocked]}>{benefit.description}</Text>
    </View>

    {/* Platinum badge / check */}
    {locked ? (
      <View style={styles.platinumBadge}>
        <Feather name="lock" size={10} color="#E2E8F0" />
        <Text style={styles.platinumText}>Platinum</Text>
      </View>
    ) : (
      <View style={styles.checkCircle}>
        <Feather name="check" size={12} color="#22C55E" />
      </View>
    )}
  </View>
)

const VipBenefits: React.FC<VipBenefitsProps> = ({ benefits, currentTier }) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Your {currentTier} Benefits</Text>

    <View style={styles.list}>
      {benefits.map((b, idx) => (
        <BenefitRow
          key={b.id}
          benefit={b}
          locked={b.platinumOnly}
        />
      ))}
    </View>
  </View>
)

export default VipBenefits

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    marginBottom: 14,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  rowLocked: {
    opacity: 0.55,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleLocked: {
    backgroundColor: '#111827',
  },
  emoji: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000',
    marginBottom: 2,
  },
  titleLocked: {
    color: '#6B7280',
  },
  desc: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '400',
    lineHeight: 16,
  },
  descLocked: {
    color: '#374151',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#14532D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platinumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  platinumText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#E2E8F0',
    letterSpacing: 0.5,
  },
})