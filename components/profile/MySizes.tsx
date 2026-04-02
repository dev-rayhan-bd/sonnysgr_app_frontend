// components/profile/MySizes.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface MySizesProps {
  sizes: string[]
  onEdit: () => void
}

const MySizes: React.FC<MySizesProps> = ({ sizes, onEdit }) => (
  <View
    className="bg-white rounded-3xl px-5 py-5 mb-4"
    style={{ 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08, 
      shadowRadius: 12, 
      elevation: 4 
    }}
  >
    {/* Header Section */}
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-lg font-black text-gray-900 tracking-tight">My Sizes</Text>
      
      <TouchableOpacity 
        onPress={onEdit} 
        className="flex-row items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full"
      >
        <Text className="text-xs text-gray-500 font-bold">Edit</Text>
        <Feather name="chevron-right" size={14} color="#6B7280" />
      </TouchableOpacity>
    </View>

    {/* Sizes Grid */}
    <View className="flex-row flex-wrap gap-2.5">
      {sizes.map((size) => (
        <View 
          key={size} 
          className="px-10 py-2.5 bg-gray-900 rounded-2xl shadow-sm"
          style={{ elevation: 2 }}
        >
          <Text className="text-white text-sm font-black tracking-wide">
            {size}
          </Text>
        </View>
      ))}
    </View>
  </View>
)

export default MySizes