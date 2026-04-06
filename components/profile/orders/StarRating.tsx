// components/store/StarRating.tsx
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  rating: number
  onRate: (star: number) => void
  size?: number
}

const StarRating: React.FC<Props> = ({ rating, onRate, size = 36 }) => (
  <View className="flex-row gap-2">
    {[1, 2, 3, 4, 5].map(star => (
      <TouchableOpacity key={star} onPress={() => onRate(star)} activeOpacity={0.7}>
        <Ionicons
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color={star <= rating ? '#F59E0B' : '#D1D5DB'}
        />
      </TouchableOpacity>
    ))}
  </View>
)

export default StarRating