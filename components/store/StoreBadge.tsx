// components/discover/storeProfile/StoreBadge.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props {
  label: string
  icon?: string
  color?: string
  bgColor?: string
}

const StoreBadge: React.FC<Props> = ({
  label,
  color = '#fff',
  bgColor = '#F59E0B',
}) => (
  <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: bgColor }}>
    <Text className="text-[11px] font-extrabold" style={{ color }}>{label}</Text>
  </View>
)

export default StoreBadge