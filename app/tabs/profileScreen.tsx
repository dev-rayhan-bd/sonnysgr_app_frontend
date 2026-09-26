import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useProfile } from '@/services/hooks/profile/useProfile'
import ProfileHeader from '@/components/profile/ProfileHeader'
import QuickActions from '@/components/profile/QuickActions'
import MembershipCard from '@/components/profile/MemberShipCard'
import MySizes from '@/components/profile/MySizes'
import FavoriteBrands from '@/components/profile/FavoriteBrands'
import MySales from '@/components/profile/mysales/MySales'
import MyLocker from '@/components/profile/MyLocker'
import DiscoverCollectionsRow from '@/components/profile/DiscoverCollectionsRow'
import ReferralRow from '@/components/profile/ReferralRow'
import HelpSupportRow from '@/components/profile/HelpSupportRow'
import BaseContainer from '@/components/shared/BaseContainer'

const ProfileScreen = () => {
  const router = useRouter()
  const {
    profile,
    lockerPublic,
    tierColor,
    pointsProgress,
    toggleLockerVisibility,
    editSizes,
    editBrands,
    viewBenefits,
    addToLocker,
    viewFollowedStores,
    openDiscoverCollections,
    inviteFriends,
    openHelpSupport,
  } = useProfile()

  return (
    <BaseContainer backgroundColor="#F9FAFB">
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            paddingTop: 16,
          }}
        >
          {/* Top bar */}
          <View className="flex-row items-center justify-between mb-4 mt-10">
            <Text className="text-2xl font-extrabold text-gray-900">Profile</Text>
            <TouchableOpacity
              onPress={() => router.push('/screens/profilesetup/settingsScreen')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="settings" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          <ProfileHeader profile={profile} tierColor={tierColor} />

          <QuickActions
            orders={profile.orders}
            wishlistCount={profile.wishlistCount}
            stockAlerts={profile.stockAlerts}
            reviewsCount={profile.reviewsCount}
            onOrders={() => router.push('/screens/order/ordersListScreen')}
            onWishlist={() => router.push('/screens/profile/wishlistScreen')}
            onStockAlerts={() => console.log('Stock alerts')}
            onReviews={() => console.log('My Reviews')}
          />

          <MembershipCard
            memberTier={profile.memberTier}
            nextTier={profile.nextTier}
            points={profile.points}
            pointsToNextTier={profile.pointsToNextTier}
            pointsProgress={pointsProgress}
            tierColor={tierColor}
            onViewBenefits={viewBenefits}
          />

          <MySizes categories={profile.sizeCategories} onEdit={editSizes} />

          <FavoriteBrands
            brands={profile.favoriteBrands}
            followedStoresCount={profile.followedStoresCount}
            onEdit={editBrands}
            onFollowedStores={viewFollowedStores}
          />

          <MySales onSeeAll={() => router.push('/screens/profile/mySalesScreen')} />

          <MyLocker
            items={profile.lockerItems}
            lockerCount={profile.lockerCount}
            lockerPublic={lockerPublic}
            onToggleVisibility={toggleLockerVisibility}
            onAddItem={addToLocker}
            onViewAll={() => console.log('Manage locker')}
          />

          <DiscoverCollectionsRow onPress={openDiscoverCollections} />

          <ReferralRow referralCode={profile.referralCode} onPress={inviteFriends} />

          <HelpSupportRow onPress={openHelpSupport} />
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

export default ProfileScreen