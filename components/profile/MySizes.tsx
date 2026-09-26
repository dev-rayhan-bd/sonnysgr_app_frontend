// components/profile/MySizes.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import type { ProfileData } from '@/services/hooks/profile/useProfile'

interface MySizesProps {
  categories: ProfileData['sizeCategories']
  onEdit: () => void
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  sneaker: <MaterialCommunityIcons name="shoe-sneaker" size={18} color="#6B7280" />,
  shirt: <Feather name="user" size={17} color="#6B7280" />,
}

const MySizes: React.FC<MySizesProps> = ({ categories, onEdit }) => (
  <View
    className="bg-white rounded-2xl px-4 py-4 mb-4"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    }}
  >
    <View className="flex-row justify-between items-center mb-3.5">
      <Text className="text-base font-extrabold text-gray-900">Saved sizes</Text>
      <TouchableOpacity onPress={onEdit} className="flex-row items-center gap-0.5">
        <Text className="text-xs font-bold text-green-600">Edit</Text>
        <Feather name="chevron-right" size={13} color="#16A34A" />
      </TouchableOpacity>
    </View>

    <View className="gap-3">
      {categories.map((cat) => (
        <View key={cat.id} className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            {CATEGORY_ICON[cat.icon]}
            <Text className="text-sm font-semibold text-gray-700">
              {cat.label}
              {cat.editableLabel ? ` · ${cat.editableLabel}` : ''}
            </Text>
          </View>

          <View className="flex-row gap-2">
            {cat.values.map((v) => (
              <View
                key={v.label}
                className="flex-row items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5"
              >
                <Text className="text-xs font-bold text-gray-900">{v.value}</Text>
                <Text className="text-[10px] text-gray-400 font-medium">{v.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>

    <Text className="text-[11px] text-gray-300 mt-3">
      Choose which sizes to show when checking out
    </Text>
  </View>
)

export default MySizes