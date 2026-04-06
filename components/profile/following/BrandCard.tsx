import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import type { FollowedBrand } from '@/services/hooks/profile/useFollowing'

interface Props {
  brand: FollowedBrand
  onPress?: () => void
}

const BrandCard: React.FC<Props> = ({ brand, onPress }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    const newState = !isFollowing
    setIsFollowing(newState)

    Toast.show({
      type: 'success',
      text1: newState ? `Following ${brand.name}` : `Unfollowed ${brand.name}`,
      text2: newState
        ? 'You’ll get updates from this brand'
        : 'You won’t receive updates anymore',
      position: 'top',
    })
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-1 items-center py-5 mx-2 mb-4"
    >
      <View
        className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
        style={{ backgroundColor: brand.brandColor }}
      >
        <Text className="text-white text-lg font-extrabold">
          {brand.initials}
        </Text>
      </View>

      <Text className="text-sm font-bold text-gray-900">
        {brand.name}
      </Text>

      <Text className="text-xs text-green-500 font-medium mt-0.5 text-center">
        {brand.pairsInSize} pairs in your{'\n'}size nearby
      </Text>

      {/* Follow Button */}
      <TouchableOpacity
        onPress={handleFollow}
        className={`mt-3 px-4 py-1.5 rounded-full ${
          isFollowing ? 'bg-gray-200' : 'bg-black'
        }`}
      >
        <Text
          className={`text-xs font-semibold ${
            isFollowing ? 'text-black' : 'text-white'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default BrandCard