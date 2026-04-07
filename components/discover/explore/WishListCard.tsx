// components/profile/wishlist/WishlistCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { STATUS_COLOR,WishlistItem } from '@/services/hooks/discover/useWishList'

interface Props {
  item: WishlistItem
  onWishlistToggle: () => void
  onBuy: () => void
  onNotify: () => void
}

const WishlistCard: React.FC<Props> = ({ item, onWishlistToggle, onBuy, onNotify }) => {
  const isAvailable = item.stockStatus === 'In Stock' || item.stockStatus === 'Low Stock'
  const hasDiscount = item.originalPrice && item.originalPrice > item.price
  const discountPct = hasDiscount
    ? Math.round((1 - item.price / item.originalPrice!) * 100)
    : 0

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden mb-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="flex-row">
        {/* Image */}
        <View className="w-28 h-28 bg-gray-100 relative">
          {item.imageUri
            ? <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
            : <View className="w-full h-full bg-gray-200" />
          }
          {hasDiscount && (
            <View className="absolute top-2 left-2 bg-red-500 px-1.5 py-0.5 rounded-full">
              <Text className="text-white text-[10px] font-extrabold">-{discountPct}%</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1 p-3 justify-between">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                {item.brand}
              </Text>
              <Text className="text-sm font-bold text-gray-900 mt-0.5" numberOfLines={2}>
                {item.name}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">Size {item.size}</Text>
            </View>
            <TouchableOpacity onPress={onWishlistToggle} className="p-1">
              <Ionicons
                name={item.isWishlisted ? 'heart' : 'heart-outline'}
                size={20}
                color={item.isWishlisted ? '#EF4444' : '#9CA3AF'}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-base font-extrabold text-gray-900">${item.price}</Text>
              {hasDiscount && (
                <Text className="text-xs text-gray-400 line-through">${item.originalPrice}</Text>
              )}
            </View>
            <View
              className="px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: STATUS_COLOR[item.stockStatus] + '20' }}
            >
              <Text
                className="text-[10px] font-extrabold"
                style={{ color: STATUS_COLOR[item.stockStatus] }}
              >
                {item.stockStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom row */}
      <View className="flex-row items-center px-3 py-2.5 border-t border-gray-100 gap-2">
        <View className="flex-row items-center gap-1.5 flex-1">
          <Feather name="map-pin" size={11} color="#9CA3AF" />
          <Text className="text-xs text-gray-400" numberOfLines={1}>
            {item.storeName} · {item.storeDistance}
          </Text>
        </View>
        <Text className="text-[11px] text-gray-300">{item.addedDaysAgo}d ago</Text>
        {isAvailable ? (
          <TouchableOpacity onPress={onBuy} className="bg-green-500 px-4 py-1.5 rounded-full">
            <Text className="text-white text-xs font-extrabold">Buy</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onNotify}
            className="border border-gray-200 px-3 py-1.5 rounded-full flex-row items-center gap-1"
          >
            <Ionicons name="notifications-outline" size={11} color="#6B7280" />
            <Text className="text-xs font-semibold text-gray-600">Notify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default WishlistCard