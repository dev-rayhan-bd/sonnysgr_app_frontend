import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DashboardHeaderProps {
  filterLabel?: string;
  onFilterPress?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  filterLabel = 'Today',
  onFilterPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.filterPill} onPress={onFilterPress} activeOpacity={0.7}>
        <Text style={styles.filterText}>{filterLabel}</Text>
        <Feather name="chevron-down" size={14} color="#111" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
});

export default DashboardHeader;