import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

type Tab = 'Stores' | 'Brands'

interface Props {
  activeTab: Tab
  counts: { Stores: number; Brands: number }
  onChange: (tab: Tab) => void
}

const TABS: Tab[] = ['Stores', 'Brands']

const FollowingTabs: React.FC<Props> = ({ activeTab, counts, onChange }) => (
  <View className="flex-row border-b border-gray-100 bg-white">
    {TABS.map(tab => {
      const active = tab === activeTab
      return (
        <TouchableOpacity
          key={tab}
          onPress={() => onChange(tab)}
          className="flex-1 items-center py-3"
        >
          <Text className={`text-sm font-bold ${active ? 'text-gray-900' : 'text-gray-400'}`}>
            {tab}
            <Text className={`text-xs font-semibold ${active ? 'text-green-500' : 'text-gray-400'}`}>
              {' '}({counts[tab]})
            </Text>
          </Text>
          {active && (
            <View className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-500 rounded-full" />
          )}
        </TouchableOpacity>
      )
    })}
  </View>
)

export default FollowingTabs