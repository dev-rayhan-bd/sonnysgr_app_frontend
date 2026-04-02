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
}) => (
  <View className="mb-4 shadow-lg" style={{ shadowColor: tierColor, shadowOpacity: 0.15, shadowRadius: 15, elevation: 5 }}>
    <LinearGradient
      // Approximating your 135deg gradient with the simplified yellow palette
      colors={['#FEF9C3', '#FFFBEB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl px-5 py-6 border border-white/50"
    >
      {/* Top row - Scaled Up */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-2">
          <View className="bg-white/40 p-1.5 rounded-lg">
            <MaterialCommunityIcons name="trophy" size={22} color={tierColor} />
          </View>
          <Text className="text-lg font-black tracking-tight" style={{ color: tierColor }}>
            {memberTier} Member
          </Text>
        </View>

        <TouchableOpacity 
          onPress={onViewBenefits} 
          className="flex-row items-center gap-1 bg-white/40 px-3 py-1 rounded-full"
        >
          <Text className="text-xs font-black uppercase tracking-wider" style={{ color: tierColor }}>
            Benefits
          </Text>
          <Feather name="chevron-right" size={14} color={tierColor} />
        </TouchableOpacity>
      </View>

      {/* Subtitle - More readable */}
      <Text className="text-sm font-semibold text-gray-600/80 mb-5 ml-1">
        {(pointsToNextTier - points).toLocaleString()} points to reach {nextTier}
      </Text>

      {/* Progress bar - Thicker (h-3) */}
      <View className="h-3 bg-white/60 rounded-full overflow-hidden mb-2 shadow-inner">
        <View
          className="h-full rounded-full"
          style={{
            width: `${Math.min(pointsProgress * 100, 100)}%`,
            backgroundColor: tierColor,
          }}
        />
      </View>

      {/* Points label - Larger font */}
      <View className="flex-row justify-between items-center px-1">
        <Text className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Progress</Text>
        <Text className="text-xs font-black" style={{ color: tierColor }}>
          {points.toLocaleString()} <Text className="text-gray-400">/ {pointsToNextTier.toLocaleString()}</Text>
        </Text>
      </View>
    </LinearGradient>
  </View>
)

export default MembershipCard