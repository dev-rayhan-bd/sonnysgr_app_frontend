// app/screens/reseller/visibilityControlsScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

interface ControlItem {
  id: string
  label: string
  desc: string
  value: boolean
}

export default function VisibilityControlsScreen() {
  const router = useRouter()
  const [controls, setControls] = useState<ControlItem[]>([
    { id: 'profile', label: 'Public Profile', desc: 'Allow anyone to view your reseller profile', value: true },
    { id: 'listings', label: 'Show Listings Publicly', desc: 'Display your active listings to all users', value: true },
    { id: 'price', label: 'Show Prices', desc: 'Show prices on public listing cards', value: true },
    { id: 'location', label: 'Show Approximate Location', desc: 'Show your city/region on profile', value: false },
    { id: 'activity', label: 'Show Activity Feed', desc: 'Let followers see your recent activity', value: true },
    { id: 'online', label: 'Show Online Status', desc: "Let buyers know when you're active", value: false },
    { id: 'analytics', label: 'Share Stats', desc: 'Show total sales count on profile', value: true },
    { id: 'search', label: 'Appear in Search', desc: 'Include profile in user discovery', value: true },
  ])

  const toggle = (id: string) => {
    setControls(prev => prev.map(c => c.id === id ? { ...c, value: !c.value } : c))
  }

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Visibility Controls</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDesc}>Control what others can see on your reseller profile and listings.</Text>

        <Text style={styles.sectionTitle}>Profile Visibility</Text>
        {controls.slice(0, 4).map(item => (
          <View key={item.id} style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={() => toggle(item.id)}
              trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }}
              thumbColor="#fff"
            />
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Activity & Discovery</Text>
        {controls.slice(4).map(item => (
          <View key={item.id} style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={() => toggle(item.id)}
              trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionDesc: { fontSize: 14, color: '#6b7280', lineHeight: 21, marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 16 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  rowDesc: { fontSize: 12, color: '#6b7280', lineHeight: 17 },
})
