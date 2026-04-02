import React from 'react'
import { View, Text } from 'react-native'

interface OrderSummaryProps {
  subtotal: number
  discountAmount: number
  shipping: number
  total: number
  appliedPromo: string | null
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discountAmount,
  shipping,
  total,
  appliedPromo,
}) => {
  return (
    <View className="mb-8 bg-[#F9FAFB] rounded-3xl p-5">
      
      {/* Title */}
      <Text className="text-lg font-extrabold text-gray-900 mb-4">
        Order Summary
      </Text>

      <View className="gap-3">
        {/* Subtotal */}
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-gray-500">Subtotal</Text>
          <Text className="text-base font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        {/* Discount */}
        {discountAmount > 0 && (
          <View className="flex-row justify-between items-center">
            <Text className="text-base text-green-600 font-medium">
              Discount ({appliedPromo})
            </Text>
            <Text className="text-base font-bold text-green-600">
              -${discountAmount.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Shipping */}
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-gray-500">Shipping</Text>
          <Text className="text-base font-semibold text-green-600">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200 my-2" />

        {/* Total */}
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-lg font-bold text-gray-900">
            Total
          </Text>
          <Text className="text-2xl font-extrabold text-gray-900">
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default OrderSummary