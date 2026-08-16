// app/screens/retailer/home/more/syncLogsScreen.tsx
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const LOGS = [
  { id: '1', channel: 'Shopify', status: 'success', items: 12, time: '2 min ago', detail: '12 items updated' },
  { id: '2', channel: 'Square POS', status: 'success', items: 5, time: '15 min ago', detail: '5 items updated' },
  { id: '3', channel: 'Shopify', status: 'error', items: 0, time: '1 hr ago', detail: 'Connection timeout' },
  { id: '4', channel: 'Shopify', status: 'success', items: 8, time: '2 hrs ago', detail: '8 items updated' },
  { id: '5', channel: 'Square POS', status: 'warning', items: 3, time: '3 hrs ago', detail: '3 items skipped (duplicates)' },
  { id: '6', channel: 'Shopify', status: 'success', items: 20, time: 'Yesterday', detail: '20 items updated' },
]

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  success: { color: '#22c55e', bg: '#f0fdf4', icon: 'check-circle' },
  error: { color: '#ef4444', bg: '#fef2f2', icon: 'x-circle' },
  warning: { color: '#f59e0b', bg: '#fffbeb', icon: 'alert-circle' },
}

export default function SyncLogsScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sync Logs</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={18} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Total Syncs', value: '128', icon: 'refresh-cw', color: '#374151' },
          { label: 'Success', value: '121', icon: 'check-circle', color: '#22c55e' },
          { label: 'Errors', value: '7', icon: 'x-circle', color: '#ef4444' },
        ].map(s => (
          <View key={s.label} style={styles.statCard}>
            <Feather name={s.icon as any} size={16} color={s.color} />
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={LOGS}
        keyExtractor={l => l.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const cfg = STATUS_CONFIG[item.status]
          return (
            <View style={styles.logCard}>
              <View style={[styles.logIcon, { backgroundColor: cfg.bg }]}>
                <Feather name={cfg.icon as any} size={18} color={cfg.color} />
              </View>
              <View style={styles.logInfo}>
                <Text style={styles.logChannel}>{item.channel}</Text>
                <Text style={[styles.logDetail, { color: item.status === 'error' ? '#ef4444' : '#6b7280' }]}>
                  {item.detail}
                </Text>
              </View>
              <Text style={styles.logTime}>{item.time}</Text>
            </View>
          )
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  statsRow: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: '#fff' },
  statCard: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 14, padding: 12, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, color: '#9ca3af' },
  list: { padding: 16, paddingBottom: 40 },
  logCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14, padding: 14, gap: 12, alignItems: 'center' },
  logIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  logInfo: { flex: 1 },
  logChannel: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  logDetail: { fontSize: 12 },
  logTime: { fontSize: 11, color: '#9ca3af' },
})
