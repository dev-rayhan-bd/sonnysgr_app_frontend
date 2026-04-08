import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StoreProfileBrandProps {
  address: string;
  phone: string;
  website: string;
  onAddressChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onWebsiteChange: (v: string) => void;
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  // The same "Card" Container style, modified slightly to include the icon
  inputCardContainerWithIcon: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EFEFF4',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16, // Explicit left padding to space the icon from card edge
  },
  icon: {
    marginRight: 10, // Spaces icon from input text
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
    paddingVertical: 12, // Consistent height for all inputs
  },
});

const StoreProfileBrand: React.FC<StoreProfileBrandProps> = ({
  address, phone, website,
  onAddressChange, onPhoneChange, onWebsiteChange,
}) => {
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Text style={styles.sectionLabel}>BRAND</Text>
      
      {/* Address Card */}
      <View style={styles.inputCardContainerWithIcon}>
        <Feather name="map-pin" size={15} color="#9CA3AF" style={styles.icon} />
        <TextInput
          value={address}
          onChangeText={onAddressChange}
          style={styles.input}
          placeholder="123 Ocean Drive…"
          placeholderTextColor="#C7C7CC"
          autoCapitalize="words" // Hint for addresses
        />
      </View>

      {/* Phone Card */}
      <View style={styles.inputCardContainerWithIcon}>
        <Feather name="phone" size={15} color="#9CA3AF" style={styles.icon} />
        <TextInput
          value={phone}
          onChangeText={onPhoneChange}
          style={styles.input}
          placeholder="+1 (305) 555-0138"
          placeholderTextColor="#C7C7CC"
          keyboardType="phone-pad"
        />
      </View>

      {/* Website Card */}
      <View style={styles.inputCardContainerWithIcon}>
        <Feather name="globe" size={15} color="#9CA3AF" style={styles.icon} />
        <TextInput
          value={website}
          onChangeText={onWebsiteChange}
          style={styles.input}
          placeholder="https://sonnykicks.com"
          placeholderTextColor="#C7C7CC"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default StoreProfileBrand;