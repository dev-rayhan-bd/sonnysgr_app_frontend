// components/profile/QuickActions.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

interface QuickActionsProps {
  orders: number
  wishlistCount: number
  stockAlerts: number
  reviewsCount: number
  onOrders: () => void
  onWishlist: () => void
  onStockAlerts: () => void
  onReviews: () => void
}

interface RowItem {
  id: string
  label: string
  count?: number
  icon: React.ReactNode
  onPress: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({
  orders,
  wishlistCount,
  stockAlerts,
  reviewsCount,
  onOrders,
  onWishlist,
  onStockAlerts,
  onReviews,
}) => {
  const items: RowItem[] = [
    {
      id: 'orders',
      label: 'My orders',
      icon: <Feather name="shopping-bag" size={18} color="#22C55E" />,
      onPress: onOrders,
    },
    {
      id: 'wishlist',
      label: `Wishlist · ${wishlistCount}`,
      icon: <Ionicons name="heart-outline" size={19} color="#EF4444" />,
      onPress: onWishlist,
    },
    {
      id: 'stockAlerts',
      label: 'Stock alerts',
      icon: <Feather name="bell" size={18} color="#3B82F6" />,
      onPress: onStockAlerts,
    },
    {
      id: 'reviews',
      label: `My reviews · ${reviewsCount}`,
      icon: <Ionicons name="star-outline" size={19} color="#F59E0B" />,
      onPress: onReviews,
    },
  ]

  return (
    <View
      className="bg-white rounded-2xl px-4 py-2 mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-row flex-wrap">
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            activeOpacity={0.7}
            className="w-1/2 flex-row items-center gap-2.5 py-3.5"
            style={{
              borderBottomWidth: index < 2 ? 1 : 0,
              borderBottomColor: '#F3F4F6',
              paddingRight: index % 2 === 0 ? 8 : 0,
            }}
          >
            {item.icon}
            <Text className="text-[13px] font-semibold text-gray-800" numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default QuickActions