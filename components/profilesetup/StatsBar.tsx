import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  nearby: number;
  following: number;
  newDrops: number;
}

export default function StatsBar({ nearby, following, newDrops }: Props) {
  return (
    <View style={styles.container}>
      <StatCard 
        value={nearby} 
        label="Nearby" 
        colors={['#3B82F6', '#2563EB']} 
        iconName="map-pin" 
      />
      <StatCard 
        value={following} 
        label="Following" 
        colors={['#22C55E', '#16A34A']} 
        iconName="star" 
      />
      <StatCard 
        value={newDrops} 
        label="New Drops" 
        colors={['#F59E0B', '#D97706']} 
        iconName="zap" 
      />
    </View>
  );
}

function StatCard({
  value,
  label,
  colors,
  iconName,
}: {
  value: number;
  label: string;
  colors: [string, string, ...string[]];
  iconName: keyof typeof Feather.glyphMap;
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Feather 
        name={iconName} 
        size={16} 
        color="rgba(255, 255, 255, 0.6)" 
        style={styles.icon} 
      />
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  card: {
    flex: 1,
    borderRadius: 22,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    // Glassy border effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    marginBottom: 6,
  },
  value: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: -2,
  },
});