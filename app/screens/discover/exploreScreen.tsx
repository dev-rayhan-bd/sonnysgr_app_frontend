// app/screens/discover/exploreScreen.tsx
import React from 'react'
import {
    View, Text, ScrollView,
    SafeAreaView, TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useExplore } from '@/services/hooks/discover/useExplore'
import { useTrending } from '@/services/hooks/discover/useTrending'
import { useWishlist } from '@/services/hooks/discover/useWishList'

import ExploreSearchBar from '@/components/discover/explore/ExploreSearchBar'
import ExploreTabs from '@/components/discover/explore/ExploreTabs'
import FeaturedDropBanner from '@/components/discover/explore/FeaturedDropBanner'
import ExploreProductCard from '@/components/discover/explore/ExploreProductCard'
import TrendingTabs from '@/components/discover/explore/TrandingTabs'
import MostWantedHero from '@/components/discover/explore/MostWantedHero'
import TrendingProductRow from '@/components/discover/explore/TrandingProductRow'
import TrendingLocalCard from '@/components/discover/explore/TrendingLocalCard'
import ActivityFeedItem from '@/components/discover/explore/ActivityFeedItem'
import WishlistFilterChips from '@/components/discover/explore/WishListFilterChips'
import WishlistCard from '@/components/discover/explore/WishListCard'
import BaseContainer from '@/components/shared/BaseContainer'
export default function ExploreScreen() {
    const {
        activeTab, setActiveTab,
        searchQuery, setSearchQuery,
        featured, products,
        handleSearch, handleProduct, handleShopNow,
    } = useExplore()

    const {
        activeTab: trendingTab, setActiveTab: setTrendingTab,
        mostWanted, trendingList, localTrending, activity,
        handleProductPress, handleLoadMore, handleUserPress,
    } = useTrending()

    const {
        items, activeFilter, setActiveFilter,
        toggleWishlist, handleBuy, handleNotify,
        totalItems, inStockCount,
    } = useWishlist()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <View className="px-4 pt-4">

                        {/* Header */}
                        <Text className="text-2xl font-extrabold text-gray-900 mb-4">Explore</Text>

                        {/* Search */}
                        <ExploreSearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearch}
                        />

                        {/* Tabs */}
                        <ExploreTabs active={activeTab} onChange={setActiveTab} />

                        {/* ─── New Arrivals ─────────────────────── */}
                        {activeTab === 'New Arrivals' && (
                            <>
                                <FeaturedDropBanner drop={featured} onPress={handleShopNow} />

                                <View className="flex-row items-center justify-between mt-6 mb-3">
                                    <Text className="text-base font-extrabold text-gray-900">New In</Text>
                                    <Text className="text-sm font-semibold text-green-600">See all</Text>
                                </View>

                                <View className="flex-row flex-wrap justify-between gap-y-3">
                                    {products.map(p => (
                                        <ExploreProductCard
                                            key={p.id}
                                            product={p}
                                            onPress={() => handleProduct(p)}
                                        />
                                    ))}
                                </View>
                            </>
                        )}

                        {/* ─── Trending ─────────────────────────── */}
                        {activeTab === 'Trending 🔥' && (
                            <>
                                <View className="mt-4">
                                    <TrendingTabs active={trendingTab} onChange={setTrendingTab} />
                                </View>

                                <View className="flex-row items-center gap-2 mt-5 mb-1">
                                    <Text className="text-base font-extrabold text-gray-900">
                                        Most Wanted Right Now
                                    </Text>
                                    <Text>🔥</Text>
                                </View>

                                <MostWantedHero
                                    product={mostWanted}
                                    onPress={() => handleProductPress(mostWanted)}
                                />

                                <View className="mt-4 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                    {trendingList.map((p, i) => (
                                        <TrendingProductRow
                                            key={p.id}
                                            product={p}
                                            isLast={i === trendingList.length - 1}
                                            onPress={() => handleProductPress(p)}
                                        />
                                    ))}
                                </View>

                                <View className="flex-row items-center justify-between mt-6 mb-3">
                                    <View className="flex-row items-center gap-1">
                                        <Text className="text-base font-extrabold text-gray-900">
                                            Trending in Miami
                                        </Text>
                                        <Text>📍</Text>
                                    </View>
                                    <Text className="text-sm font-semibold text-green-600">See all</Text>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {localTrending.map(p => (
                                        <TrendingLocalCard
                                            key={p.id}
                                            product={p}
                                            onPress={() => handleProductPress(p)}
                                        />
                                    ))}
                                </ScrollView>

                                <View className="flex-row items-center justify-between mt-6 mb-1">
                                    <Text className="text-base font-extrabold text-gray-900">
                                        What's Happening
                                    </Text>
                                </View>
                                <Text className="text-xs text-gray-400 mb-3">Live activity near you</Text>

                                <View className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 px-4">
                                    {activity.map((a, i) => (
                                        <ActivityFeedItem
                                            key={a.id}
                                            item={a}
                                            isLast={i === activity.length - 1}
                                            onPress={() => handleUserPress(a)}
                                        />
                                    ))}
                                </View>

                                <TouchableOpacity
                                    onPress={handleLoadMore}
                                    className="mt-4 py-3.5 border border-gray-200 rounded-2xl items-center"
                                >
                                    <Text className="text-sm font-semibold text-gray-600">
                                        Load more activity
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* ─── Wishlist ─────────────────────────── */}
                        {activeTab === 'Wishlist ❤️' && (
                            <>
                                {/* Stats banner */}
                                <View className="mt-4 bg-white rounded-2xl px-4 py-4 flex-row gap-2 shadow-sm border border-gray-100">
                                    <View className="flex-1 items-center">
                                        <Text className="text-xl font-extrabold text-gray-900">{totalItems}</Text>
                                        <Text className="text-xs text-gray-400 mt-0.5">Saved</Text>
                                    </View>
                                    <View className="w-px bg-gray-100" />
                                    <View className="flex-1 items-center">
                                        <Text className="text-xl font-extrabold text-green-500">{inStockCount}</Text>
                                        <Text className="text-xs text-gray-400 mt-0.5">In Stock</Text>
                                    </View>
                                    <View className="w-px bg-gray-100" />
                                    <View className="flex-1 items-center">
                                        <Text className="text-xl font-extrabold text-gray-900">
                                            {totalItems - inStockCount}
                                        </Text>
                                        <Text className="text-xs text-gray-400 mt-0.5">Unavailable</Text>
                                    </View>
                                </View>

                                {/* Filters */}
                                <WishlistFilterChips active={activeFilter} onChange={setActiveFilter} />

                                {/* Items */}
                                {items.length === 0 ? (
                                    <View className="bg-white rounded-2xl py-16 items-center gap-3 shadow-sm border border-gray-100 mt-2">
                                        <Ionicons name="heart-outline" size={40} color="#D1D5DB" />
                                        <Text className="text-base font-bold text-gray-400">Nothing here yet</Text>
                                        <Text className="text-sm text-gray-300 text-center px-8">
                                            Save items you love and track when they drop
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => setActiveTab('New Arrivals')}
                                            className="mt-2 bg-gray-900 px-6 py-3 rounded-full"
                                        >
                                            <Text className="text-white text-sm font-bold">Browse Drops</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View className="mt-1">
                                        {items.map(item => (
                                            <WishlistCard
                                                key={item.id}
                                                item={item}
                                                onWishlistToggle={() => toggleWishlist(item.id)}
                                                onBuy={() => handleBuy(item)}
                                                onNotify={() => handleNotify(item)}
                                            />
                                        ))}
                                    </View>
                                )}
                            </>
                        )}

                    </View>
                </ScrollView>
            </View>
        </BaseContainer>
    )
}