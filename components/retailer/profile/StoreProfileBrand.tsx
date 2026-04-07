import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StoreProfileBrandProps {
  address: string;
  phone: string;
  website: string;
  onAddressChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onWebsiteChange: (v: string) => void;
}

const SECTION_LABEL_STYLE = {
  fontSize: 10, fontWeight: '700' as const,
  color: '#9CA3AF', letterSpacing: 0.8,
  paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6,
  backgroundColor: '#F5F5F5',
} as const;

const ROW_STYLE = {
  backgroundColor: '#fff',
  borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  paddingHorizontal: 16, paddingVertical: 12,
  flexDirection: 'row' as const, alignItems: 'center' as const, gap: 10,
} as const;

const INPUT_STYLE = {
  fontSize: 13, color: '#111', flex: 1, paddingVertical: 0,
} as const;

const rows = [
  { key: 'address', icon: 'map-pin',  placeholder: '123 Ocean Drive…',         keyboard: 'default' },
  { key: 'phone',   icon: 'phone',    placeholder: '+1 (305) 555-0138',         keyboard: 'phone-pad' },
  { key: 'website', icon: 'globe',    placeholder: 'https://sonnykicks.com',    keyboard: 'url' },
] as const;

const StoreProfileBrand: React.FC<StoreProfileBrandProps> = ({
  address, phone, website,
  onAddressChange, onPhoneChange, onWebsiteChange,
}) => {
  const values = { address, phone, website };
  const handlers = {
    address: onAddressChange,
    phone: onPhoneChange,
    website: onWebsiteChange,
  };

  return (
    <View>
      <Text style={SECTION_LABEL_STYLE}>BRAND</Text>
      {rows.map(row => (
        <View key={row.key} style={ROW_STYLE}>
          <Feather name={row.icon as any} size={15} color="#9CA3AF" />
          <TextInput
            value={values[row.key]}
            onChangeText={handlers[row.key]}
            style={INPUT_STYLE}
            placeholder={row.placeholder}
            placeholderTextColor="#C4C4C4"
            keyboardType={row.keyboard as any}
            autoCapitalize="none"
          />
        </View>
      ))}
    </View>
  );
};

export default StoreProfileBrand;