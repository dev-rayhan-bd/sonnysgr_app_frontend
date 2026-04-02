import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

interface PromoCodeProps {
  promoCode: string
  appliedPromo: string | null
  onChangeCode: (code: string) => void
  onApply: () => void
  onRemove: () => void
}

const PromoCodeInput: React.FC<PromoCodeProps> = ({
  promoCode,
  appliedPromo,
  onChangeCode,
  onApply,
  onRemove,
}) => {
  const isValid = promoCode.trim().length > 0

  return (
    <View className="mb-7">
      
      {/* Title */}
      <Text className="text-base font-extrabold text-gray-900 mb-3">
        Promo Code
      </Text>

      {appliedPromo ? (
        // -----------------------------
        // Applied State (Bigger Card)
        // -----------------------------
        <View className="flex-row items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
          
          <View className="flex-1">
            <Text className="text-green-700 font-extrabold text-base">
              {appliedPromo} applied
            </Text>
            <Text className="text-green-500 text-sm mt-1">
              Discount applied to your order
            </Text>
          </View>

          <TouchableOpacity
            onPress={onRemove}
            className="ml-4 px-3 py-2 bg-red-50 rounded-lg"
          >
            <Text className="text-red-500 text-sm font-semibold">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // -----------------------------
        // Input State (Bigger Input)
        // -----------------------------
        <View className="flex-row items-center gap-3">
          
          <TextInput
            value={promoCode}
            onChangeText={onChangeCode}
            placeholder="Enter promo code"
            placeholderTextColor="#9ca3af"
            autoCapitalize="characters"
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 text-base text-gray-900 font-semibold"
          />

          <TouchableOpacity
            onPress={onApply}
            disabled={!isValid}
            activeOpacity={0.85}
            className={`px-6 py-4 rounded-2xl ${
              isValid ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-base font-bold ${
                isValid ? 'text-white' : 'text-gray-400'
              }`}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default PromoCodeInput