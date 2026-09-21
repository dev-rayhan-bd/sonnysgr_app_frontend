import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TimeFilter } from '@/types/analytics';

const TIME_FILTERS: TimeFilter[] = ['Today', 'Week', 'Month', 'Custom'];

interface AnalyticsTimeFilterProps {
    active: TimeFilter;
    onChange: (filter: TimeFilter) => void;
}

const AnalyticsTimeFilter: React.FC<AnalyticsTimeFilterProps> = ({ active, onChange }) => (
    <View style={s.row}>
        {TIME_FILTERS.map(f => (
            <TouchableOpacity
                key={f}
                onPress={() => onChange(f)}
                style={[s.pill, active === f && s.pillActive]}
                activeOpacity={0.8}
            >
                <Text style={[s.text, active === f && s.textActive]}>{f}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 8,
        backgroundColor: '#fff',
    },
    pill: {
        flex: 1,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillActive: {
        backgroundColor: '#111',
    },
    text: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B7280',
    },
    textActive: {
        color: '#fff',
    },
});

export default AnalyticsTimeFilter;