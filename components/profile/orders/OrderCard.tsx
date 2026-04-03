// components/orders/OrderCard.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router' // Added router
import OrderStatusBadge from './OrderStatusBadge'
import type { Order } from '@/services/hooks/profile/useOrders'

interface OrderCardProps {
    order: Order
    onPress: (id: string) => void
}

// ─── Status icon inside the image tile ───────────────────────────────────────

const TileIcon: React.FC<{ status: Order['status'] }> = ({ status }) => {
    switch (status) {
        case 'Completed':
            return (
                <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center border-2 border-white">
                    <Feather name="check" size={13} color="#fff" />
                </View>
            )
        case 'Pick Up Ready':
            return (
                <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center border-2 border-white">
                    <Feather name="circle" size={10} color="#fff" />
                </View>
            )
        case 'On Hold':
            return (
                <View className="w-6 h-6 rounded-full bg-yellow-400 items-center justify-center border-2 border-white">
                    <Feather name="pause" size={12} color="#fff" />
                </View>
            )
        case 'Cancelled':
            return (
                <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center border-2 border-white">
                    <Feather name="x" size={13} color="#fff" />
                </View>
            )
        default:
            return (
                <View className="w-6 h-6 rounded-full bg-blue-400 items-center justify-center border-2 border-white">
                    <Feather name="activity" size={12} color="#fff" />
                </View>
            )
    }
}

// ─── Component ────────────────────────────────────────────────────────────────

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
    const router = useRouter();

    const handleReviewPress = (e: any) => {
        // Stop propagation so the main card onPress doesn't fire
        e.stopPropagation();
        router.push("/screens/settings/leaveReviewScreen"); 
    };

    return (
        <TouchableOpacity
            onPress={() => onPress(order.id)}
            activeOpacity={0.75}
            className="mb-2 bg-white"
        >
            {/* Main row */}
            <View className="flex-row items-center px-4 py-3.5 gap-3.5">

                {/* Image tile with status icon overlay */}
                <View className="relative">
                    <View
                        className="w-16 h-16 rounded-2xl items-center justify-center"
                        style={{ backgroundColor: order.imageColor }}
                    >
                        <MaterialCommunityIcons name="shoe-sneaker" size={28} color="rgba(255,255,255,0.7)" />
                    </View>
                    <View className="absolute -bottom-1 -right-1">
                        <TileIcon status={order.status} />
                    </View>
                </View>

                {/* Info */}
                <View className="flex-1">
                    <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                        {order.sneakerName}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-0.5">
                        {order.size} · {order.gender}
                    </Text>
                    <Text className="text-xs text-gray-400">
                        {order.store} · {order.date}
                    </Text>

                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-sm font-extrabold text-gray-900">
                            ${order.price.toFixed(2)}
                        </Text>
                        <OrderStatusBadge status={order.status} />
                    </View>
                </View>

                {/* Chevron */}
                <Feather name="chevron-right" size={16} color="#D1D5DB" />
            </View>

            {/* Pickup deadline banner */}
            {order.pickupDeadline && (
                <View className="mx-4 mb-3 px-3 py-2 bg-red-50 rounded-xl flex-row items-center gap-2">
                    <Feather name="clock" size={12} color="#EF4444" />
                    <Text className="text-xs font-semibold text-red-500">
                        {order.pickupDeadline}
                    </Text>
                </View>
            )}

            {/* Leave a Review Button - Only visible when Completed */}
            {order.status === 'Completed' && (
                <View className="mx-4 mb-3">
                    <TouchableOpacity 
                        onPress={handleReviewPress}
                        className="w-full py-2.5 rounded-xl border border-gray-200 flex-row items-center justify-center gap-2"
                    >
                        <Feather name="star" size={14} color="#374151" />
                        <Text className="text-xs font-bold text-gray-700">Leave a Review</Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default OrderCard