import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { EarnAction } from '@/types/vip'

interface VipEarnPointsProps {
  actions: EarnAction[]
}

const EarnCard: React.FC<{ action: EarnAction }> = ({ action }) => (
  <View style={styles.card}>
    <Text style={styles.icon}>{action.icon}</Text>
    <Text style={styles.pts}>{action.points} pts</Text>
    <Text style={styles.label} numberOfLines={2}>{action.label}</Text>
  </View>
)

const VipEarnPoints: React.FC<VipEarnPointsProps> = ({ actions }) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>EARN POINTS</Text>

    <View style={styles.grid}>
      {actions.map((action) => (
        <EarnCard key={action.id} action={action} />
      ))}
    </View>
  </View>
)

export default VipEarnPoints

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#F59E0B',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    flexGrow: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
  },
  pts: {
    fontSize: 13,
    fontWeight: '900',
    color: '#F59E0B',
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
})