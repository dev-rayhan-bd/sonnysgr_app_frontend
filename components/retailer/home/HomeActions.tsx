import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface ActionItem {
  id: string;
  label: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  badgeCount?: number;
  onPress: () => void;
}

interface HomeActionsProps {
  actions: ActionItem[];
}

const HomeActions: React.FC<HomeActionsProps> = ({ actions }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
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

            <Feather name={action.icon} size={20} color={action.iconColor} />

            <Text style={styles.label} numberOfLines={1}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 18,
  },
  card: {
    flex: 1,
    height: 72,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: 5,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#F59E0B',
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8.5,
    fontWeight: '800',
  },
});

export default HomeActions;