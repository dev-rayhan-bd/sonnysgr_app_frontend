import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface StatCard {
  id: string;
  value: string | number;
  label: string;
  subLine: string;
  variant: 'default' | 'warning' | 'revenue';
}

interface HomeStatsProps {
  stats: StatCard[];
}

const HomeStats: React.FC<HomeStatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      {stats.map((stat) => {
        const isWarning = stat.variant === 'warning';
        const isRevenue = stat.variant === 'revenue';
        
        // Match the specific colors from the UI image
        const accentColor = isWarning ? '#F59E0B' : '#22C55E';
        const subLineColor = isWarning ? '#EF4444' : '#22C55E';

        return (
          <View
            key={stat.id}
            style={[
              styles.card,
              { borderLeftColor: accentColor }
            ]}
          >
            {/* Main value */}
            <Text style={[styles.value, isWarning && { color: '#F59E0B' }]}>
              {stat.value}
            </Text>

            {/* Label */}
            <Text style={styles.label}>
              {stat.label}
            </Text>

            {/* Sub line */}
            <Text style={[
              styles.subLine,
              { color: (isWarning || isRevenue) ? subLineColor : '#22C55E' }
            ]}>
              {/* Optional: Add the arrow icons if needed */}
              {isRevenue && '↑ '}{!isWarning && !isRevenue && '📈 '}{stat.subLine}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    // The "Design" feel: light border all around, thick accent on left
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 5,
    // Shadow/Elevation for a modern look
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  label: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  subLine: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default HomeStats;