import { StoreProduct } from '@/services/hooks/map/useMap'
import React from 'react'
import { Text, View } from 'react-native'

const GREEN = '#22C55E'

interface StoreProductCardProps {
  product: StoreProduct
}

const StoreProductCard = ({ product }: StoreProductCardProps) => {
  return (
    <View
      style={{
        width: 130,
        borderRadius: 14,
        backgroundColor: '#F8F8FA',
        overflow: 'hidden',
        marginRight: 12,
      }}
    >
      <View
        style={{
          height: 96,
          backgroundColor: '#F0F0F5',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <View
          style={{
            width: 80,
            height: 40,
            backgroundColor: '#D8D8E8',
            borderRadius: 4,
            transform: [{ rotate: '-8deg' }],
          }}
        />

        {product.isHot && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#EF4444',
              borderRadius: 6,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
              HOT
            </Text>
          </View>
        )}
      </View>

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: GREEN,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {product.productType}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#0F0F0F',
            lineHeight: 17,
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {product.name}
        </Text>
        <Text style={{ fontSize: 11, color: '#8A8A9A', marginBottom: 6 }}>
          {product.audience}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '700',
            color: '#0F0F0F',
            marginBottom: 6,
          }}
        >
          {product.price}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          {product.sizes.map((size) => (
            <View
              key={size}
              style={{
                backgroundColor: '#EAFBF0',
                borderRadius: 4,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontSize: 10, color: GREEN, fontWeight: '600' }}>
                {size}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default StoreProductCard
