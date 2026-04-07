import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StoreProfileSocialProps {
  instagram: string;
  onInstagramChange: (v: string) => void;
}

const SECTION_LABEL_STYLE = {
  fontSize: 10, fontWeight: '700' as const,
  color: '#9CA3AF', letterSpacing: 0.8,
  paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6,
  backgroundColor: '#F5F5F5',
} as const;

const StoreProfileSocial: React.FC<StoreProfileSocialProps> = ({
  instagram, onInstagramChange,
}) => {
  return (
    <View>
      <Text style={SECTION_LABEL_STYLE}>SOCIAL</Text>
      <View style={{
        backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
        paddingHorizontal: 16, paddingVertical: 12,
        flexDirection: 'row', alignItems: 'center', gap: 10,
      }}>
        <Feather name="instagram" size={15} color="#9CA3AF" />
        <TextInput
          value={instagram}
          onChangeText={onInstagramChange}
          style={{ fontSize: 13, color: '#111', flex: 1, paddingVertical: 0 }}
          placeholder="@handle"
          placeholderTextColor="#C4C4C4"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default StoreProfileSocial;