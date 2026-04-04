// components/discover/following/AlertFilterChips.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import type { AlertType } from '@/services/hooks/profile/useFollowing'

const ALL_FILTERS: AlertType[] = ['New Arrivals', 'Drops', 'Flash Sales', 'Restocks']

interface Props {
  active: AlertType[]
  onToggle: (a: AlertType) => void
}

const AlertFilterChips: React.FC<Props> = ({ active, onToggle }) => (
  <View className="py-3 px-4">
    <Text className="text-xs text-gray-400 font-semibold mb-2">Alert me for:</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
      {ALL_FILTERS.map(f => {
        const on = active.includes(f)
        return (
          <TouchableOpacity
            key={f}
            onPress={() => onToggle(f)}
            className={`mr-2 px-4 py-1.5 rounded-full border ${
              on ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
            }`}
          >
            <Text className={`text-xs font-bold ${on ? 'text-white' : 'text-gray-700'}`}>
              {f}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  </View>
)

export default AlertFilterChips