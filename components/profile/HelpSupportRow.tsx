// components/profile/HelpSupportRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface HelpSupportRowProps {
  onPress: () => void
}

const HelpSupportRow: React.FC<HelpSupportRowProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 mb-3"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    }}
  >
    <View className="flex-row items-center gap-3">
      <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
        <Feather name="help-circle" size={18} color="#6B7280" />
      </View>
      <Text className="text-sm font-bold text-gray-900">Help & support</Text>
    </View>
    <Feather name="chevron-right" size={18} color="#D1D5DB" />
  </TouchableOpacity>
)

export default HelpSupportRow