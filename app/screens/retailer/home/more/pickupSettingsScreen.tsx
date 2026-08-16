// app/screens/retailer/home/more/pickupSettingsScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const BRANCHES = [
  { id: '1', name: 'Main Store', address: '123 Main St, Miami, FL' },
  { id: '2', name: 'Brickell Branch', address: '456 Brickell Ave, Miami, FL' },
]

const TIME_WINDOWS = ['9:00 AM – 1:00 PM', '1:00 PM – 5:00 PM', '5:00 PM – 8:00 PM']

export default function PickupSettingsScreen() {
  const router = useRouter()
  const [selectedBranch, setSelectedBranch] = useState('1')
  const [selectedWindow, setSelectedWindow] = useState(0)
  const [notifyReady, setNotifyReady] = useState(true)
  const [notifyReminder, setNotifyReminder] = useState(true)
  const [prepTime, setPrepTime] = useState('30')
  const [holdDuration, setHoldDuration] = useState('48')

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Branch selection */}
        <Text style={styles.sectionTitle}>Branch Selection</Text>
        {BRANCHES.map(branch => (
          <TouchableOpacity
            key={branch.id}
            style={[styles.branchRow, selectedBranch === branch.id && styles.branchRowActive]}
            onPress={() => setSelectedBranch(branch.id)}
          >
            <View style={[styles.radio, selectedBranch === branch.id && styles.radioActive]}>
              {selectedBranch === branch.id && <View style={styles.radioDot} />}
            </View>
            <View style={styles.branchInfo}>
              <Text style={styles.branchName}>{branch.name}</Text>
              <Text style={styles.branchAddr}>{branch.address}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Pickup window */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Pickup Time Window</Text>
        {TIME_WINDOWS.map((w, i) => (
          <TouchableOpacity key={w} style={[styles.windowRow, selectedWindow === i && styles.windowRowActive]} onPress={() => setSelectedWindow(i)}>
            <View style={[styles.radio, selectedWindow === i && styles.radioActive]}>
              {selectedWindow === i && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.windowText}>{w}</Text>
          </TouchableOpacity>
        ))}

        {/* Prep time */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Preparation Time (minutes)</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
            style={styles.numInput}
          />
          <Text style={styles.inputUnit}>min</Text>
        </View>

        {/* Hold duration */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Hold Duration (hours)</Text>
        <View style={styles.holdRow}>
          {['24', '48', '72'].map(h => (
            <TouchableOpacity
              key={h}
              style={[styles.holdBtn, holdDuration === h && styles.holdBtnActive]}
              onPress={() => setHoldDuration(h)}
            >
              <Text style={[styles.holdBtnText, holdDuration === h && styles.holdBtnTextActive]}>{h}h</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Order Ready Notifications</Text>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Notify when order is ready</Text>
            <Text style={styles.switchDesc}>Send customer notification when pickup is prepared</Text>
          </View>
          <Switch value={notifyReady} onValueChange={setNotifyReady} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Send pickup reminder</Text>
            <Text style={styles.switchDesc}>Remind customer 2hrs before hold expires</Text>
          </View>
          <Switch value={notifyReminder} onValueChange={setNotifyReminder} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>

        {/* Policies */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Pickup Instructions</Text>
        <View style={styles.policyCard}>
          {[
            { icon: 'clock', text: `Hold duration: ${holdDuration} hours after notification` },
            { icon: 'alert-circle', text: 'Late pickup: Item returned to inventory' },
            { icon: 'x-circle', text: 'No-show: Deposit forfeited after 2nd missed pickup' },
          ].map(p => (
            <View key={p.text} style={styles.policyRow}>
              <Feather name={p.icon as any} size={14} color="#6b7280" />
              <Text style={styles.policyText}>{p.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveBtnText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  branchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderRadius: 14, paddingHorizontal: 8, marginHorizontal: -8, marginBottom: 4 },
  branchRowActive: { backgroundColor: '#f9fafb' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#0a0a0a' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0a0a0a' },
  branchInfo: { flex: 1 },
  branchName: { fontSize: 15, fontWeight: '600', color: '#0a0a0a' },
  branchAddr: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  windowRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderRadius: 14, paddingHorizontal: 8, marginHorizontal: -8 },
  windowRowActive: { backgroundColor: '#f9fafb' },
  windowText: { fontSize: 14, color: '#374151' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  numInput: { fontSize: 20, fontWeight: '700', color: '#0a0a0a', flex: 1 },
  inputUnit: { fontSize: 14, color: '#6b7280' },
  holdRow: { flexDirection: 'row', gap: 10 },
  holdBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center' },
  holdBtnActive: { backgroundColor: '#0a0a0a' },
  holdBtnText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  holdBtnTextActive: { color: '#fff' },
  switchRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 16 },
  switchInfo: { flex: 1 },
  switchLabel: { fontSize: 15, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  switchDesc: { fontSize: 12, color: '#6b7280' },
  policyCard: { backgroundColor: '#f9fafb', borderRadius: 14, padding: 14, gap: 10 },
  policyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  policyText: { fontSize: 13, color: '#374151', flex: 1, lineHeight: 19 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  saveBtn: { backgroundColor: '#0a0a0a', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
