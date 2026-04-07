import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  badgeCount?: number;
  onPress: () => void;
}

interface HomeActionsProps {
  actions: ActionItem[];
}

const HomeActions: React.FC<HomeActionsProps> = ({ actions }) => {
  return (
    <View style={{
      flexDirection: 'row', flexWrap: 'wrap',
      paddingHorizontal: 14, paddingBottom: 14,
      backgroundColor: '#fff', gap: 10,
    }}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          activeOpacity={0.7}
          style={{
            // exactly 2 per row accounting for gap
            width: '47.5%',
            backgroundColor: '#fff',
            borderWidth: 1, borderColor: '#E5E7EB',
            borderRadius: 16,
            paddingVertical: 18, paddingHorizontal: 12,
            alignItems: 'center', gap: 6,
          }}
        >
          {/* Icon + optional badge */}
          <View style={{ position: 'relative' }}>
            <Feather name={action.icon as any} size={22} color={action.iconColor} />
            {action.badgeCount != null && action.badgeCount > 0 && (
              <View style={{
                position: 'absolute', top: -6, right: -8,
                backgroundColor: '#F97316', borderRadius: 10,
                width: 16, height: 16, alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>
                  {action.badgeCount}
                </Text>
              </View>
            )}
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', textAlign: 'center' }}>
            {action.badgeCount != null
              ? `${action.label} (${action.badgeCount} new)`
              : action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeActions;