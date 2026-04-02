// components/profile/ProfileHeader.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router' 
import type { ProfileData } from '@/services/hooks/profile/useProfile'

interface ProfileHeaderProps {
  profile: ProfileData
  tierColor: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, tierColor }) => {
  const router = useRouter()

  return (
    <View className="items-center pt-6 pb-6">
      {/* Avatar - Scaled to w-24 (Medium-Large) */}
      <View className="relative mb-4">
        <View
          className="w-24 h-24 rounded-full items-center justify-center shadow-md"
          style={{ 
            backgroundColor: profile.avatarColor,
            elevation: 4, 
          }}
        >
          <Text className="text-white text-3xl font-black">
            {profile.avatarInitials}
          </Text>
        </View>

        {/* Edit badge - Sized at w-8 with overlap and navigation */}
        <TouchableOpacity
          onPress={() => router.push('/screens/editProfileScreen' )}
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border border-gray-200 items-center justify-center shadow-sm"
          style={{ elevation: 3 }}
        >
          <Feather name="edit-2" size={14} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Name Section - Big & Bold */}
      <Text className="text-2xl font-extrabold text-gray-900 tracking-tight">
        {profile.username}
      </Text>
      <Text className="text-sm font-medium text-gray-500 mt-0.5">
        {profile.firstName} {profile.lastName}
      </Text>

      {/* Tier badge - Uppercase & Premium Scaling */}
      <View
        className="flex-row items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full border"
        style={{ 
          borderColor: tierColor, 
          backgroundColor: `${tierColor}12` 
        }}
      >
        <Feather name="award" size={14} color={tierColor} />
        <Text className="text-xs font-bold" style={{ color: tierColor }}>
          {profile.memberTier.toUpperCase()} MEMBER
        </Text>
      </View>
    </View>
  )
}

export default ProfileHeader