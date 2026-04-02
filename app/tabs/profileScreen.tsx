// screens/ProfileScreen.tsx
import React from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
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
    <BaseContainer scrollable backgroundColor='#ffff'>
      <View className='pt-10 pb-10'>
        <View className="relative px-5 pt-3 pb-1">
          <View className="absolute right-5 top-3 flex-row gap-4">
            <TouchableOpacity>
              <Feather name="share-2" size={26} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/screens/settingsScreen')}>
              <Feather name="settings" size={26} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        >
          {/* Avatar · username · tier badge */}
          <ProfileHeader profile={profile} tierColor={tierColor} />

          {/* Drops / Wishlist / Reviews / Size */}
          <ProfileStats stats={profile.stats} />

          {/* My Sizes */}
          <MySizes sizes={profile.sizes} onEdit={editSizes} />

          {/* Favorite Brands */}
          <FavoriteBrands
            brands={profile.favoriteBrands}
            onEdit={editBrands}
            onAdd={addBrand}
          />

          {/* Membership + progress */}
          <MembershipCard
            memberTier={profile.memberTier}
            nextTier={profile.nextTier}
            points={profile.points}
            pointsToNextTier={profile.pointsToNextTier}
            pointsProgress={pointsProgress}
            tierColor={tierColor}
            onViewBenefits={viewBenefits}
          />

          {/* 2×2 quick-action grid */}
          <QuickActions
            orders={profile.orders}
            wishlistCount={profile.wishlistCount}
            wantedPairs={profile.wantedPairs}
            reviewsCount={profile.reviewsCount}
            onOrders={() => console.log('My Orders')}
            onWishlist={() => console.log('Wishlist')}
            onWantedPairs={() => console.log('Wanted Pairs')}
            onReviews={() => console.log('My Reviews')}
          />

          {/* Locker */}
          <MyLocker
            items={profile.lockerItems}
            lockerCount={profile.lockerCount}
            lockerPublic={lockerPublic}
            onToggleVisibility={toggleLockerVisibility}
            onAddItem={addToLocker}
            onViewAll={() => console.log('View all locker')}
          />

          {/* Referral */}
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