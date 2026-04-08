import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const RatingSummary = ({ stats }: { stats: any }) => (
  <View style={s.container}>
    <View style={s.blackCard}>
      <Text style={s.cardLabel}>STORE RATING</Text>
      <Text style={s.ratingMain}>{stats.average}</Text>
      <View style={s.starsRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesome key={i} name="star" size={20} color="#F59E0B" style={{ marginHorizontal: 2 }} />
        ))}
      </View>
      <Text style={s.countText}>{stats.totalCount} reviews</Text>

      <View style={s.divider} />

      {stats.categories.map((cat: any) => (
        <View key={cat.label} style={s.catRow}>
          <Text style={s.catLabel}>{cat.label}</Text>
          <View style={s.barBg}><View style={[s.barFill, { width: `${(cat.rating / 5) * 100}%` }]} /></View>
          <Text style={s.catVal}>{cat.rating}</Text>
        </View>
      ))}
    </View>

    <View style={s.distribution}>
      {stats.distribution.map((item: any) => (
        <View key={item.stars} style={s.distRow}>
          <Text style={s.distStar}>{item.stars}★</Text>
          <View style={s.distBarBg}><View style={[s.distBarFill, { width: `${item.percentage}%`, backgroundColor: item.color }]} /></View>
          <Text style={s.distPerc}>{item.percentage}%</Text>
        </View>
      ))}
    </View>
  </View>
);

const s = StyleSheet.create({
  container: { padding: 16 },
  blackCard: { backgroundColor: '#111', borderRadius: 24, padding: 20, alignItems: 'center' },
  cardLabel: { color: '#10B981', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  ratingMain: { color: '#fff', fontSize: 56, fontWeight: '900', marginVertical: 4 },
  starsRow: { flexDirection: 'row', marginBottom: 8 },
  countText: { color: '#6B7280', fontSize: 12 },
  divider: { height: 1, backgroundColor: '#222', width: '100%', marginVertical: 16 },
  catRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  catLabel: { color: '#9CA3AF', fontSize: 11, width: 100 },
  barBg: { flex: 1, height: 4, backgroundColor: '#222', borderRadius: 2, marginHorizontal: 12 },
  barFill: { height: 4, backgroundColor: '#10B981', borderRadius: 2 },
  catVal: { color: '#fff', fontSize: 11, fontWeight: '700', width: 20 },
  distribution: { marginTop: 24, paddingHorizontal: 10 },
  distRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  distStar: { fontSize: 11, color: '#4B5563', width: 25 },
  distBarBg: { flex: 1, height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, marginHorizontal: 12 },
  distBarFill: { height: 4, borderRadius: 2 },
  distPerc: { fontSize: 11, color: '#9CA3AF', width: 30, textAlign: 'right' }
});