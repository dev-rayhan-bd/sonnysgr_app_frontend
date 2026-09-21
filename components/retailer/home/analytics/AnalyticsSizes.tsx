import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SizeItem } from '@/types/analytics';
import { DimensionValue } from 'react-native';

interface SizeBarProps {
    label: string;
    value: number;
    max: number;
    color: string;
}

const SizeBar: React.FC<SizeBarProps> = ({ label, value, max, color }) => {
  const percentage = Math.min(100, (value / (max || 1)) * 100);
  const barWidth = `${percentage}%` as DimensionValue;

  return (
    <View style={s.row}>
      <Text style={s.label}>{label}</Text>
      <View style={s.track}>
        <View
          style={[
            s.fill,
            {
              width: barWidth,
              backgroundColor: color
            }
          ]}
        />
      </View>
      <Text style={s.val}>{value} searches</Text>
    </View>
  );
};

interface AnalyticsSizesProps {
    sizes: SizeItem[];
    onViewInventoryOpportunities?: () => void;
}

const MAX_SIZE_VALUE = 40;

const AnalyticsSizes: React.FC<AnalyticsSizesProps> = ({ sizes, onViewInventoryOpportunities }) => (
    <View style={[s.section, { marginBottom: 32 }]}>
        <Text style={s.sectionTitle}>Missed Demand by Size</Text>
        <Text style={s.sectionSubtitle}>Searches with no matching inventory</Text>

        <View style={{ marginTop: 12 }}>
            {sizes.map(sz => (
                <SizeBar
                    key={sz.label}
                    label={sz.label}
                    value={sz.value}
                    max={MAX_SIZE_VALUE}
                    color={sz.color}
                />
            ))}
        </View>

        <TouchableOpacity style={s.opportunitiesBtn} onPress={onViewInventoryOpportunities} activeOpacity={0.8}>
            <Text style={s.opportunitiesText}>View Inventory Opportunities</Text>
            <Feather name="chevron-right" size={14} color="#00C853" />
        </TouchableOpacity>
    </View>
);

const s = StyleSheet.create({
    section: {
        backgroundColor: '#fff', borderRadius: 14, padding: 16,
        marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
    },
    sectionTitle: { fontSize: 14, fontWeight: '800', color: '#111' },
    sectionSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    label: { width: 44, fontSize: 12, fontWeight: '700', color: '#111' },
    track: {
        flex: 1, height: 8, backgroundColor: '#F3F4F6',
        borderRadius: 4, marginHorizontal: 8,
    },
    fill: { height: 8, borderRadius: 4 },
    val: { fontSize: 11, color: '#6B7280', width: 72, textAlign: 'right' },
    opportunitiesBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 8,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DCFCE7',
        backgroundColor: '#F0FDF4',
    },
    opportunitiesText: { fontSize: 13, fontWeight: '700', color: '#00C853' },
});

export default AnalyticsSizes;