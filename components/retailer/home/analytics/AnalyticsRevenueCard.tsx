import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Polyline } from 'react-native-svg';

// ── Sparkline ────────────────────────────────────────────────────────────────
interface SparklineProps {
  data: number[];
  color?: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color = '#00C853' }) => {
  const w = 80, h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <Svg width={w} height={h}>
      <Polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  );
};

// ── Revenue Card ─────────────────────────────────────────────────────────────
interface AnalyticsRevenueCardProps {
  totalRevenue: string;
  revenueChange: string;
  revenueChangePercent: string;
  sparklineData: number[];
}

const AnalyticsRevenueCard: React.FC<AnalyticsRevenueCardProps> = ({
  totalRevenue,
  revenueChange,
  revenueChangePercent,
  sparklineData,
}) => (
  <View style={s.card}>
    <View style={s.left}>
      <View style={s.labelRow}>
        <Text style={s.label}>NET SALES</Text>
        <View style={s.percentBadge}>
          <Feather name="arrow-up-right" size={10} color="#00C853" />
          <Text style={s.percentText}>{revenueChangePercent}</Text>
        </View>
      </View>
      <Text style={s.amount}>{totalRevenue}</Text>
      <View style={s.changeRow}>
        <Feather name="arrow-up-right" size={12} color="#00C853" />
        <Text style={s.changeText}>{revenueChange}</Text>
      </View>
    </View>
    <Sparkline data={sparklineData} color="#00C853" />
  </View>
);

const s = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: {
    fontSize: 10, fontWeight: '700',
    color: 'rgba(255,255,255,0.5)', letterSpacing: 1,
  },
  percentBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  percentText: { fontSize: 11, fontWeight: '700', color: '#00C853' },
  amount: { fontSize: 32, fontWeight: '900', color: '#fff', marginTop: 2 },
  changeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  changeText: { fontSize: 11, color: '#00C853', marginLeft: 2 },
});

export default AnalyticsRevenueCard;