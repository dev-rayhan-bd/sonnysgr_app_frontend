// components/profile/ProfileStats.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { ProfileData } from '@/services/hooks/profile/useProfile'

interface ProfileStatsProps {
  stats: ProfileData['stats']
}

const StatItem: React.FC<{
  value: number | string
  label: string
  icon: React.ReactNode
}> = ({ value, label, icon }) => (
  <View className="flex-1 items-center gap-1.5">
    {icon}
    {/* Increased from text-base to text-lg */}
    <Text className="text-lg font-black text-gray-900 tracking-tight">{value}</Text>
    {/* Increased from text-[10px] to text-xs */}
    <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</Text>
  </View>
)

// Made the divider slightly taller to match larger text
const Divider = () => <View className="w-px h-12 bg-gray-100" />

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => (
  <View
    className="flex-row items-center bg-white rounded-3xl px-2 py-5 mb-6"
    style={{ 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08, 
      shadowRadius: 12, 
      elevation: 4 
    }}
  >
    <StatItem
      value={stats.drops}
      label="Drops"
      icon={<Feather name="package" size={18} color="#6B7280" />}
    />
    <Divider />
    <StatItem
      value={stats.wishlist}
      label="Wishlist"
      icon={<Feather name="heart" size={18} color="#6B7280" />}
    />
    <Divider />
    <StatItem
      value={stats.reviews}
      label="Reviews"
      icon={<Feather name="star" size={18} color="#6B7280" />}
    />
    <Divider />
    <StatItem
      value={`Sz ${stats.mySize}`}
      label="My Size"
      icon={<Feather name="user" size={18} color="#6B7280" />}
    />
  </View>
)

export default ProfileStats