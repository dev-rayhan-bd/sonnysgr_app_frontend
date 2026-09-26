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

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const router = useRouter()

  return (
    <View className="flex-row items-center justify-between mb-5">
      <View className="flex-row items-center gap-3">
        <View
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: profile.avatarColor }}
        >
          <Text className="text-white text-lg font-black">
            {profile.avatarInitials}
          </Text>
        </View>

        <View>
          <Text className="text-lg font-extrabold text-gray-900 tracking-tight">
            {profile.firstName} {profile.lastName}
          </Text>
          <Text className="text-sm text-gray-400 mt-0.5">
            @{profile.username}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/screens/profilesetup/editProfileScreen')}
        activeOpacity={0.7}
        className="flex-row items-center gap-1"
      >
        <Text className="text-sm font-bold text-green-600">Edit profile</Text>
        <Feather name="chevron-right" size={16} color="#16A34A" />
      </TouchableOpacity>
    </View>
  )
}

export default ProfileHeader