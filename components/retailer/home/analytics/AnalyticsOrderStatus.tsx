import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatusItem } from '@/types/analytics';

interface AnalyticsOrderStatusProps {
  orderStatus: OrderStatusItem[];
}

const AnalyticsOrderStatus: React.FC<AnalyticsOrderStatusProps> = ({ orderStatus }) => (
  <View style={s.section}>
    <Text style={s.sectionTitle}>Order Status</Text>

<View style={s.barContainer}>
  {orderStatus.map(o => (
    <View
      key={o.label}
      style={[
        s.segment, 
        // Ensure flex is at least a tiny decimal if value is 0 
        // to prevent layout calculation warnings
        { flex: Number(o.value) > 0 ? o.value : 0.0001, backgroundColor: o.color }
      ]}
    />
  ))}
</View>

    {/* Legend */}
    <View style={s.legend}>
      {orderStatus.map(o => (
        <View key={o.label} style={s.legendItem}>
          <View style={[s.dot, { backgroundColor: o.color }]} />
          <Text style={s.legendLabel}>{o.label}</Text>
          <Text style={s.legendVal}>{o.value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const s = StyleSheet.create({
  section: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
  },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#111' },
  barContainer: {
    flexDirection: 'row', height: 10, borderRadius: 5,
    overflow: 'hidden', marginTop: 10, marginBottom: 12,
  },
  segment: { height: 10 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  legendLabel: { fontSize: 11, color: '#6B7280', marginRight: 4 },
  legendVal: { fontSize: 11, fontWeight: '700', color: '#111' },
});

export default AnalyticsOrderStatus;