import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface StoreProfileHeaderProps {
  onSave?: () => void;
  isSaving?: boolean;
}

const StoreProfileHeader: React.FC<StoreProfileHeaderProps> = ({
  onSave,
  isSaving = false,
}) => {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10,
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="chevron-left" size={24} color="#111" />
      </TouchableOpacity>

      <Text style={{ fontSize: 17, fontWeight: '700', color: '#111' }}>
        Store Profile
      </Text>

      <TouchableOpacity onPress={onSave} disabled={isSaving}>
        <Text style={{
          fontSize: 15, fontWeight: '700',
          color: isSaving ? '#9CA3AF' : '#00C853',
        }}>
          {isSaving ? 'Saving…' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoreProfileHeader;