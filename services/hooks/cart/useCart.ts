// hooks/cart/useCart.ts
import { useState, useCallback } from 'react'

export interface CartItem {
  id: string
  brand: string
  name: string
  colorway: string
  sku: string
  size: number
  store: string
  distance: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  promoCode: string
  appliedPromo: string | null
  discount: number
  shippingFee: number
}

const INITIAL_CART: CartState = {
  items: [
    {
      id: '1',
      brand: 'NIKE',
      name: 'Air Jordan 4 Retro',
      colorway: 'Black Cat',
      sku: 'CU1110-010',
      size: 10.5,
      store: 'Kicks City',
      distance: '0.8mi',
      price: 220,
      quantity: 1,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/AIR+JORDAN+4+RETRO.png',
    },
    {
      id: '2',
      brand: 'NIKE',
      name: 'Dunk Low Retro',
      colorway: 'Panda',
      sku: 'DD1391-100',
      size: 9,
      store: 'Sneaker Lab',
      distance: '1.2mi',
      price: 110,
      quantity: 1,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-87f8jZ.png',
    },
  ],
  promoCode: '',
  appliedPromo: null,
  discount: 0,
  shippingFee: 0,
}

const VALID_PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  NIKE20: 20,
  FREESHIP: 0,
}

export const useCart = () => {
  const [cart, setCart] = useState<CartState>(INITIAL_CART)

  // id + size together form a unique key (same shoe, different size = different line item)
  const updateQuantity = useCallback((id: string, size: number, delta: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0),
    }))
  }, [])

  const removeItem = useCallback((id: string, size: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => !(item.id === id && item.size === size)
      ),
    }))
  }, [])

  const setPromoCode = useCallback((code: string) => {
    setCart((prev) => ({ ...prev, promoCode: code }))
  }, [])

  const applyPromoCode = useCallback(() => {
    setCart((prev) => {
      const code = prev.promoCode.trim().toUpperCase()
      if (VALID_PROMO_CODES[code] !== undefined) {
        return { ...prev, appliedPromo: code, discount: VALID_PROMO_CODES[code] }
      }
      return prev
    })
  }, [])

  const removePromo = useCallback(() => {
    setCart((prev) => ({
      ...prev,
      appliedPromo: null,
      discount: 0,
      promoCode: '',
    }))
  }, [])

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const discountAmount =
    cart.appliedPromo === 'FREESHIP' ? 0 : (subtotal * cart.discount) / 100

  const shipping = cart.appliedPromo === 'FREESHIP' ? 0 : cart.shippingFee

  const total = subtotal - discountAmount + shipping

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items: cart.items,
    promoCode: cart.promoCode,
    appliedPromo: cart.appliedPromo,
    discount: cart.discount,
    subtotal,
    discountAmount,
    shipping,
    total,
    itemCount,
    updateQuantity,  // (id: string, size: number, delta: number) => void
    removeItem,      // (id: string, size: number) => void
    setPromoCode,
    applyPromoCode,
    removePromo,
  }
}