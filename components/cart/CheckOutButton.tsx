import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'

interface CheckoutButtonProps {
  total: number
  loading?: boolean
  onPress: () => void
  disabled?: boolean
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  total,
  loading = false,
  onPress,
  disabled = false,
}) => {
  const isDisabled = disabled || loading

  return (
    <View className="pb-20 pt-4">
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.9}
        className={`flex-row items-center justify-between rounded-3xl py-5 px-6 ${
          isDisabled ? 'bg-gray-300' : 'bg-black'
        }`}
      >
        {loading ? (
          <View className="flex-row items-center gap-3">
            <ActivityIndicator size="small" color="#ffffff" />
            <Text className="text-white text-lg font-semibold">
              Processing...
            </Text>
          </View>
        ) : (
          <>
            {/* Left Text */}
            <Text className="text-white text-lg font-extrabold tracking-wide">
              Checkout
            </Text>

            {/* Price Badge (Bigger) */}
            <View className="bg-white/20 rounded-xl px-4 py-2">
              <Text className="text-white text-base font-extrabold">
                ${total.toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </TouchableOpacity>

      {/* Footer Note */}
      <Text className="text-center text-sm text-gray-400 mt-4">
        🔒 Free returns within 30 days · Secured checkout
      </Text>
    </View>
  )
}

export default CheckoutButton