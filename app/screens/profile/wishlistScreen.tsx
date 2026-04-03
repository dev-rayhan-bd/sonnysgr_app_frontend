import { View, Text, TouchableOpacity } from 'react-native'
import { useWishlist } from '@/services/hooks/profile/useWishlist'
import { useWishlistFilter } from '@/services/hooks/profile/useWishlistFilter'
import BaseContainer from '@/components/shared/BaseContainer'
import WishlistHeader from '@/components/profile/wishlist/WishlistHeader'
import WishlistFilterTabs from '@/components/profile/wishlist/WishlistFilterTabs'
import WishlistList from '@/components/profile/wishlist/WishlistList'
import WishlistFilterSheet from '@/components/profile/wishlist/WishlistFilterSheet'

export default function WishlistScreen() {
    const filter = useWishlistFilter()

    const { items, activeFilter, setActiveFilter, filterCounts, toggleLike } =
        useWishlist(filter.applied.sort)

    return (
        <BaseContainer scrollable backgroundColor="#fff">

              <View className='pt-10'>
                <WishlistHeader
                    activeFilterCount={filter.activeFilterCount}
                    onFilterOpen={filter.open}
                />

                {/* ── Filter Tabs ── */}
                <WishlistFilterTabs
                    activeFilter={activeFilter}
                    filterCounts={filterCounts}
                    onSelect={setActiveFilter}
                />

                {/* ── Active sort chip ── */}
                {filter.activeFilterCount > 0 && (
                    <View className="flex-row items-center gap-2 px-4 py-2 bg-gray-50">
                        <Text className="text-xs text-gray-400">Sorted by:</Text>
                        <View className="flex-row items-center bg-gray-900 px-2.5 py-1 rounded-full">
                            <Text className="text-white text-[11px] font-semibold">
                                {filter.applied.sort}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={filter.reset}>
                            <Text className="text-xs text-red-400 font-semibold ml-1">Clear</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* ── List ── */}
                <WishlistList items={items} onToggleLike={toggleLike} />

                {/* ── Filter bottom sheet ── */}
                <WishlistFilterSheet
                    visible={filter.visible}
                    draft={filter.draft}
                    sortOptions={filter.sortOptions}
                    onClose={filter.close}
                    onSetSort={filter.setSort}
                    onReset={filter.reset}
                    onApply={filter.apply}
                />
            </View>
        </BaseContainer>
    )
}