// app/screens/retailer/pro/freeTrialOnboardingScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const { width } = Dimensions.get('window')

const SLIDES = [
  {
    icon: 'trending-up',
    title: 'Advanced Analytics',
    desc: 'See what your customers want before they ask. Local demand heatmaps, size gaps, and competitor insights.',
    color: '#3b82f6',
  },
  {
    icon: 'zap',
    title: 'Unlimited Listings',
    desc: 'List your full inventory with no cap. Every pair visible to thousands of nearby sneaker buyers.',
    color: '#8b5cf6',
  },
  {
    icon: 'star',
    title: 'Priority Placement',
    desc: 'Your store appears first in local search results and on the discover map for relevant searches.',
    color: '#f59e0b',
  },
  {
    icon: 'package',
    title: 'Drop Campaigns',
    desc: 'Build hype before releases. Create countdowns, notify followers, and manage raffle entries.',
    color: '#22c55e',
  },
]

export default function FreeTrialOnboardingScreen() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const isLast = step === SLIDES.length - 1
  const slide = SLIDES[step]

  return (
    <BaseContainer backgroundColor="#fff">
      {/* Skip */}
      <View style={styles.topBar}>
        <View style={{ width: 44 }} />
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity onPress={() => router.push('/screens/retailer/pro/goProCheckoutScreen' as any)}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slide content */}
      <View style={styles.slideContent}>
        <View style={[styles.iconCircle, { backgroundColor: slide.color + '15' }]}>
          <Feather name={slide.icon as any} size={48} color={slide.color} />
        </View>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideDesc}>{slide.desc}</Text>
      </View>

      {/* Pro badge */}
      <View style={styles.proBadge}>
        <Feather name="award" size={14} color="#f59e0b" />
        <Text style={styles.proBadgeText}>Included in Pro & Enterprise plans</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {step > 0 && (
          <TouchableOpacity style={styles.backBtn} onPress={() => setStep(s => s - 1)}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextBtn, step === 0 && { flex: 1 }]}
          onPress={() =>
            isLast
              ? router.push('/screens/retailer/pro/goProCheckoutScreen' as any)
              : setStep(s => s + 1)
          }
        >
          <Text style={styles.nextBtnText}>{isLast ? 'Start Free Trial' : 'Next'}</Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#e5e7eb' },
  dotActive: { width: 20, backgroundColor: '#0a0a0a' },
  skipText: { fontSize: 14, fontWeight: '600', color: '#9ca3af' },
  slideContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 20 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  slideTitle: { fontSize: 28, fontWeight: '800', color: '#0a0a0a', textAlign: 'center', lineHeight: 36 },
  slideDesc: { fontSize: 16, color: '#6b7280', textAlign: 'center', lineHeight: 26 },
  proBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', backgroundColor: '#fffbeb', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginBottom: 16 },
  proBadgeText: { fontSize: 13, fontWeight: '600', color: '#f59e0b' },
  footer: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: 44 },
  backBtn: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' },
  backBtnText: { fontSize: 15, fontWeight: '700', color: '#374151' },
  nextBtn: { flex: 2, flexDirection: 'row', gap: 8, paddingVertical: 16, borderRadius: 14, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  nextBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
