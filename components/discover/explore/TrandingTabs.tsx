// components/discover/trending/TrendingTabs.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import type { TrendingTab } from '@/services/hooks/discover/useTrending'

const TABS: TrendingTab[] = ['Today', 'This Week', 'This Month', 'All Time']

interface Props {
  active: TrendingTab
  onChange: (t: TrendingTab) => void
}

const TrendingTabs: React.FC<Props> = ({ active, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
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

export default TrendingTabs