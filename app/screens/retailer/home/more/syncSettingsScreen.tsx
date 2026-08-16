// app/screens/retailer/home/more/syncSettingsScreen.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const CHANNELS = [
  { id: 'shopify', name: 'Shopify', icon: 'shopping-bag', connected: true, lastSync: '2 min ago' },
  { id: 'square', name: 'Square POS', icon: 'credit-card', connected: true, lastSync: '15 min ago' },
  { id: 'clover', name: 'Clover', icon: 'layers', connected: false, lastSync: 'Never' },
  { id: 'woocommerce', name: 'WooCommerce', icon: 'globe', connected: false, lastSync: 'Never' },
]

export default function SyncSettingsScreen() {
  const router = useRouter()
  const [autoSync, setAutoSync] = useState(true)
  const [syncInterval, setSyncInterval] = useState('15min')
  const [stockAlerts, setStockAlerts] = useState(true)

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sync Settings</Text>
        <TouchableOpacity onPress={() => router.push('/screens/retailer/home/more/syncLogsScreen' as any)}>
          <Text style={styles.logsBtn}>Logs</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Connected channels */}
        <Text style={styles.sectionTitle}>Connected Channels</Text>
        {CHANNELS.map(ch => (
          <View key={ch.id} style={styles.channelRow}>
            <View style={[styles.channelIcon, { backgroundColor: ch.connected ? '#f0fdf4' : '#f3f4f6' }]}>
              <Feather name={ch.icon as any} size={20} color={ch.connected ? '#22c55e' : '#9ca3af'} />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{ch.name}</Text>
              <Text style={[styles.channelStatus, { color: ch.connected ? '#22c55e' : '#9ca3af' }]}>
                {ch.connected ? `Synced ${ch.lastSync}` : 'Not connected'}
              </Text>
            </View>
            <TouchableOpacity style={[styles.connectBtn, ch.connected && styles.connectedBtn]}>
              <Text style={[styles.connectBtnText, ch.connected && styles.connectedBtnText]}>
                {ch.connected ? 'Connected' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Sync preferences */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Sync Preferences</Text>

        <View style={styles.prefRow}>
          <View style={styles.prefInfo}>
            <Text style={styles.prefLabel}>Auto Sync</Text>
            <Text style={styles.prefDesc}>Automatically sync inventory changes</Text>
          </View>
          <Switch value={autoSync} onValueChange={setAutoSync} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>

        <View style={styles.prefRow}>
          <View style={styles.prefInfo}>
            <Text style={styles.prefLabel}>Low Stock Alerts</Text>
            <Text style={styles.prefDesc}>Alert when items fall below threshold</Text>
          </View>
          <Switch value={stockAlerts} onValueChange={setStockAlerts} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Sync Interval</Text>
        <View style={styles.intervalRow}>
          {['5min', '15min', '30min', '1hr'].map(interval => (
            <TouchableOpacity
              key={interval}
              style={[styles.intervalBtn, syncInterval === interval && styles.intervalBtnActive]}
              onPress={() => setSyncInterval(interval)}
            >
              <Text style={[styles.intervalBtnText, syncInterval === interval && styles.intervalBtnTextActive]}>
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.syncNowBtn}>
          <Feather name="refresh-cw" size={16} color="#fff" />
          <Text style={styles.syncNowText}>Sync Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  logsBtn: { fontSize: 14, fontWeight: '600', color: '#22c55e' },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  channelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  channelIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1 },
  channelName: { fontSize: 15, fontWeight: '600', color: '#0a0a0a' },
  channelStatus: { fontSize: 12, marginTop: 2 },
  connectBtn: { backgroundColor: '#0a0a0a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  connectedBtn: { backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#22c55e' },
  connectBtnText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  connectedBtnText: { color: '#22c55e' },
  prefRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 16 },
  prefInfo: { flex: 1 },
  prefLabel: { fontSize: 15, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  prefDesc: { fontSize: 12, color: '#6b7280' },
  intervalRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  intervalBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center' },
  intervalBtnActive: { backgroundColor: '#0a0a0a' },
  intervalBtnText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  intervalBtnTextActive: { color: '#fff' },
  syncNowBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#0a0a0a', borderRadius: 14, paddingVertical: 16 },
  syncNowText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
