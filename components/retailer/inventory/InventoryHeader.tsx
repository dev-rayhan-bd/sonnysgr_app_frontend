import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InventoryHeaderProps {
  locationLabel: string;
  onLocationPress?: () => void;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  locationLabel,
  onLocationPress,
  onSearchPress,
  onFilterPress,
}) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#111' }}>
            Inventory
          </Text>

          <TouchableOpacity
            onPress={onLocationPress}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}
          >
            <Feather name="map-pin" size={13} color="#9CA3AF" />
            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
              {locationLabel}
            </Text>
            <Feather name="chevron-down" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 4 }}>
          <TouchableOpacity onPress={onSearchPress} hitSlop={8}>
            <Feather name="search" size={22} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onFilterPress} hitSlop={8}>
            <Feather name="sliders" size={22} color="#111" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InventoryHeader;