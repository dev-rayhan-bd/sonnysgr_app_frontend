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

export const DiscoverScreen: React.FC = () => {
  const {
    filters,
    activeFilter,
    nearbyProducts,
    brandProducts,
    adBanner,
    followedStores,
    isRefreshing,
    greeting,
    userName,
    handleFilterChange,
    toggleWishlist,
    toggleFollow,
    handleRefresh,
  } = useDiscover();

  const onProductPress = useCallback((p: NearbyProduct) => console.log('product pressed', p.id), []);
  const onBrandPress = useCallback((b: BrandProduct) => console.log('brand pressed', b.id), []);
  const onBuyBrand = useCallback((b: BrandProduct) => console.log('buy brand', b.id), []);
  const onAdPress = useCallback((ad: AdBanner) => console.log('ad pressed', ad.id), []);
  const onStorePress = useCallback((s: FollowedStore) => console.log('store pressed', s.id), []);
  const onBuyStore = useCallback((s: FollowedStore) => console.log('buy store', s.id), []);

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="flex-1 justify-center">
        <View>
          <DiscoverHeader
            notificationCount={2}
            onNotificationPress={() => console.log('notifications')}
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
            onSeeAll={() => console.log('see all nearby')}
            onProductPress={onProductPress}
            onWishlistToggle={toggleWishlist}
          />

          <DiscoverBrands
            brands={brandProducts}
            onSeeAll={() => console.log('see all brands')}
            onBrandPress={onBrandPress}
            onBuyPress={onBuyBrand}
          />

          <DiscoverAd
            ad={adBanner}
            onPress={onAdPress}
          />

          <DiscoverStores
            stores={followedStores}
            variant="buy"
            onManagePress={() => console.log('manage stores')}
            onStorePress={onStorePress}
            onFollowToggle={toggleFollow}
            onBuyPress={onBuyStore}
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