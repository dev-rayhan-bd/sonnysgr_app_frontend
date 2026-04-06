import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PHOTO_SLOTS, PhotoSlot } from '@/services/hooks/store/useSellToStore'

interface Props {
  photos: Partial<Record<PhotoSlot, string>>
  onPick: (slot: PhotoSlot) => void
}

const PhotoGrid: React.FC<Props> = ({ photos, onPick }) => (
  <View className="flex-row flex-wrap gap-2">
    {PHOTO_SLOTS.map(slot => {
      const filled = !!photos[slot]
      return (
        <TouchableOpacity
          key={slot}
          onPress={() => onPick(slot)}
          activeOpacity={0.8}
          className="items-center gap-1"
          style={{ width: '30%' }}
        >
          <View
            className={`w-full aspect-square rounded-xl border items-center justify-center ${
              filled
                ? 'border-green-400 bg-green-50'
                : 'border-dashed border-gray-300 bg-gray-50'
            }`}
          >
            <Feather
              name={filled ? 'check' : 'camera'}
              size={20}
              color={filled ? '#22C55E' : '#9CA3AF'}
            />
          </View>
          <Text className="text-[10px] text-gray-400 text-center">{slot}</Text>
        </TouchableOpacity>
      )
    })}
  </View>
)

export default PhotoGrid