import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface InventoryHeaderProps {
  onSearchPress?: () => void;
  onFilterPress?: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onSearchPress,
  onFilterPress,
}) => {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10,
    }}>
      {/* Back */}
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="chevron-left" size={24} color="#111" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={{ fontSize: 17, fontWeight: '700', color: '#111' }}>
        Inventory
      </Text>

      {/* Right icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <TouchableOpacity onPress={onSearchPress}>
          <Feather name="search" size={20} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFilterPress}>
          <Feather name="filter" size={20} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InventoryHeader;