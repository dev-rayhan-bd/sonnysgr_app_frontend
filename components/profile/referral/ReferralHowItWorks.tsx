import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

const STEPS = [
  { icon: 'share-2',  color: '#22C55E', text: 'Share your code with friends' },
  { icon: 'user-plus', color: '#3B82F6', text: 'Friend signs up using your code' },
  { icon: 'dollar-sign', color: '#F59E0B', text: 'You both get $10 credit when they make their first purchase' },
]

const ReferralHowItWorks: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>How it works</Text>

    {STEPS.map((step, idx) => (
      <View key={idx} style={styles.step}>
        <View style={[styles.iconCircle, { backgroundColor: step.color + '22' }]}>
          <Feather name={step.icon as any} size={18} color={step.color} />
        </View>
        <Text style={styles.stepText}>{step.text}</Text>
      </View>
    ))}
  </View>
)

export default ReferralHowItWorks

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
    lineHeight: 19,
  },
})