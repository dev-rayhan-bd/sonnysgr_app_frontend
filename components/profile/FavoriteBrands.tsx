// components/profile/FavoriteBrands.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { ProfileData } from '@/services/hooks/profile/useProfile'

interface FavoriteBrandsProps {
  brands: ProfileData['favoriteBrands']
  onEdit: () => void
  onAdd: () => void
}

const FavoriteBrands: React.FC<FavoriteBrandsProps> = ({ brands, onEdit, onAdd }) => (
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
      <Text className="text-lg font-black text-gray-900 tracking-tight">Favorite Brands</Text>
      
      <TouchableOpacity 
        onPress={onEdit} 
        className="flex-row items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full"
      >
        <Text className="text-xs text-gray-500 font-bold">Edit</Text>
        <Feather name="chevron-right" size={14} color="#6B7280" />
      </TouchableOpacity>
    </View>

    {/* Brands List */}
    <View className="flex-row items-center gap-3">
      {brands.map((brand) => (
        <View
          key={brand.id}
          className="w-14 h-14 rounded-full items-center justify-center shadow-sm"
          style={{ backgroundColor: brand.color, elevation: 2 }}
        >
          {/* Increased text size for the brand initials/label */}
          <Text className="text-white text-base font-black tracking-tighter">
            {brand.label}
          </Text>
        </View>
      ))}

      {/* Add Button - Scaled to match the brand circles */}
      <TouchableOpacity
        onPress={onAdd}
        className="w-14 h-14 rounded-full border-2 border-dashed border-gray-200 items-center justify-center bg-gray-50/50"
      >
        <Feather name="plus" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
)

export default FavoriteBrands