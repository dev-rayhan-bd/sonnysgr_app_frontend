import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import { ChartMode } from '@/types/analytics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Bar Chart ─────────────────────────────────────────────────────────────────
interface BarChartProps {
  data: number[];
  labels: string[];
  valuePrefix?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, valuePrefix = '$' }) => {
  const chartW = SCREEN_WIDTH - 64;
  const chartH = 110;

  if (!data || data.length === 0) return null;

  const gap = chartW / data.length;
  const barW = gap * 0.55;
  const max = Math.max(...data) || 1;

  return (
    <Svg width={chartW} height={chartH + 46}>
      {data.map((v, i) => {
        const barH = (v / max) * chartH;
        const x = i * gap + (gap - barW) / 2;
        const y = chartH - barH + 20;

        return (
          <G key={`bar-${i}`}>
            <SvgText
              x={x + barW / 2}
              y={y - 6}
              fontSize="11"
              fontWeight="700"
              fill="#111"
              textAnchor="middle"
            >
              {valuePrefix}{v}
            </SvgText>
            <Rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={6}
              fill="#00C853"
            />
            <SvgText
              x={x + barW / 2}
              y={chartH + 40}
              fontSize="11"
              fontWeight="600"
              fill="#9CA3AF"
              textAnchor="middle"
            >
              {labels[i]}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
};

// ── Sales by Day Section ───────────────────────────────────────────────────────
interface AnalyticsRevenueChartProps {
  chartMode: ChartMode;
  barData: number[];
  barLabels: string[];
  onChartModeChange: (mode: ChartMode) => void;
}

const CHART_MODES: ChartMode[] = ['Sales', 'Orders'];

const AnalyticsRevenueChart: React.FC<AnalyticsRevenueChartProps> = ({
  chartMode,
  barData,
  barLabels,
  onChartModeChange,
}) => (
  <View style={s.section}>
    <View style={s.sectionHeader}>
      <Text style={s.sectionTitle}>Sales by Day</Text>
      <View style={s.toggleRow}>
        {CHART_MODES.map(m => (
          <TouchableOpacity
            key={m}
            onPress={() => onChartModeChange(m)}
            style={[s.toggleBtn, chartMode === m && s.toggleBtnActive]}
          >
            <Text style={[s.toggleText, chartMode === m && s.toggleTextActive]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={{ marginTop: 8 }}>
      <BarChart
        data={barData}
        labels={barLabels}
        valuePrefix={chartMode === 'Sales' ? '$' : ''}
      />
    </View>
  </View>
);

const s = StyleSheet.create({
  section: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#111' },
  toggleRow: {
    flexDirection: 'row', backgroundColor: '#111',
    borderRadius: 8, padding: 2,
  },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6 },
  toggleBtnActive: { backgroundColor: '#fff' },
  toggleText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  toggleTextActive: { color: '#111' },
});

export default AnalyticsRevenueChart;