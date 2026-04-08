import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

// Removed onSave and isSaving props as they are no longer needed here
const StoreProfileHeader: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Feather name="chevron-left" size={26} color="#111" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        Store Profile
      </Text>

      {/* 
         Empty View on the right to keep the title perfectly centered 
         using the "space-between" layout 
      */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40, // Matches backButton width to ensure center alignment
  },
});

export default StoreProfileHeader;