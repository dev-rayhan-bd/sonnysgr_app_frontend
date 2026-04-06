// screens/ProfileScreen.tsx
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useProfile } from '@/services/hooks/profile/useProfile'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileStats from '@/components/profile/ProfileStats'
import MySizes from '@/components/profile/MySizes'
import FavoriteBrands from '@/components/profile/FavoriteBrands'
import MembershipCard from '@/components/profile/MemberShipCard'
import QuickActions from '@/components/profile/QuickActions'
import MyLocker from '@/components/profile/MyLocker'
import ReferralRow from '@/components/profile/ReferralRow'
import BaseContainer from '@/components/shared/BaseContainer'

const ProfileScreen = () => {
  const router = useRouter()
  const {
    profile,
    lockerPublic,
    tierColor,
    pointsProgress,
    toggleLockerVisibility,
    addBrand,
    editSizes,
    editBrands,
    viewBenefits,
    addToLocker,
  } = useProfile()

  return (
    <BaseContainer backgroundColor="#ffff">
      <View style={{ flex: 1 } } className='pb-10 pt-5'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            paddingTop: 30,
          }}
        >
          {/* --- MOVED INSIDE: Header Icons Row --- */}
          <View
            className="flex-row justify-end gap-4 bg-white mb-2"
            style={{ zIndex: 10 }}
          >
            <TouchableOpacity
              onPress={() => console.log('Share')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ padding: 6 }}
            >
              <Feather name="share-2" size={26} color="#374151" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/screens/profilesetup/settingsScreen')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ padding: 6 }}
            >
              <Feather name="settings" size={26} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* --- Rest of Content --- */}
          <ProfileHeader profile={profile} tierColor={tierColor} />
          <ProfileStats stats={profile.stats} />
          <MySizes sizes={profile.sizes} onEdit={editSizes} />
          <FavoriteBrands
            brands={profile.favoriteBrands}
            onEdit={editBrands}
            onAdd={addBrand}
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
          <QuickActions
            orders={profile.orders}
            wishlistCount={profile.wishlistCount}
            wantedPairs={profile.wantedPairs}
            reviewsCount={profile.reviewsCount}
            onOrders={() => router.push("/screens/profile/orderScreen")}
            onWishlist={() => router.push("/screens/profile/wishlistScreen")}
            onWantedPairs={() => router.push("/screens/profile/wantedPairScreen")}
            onReviews={() => console.log('My Reviews')}
            onFollowings={() => router.push('/screens/profile/followingScreen')}
            onCollections={() => router.push('/screens/profile/lockerBrowserScreen')}
          />
          <MyLocker
            items={profile.lockerItems}
            lockerCount={profile.lockerCount}
            lockerPublic={lockerPublic}
            onToggleVisibility={toggleLockerVisibility}
            onAddItem={addToLocker}
            onViewAll={() => console.log('View all locker')}
          />
          <ReferralRow
            referralCode={profile.referralCode}
            onPress={() => console.log('Referral tapped')}
          />
        </ScrollView>
      </View>
    </BaseContainer>
  )
}

export default ProfileScreen