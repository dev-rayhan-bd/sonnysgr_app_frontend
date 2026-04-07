import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface StoreProfileDetailsProps {
  name: string;
  bio: string;
  onNameChange: (v: string) => void;
  onBioChange: (v: string) => void;
}

const SECTION_LABEL_STYLE = {
  fontSize: 10, fontWeight: '700' as const,
  color: '#9CA3AF', letterSpacing: 0.8,
  paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6,
  backgroundColor: '#F5F5F5',
} as const;

const INPUT_STYLE = {
  fontSize: 13, color: '#111', flex: 1,
  paddingVertical: 0,
} as const;

const StoreProfileDetails: React.FC<StoreProfileDetailsProps> = ({
  name, bio, onNameChange, onBioChange,
}) => {
  return (
    <View>
      <Text style={SECTION_LABEL_STYLE}>STORE DETAILS</Text>

      {/* Store name */}
      <View style={{
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
        paddingHorizontal: 16, paddingVertical: 12,
      }}>
        <TextInput
          value={name}
          onChangeText={onNameChange}
          style={INPUT_STYLE}
          placeholder="Store name"
          placeholderTextColor="#C4C4C4"
        />
      </View>

      {/* Bio */}
      <View style={{
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
        paddingHorizontal: 16, paddingVertical: 12, minHeight: 60,
      }}>
        <TextInput
          value={bio}
          onChangeText={onBioChange}
          style={[INPUT_STYLE, { minHeight: 40 }]}
          placeholder="Tell customers what makes your store special"
          placeholderTextColor="#C4C4C4"
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

export default StoreProfileDetails;