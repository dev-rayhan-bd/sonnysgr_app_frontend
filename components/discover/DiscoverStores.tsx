import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FollowedStore, StockStatus } from '@/services/hooks/discover/useDiscover';

interface DiscoverStoresProps {
  stores: FollowedStore[];
  onManagePress?: () => void;
  onStorePress?: (s: FollowedStore) => void;
  onFollowToggle?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onBuyPress?: (s: FollowedStore) => void;
}

const STOCK_BG: Record<StockStatus, string> = {
  'In Stock': '#00C853',
  'Low Stock': '#FF6D00',
  'Dropping Soon': '#1565C0',
};

// ─── Story-row avatar (messenger style) ──────────────────────────────────
const StoreAvatar = ({ 
  store, 
  onPress 
}: { 
  store: FollowedStore; 
  onPress?: () => void 
}) => (
  <TouchableOpacity 
    className="items-center w-16 gap-1" 
    onPress={onPress} 
    activeOpacity={0.85}
  >
    <View 
      className="w-[60px] h-[60px] rounded-full border-[2.5px] p-[2px] items-center justify-center overflow-hidden"
      style={{ borderColor: store.isFollowing ? '#00C853' : '#D0D0D0' }}
    >
      <Image 
        source={{ uri: store.avatar }} 
        className="w-[52px] h-[52px] rounded-full" 
        resizeMode="cover" 
      />
    </View>
    <Text className="text-[10px] font-semibold text-neutral-600 text-center" numberOfLines={1}>
      {store.name}
    </Text>
  </TouchableOpacity>
);

// ─── Full store card (Brand-style sizing) ────────────────────────────────
const StoreCard = ({
  store,
  isLast,
  onPress,
  onBuy,
  onWishlist,
}: {
  store: FollowedStore;
  isLast: boolean;
  onPress?: () => void;
  onBuy?: () => void;
  onWishlist?: () => void;
}) => {
  const stockBg = store.stockStatus ? STOCK_BG[store.stockStatus] : '#00C853';

  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-4 gap-4 ${!isLast ? 'border-b border-neutral-100' : ''}`}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Left: Image (120x120 matching BrandProduct) */}
      <View className="w-[120px] h-[120px] rounded-xl overflow-hidden bg-neutral-200 relative">
        <Image source={{ uri: store.image }} className="w-full h-full" resizeMode="cover" />

        {/* Stock badge */}
        {store.stockStatus && (
          <View 
            className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full" 
            style={{ backgroundColor: stockBg }}
          >
            <Text className="text-white text-[11px] font-extrabold">{store.stockStatus}</Text>
          </View>
        )}

        {/* Heart icon */}
<TouchableOpacity
  onPress={(e) => {
    e.stopPropagation(); // Stops the card's onStorePress from firing
    onWishlist?.();      // Calls the toggleStoreWishlist(id) function
  }}
  className="absolute top-2 right-2 w-10 h-10 items-center justify-center z-10"
>
  <Ionicons
    name={store.isWishlisted ? 'heart' : 'heart-outline'}
    size={28}
    color={store.isWishlisted ? '#FF3B6B' : '#fff'}
  />
</TouchableOpacity>

        {/* Brand initial badge */}
        <View
          className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md"
          style={{ backgroundColor: store.brandColor }}
        >
          <Text className="text-white text-[11px] font-extrabold">{store.brandInitial}</Text>
        </View>
      </View>

      {/* Middle: Info */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-neutral-900" numberOfLines={1}>
          {store.name}
        </Text>
        <Text className="text-sm text-neutral-400 mt-1">{store.location}</Text>
        <Text className="text-sm text-neutral-400">{store.distance}</Text>
      </View>

      {/* Right: Price, stock, buy */}
      <View className="items-end gap-2">
        {store.price != null && (
          <Text className="text-xl font-extrabold text-neutral-900">${store.price}</Text>
        )}
        
        {store.stockStatus && (
          <View 
            className="px-3 py-1.5 rounded-full" 
            style={{ backgroundColor: stockBg }}
          >
            <Text className="text-white text-sm font-extrabold">{store.stockStatus}</Text>
          </View>
        )}

        <TouchableOpacity 
          onPress={onBuy} 
          className="bg-green-600 px-5 py-2 rounded-full"
        >
          <Text className="text-white text-sm font-extrabold">Buy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────
export const DiscoverStores: React.FC<DiscoverStoresProps> = ({
  stores,
  onManagePress,
  onStorePress,
  onWishlistToggle,
  onBuyPress,
}) => (
  <View className="mt-7">
    {/* Section Header */}
    <View className="flex-row items-center justify-between px-5 mb-4">
      <Text className="text-2xl font-extrabold text-neutral-900">From Followed Stores</Text>
      <TouchableOpacity onPress={onManagePress}>
        <Text className="text-lg font-semibold text-green-600">Manage</Text>
      </TouchableOpacity>
    </View>

    {/* Horizontal Story Row */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
    >
      {stores.map(s => (
        <StoreAvatar key={s.id} store={s} onPress={() => onStorePress?.(s)} />
      ))}
    </ScrollView>

    {/* Store Cards List */}
    {stores.length > 0 ? (
      <View className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm">
        {stores.map((s, i) => (
          <StoreCard
            key={s.id}
            store={s}
            isLast={i === stores.length - 1}
            onPress={() => onStorePress?.(s)}
            onBuy={() => onBuyPress?.(s)}
            onWishlist={() => onWishlistToggle?.(s.id)}
          />
        ))}
      </View>
    ) : (
      <View className="items-center py-10 gap-2 px-5">
        <Ionicons name="storefront-outline" size={32} color="#ddd" />
        <Text className="text-neutral-400 font-medium">No followed stores yet</Text>
      </View>
    )}
  </View>
);

export default DiscoverStores;