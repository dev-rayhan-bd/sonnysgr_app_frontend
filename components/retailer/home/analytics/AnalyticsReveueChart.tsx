import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText ,G} from 'react-native-svg';
import { ChartMode } from '@/types/analytics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Bar Chart ─────────────────────────────────────────────────────────────────
interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartW = SCREEN_WIDTH - 64; // Adjusted for padding
  const chartH = 100;
  
  // Safety checks for data
  if (!data || data.length === 0) return null;
  
  const gap = chartW / data.length;
  const barW = gap * 0.6; // Slightly wider bars for better tap target
  const max = Math.max(...data) || 1; // Prevent division by zero

  return (
    <Svg width={chartW} height={chartH + 30}>
      {data.map((v, i) => {
        const barH = (v / max) * chartH;
        const x = i * gap + (gap - barW) / 2;
        const y = chartH - barH;
        
        // Match the "highlighted" look from your previous image
        const isLatest = i === data.length - 1; 

        return (
          <G key={`bar-${i}`}> 
            <Rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={6} // Rounded tops
              fill={isLatest ? '#111' : '#E5E7EB'}
            />
            <SvgText
              x={x + barW / 2}
              y={chartH + 18}
              fontSize="10"
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

// ── Revenue Chart Section ─────────────────────────────────────────────────────
interface AnalyticsRevenueChartProps {
  chartMode: ChartMode;
  barData: number[];
  barLabels: string[];
  onChartModeChange: (mode: ChartMode) => void;
}

const CHART_MODES: ChartMode[] = ['Daily', 'Weekly'];

const AnalyticsRevenueChart: React.FC<AnalyticsRevenueChartProps> = ({
  chartMode,
  barData,
  barLabels,
  onChartModeChange,
}) => (
  <View style={s.section}>
    <View style={s.sectionHeader}>
      <Text style={s.sectionTitle}>Revenue Order Tiles</Text>
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
    <View style={{ marginTop: 12 }}>
      <BarChart data={barData} labels={barLabels} />
    </View>
  </View>
);

const s = StyleSheet.create({
  section: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#111' },
  toggleRow: {
    flexDirection: 'row', backgroundColor: '#F3F4F6',
    borderRadius: 8, padding: 2,
  },
  toggleBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  toggleBtnActive: { backgroundColor: '#111' },
  toggleText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  toggleTextActive: { color: '#fff' },
});

export default AnalyticsRevenueChart;