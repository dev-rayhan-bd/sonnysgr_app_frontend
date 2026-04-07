import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FilterTab } from '@/services/hooks/retailer/inventory/useInventory';

interface InventoryFilterProps {
  tabs: FilterTab[];
  active: FilterTab;
  counts: Record<FilterTab, number>;
  onChange: (tab: FilterTab) => void;
}

const InventoryFilter: React.FC<InventoryFilterProps> = ({
  tabs, active, counts, onChange,
}) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
    }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14, paddingVertical: 10, gap: 8,
        }}
      >
        {tabs.map(tab => {
          const isActive = tab === active;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onChange(tab)}
              activeOpacity={0.7}
              style={{
                backgroundColor: isActive ? '#00C853' : '#F3F4F6',
                borderRadius: 20,
                paddingHorizontal: 14, paddingVertical: 5,
              }}
            >
              <Text style={{
                fontSize: 12,
                fontWeight: '700',
                color: isActive ? '#fff' : '#374151',
              }}>
                {tab} ({counts[tab]})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default InventoryFilter;