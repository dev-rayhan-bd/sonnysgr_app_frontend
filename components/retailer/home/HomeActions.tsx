import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface ActionItem {
  id: string;
  label: string;
  icon: any;
  iconColor: string;
  bgColor: string; // e.g., '#F0FDF4' for green, '#FFFBEB' for yellow
  badgeCount?: number;
  onPress: () => void;
}

interface HomeActionsProps {
  actions: ActionItem[];
}



const HomeActions: React.FC<HomeActionsProps> = ({ actions }) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          activeOpacity={0.7}
          style={[styles.card, { backgroundColor: action.bgColor }]}
        >
      
          {action.badgeCount ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{action.badgeCount}</Text>
            </View>
          ) : null}

          {/* Icon */}
          <Feather name={action.icon} size={28} color={action.iconColor} />

          {/* Label */}
          <Text style={styles.label}>
            {action.label}
          </Text>
          
          {/* Subtext for new items if applicable */}
          {action.badgeCount ? (
            <Text style={styles.subLabel}>({action.badgeCount} new)</Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    rowGap: 12,
    backgroundColor: '#fff',
  },
  card: {
    width: '48%',
    height: 120, 
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',    
    justifyContent: 'center',  
    position: 'relative',      
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F59E0B',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default HomeActions;