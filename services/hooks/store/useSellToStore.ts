import { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import type { ProductType } from '@/types/catalog'

export type ProductCondition = 'Deadstock' | 'Near Deadstock' | 'Very Good' | 'Good'

export interface ConditionOption {
  label: ProductCondition
  sub: string
  code: string
}

export const CONDITIONS: ConditionOption[] = [
  { label: 'Deadstock', sub: 'DS', code: 'DS' },
  { label: 'Near Deadstock', sub: '9/10', code: 'ND' },
  { label: 'Very Good', sub: '8/10', code: 'VG' },
  { label: 'Good', sub: '7/10', code: 'GD' },
]

export const PRODUCT_TYPE_OPTIONS: ProductType[] = ['Sneakers', 'Clothing']
export const RADIUS_OPTIONS = [10, 30, 60] as const
export type RadiusMiles = typeof RADIUS_OPTIONS[number]

export type PhotoSlot =
  | 'Your photo'
  | 'Front'
  | 'Back'
  | 'Tag'
  | 'Detail'
  | 'Receipt'

export const PHOTO_SLOTS: PhotoSlot[] = [
  'Your photo',
  'Front',
  'Back',
  'Tag',
  'Detail',
  'Receipt',
]

export function useSellToStore() {
  const router = useRouter()

  const [productType, setProductType] = useState<ProductType>('Sneakers')
  const [productName, setProductName] = useState('')
  const [condition, setCondition] = useState<ProductCondition | null>(null)
  const [price, setPrice] = useState('')
  const [photos, setPhotos] = useState<Partial<Record<PhotoSlot, string>>>({})
  const [details, setDetails] = useState('')
  const [visible, setVisible] = useState(true)
  const [radius, setRadius] = useState<RadiusMiles>(30)
  const [submitted, setSubmitted] = useState(false)

  const handlePickPhoto = useCallback((slot: PhotoSlot) => {
    console.log('pick photo for', slot)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!productName || !condition || !price) return

    setSubmitted(true)
    Toast.show({
      type: 'success',
      text1: 'Listing submitted!',
      text2: 'Nearby stores can now see your item.',
      visibilityTime: 2000,
    })
    router.back()
  }, [condition, price, productName, router])

  const isValid = !!productName && !!condition && !!price && Number(price) > 0

  return {
    productType,
    setProductType,
    productName,
    setProductName,
    condition,
    setCondition,
    price,
    setPrice,
    photos,
    details,
    setDetails,
    visible,
    setVisible,
    radius,
    setRadius,
    submitted,
    isValid,
    handlePickPhoto,
    handleSubmit,
    goBack: () => router.back(),
  }
}
