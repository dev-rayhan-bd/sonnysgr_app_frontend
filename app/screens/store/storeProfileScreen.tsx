// app/screens/store/storeProfileScreen.tsx
import React from 'react'
import {
    View, Text, TouchableOpacity,
    ScrollView, StatusBar, Share,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useStoreProfile } from '@/services/hooks/store/useStoreProfile'
import StoreBadge from '@/components/store/StoreBadge'
import StoreStatsRow from '@/components/store/StoreStatsRow'
import StoreInfoRow from '@/components/store/StoreInfoRow'
import StoreTrustBadges from '@/components/store/StoreTrustBadge'
import StoreProductCard from '@/components/store/StoreProductCard'
import StoreReviewBar from '@/components/store/StoreReviewBar'
import StoreScoreGrid from '@/components/store/StoreScoreGrid'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'
export default function StoreProfileScreen() {
    const router = useRouter()
    const { id } = useLocalSearchParams<{ id: string }>()
    const {
        store, activeTag, setActiveTag,
        toggleFollow, toggleNotifications,
        handleShare, handleProductPress,
        handleSeeAll, handleSeeAllReviews,
    } = useStoreProfile(id)

const openMaps = () => {
  router.push({
    pathname: '/tabs/mapScreen',
    params: {
      lat: store.latitude.toString(),
      lng: store.longitude.toString(),
      name: store.name,
    },
  })
}

    const onShare = () =>
        handleShare(async () => {
            await Share.share({ message: `Check out ${store.name} on the app!` })
        })

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <StatusBar barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* ── Dark header ───────────────────────── */}
                <View className="bg-gray-900 px-4 pt-14 pb-4">

                    {/* Top nav */}
                    <View className="flex-row items-center justify-between mb-5">
                        <TouchableOpacity onPress={() => router.back()} className="p-1">
                            <Feather name="arrow-left" size={22} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShare} className="p-1">
                            <Feather name="share" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Avatar + name */}
                    <View className="flex-row items-center gap-4 mb-3">
                        <View
                            className="w-16 h-16 rounded-2xl items-center justify-center"
                            style={{ backgroundColor: store.avatarColor }}
                        >
                            <Text className="text-white text-xl font-extrabold">{store.initials}</Text>
                        </View>
                        <View className="flex-1 gap-1">
                            <View className="flex-row items-center gap-2 flex-wrap">
                                <Text className="text-white text-xl font-extrabold">{store.name}</Text>
                                <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                            </View>
                            <StoreBadge label={store.badge} bgColor="#F59E0B" />
                        </View>
                    </View>

                    {/* Stats */}
                    <StoreStatsRow
                        stats={[
                            { label: 'Rating', value: store.rating },
                            { label: 'Followers', value: store.followers },
                            { label: 'Posts', value: store.posts },
                            { label: 'Distance', value: store.distance },
                        ]}
                    />

                    {/* Follow + Bell row */}
                    <View className="flex-row gap-3 mt-4">
                        <TouchableOpacity
                            onPress={toggleFollow}
                            className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-2xl border ${store.isFollowing
                                ? 'border-white/30 bg-transparent'
                                : 'border-transparent bg-white'
                                }`}
                        >
                            <Ionicons
                                name={store.isFollowing ? 'person-remove-outline' : 'person-add-outline'}
                                size={16}
                                color={store.isFollowing ? '#fff' : '#111827'}
                            />
                            <Text
                                className={`text-sm font-extrabold ${store.isFollowing ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                {store.isFollowing ? 'Unfollow' : 'Follow Store'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={toggleNotifications}
                            className={`w-12 h-12 rounded-2xl items-center justify-center border ${store.notificationsOn
                                ? 'bg-green-500 border-green-500'
                                : 'border-white/30'
                                }`}
                        >
                            <Ionicons
                                name={store.notificationsOn ? 'notifications' : 'notifications-outline'}
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center mt-3">
                        {/* Left icon */}
                        <Feather name="map-pin" size={18} color="#22C55E" />

                        {/* Address */}
                        <Text className="ml-2 text-sm text-gray-200 flex-1">
                            {store.address}
                        </Text>

                        {/* Right icon button (same style as notification) */}
                        <TouchableOpacity
                            onPress={() => openMaps()}
                            className="w-10 h-10 rounded-xl items-center justify-center bg-green-500"
                        >
                            <Feather name="navigation" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    {/* Trust badges */}
                    <StoreTrustBadges
                        isVerified={store.isVerified}
                        isFastPickup={store.isFastPickup}
                        isTopRated={store.isTopRated}
                    />

                    {/* Info rows */}
                    <View className="mt-1 gap-0.5">
                        <StoreInfoRow
                            icon="time-outline"
                            text={`${store.isOpen ? 'Open' : 'Closed'} · Closes ${store.closingTime}`}
                            highlight={store.isOpen}
                        />
                        <StoreInfoRow icon="location-outline" text={store.address} />
                        <StoreInfoRow icon="call-outline" text={store.phone} />
                        <StoreInfoRow icon="globe-outline" text={store.website} />
                        <StoreInfoRow icon="logo-instagram" text={store.instagram} />
                    </View>
                </View>

                {/* ── White card ────────────────────────── */}
                <View className="bg-white rounded-t-3xl -mt-2 pt-5">

                    {/* In Stock Now */}
                    <View className="px-4 mb-5">
                        <View className="flex-row items-center justify-between mb-3">
                            <View className="flex-row items-center gap-2">
                                <Text className="text-base font-extrabold text-gray-900">In Stock Now</Text>
                                <View className="w-2 h-2 rounded-full bg-green-500" />
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-xs text-green-500 font-semibold">
                                    {store.pairsInSize} pairs ·{' '}
                                </Text>
                                <TouchableOpacity onPress={handleSeeAll}>
                                    <Text className="text-xs text-green-500 font-semibold">See all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Tag chips */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                            {store.tags.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    onPress={() => setActiveTag(tag)}
                                    className={`mr-2 px-3 py-1.5 rounded-full ${activeTag === tag ? 'bg-gray-900' : 'bg-gray-100'
                                        }`}
                                >
                                    <Text
                                        className={`text-xs font-semibold ${activeTag === tag ? 'text-white' : 'text-gray-700'
                                            }`}
                                    >
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Product cards */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {store.products.map(p => (
                                <StoreProductCard
                                    key={p.id}
                                    product={p}
                                    onPress={() => handleProductPress(p)}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Divider */}
                    <View className="h-2 bg-gray-50" />

                    {/* Reviews */}
                    <View className="px-4 pt-5 pb-4">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center gap-2">
                                <Text className="text-base font-extrabold text-gray-900">Reviews</Text>
                                <View className="flex-row items-center gap-1">
                                    <Ionicons name="star" size={14} color="#F59E0B" />
                                    <Text className="text-sm font-bold text-amber-500">{store.reviewScore}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleSeeAllReviews}>
                                <Text className="text-xs text-green-500 font-semibold">See All</Text>
                            </TouchableOpacity>
                        </View>

                        {store.reviewBreakdown.map(r => (
                            <StoreReviewBar key={r.star} star={r.star} percent={r.percent} />
                        ))}

                        <StoreScoreGrid
                            scores={[
                                { label: 'Customer Service', value: store.customerService },
                                { label: 'Authenticity', value: store.authenticity },
                                { label: 'Pickup Speed', value: store.pickupSpeed },
                                { label: 'Pricing', value: store.pricing },
                            ]}
                        />
                    </View>

                    {/* Sell to Store */}
                    <View className="px-4 pt-4 pb-10">
                        <Button
                            text="Sell to Store"
                            onPress={() => router.push(`/`)}
                            useGradient
                            gradientColors={['#1a1a1a', '#111827']}
                            borderRadius={16}
                            paddingVertical={18}
                            fontSize={15}
                            fontWeight="800"
                        />
                    </View>

                </View>
            </ScrollView>
        </BaseContainer>
    )
}