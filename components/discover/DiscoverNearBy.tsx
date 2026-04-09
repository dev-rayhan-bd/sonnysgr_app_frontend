import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NearbyProduct, StockStatus } from '@/services/hooks/discover/useDiscover'

interface DiscoverNearByProps {
  products: NearbyProduct[]
  onSeeAll?: () => void
  onProductPress?: (product: NearbyProduct) => void
  onWishlistToggle?: (id: string) => void
}

const STOCK_BG: Record<StockStatus, string> = {
  'In Stock': '#00C853',
  'Low Stock': '#FF6D00',
  'Dropping Soon': '#1565C0',
}

const StockBadge: React.FC<{ status: StockStatus }> = ({ status }) => (
  <View
    className="px-4 py-1.5 rounded-full"
    style={{ backgroundColor: STOCK_BG[status] }}
  >
    <Text className="text-white text-sm font-extrabold tracking-wide">
      {status}
    </Text>
  </View>
)

const NearbyCard: React.FC<{
  product: NearbyProduct
  onPress?: () => void
  onWishlist?: () => void
}> = ({ product, onPress, onWishlist }) => {
  const sizeYear = [product.size].filter(Boolean).join(' · ')
  const sizePrefix = product.productType === 'Clothing' ? 'Size' : 'Sz'

  return (
    <TouchableOpacity
      className="bg-white rounded-3xl overflow-hidden mb-4"
      style={{
        width: 230,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="relative bg-neutral-200" style={{ width: 230, height: 240 }}>
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute top-3 left-3">
          <StockBadge status={product.stockStatus} />
        </View>

        <TouchableOpacity
          className="absolute top-3 right-3 w-12 h-12 items-center justify-center"
          onPress={onWishlist}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={product.isWishlisted ? 'heart' : 'heart-outline'}
            size={32}
            color={product.isWishlisted ? '#FF3B6B' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4 gap-1.5">
        <Text className="text-xs text-green-600 font-bold uppercase tracking-wide">
          {product.productType} · {product.audience}
        </Text>
        <Text className="text-sm text-neutral-400 font-medium">
          {product.store} · {product.distance}
        </Text>

        <Text
          className="text-lg font-bold text-neutral-900 leading-6"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xl font-extrabold text-neutral-900">
            ${product.price}
          </Text>

          {sizeYear ? (
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: '#E8F8EE' }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: '#00C853' }}
              >
                {sizePrefix} {sizeYear}
              </Text>
            </View>
          ) : null}
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
  <View className="mt-6">
    <View className="flex-row items-center justify-between px-5 mb-4">
      <Text className="text-2xl font-extrabold text-neutral-900">
        Nearby Finds
      </Text>

      <TouchableOpacity onPress={onSeeAll}>
        <Text className="text-lg font-semibold" style={{ color: '#00C853' }}>
          See all
        </Text>
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 20, paddingRight: 10, gap: 16 }}
    >
      {products.map((product) => (
        <NearbyCard
          key={product.id}
          product={product}
          onPress={() => onProductPress?.(product)}
          onWishlist={() => onWishlistToggle?.(product.id)}
        />
      ))}
    </ScrollView>
  </View>
)

export default DiscoverNearBy
