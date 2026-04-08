import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TimeFilter } from '@/types/analytics';

const TIME_FILTERS: TimeFilter[] = ['Today', 'This Week', 'This Month', 'All Time'];

interface AnalyticsTimeFilterProps {
    active: TimeFilter;
    onChange: (filter: TimeFilter) => void;
}

const AnalyticsTimeFilter: React.FC<AnalyticsTimeFilterProps> = ({ active, onChange }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.scroll}
        contentContainerStyle={s.row}
    >
        {TIME_FILTERS.map(f => (
            <TouchableOpacity
                key={f}
                onPress={() => onChange(f)}
                style={[s.pill, active === f && s.pillActive]}
            >
                <Text style={[s.text, active === f && s.textActive]}>{f}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

const s = StyleSheet.create({
    // 1. Give the ScrollView some height so it doesn't squash the content
    scroll: { 
        flexGrow: 0, 
        marginTop: 8, // Space from the header
    },
    row: { 
        // 2. Add vertical padding here so the tops and bottoms aren't clipped
        paddingVertical: 8, 
        paddingHorizontal: 20, 
        gap: 8, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    pill: {
        paddingHorizontal: 16,
        height: 40, // Slightly taller for better touch target
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        // 3. Remove any marginVertical here, use row padding instead
    },
    pillActive: { 
        backgroundColor: '#111',
        // Optional: add a small shadow if it's not clipping
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    text: { 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#6B7280',
        // 4. Reset these to clean defaults
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    textActive: { color: '#fff' },
});
export default AnalyticsTimeFilter;