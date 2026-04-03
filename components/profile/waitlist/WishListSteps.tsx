// components/profile/waitlist/WishListSteps.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Step {
  number: number
  label: string
}

const STEPS: Step[] = [
  { number: 1, label: 'Join' },
  { number: 2, label: 'We Watch' },
  { number: 3, label: "You're Notified" },
]

export const WaitlistSteps: React.FC = () => {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => (
        <React.Fragment key={step.number}>
          <View style={styles.stepItem}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>{step.number}</Text>
            </View>
            <Text style={styles.stepLabel}>{step.label}</Text>
          </View>
          {index < STEPS.length - 1 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 0,
  },
  stepItem: {
    alignItems: 'center',
    gap: 6,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  stepLabel: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 64,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#22c55e',
    marginBottom: 20,
  },
})