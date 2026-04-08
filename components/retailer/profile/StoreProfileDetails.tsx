import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

interface StoreProfileDetailsProps {
  name: string;
  bio: string;
  onNameChange: (v: string) => void;
  onBioChange: (v: string) => void;
}

const StoreProfileDetails: React.FC<StoreProfileDetailsProps> = ({
  name, bio, onNameChange, onBioChange,
}) => {
  return (
    <View style={styles.screenBackground}>
      <Text style={styles.sectionLabel}>STORE DETAILS</Text>

      <View style={styles.inputCardContainer}>
        <TextInput
          value={name}
          onChangeText={onNameChange}
          style={styles.input}
          placeholder="Store name"
          placeholderTextColor="#C7C7CC"
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.inputCardContainer}>
        <TextInput
          value={bio}
          onChangeText={onBioChange}
          style={[styles.input, styles.multilineInput]}
          placeholder="Tell customers what makes your store special"
          placeholderTextColor="#C7C7CC"
          multiline
          textAlignVertical="top"
          maxLength={300}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.charCount}>{bio.length}/300</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: '#fff',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  inputCardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFF4',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    // Add subtle shadow for iOS to match "card" feel
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
      },
    }),
  },
  input: {
    fontSize: 15,
    color: '#1C1C1E',
    paddingVertical: 14,
    fontWeight: '400',
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 14,
    paddingBottom: 28, // Space for the counter
  },
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
});

export default StoreProfileDetails;