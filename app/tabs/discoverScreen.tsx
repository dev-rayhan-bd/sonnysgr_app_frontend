import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import DiscoverHeader from '@/components/discover/DiscoverHeader';
import DiscoverFilter from '@/components/discover/DiscoverFilter';
import DiscoverNearBy from '@/components/discover/DiscoverNearBy';
import DiscoverBrands from '@/components/discover/DiscoverBrands';
import DiscoverAd from '@/components/discover/DiscoverAd';
import DiscoverStores from '@/components/discover/DiscoverStores';
import BaseContainer from '@/components/shared/BaseContainer';
import { useDiscover, NearbyProduct, BrandProduct, FollowedStore, AdBanner } from '@/services/hooks/discover/useDiscover';
import { router } from 'expo-router';

export const DiscoverScreen: React.FC = () => {
  const {
    filters,
    activeFilter,
    nearbyProducts,
    brandProducts,
    adBanners,
    followedStores,
    isRefreshing,
    greeting,
    userName,
    handleFilterChange,
    toggleWishlist,
    toggleFollow,
    toggleBrandWishlist,
    toggleStoreWishlist,
    handleRefresh,
  } = useDiscover();

  const onProductPress = useCallback((p: NearbyProduct) => router.push("/screens/product/productScreen"), []);
  const onBrandPress = useCallback((b: BrandProduct) => router.push("/screens/product/productScreen"), []);
  const onBuyBrand = useCallback((b: BrandProduct) => router.push("/screens/product/productScreen"), []);
  const onAdPress = useCallback((ad: AdBanner) => router.push("/screens/product/productScreen"), []);
  const onStorePress = useCallback((s: FollowedStore) => console.log('store pressed', s.id), []);
  const onBuyStore = useCallback((s: FollowedStore) => router.push("/screens/product/productScreen"), []);
  
  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="flex-1 justify-center">
        <View>
          <DiscoverHeader
            notificationCount={2}
            onAvatarPress={() => console.log('avatar')}
          />

          <DiscoverFilter<typeof activeFilter>
            filters={filters}
            active={activeFilter}
            onChange={handleFilterChange}
            greeting={greeting}
            userName={userName}
          />
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#00C853"
              colors={['#00C853']}
            />
          }
        >
          <DiscoverNearBy
            products={nearbyProducts}
            onSeeAll={() => router.push("/screens/discover/exploreScreen")}
            onProductPress={onProductPress}
            onWishlistToggle={toggleWishlist}
          />

          <DiscoverBrands
            brands={brandProducts}
            onSeeAll={() => console.log('see all brands')}
            onBrandPress={onBrandPress}
            onBuyPress={onBuyBrand}
                onWishlistToggle={toggleBrandWishlist}
          />

          <DiscoverAd
            ads={adBanners}
            onPress={onAdPress}
          />

<DiscoverStores
  stores={followedStores}
  onManagePress={() => console.log('manage stores')}
  onStorePress={onStorePress}
  onFollowToggle={toggleFollow}
  onBuyPress={onBuyStore}
  // FIX: Add this line to connect the hook to the component
  onWishlistToggle={toggleStoreWishlist} 
/>
        </ScrollView>
      </View>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});

export default DiscoverScreen;