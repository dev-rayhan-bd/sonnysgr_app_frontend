import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BrandProduct, StockStatus } from '@/services/hooks/discover/useDiscover'

interface DiscoverBrandsProps {
  brands: BrandProduct[]
  onSeeAll?: () => void
  onBuyPress?: (brand: BrandProduct) => void
  onBrandPress?: (brand: BrandProduct) => void
  onWishlistToggle?: (id: string) => void
}

const STOCK_BG: Record<StockStatus, string> = {
  'In Stock': '#00C853',
  'Low Stock': '#FF6D00',
  'Dropping Soon': '#1565C0',
}

const BrandRow = ({
  brand,
  isLast,
  onPress,
  onBuy,
  onWishlist,
}: {
  brand: BrandProduct
  isLast: boolean
  onPress?: () => void
  onBuy?: () => void
  onWishlist?: () => void
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className={`flex-row items-center px-4 py-4 gap-4 ${!isLast ? 'border-b border-neutral-100' : ''}`}
  >
    <View className="w-[120px] h-[120px] rounded-xl overflow-hidden bg-neutral-200 relative">
      <Image
        source={{ uri: brand.image }}
        className="w-full h-full"
        resizeMode="cover"
      />

      <View
        className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full"
        style={{ backgroundColor: STOCK_BG[brand.stockStatus] }}
      >
        <Text className="text-white text-[11px] font-extrabold">
          {brand.stockStatus}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onWishlist}
        className="absolute top-2 right-2 w-10 h-10 items-center justify-center"
      >
        <Ionicons
          name={brand.isWishlisted ? 'heart' : 'heart-outline'}
          size={28}
          color={brand.isWishlisted ? '#FF3B6B' : '#fff'}
        />
      </TouchableOpacity>

      <View
        className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md"
        style={{ backgroundColor: brand.brandColor }}
      >
        <Text className="text-white text-[11px] font-extrabold">
          {brand.brandInitial}
        </Text>
      </View>
    </View>

    <View className="flex-1">
      <Text className="text-[11px] font-bold text-green-600 uppercase tracking-wide">
        {brand.productType} · {brand.audience}
      </Text>
      <Text
        numberOfLines={1}
        className="text-lg font-bold text-neutral-900"
      >
        {brand.name}
      </Text>

      <Text className="text-sm text-neutral-400 mt-1">
        {brand.store}
      </Text>

      <Text className="text-sm text-neutral-400">
        {brand.distance}
      </Text>
    </View>

    <View className="items-end gap-2">
      <Text className="text-xl font-extrabold text-neutral-900">
        ${brand.price}
      </Text>

      <View
        className="px-3 py-1.5 rounded-full"
        style={{ backgroundColor: STOCK_BG[brand.stockStatus] }}
      >
        <Text className="text-white text-sm font-extrabold">
          {brand.stockStatus}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onBuy}
        className="bg-green-600 px-5 py-2 rounded-full"
      >
        <Text className="text-white text-sm font-extrabold">
          Buy
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)

export const DiscoverBrands: React.FC<DiscoverBrandsProps> = ({
  brands,
  onSeeAll,
  onBuyPress,
  onBrandPress,
  onWishlistToggle,
}) => (
  <View className="mt-7 px-5">
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl font-extrabold text-neutral-900">
        From Your Brands
      </Text>

      <TouchableOpacity onPress={onSeeAll}>
        <Text className="text-lg font-semibold text-green-600">
          See all
        </Text>
      </TouchableOpacity>
    </View>

    <Text className="text-sm text-neutral-400 mt-1 mb-3">
      Sneakers and apparel from the brands you follow
    </Text>

    <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {brands.map((brand, index) => (
        <BrandRow
          key={brand.id}
          brand={brand}
          isLast={index === brands.length - 1}
          onPress={() => onBrandPress?.(brand)}
          onBuy={() => onBuyPress?.(brand)}
          onWishlist={() => onWishlistToggle?.(brand.id)}
        />
      ))}
    </View>
  </View>
)

export default DiscoverBrands
