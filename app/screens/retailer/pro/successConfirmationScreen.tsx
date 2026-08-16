// app/screens/retailer/pro/successConfirmationScreen.tsx
import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const UNLOCKED = [
  'Unlimited listings',
  'Advanced analytics',
  'Priority placement',
  'Drop campaigns',
  'Sync integrations',
]

export default function SuccessConfirmationScreen() {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start()
  }, [])

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.container}>
        {/* Animated checkmark */}
        <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
          <Feather name="check" size={52} color="#fff" />
        </Animated.View>

        <Animated.View style={[styles.textBlock, { opacity: fadeAnim }]}>
          <Text style={styles.title}>You're Now Pro! 🎉</Text>
          <Text style={styles.subtitle}>Your 14-day free trial has started. Enjoy all Pro features.</Text>

          {/* Confetti dots — static decorative */}
          <View style={styles.divider} />

          <Text style={styles.unlockedTitle}>What you've unlocked:</Text>
          {UNLOCKED.map((item) => (
            <View key={item} style={styles.unlockedRow}>
              <View style={styles.unlockedCheck}>
                <Feather name="check" size={12} color="#fff" />
              </View>
              <Text style={styles.unlockedText}>{item}</Text>
            </View>
          ))}

          <View style={styles.trialNote}>
            <Feather name="info" size={14} color="#3b82f6" />
            <Text style={styles.trialNoteText}>
              You won't be charged until Aug 30, 2026. Cancel anytime before then.
            </Text>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => router.push('/screens/retailer/pro/proDashboardScreen' as any)}
        >
          <Text style={styles.exploreBtnText}>Explore Pro Dashboard</Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/retailerTabs/home' as any)}>
          <Text style={styles.laterText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 20 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center', shadowColor: '#22c55e', shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  textBlock: { alignItems: 'center', width: '100%' },
  title: { fontSize: 28, fontWeight: '800', color: '#0a0a0a', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6b7280', textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#f3f4f6', width: '100%', marginBottom: 16 },
  unlockedTitle: { fontSize: 15, fontWeight: '700', color: '#0a0a0a', alignSelf: 'flex-start', marginBottom: 10 },
  unlockedRow: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start', marginBottom: 8 },
  unlockedCheck: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  unlockedText: { fontSize: 14, color: '#374151' },
  trialNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#eff6ff', borderRadius: 12, padding: 12, marginTop: 12, width: '100%' },
  trialNoteText: { fontSize: 13, color: '#3b82f6', flex: 1, lineHeight: 18 },
  exploreBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0a0a0a', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 14, width: '100%', justifyContent: 'center' },
  exploreBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  laterText: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
})
