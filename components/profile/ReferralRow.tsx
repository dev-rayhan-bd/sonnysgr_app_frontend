// components/profile/ReferralRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ReferralRowProps {
  referralCode: string
  onPress: () => void
}

const ReferralRow: React.FC<ReferralRowProps> = ({ referralCode, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="flex-row items-center justify-between bg-white rounded-3xl px-5 py-5 mb-8"
    style={{ 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08, 
      shadowRadius: 15, 
      elevation: 4 
    }}
  >
    <View className="flex-row items-center gap-4">
      {/* Larger Icon Container */}
      <View className="w-12 h-12 bg-orange-100 rounded-2xl items-center justify-center">
        <Feather name="gift" size={22} color="#F97316" />
      </View>
      
      <View>
        <Text className="text-lg font-black text-gray-900 tracking-tight">Invite Friends</Text>
        <View className="flex-row items-center gap-1.5 mt-0.5">
          <Text className="text-sm font-bold text-orange-500">Code: {referralCode}</Text>
          <Feather name="copy" size={12} color="#F97316" />
        </View>
      </View>
    </View>

    <View className="bg-gray-50 p-2 rounded-full">
      <Feather name="chevron-right" size={20} color="#6B7280" />
    </View>
  </TouchableOpacity>
)

export default ReferralRow