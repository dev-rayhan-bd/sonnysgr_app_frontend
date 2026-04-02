// components/profile/QuickActions.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2 // Adjusting for padding and gap

interface QuickActionsProps {
  orders: number
  wishlistCount: number
  wantedPairs: number
  reviewsCount: number
  onOrders: () => void
  onWishlist: () => void
  onWantedPairs: () => void
  onReviews: () => void
}

interface ActionItem {
  id: string
  label: string
  count?: number
  icon: React.ReactNode
  onPress: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({
  orders,
  wishlistCount,
  wantedPairs,
  reviewsCount,
  onOrders,
  onWishlist,
  onWantedPairs,
  onReviews,
}) => {
  const actions: ActionItem[] = [
    {
      id: 'orders',
      label: 'My Orders',
      icon: <Feather name="shopping-bag" size={28} color="#10B981" />, // Green
      onPress: onOrders,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      count: wishlistCount,
      icon: <Ionicons name="heart-outline" size={30} color="#EF4444" />, // Red
      onPress: onWishlist,
    },
    {
      id: 'wanted',
      label: 'Wanted Pairs',
      icon: <Feather name="bell" size={28} color="#3B82F6" />, // Blue
      onPress: onWantedPairs,
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      icon: <Ionicons name="star-outline" size={30} color="#F59E0B" />, // Gold/Orange
      onPress: onReviews,
    },
  ]

  return (
    <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          activeOpacity={0.8}
          className="bg-white rounded-3xl items-center justify-center py-6"
          style={{
            width: CARD_WIDTH,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <View className="mb-3">
            {action.icon}
          </View>
          
          <Text className="text-[15px] font-black text-gray-900 text-center">
            {action.label}
            {action.count !== undefined && action.count > 0 ? ` (${action.count})` : ''}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default QuickActions