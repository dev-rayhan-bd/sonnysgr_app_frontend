import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NearbyProduct, StockStatus } from '@/services/hooks/discover/useDiscover'

const { width: SCREEN_W } = Dimensions.get('window')
const H_PADDING = 20
const GAP = 12
const CARD_W = (SCREEN_W - H_PADDING * 2 - GAP) / 2

interface DiscoverNearByProps {
  products: NearbyProduct[]
  onSeeAll?: () => void
  onProductPress?: (product: NearbyProduct) => void
  onWishlistToggle?: (id: string) => void
}

const STOCK_STYLE: Record<StockStatus, { bg: string; color: string; label: string }> = {
  'In Stock': { bg: '#F0FDF4', color: '#22C55E', label: 'In stock' },
  'Low Stock': { bg: '#FFF7ED', color: '#F59E0B', label: 'Low stock' },
  'Dropping Soon': { bg: '#EFF6FF', color: '#3B82F6', label: 'Dropping soon' },
}

const NearbyCard: React.FC<{
  product: NearbyProduct
  onPress?: () => void
  onWishlist?: () => void
}> = ({ product, onPress, onWishlist }) => {
  const stock = STOCK_STYLE[product.stockStatus]
  const sizePrefix = product.productType === 'Clothing' ? 'Size' : 'US'

  return (
    <TouchableOpacity
      style={{ width: CARD_W }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={{ width: CARD_W, height: CARD_W, borderRadius: 16, backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
        <Image source={{ uri: product.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        <TouchableOpacity
          onPress={onWishlist}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons
            name={product.isWishlisted ? 'heart' : 'heart-outline'}
            size={16}
            color={product.isWishlisted ? '#FF3B6B' : '#374151'}
          />
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#111827' }} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827', marginTop: 2 }}>
          ${product.price}
        </Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }} numberOfLines={1}>
          {product.store} · {product.distance}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          {product.size ? (
            <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '600' }}>
              {sizePrefix} {product.size}
            </Text>
          ) : <View />}
          <View style={{ backgroundColor: stock.bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: stock.color }}>{stock.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const DiscoverNearBy: React.FC<DiscoverNearByProps> = ({
  products,
  onSeeAll,
  onProductPress,
  onWishlistToggle,
}) => (
  <View style={{ marginTop: 12, paddingHorizontal: H_PADDING }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
        Nearby in your size
      </Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#22C55E' }}>See all</Text>
      </TouchableOpacity>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
      {products.map((product) => (
        <NearbyCard
          key={product.id}
          product={product}
          onPress={() => onProductPress?.(product)}
          onWishlist={() => onWishlistToggle?.(product.id)}
        />
      ))}
    </View>
  </View>
)

export default DiscoverNearBy