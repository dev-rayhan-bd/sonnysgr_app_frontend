// components/discover/storeProfile/StoreInfoRow.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  icon: string
  text: string
  highlight?: boolean
}

const StoreInfoRow: React.FC<Props> = ({ icon, text, highlight }) => (
  <View className="flex-row items-center gap-2.5 py-1.5">
    <Ionicons name={icon as any} size={15} color={highlight ? '#22C55E' : '#9CA3AF'} />
    <Text className={`text-sm ${highlight ? 'text-green-400 font-semibold' : 'text-white/70'}`}>
      {text}
    </Text>
  </View>
)

export default StoreInfoRow