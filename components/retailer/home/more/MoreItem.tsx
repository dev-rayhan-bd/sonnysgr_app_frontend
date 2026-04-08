import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DashboardMenuItem } from '@/services/hooks/retailer/home/useMore';

interface Props {
  item: DashboardMenuItem;
  onPress: (route: string) => void;
}

export const DashboardItem: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => onPress(item.route)}
    activeOpacity={0.7}
  >
    <View style={styles.leftContent}>
      <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
        <Feather name={item.icon as any} size={20} color="#fff" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#D1D5DB" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    // Soft shadow for the "card" look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
});