import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AnalyticsHeaderProps {
  onBack?: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ onBack }) => (
  <View style={s.header}>
    <TouchableOpacity style={s.backBtn} onPress={onBack}>
      <Feather name="arrow-left" size={20} color="#111" />
    </TouchableOpacity>
    <Text style={s.title}>Analytics</Text>
    <View style={{ width: 32 }} />
  </View>
);

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#111' },
});

export default AnalyticsHeader;