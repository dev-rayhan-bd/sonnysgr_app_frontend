import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatusItem } from '@/types/analytics';

interface AnalyticsOrderStatusProps {
  orderStatus: OrderStatusItem[];
}

const AnalyticsOrderStatus: React.FC<AnalyticsOrderStatusProps> = ({ orderStatus }) => {
  const total = orderStatus.reduce((sum, o) => sum + Number(o.value), 0) || 1;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>Order Status</Text>

      <View style={s.barContainer}>
        {orderStatus.map(o => (
          <View
            key={o.label}
            style={[
              s.segment,
              { flex: Number(o.value) > 0 ? o.value : 0.0001, backgroundColor: o.color }
            ]}
          />
        ))}
      </View>

      {/* Legend */}
      <View style={s.legend}>
        {orderStatus.map(o => {
          const pct = Math.round((Number(o.value) / total) * 1000) / 10;
          return (
            <View key={o.label} style={s.legendItem}>
              <View style={s.legendTopRow}>
                <View style={[s.dot, { backgroundColor: o.color }]} />
                <Text style={s.legendLabel}>{o.label}</Text>
              </View>
              <Text style={s.legendVal}>{o.value}</Text>
              <Text style={s.legendPct}>{pct}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  section: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#111' },
  barContainer: {
    flexDirection: 'row', height: 10, borderRadius: 5,
    overflow: 'hidden', marginTop: 10, marginBottom: 12,
  },
  segment: { height: '100%' },
  legend: { flexDirection: 'row', flexWrap: 'wrap' },
  legendItem: { width: '25%', marginBottom: 8 },
  legendTopRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  legendLabel: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
  legendVal: { fontSize: 13, fontWeight: '800', color: '#111', marginTop: 2 },
  legendPct: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
});

export default AnalyticsOrderStatus;