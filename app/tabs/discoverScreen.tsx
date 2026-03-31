import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native';

// Components
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import DiscoverFilter from '@/components/discover/DiscoverFilter';
import DiscoverNearBy from '@/components/discover/DiscoverNearBy';
import DiscoverAd from '@/components/discover/DiscoverAd';
import DiscoverBrands from '@/components/discover/DiscoverBrands';
import DiscoverStores from '@/components/discover/DiscoverStores';

// Hook & types
import { useDiscover, SneakerProduct, Brand, FollowedStore, AdBanner } from '@/services/hooks/discover/useDiscover';

// Navigation (adjust to your navigation lib)
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// type Props = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export const DiscoverScreen: React.FC = () => {
  const {
    activeFilter,
    nearbyProducts,
    brandProducts,
    followedStores,
    adBanner,
    isRefreshing,
    userName,
    filterCategories,
    handleFilterChange,
    toggleWishlist,
    toggleFollowStore,
    handleRefresh,
  } = useDiscover();

  /* ─── Handlers ─── */
  const handleProductPress = useCallback((product: SneakerProduct) => {
    console.log('Product pressed:', product.id);
    // navigation.navigate('ProductDetail', { productId: product.id });
  }, []);

  const handleBrandPress = useCallback((brand: Brand) => {
    console.log('Brand pressed:', brand.id);
    // navigation.navigate('BrandDetail', { brandId: brand.id });
  }, []);

  const handleBuyPress = useCallback((brand: Brand) => {
    console.log('Buy pressed:', brand.id);
    // navigation.navigate('Checkout', { brandId: brand.id });
  }, []);

  const handleStorePress = useCallback((store: FollowedStore) => {
    console.log('Store pressed:', store.id);
    // navigation.navigate('StoreDetail', { storeId: store.id });
  }, []);

  const handleAdPress = useCallback((ad: AdBanner) => {
    console.log('Ad pressed:', ad.id);
    // navigation.navigate('AdDetail', { adId: ad.id });
  }, []);

  const handleNotifications = useCallback(() => {
    console.log('Notifications pressed');
    // navigation.navigate('Notifications');
  }, []);

  const handleAvatar = useCallback(() => {
    console.log('Avatar pressed');
    // navigation.navigate('Profile');
  }, []);

  const handleSeeAllNearby = useCallback(() => {
    console.log('See all nearby');
    // navigation.navigate('NearbyProducts');
  }, []);

  const handleSeeAllBrands = useCallback(() => {
    console.log('See all brands');
    // navigation.navigate('Brands');
  }, []);

  const handleManageStores = useCallback(() => {
    console.log('Manage stores');
    // navigation.navigate('ManageStores');
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Sticky Header + Filter */}
      <View style={styles.stickyTop}>
        <DiscoverHeader
          userName={userName}
          notificationCount={2}
          onNotificationPress={handleNotifications}
          onAvatarPress={handleAvatar}
        />
        <DiscoverFilter
          categories={filterCategories}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          greeting={getGreeting()}
          userName={userName}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#00D46A"
            colors={['#00D46A']}
          />
        }
      >
        {/* Nearby Section */}
        <DiscoverNearBy
          products={nearbyProducts}
          onSeeAll={handleSeeAllNearby}
          onProductPress={handleProductPress}
          onWishlistToggle={toggleWishlist}
        />

        {/* From Your Brands */}
        <DiscoverBrands
          brands={brandProducts}
          onSeeAll={handleSeeAllBrands}
          onBuyPress={handleBuyPress}
          onBrandPress={handleBrandPress}
        />

        {/* Ad Banner (between brands and stores) */}
        <DiscoverAd
          ad={adBanner}
          onPress={handleAdPress}
        />

        {/* From Followed Stores */}
        <DiscoverStores
          stores={followedStores}
          onManagePress={handleManageStores}
          onStorePress={handleStorePress}
          onFollowToggle={toggleFollowStore}
        />
      </ScrollView>
    </View>
  );
};

/* ─── Helpers ─── */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  stickyTop: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    paddingBottom: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // room for tab bar
  },
});

export default DiscoverScreen;