// app/screens/discover/releaseCalendarScreen.tsx
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

interface Drop {
  id: string
  name: string
  brand: string
  date: string
  time: string
  price: number
  isNotified: boolean
}

const DROPS: Drop[] = [
  { id: '1', name: 'Air Jordan 1 "Chicago"', brand: 'Jordan', date: 'Today', time: '10:00 AM', price: 180, isNotified: true },
  { id: '2', name: 'Nike Dunk Low Panda', brand: 'Nike', date: 'Tomorrow', time: '9:00 AM', price: 110, isNotified: false },
  { id: '3', name: 'Yeezy 350 V2 Cream', brand: 'Adidas', date: 'Aug 20', time: '12:00 PM', price: 220, isNotified: true },
  { id: '4', name: 'New Balance 2002R', brand: 'New Balance', date: 'Aug 22', time: '10:00 AM', price: 150, isNotified: false },
  { id: '5', name: 'Air Max 1 "Patta"', brand: 'Nike', date: 'Aug 25', time: '8:00 AM', price: 160, isNotified: false },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TODAY = 16

export default function ReleaseCalendarScreen() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState(TODAY)
  const [drops, setDrops] = useState(DROPS)

  const toggleNotify = (id: string) => {
    setDrops(prev => prev.map(d => d.id === id ? { ...d, isNotified: !d.isNotified } : d))
  }

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Release Calendar</Text>
        <TouchableOpacity>
          <Feather name="filter" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Month + week strip */}
      <Text style={styles.monthLabel}>August 2026</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calRow}>
        {Array.from({ length: 14 }, (_, i) => {
          const day = i + 10
          const dayName = DAYS[(i + 5) % 7]
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dayCell, selectedDay === day && styles.dayCellActive]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayName, selectedDay === day && styles.dayTextActive]}>{dayName}</Text>
              <Text style={[styles.dayNum, selectedDay === day && styles.dayTextActive]}>{day}</Text>
              {[16, 17, 20, 22, 25].includes(day) && (
                <View style={[styles.dropDot, selectedDay === day && styles.dropDotActive]} />
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      {/* Drop list */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {drops.map(drop => (
          <View key={drop.id} style={styles.dropCard}>
            <View style={styles.dropImageBox} />
            <View style={styles.dropInfo}>
              <Text style={styles.dropBrand}>{drop.brand}</Text>
              <Text style={styles.dropName}>{drop.name}</Text>
              <View style={styles.dropMeta}>
                <Feather name="clock" size={12} color="#6b7280" />
                <Text style={styles.dropTime}>{drop.date} · {drop.time}</Text>
              </View>
              <Text style={styles.dropPrice}>${drop.price} retail</Text>
            </View>
            <TouchableOpacity
              style={[styles.notifyBtn, drop.isNotified && styles.notifyBtnActive]}
              onPress={() => toggleNotify(drop.id)}
            >
              <Feather
                name={drop.isNotified ? 'bell' : 'bell-off'}
                size={14}
                color={drop.isNotified ? '#22c55e' : '#9ca3af'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  monthLabel: { fontSize: 14, fontWeight: '600', color: '#374151', paddingHorizontal: 16, paddingTop: 8 },
  calRow: { paddingHorizontal: 12, paddingVertical: 12, gap: 6 },
  dayCell: { width: 48, paddingVertical: 10, alignItems: 'center', borderRadius: 14, gap: 4 },
  dayCellActive: { backgroundColor: '#0a0a0a' },
  dayName: { fontSize: 11, color: '#9ca3af', fontWeight: '500' },
  dayNum: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  dayTextActive: { color: '#fff' },
  dropDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#22c55e' },
  dropDotActive: { backgroundColor: '#fff' },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 40 },
  dropCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', padding: 12, gap: 12, alignItems: 'center' },
  dropImageBox: { width: 72, height: 72, backgroundColor: '#f9fafb', borderRadius: 12 },
  dropInfo: { flex: 1 },
  dropBrand: { fontSize: 11, color: '#6b7280', marginBottom: 2 },
  dropName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 4 },
  dropMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  dropTime: { fontSize: 12, color: '#6b7280' },
  dropPrice: { fontSize: 13, fontWeight: '600', color: '#22c55e' },
  notifyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  notifyBtnActive: { backgroundColor: '#f0fdf4' },
})
