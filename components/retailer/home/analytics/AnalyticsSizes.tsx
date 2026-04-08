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
  // 2. Calculate the percentage as a number first
  const percentage = Math.min(100, (value / (max || 1)) * 100);
  
  // 3. Cast the string to DimensionValue
  const barWidth = `${percentage}%` as DimensionValue;

  return (
    <View style={s.row}>
      <Text style={s.label}>{label}</Text>
      <View style={s.track}>
        <View
          style={[
            s.fill, 
            { 
              width: barWidth, // Now TypeScript is happy
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
    onSeeAll?: () => void;
}

const MAX_SIZE_VALUE = 40;

const AnalyticsSizes: React.FC<AnalyticsSizesProps> = ({ sizes, onSeeAll }) => (
    <View style={[s.section, { marginBottom: 32 }]}>
        <Text style={s.sectionTitle}>Most Requested Sizes</Text>
        {sizes.map(sz => (
            <SizeBar
                key={sz.label}
                label={sz.label}
                value={sz.value}
                max={MAX_SIZE_VALUE}
                color={sz.color}
            />
        ))}
        <TouchableOpacity style={s.seeAllBtn} onPress={onSeeAll}>
            <Text style={s.seeAllText}>See all sizes in most requested input</Text>
            <Feather name="chevron-right" size={13} color="#6B7280" />
        </TouchableOpacity>
    </View>
);

const s = StyleSheet.create({
    section: {
        backgroundColor: '#fff', borderRadius: 14, padding: 16,
        marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
    },
    sectionTitle: { fontSize: 13, fontWeight: '800', color: '#111', marginBottom: 10 },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    label: { width: 36, fontSize: 12, fontWeight: '700', color: '#111' },
    track: {
        flex: 1, height: 8, backgroundColor: '#F3F4F6',
        borderRadius: 4, marginHorizontal: 8,
    },
    fill: { height: 8, borderRadius: 4 },
    val: { fontSize: 11, color: '#6B7280', width: 70, textAlign: 'right' },
    seeAllBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    seeAllText: { fontSize: 11, color: '#6B7280', flex: 1 },
});

export default AnalyticsSizes;