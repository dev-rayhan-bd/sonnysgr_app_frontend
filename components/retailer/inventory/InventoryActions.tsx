import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InventoryActionsProps {
  onAddProduct?: () => void;
  onScan?: () => void;
}

const InventoryActions: React.FC<InventoryActionsProps> = ({ onAddProduct, onScan }) => {
  return (
    <View style={{
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 14,
      backgroundColor: '#fff',
    }}>
      <TouchableOpacity
        onPress={onAddProduct}
        activeOpacity={0.85}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#00C853',
          borderRadius: 14,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Feather name="plus" size={18} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800' }}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onScan}
        activeOpacity={0.85}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 14,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Feather name="maximize" size={16} color="#111" />
        <Text style={{ color: '#111', fontSize: 14, fontWeight: '800' }}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InventoryActions;