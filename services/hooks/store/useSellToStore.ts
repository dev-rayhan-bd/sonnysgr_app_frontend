import { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
export type SneakerCondition = 'Deadstock' | 'Near Deadstock' | 'Very Good' | 'Good'

export interface ConditionOption {
  label: SneakerCondition
  sub: string
  code: string
}

export const CONDITIONS: ConditionOption[] = [
  { label: 'Deadstock',      sub: 'D/S',     code: 'DS'  },
  { label: 'Near Deadstock', sub: '9x/10',   code: 'ND'  },
  { label: 'Very Good',      sub: '8x/10',   code: 'VG'  },
  { label: 'Good',           sub: '7/10',    code: 'GD'  },
]

export const RADIUS_OPTIONS = [10, 30, 60] as const
export type RadiusMiles = typeof RADIUS_OPTIONS[number]

export type PhotoSlot =
  | 'Your photo'
  | 'ID'
  | 'Options'
  | 'Obverse'
  | 'Soles'
  | 'Sockliner'

export const PHOTO_SLOTS: PhotoSlot[] = [
  'Your photo', 'ID', 'Options',
  'Obverse', 'Soles', 'Sockliner',
]

export function useSellToStore() {
  const router = useRouter()

  const [shoeName,   setShoeName]   = useState('')
  const [condition,  setCondition]  = useState<SneakerCondition | null>(null)
  const [price,      setPrice]      = useState('')
  const [photos,     setPhotos]     = useState<Partial<Record<PhotoSlot, string>>>({})
  const [details,    setDetails]    = useState('')
  const [visible,    setVisible]    = useState(true)
  const [radius,     setRadius]     = useState<RadiusMiles>(30)
  const [submitted,  setSubmitted]  = useState(false)

  const handlePickPhoto = useCallback((slot: PhotoSlot) => {
    // integrate image picker here
    console.log('pick photo for', slot)
  }, [])
// with this:
const handleSubmit = useCallback(() => {
  if (!shoeName || !condition || !price) return
  setSubmitted(true)
    Toast.show({
    type: 'success',
    text1: 'Listing submitted!',
    text2: 'Nearby stores can now see your pair.',
    visibilityTime: 2000,
  })
  router.back()
}, [shoeName, condition, price, router])

  const isValid = !!shoeName && !!condition && !!price && Number(price) > 0

  return {
    shoeName,   setShoeName,
    condition,  setCondition,
    price,      setPrice,
    photos,
    details,    setDetails,
    visible,    setVisible,
    radius,     setRadius,
    submitted,
    isValid,
    handlePickPhoto,
    handleSubmit,
    goBack: () => router.back(),
  }
}