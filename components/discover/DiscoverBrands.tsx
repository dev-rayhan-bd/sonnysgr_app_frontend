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

const STOCK_COLOR: Record<StockStatus, string> = {
  'In Stock': '#22C55E',
  'Low Stock': '#F59E0B',
  'Dropping Soon': '#3B82F6',
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
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      gap: 12,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: '#F3F4F6',
    }}
  >
    <View style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
      <Image source={{ uri: brand.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>

    <View style={{ flex: 1 }}>
      <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '700', color: '#111827', lineHeight: 18 }}>
        {brand.name}
      </Text>
      <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 3 }}>
        {brand.store} · {brand.distance}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
        <Ionicons name="checkmark-circle" size={12} color={STOCK_COLOR[brand.stockStatus]} />
        <Text style={{ fontSize: 11, fontWeight: '600', color: STOCK_COLOR[brand.stockStatus] }}>
          {brand.stockStatus === 'Dropping Soon' ? 'Dropping soon' : `${brand.stockStatus === 'In Stock' ? 'Size M' : 'Size M'} · ${brand.stockStatus.toLowerCase()}`}
        </Text>
      </View>
    </View>

    <View style={{ alignItems: 'flex-end', gap: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>
        ${brand.price}
      </Text>
      <TouchableOpacity
        onPress={onBuy}
        style={{ backgroundColor: '#22C55E', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 }}
      >
        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>View item</Text>
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
  <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
        From your brands
      </Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#22C55E' }}>See all</Text>
      </TouchableOpacity>
    </View>

    <View style={{ marginTop: 4 }}>
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