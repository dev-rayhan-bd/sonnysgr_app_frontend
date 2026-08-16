import React from 'react'
import {
  Share,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'
import Button from '@/components/shared/Button'
import StoreBadge from '@/components/store/StoreBadge'
import StoreInfoRow from '@/components/store/StoreInfoRow'
import StoreProductCard from '@/components/store/StoreProductCard'
import StoreReviewBar from '@/components/store/StoreReviewBar'
import StoreScoreGrid from '@/components/store/StoreScoreGrid'
import StoreStatsRow from '@/components/store/StoreStatsRow'
import StoreTrustBadges from '@/components/store/StoreTrustBadge'
import { useStoreProfile } from '@/services/hooks/store/useStoreProfile'

export default function StoreProfileScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const {
    store,
    activeTag,
    visibleProducts,
    visibleProductCount,
    setActiveTag,
    toggleFollow,
    toggleNotifications,
    handleShare,
    handleProductPress,
    handleSeeAll,
    handleSeeAllReviews,
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
    <BaseContainer scrollable backgroundColor="#fff">
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="bg-gray-900 px-4 pt-14 pb-4">
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <Feather name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} className="p-1">
              <Feather name="share" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

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

          <StoreStatsRow
            stats={[
              { label: 'Rating', value: store.rating },
              { label: 'Followers', value: store.followers },
              { label: 'Posts', value: store.posts },
              { label: 'Distance', value: store.distance },
            ]}
          />

          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={toggleFollow}
              className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-2xl border ${
                store.isFollowing
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
                className={`text-sm font-extrabold ${
                  store.isFollowing ? 'text-white' : 'text-gray-900'
                }`}
              >
                {store.isFollowing ? 'Unfollow' : 'Follow Store'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleNotifications}
              className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                store.notificationsOn
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
            <Feather name="map-pin" size={18} color="#22C55E" />

            <Text className="ml-2 text-sm text-gray-200 flex-1">
              {store.address}
            </Text>

            <TouchableOpacity
              onPress={openMaps}
              className="w-10 h-10 rounded-xl items-center justify-center bg-green-500"
            >
              <Feather name="navigation" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <StoreTrustBadges
            isVerified={store.isVerified}
            isFastPickup={store.isFastPickup}
            isTopRated={store.isTopRated}
          />

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

        <View className="bg-white rounded-t-3xl -mt-2 pt-5">
          <View className="px-4 mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-base font-extrabold text-gray-900">Available Now</Text>
                <View className="w-2 h-2 rounded-full bg-green-500" />
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-green-500 font-semibold">
                  {visibleProductCount} items
                </Text>
                <TouchableOpacity onPress={handleSeeAll}>
                  <Text className="text-xs text-green-500 font-semibold">See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
              {store.tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => setActiveTag(tag)}
                  className={`mr-2 px-3 py-1.5 rounded-full ${
                    activeTag === tag ? 'bg-gray-900' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      activeTag === tag ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {visibleProducts.map((product) => (
                <StoreProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </ScrollView>
          </View>

          <View className="h-2 bg-gray-50" />

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

            {store.reviewBreakdown.map((review) => (
              <StoreReviewBar key={review.star} star={review.star} percent={review.percent} />
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

          <View className="px-4 pt-4 pb-10">
            <Button
              text="Sell to Store"
              onPress={() => router.push('/screens/store/sellToStoreScreen')}
              useGradient
              gradientColors={['#1a1a1a', '#111827']}
              borderRadius={16}
              paddingVertical={18}
              fontSize={15}
              fontWeight="800"
            />
          {/* Store offer buttons — injected by patch_step2.js */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => router.push('/screens/store/storeOfferReviewScreen' as any)}
              style={{ flex: 1, paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#374151' }}>View Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/screens/store/sellToStoreOfferScreen' as any)}
              style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#22c55e', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>Sell to Store</Text>
            </TouchableOpacity>
          </View>
          </View>

          <View className="px-4 pb-10 pt-2">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/screens/store/reportStoreScreen',
                  params: {
                    storeId: id,
                    storeName: store.name,
                    storeAddress: store.address,
                  },
                })
              }
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-2 py-3"
            >
              <Feather name="flag" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-400 font-semibold">Report this store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  )
}
