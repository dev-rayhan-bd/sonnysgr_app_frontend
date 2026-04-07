// components/profile/wishlist/WishlistFilterChips.tsx
import React from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import type { WishlistFilter } from '@/services/hooks/discover/useWishList'

const FILTERS: WishlistFilter[] = ['All', 'In Stock', 'Dropping Soon', 'On Sale']

interface Props {
  active: WishlistFilter
  onChange: (f: WishlistFilter) => void
}

const WishlistFilterChips: React.FC<Props> = ({ active, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ gap: 8, paddingRight: 16 }}
    className="py-3"
  >
    {FILTERS.map(f => {
      const on = f === active
      return (
        <TouchableOpacity
          key={f}
          onPress={() => onChange(f)}
          className={`px-4 py-2 rounded-full ${on ? 'bg-gray-900' : 'bg-gray-100'}`}
        >
          <Text className={`text-xs font-bold ${on ? 'text-white' : 'text-gray-600'}`}>
            {f}
          </Text>
        </TouchableOpacity>
      )
    })}
  </ScrollView>
)

export default WishlistFilterChips