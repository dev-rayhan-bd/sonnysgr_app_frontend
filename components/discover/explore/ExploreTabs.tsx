// components/discover/explore/ExploreTabs.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import type { ExploreTab } from '@/services/hooks/discover/useExplore'

const TABS: ExploreTab[] = ['New Arrivals', 'Trending 🔥', 'Wishlist ❤️']

interface Props {
  active: ExploreTab
  onChange: (t: ExploreTab) => void
}

const ExploreTabs: React.FC<Props> = ({ active, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mt-4"
    contentContainerStyle={{ gap: 8, paddingRight: 16 }}
  >
    {TABS.map(tab => {
      const on = tab === active
      return (
        <TouchableOpacity
          key={tab}
          onPress={() => onChange(tab)}
          className={`px-4 py-2 rounded-full ${on ? 'bg-gray-900' : 'bg-gray-100'}`}
        >
          <Text className={`text-xs font-bold ${on ? 'text-white' : 'text-gray-600'}`}>
            {tab}
          </Text>
        </TouchableOpacity>
      )
    })}
  </ScrollView>
)

export default ExploreTabs