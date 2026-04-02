import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-toast-message'

import { useCart } from '@/services/hooks/cart/useCart'
import CartItemCard from '@/components/cart/CartItemCard'
import PromoCodeInput from '@/components/cart/PromoCodeInput'
import OrderSummary from '@/components/cart/OrderSummary'
import CheckoutButton from '@/components/cart/CheckOutButton'
import BaseContainer from '@/components/shared/BaseContainer'

const CartScreen = () => {
  const [loading, setLoading] = useState(false)

  const {
    items,
    promoCode,
    appliedPromo,
    subtotal,
    discountAmount,
    shipping,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    setPromoCode,
    applyPromoCode,
    removePromo,
  } = useCart()

  // -----------------------------
  // Checkout Handler (FIXED)
  // -----------------------------
  const handleCheckout = async () => {
    if (items.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Cart is empty',
        text2: 'Add items before checkout',
      })
      return
    }

    try {
      setLoading(true)

      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000))

      Toast.show({
        type: 'success',
        text1: 'Order placed',
        text2: `Total: $${total.toFixed(2)}`,
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Checkout failed',
        text2: error?.message ?? 'Please try again',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseContainer scrollable backgroundColor="#ffff">
      <View className="px-6 pt-20">
        {/* Header */}
        <View className="items-center mb-5">
          <Text className="text-2xl font-extrabold text-gray-900">
            My Cart
          </Text>
          <Text className="text-sm text-gray-400 mt-0.5">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {/* Empty State */}
        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-5xl mb-4">🛒</Text>
            <Text className="text-lg font-bold text-gray-700">
              Your cart is empty
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              Add some sneakers to get started
            </Text>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <View className="mb-4">
              {items.map((item) => (
                <CartItemCard
                  key={`${item.id}-${item.size}`}
                  item={item}
                  onIncrement={(id) =>
                    updateQuantity(id, item.size, 1)
                  }
                  onDecrement={(id) =>
                    updateQuantity(id, item.size, -1)
                  }
                  onRemove={(id) =>
                    removeItem(id, item.size)
                  }
                />
              ))}
            </View>

            {/* Divider */}
            <View className="h-px bg-gray-200 mb-5" />

            {/* Promo Code */}
            <PromoCodeInput
              promoCode={promoCode}
              appliedPromo={appliedPromo}
              onChangeCode={setPromoCode}
              onApply={applyPromoCode}
              onRemove={removePromo}
            />

            {/* Divider */}
            <View className="h-px bg-gray-200 mb-5" />

            {/* Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              discountAmount={discountAmount}
              shipping={shipping}
              total={total}
              appliedPromo={appliedPromo}
            />
          </>
        )}

        {/* Checkout Button */}
        {items.length > 0 && (
          <View className="px-4 border-t border-gray-100">
            <CheckoutButton
              total={total}
              loading={loading}
              onPress={handleCheckout}
            />
          </View>
        )}
      </View>
    </BaseContainer>
  )
}

export default CartScreen