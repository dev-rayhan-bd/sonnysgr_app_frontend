// components/profile/MembershipCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import type { MemberTier } from '@/services/hooks/profile/useProfile'

interface MembershipCardProps {
  memberTier: MemberTier
  nextTier: MemberTier
  points: number
  pointsToNextTier: number
  pointsProgress: number
  tierColor: string
  onViewBenefits: () => void
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  memberTier,
  nextTier,
  points,
  pointsToNextTier,
  pointsProgress,
  tierColor,
  onViewBenefits,
}) => {
  const percent = Math.min(pointsProgress * 100, 100)
  const remaining = Math.max(pointsToNextTier - points, 0)

  return (
    <LinearGradient
      colors={['#FEF3C7', '#FFFBEB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.3 }}
      className="rounded-2xl px-4 py-4 mb-4"
    >
      <View className="flex-row justify-between items-center mb-2.5">
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons name="trophy" size={18} color={tierColor} />
          <Text className="text-[15px] font-extrabold" style={{ color: tierColor }}>
            {memberTier} member
          </Text>
        </View>

        <TouchableOpacity onPress={onViewBenefits} className="flex-row items-center gap-0.5">
          <Text className="text-xs font-bold text-gray-500">View benefits</Text>
          <Feather name="chevron-right" size={13} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-baseline gap-1.5 mb-2">
        <Text className="text-[13px] font-bold text-gray-700">
          {points.toLocaleString()} / {pointsToNextTier.toLocaleString()} points
        </Text>
        <Text className="text-xs font-bold" style={{ color: tierColor }}>
          {Math.round(percent)}%
        </Text>
      </View>

      <View className="h-2 bg-white/70 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${percent}%`, backgroundColor: tierColor }}
        />
      </View>

      <Text className="text-xs text-gray-500 mt-2">
        {remaining.toLocaleString()} points to {nextTier}
      </Text>
    </LinearGradient>
  )
}

export default MembershipCard