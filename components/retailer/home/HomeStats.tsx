import React from 'react';
import { View, Text } from 'react-native';

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
    <View style={{
      flexDirection: 'row', gap: 10,
      paddingHorizontal: 14, paddingVertical: 14,
      backgroundColor: '#fff',
    }}>
      {stats.map(stat => {
        const isWarning = stat.variant === 'warning';
        const isRevenue = stat.variant === 'revenue';

        return (
          <View
            key={stat.id}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderWidth: isWarning ? 1.5 : 1,
              borderColor: isWarning ? '#F59E0B' : '#E5E7EB',
              borderRadius: 16,
              padding: 12,
            }}
          >
            {/* Main value */}
            <Text style={{
              fontSize: isRevenue ? 20 : 24,
              fontWeight: '800',
              color: isWarning ? '#F59E0B' : '#111',
            }}>
              {stat.value}
            </Text>

            {/* Label */}
            <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
              {stat.label}
            </Text>

            {/* Sub line */}
            <Text style={{
              fontSize: 11,
              fontWeight: isWarning || isRevenue ? '600' : '400',
              color: isWarning ? '#F59E0B' : isRevenue ? '#00C853' : '#9CA3AF',
              marginTop: 4,
            }}>
              {stat.subLine}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default HomeStats;