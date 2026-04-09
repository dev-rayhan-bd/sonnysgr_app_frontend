// components/discover/explore/ExploreSearchBar.tsx
import React from 'react'
import { View, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
}

const ExploreSearchBar: React.FC<Props> = ({ value, onChange, onSubmit }) => (
  <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 gap-3">
    <Feather name="search" size={18} color="#9CA3AF" />
    <TextInput
      placeholder="Search sneakers, clothing, brands, stores..."
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      returnKeyType="search"
      className="flex-1 text-sm text-gray-900"
    />
  </View>
)

export default ExploreSearchBar
