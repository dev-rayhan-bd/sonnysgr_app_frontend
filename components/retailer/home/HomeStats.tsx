import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface StatCard {
  id: string;
  value: string | number;
  label: string;
  subLine: string;
  icon: keyof typeof Feather.glyphMap;
  iconFilled?: boolean;
  variant: 'green' | 'orange';
}

interface HomeStatsProps {
  stats: StatCard[];
}

const variantStyles: Record<
  StatCard['variant'],
  {
    border: string;
    iconBg: string;
    iconColor: string;
    subLineColor: string;
    solidColor: string;
  }
> = {
  green: {
    border: '#BBF7D0',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    subLineColor: '#16A34A',
    solidColor: '#16A34A',
  },

  orange: {
    border: '#FDE68A',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    subLineColor: '#DC2626',
    solidColor: '#F59E0B',
  },
};

const HomeStats: React.FC<HomeStatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      {stats.map((stat) => {
        const v = variantStyles[stat.variant];

        return (
          <View
            key={stat.id}
            style={[
              styles.card,
              {
                borderColor: v.border,
                borderLeftColor: v.solidColor,
                borderLeftWidth: 4,
              },
            ]}
          >
            {/* Icon + Number */}
            <View style={styles.topRow}>
              {stat.iconFilled ? (
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: v.solidColor,
                    },
                  ]}
                >
                  <Text style={styles.iconBang}>!</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: v.iconBg,
                    },
                  ]}
                >
                  <Feather
                    name={stat.icon}
                    size={15}
                    color={v.iconColor}
                  />
                </View>
              )}

              {/* Number + writings */}
              <View style={styles.content}>
                <Text style={styles.value}>{stat.value}</Text>

                <Text style={styles.label}>
                  {stat.label}
                </Text>

                <Text
                  style={[
                    styles.subLine,
                    {
                      color: v.subLineColor,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {stat.subLine}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },

  card: {
    width: '47.5%',
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 13,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  iconBang: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 16,
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  value: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 25,
  },

  label: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 1,
    fontWeight: '500',
  },

  subLine: {
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default HomeStats;