import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {
  InventoryProduct,
  StockStatus,
} from '@/services/hooks/retailer/inventory/useInventory'

interface InventoryCardProps {
  product: InventoryProduct
  onPress?: (product: InventoryProduct) => void
  onEditPress?: (product: InventoryProduct) => void
}

const statusBadge: Record<StockStatus, { bg: string; text: string }> = {
  'In Stock': { bg: '#00C853', text: '#fff' },
  'Low Stock': { bg: '#F97316', text: '#fff' },
  'Out of Stock': { bg: '#EF4444', text: '#fff' },
  'On Hold': { bg: '#374151', text: '#fff' },
}

const productTypeBadge = {
  Sneakers: { bg: '#ECFDF5', text: '#047857' },
  Clothing: { bg: '#EFF6FF', text: '#1D4ED8' },
}

const SIZES_VISIBLE = 4

const InventoryCard: React.FC<InventoryCardProps> = ({
  product,
  onPress,
  onEditPress,
}) => {
  const badge = statusBadge[product.status]
  const typeBadge = productTypeBadge[product.productType]
  const badgeLabel =
    product.status === 'Low Stock' && product.lowCount != null
      ? `Low: ${product.lowCount}`
      : product.status

  const visibleSizes = product.sizes.slice(0, SIZES_VISIBLE)
  const hiddenCount = product.sizes.length - SIZES_VISIBLE

  return (
    <TouchableOpacity
      onPress={() => onPress?.(product)}
      activeOpacity={0.85}
      style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        borderRadius: 18,
        padding: 12,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        marginBottom: 10,
      }}
    >
      <View style={{ position: 'relative', flexShrink: 0 }}>
        {product.imageUri ? (
          <Image
            source={{ uri: product.imageUri }}
            style={{ width: 76, height: 76, borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 76,
              height: 76,
              borderRadius: 12,
              backgroundColor: product.imageBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="package" size={28} color="#9CA3AF" />
          </View>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 5,
            left: 5,
            backgroundColor: badge.bg,
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: badge.text, fontSize: 9, fontWeight: '700' }}>
            {badgeLabel}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: '#9CA3AF',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              {product.brand}
            </Text>
            <View
              style={{
                backgroundColor: typeBadge.bg,
                borderRadius: 999,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: typeBadge.text }}>
                {product.productType}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => onEditPress?.(product)} hitSlop={8}>
            <Feather name="edit-2" size={15} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text
          style={{ fontSize: 14, fontWeight: '800', color: '#111', marginTop: 3 }}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
          {visibleSizes.map(({ size, qty }) => {
            const available = qty > 0

            return (
              <View
                key={size}
                style={{
                  backgroundColor: available ? '#DCFCE7' : '#F3F4F6',
                  borderRadius: 8,
                  paddingHorizontal: 7,
                  paddingVertical: 3,
                  marginRight: 4,
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: available ? '#15803D' : '#9CA3AF',
                  }}
                >
                  {size} · {qty}
                </Text>
              </View>
            )
          })}

          {hiddenCount > 0 && (
            <View
              style={{
                backgroundColor: '#F3F4F6',
                borderRadius: 8,
                paddingHorizontal: 7,
                paddingVertical: 3,
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#9CA3AF' }}>
                +{hiddenCount}
              </Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: '#111' }}>
            ${product.price}
          </Text>
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
            | Cost: ${product.cost}
          </Text>
        </View>

        <Text style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>
          {product.sku}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default InventoryCard