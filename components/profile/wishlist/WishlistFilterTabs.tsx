import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import type { FilterTab } from '@/services/hooks/profile/useWishlist'

interface WishlistFilterTabsProps {
  activeFilter: FilterTab
  filterCounts: Record<FilterTab, number>
  onSelect: (tab: FilterTab) => void
}

const TABS: FilterTab[] = ['All', 'In Stock', 'Low Stock', 'Sold Out']

export default function WishlistFilterTabs({
  activeFilter,
  filterCounts,
  onSelect,
}: WishlistFilterTabsProps) {
  return (
    <View className="border-b border-gray-100">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 10 }}
      >
        {TABS.map(tab => {
          const isActive = activeFilter === tab
          const label = tab === 'All' ? `All (${filterCounts.All})` : tab

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onSelect(tab)}
              activeOpacity={0.7}
              className={`px-4 py-[7px] rounded-full border ${
                isActive
                  ? 'bg-gray-900 border-gray-900'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`text-[13px] font-semibold ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}