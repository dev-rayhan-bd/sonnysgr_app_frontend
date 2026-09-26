// components/profile/ReferralRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ReferralRowProps {
  referralCode: string
  onPress: () => void
}

const ReferralRow: React.FC<ReferralRowProps> = ({ referralCode, onPress }) => (
  <View
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
      <View className="w-10 h-10 bg-orange-50 rounded-xl items-center justify-center">
        <Feather name="gift" size={18} color="#F97316" />
      </View>
      <View>
        <Text className="text-sm font-bold text-gray-900">Invite friends</Text>
        <Text className="text-xs text-gray-400 mt-0.5">Your code: {referralCode}</Text>
      </View>
    </View>

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="border border-green-500 rounded-full px-3.5 py-1.5"
    >
      <Text className="text-xs font-bold text-green-600">Share invite</Text>
    </TouchableOpacity>
  </View>
)

export default ReferralRow