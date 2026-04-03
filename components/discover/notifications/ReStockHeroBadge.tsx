// components/notifications/restock/RestockHeroBadge.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const RestockHeroBadge: React.FC = () => (
  <View className="flex-row items-center justify-center gap-1.5 pt-4 pb-1">
    <MaterialCommunityIcons name="fire" size={14} color="#22C55E" />
    <Text className="text-green-400 text-xs font-bold uppercase tracking-widest">
      Back In Stock
    </Text>
  </View>
)

export default RestockHeroBadge