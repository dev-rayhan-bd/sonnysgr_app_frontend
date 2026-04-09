import { View, TouchableOpacity, Text } from 'react-native'
import BaseContainer from '@/components/shared/BaseContainer'
import WishlistFilterSheet from '@/components/profile/wishlist/WishlistFilterSheet'
import WishlistFilterTabs from '@/components/profile/wishlist/WishlistFilterTabs'
import WishlistHeader from '@/components/profile/wishlist/WishlistHeader'
import WishlistList from '@/components/profile/wishlist/WishlistList'
import { useWishlist } from '@/services/hooks/profile/useWishlist'
import { useWishlistFilter } from '@/services/hooks/profile/useWishlistFilter'

export default function WishlistScreen() {
  const filter = useWishlistFilter()
  const { items, activeFilter, setActiveFilter, filterCounts, toggleLike } =
    useWishlist(filter.applied)

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="pt-10">
        <WishlistHeader
          activeFilterCount={filter.activeFilterCount}
          onFilterOpen={filter.open}
        />

        <WishlistFilterTabs
          activeFilter={activeFilter}
          filterCounts={filterCounts}
          onSelect={setActiveFilter}
        />

        {filter.activeFilterCount > 0 && (
          <View className="flex-row items-center gap-2 px-4 py-2 bg-gray-50">
            {filter.applied.category !== 'All' && (
              <View className="flex-row items-center bg-gray-900 px-2.5 py-1 rounded-full">
                <Text className="text-white text-[11px] font-semibold">
                  {filter.applied.category}
                </Text>
              </View>
            )}

            {filter.applied.sort !== 'Default' && (
              <View className="flex-row items-center bg-gray-900 px-2.5 py-1 rounded-full">
                <Text className="text-white text-[11px] font-semibold">
                  {filter.applied.sort}
                </Text>
              </View>
            )}

            <TouchableOpacity onPress={filter.reset}>
              <Text className="text-xs text-red-400 font-semibold ml-1">Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        <WishlistList items={items} onToggleLike={toggleLike} />

        <WishlistFilterSheet
          visible={filter.visible}
          draft={filter.draft}
          sortOptions={filter.sortOptions}
          categoryOptions={filter.categoryOptions}
          onClose={filter.close}
          onSetSort={filter.setSort}
          onSetCategory={filter.setCategory}
          onReset={filter.reset}
          onApply={filter.apply}
        />
      </View>
    </BaseContainer>
  )
}
