// services/hooks/profilesetup/usePickBrands.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

export interface Brand {
  id: string
  name: string
  emoji: string
}

const DEFAULT_BRANDS: Brand[] = [
  { id: 'nike', name: 'Nike', emoji: '✔️' },
  { id: 'jordan', name: 'Jordan', emoji: '🏀' },
  { id: 'adidas', name: 'Adidas', emoji: '⚽' },
  { id: 'yeezy', name: 'Yeezy', emoji: '👕' },
  { id: 'new_balance', name: 'New Balance', emoji: '🏃' },
  { id: 'puma', name: 'Puma', emoji: '🐆' },
  { id: 'reebok', name: 'Reebok', emoji: '💪' },
  { id: 'converse', name: 'Converse', emoji: '⭐' },
  { id: 'vans', name: 'Vans', emoji: '🛹' },
  { id: 'asics', name: 'ASICS', emoji: '👟' },
  { id: 'salehe', name: 'Salehe Bembury', emoji: '🍕' },
  { id: 'on_running', name: 'On Running', emoji: '💧' },
  { id: 'hoka', name: 'Hoka', emoji: '🏔️' },
  { id: 'brooks', name: 'Brooks', emoji: '🏃' },
  { id: 'saucony', name: 'Saucony', emoji: '👞' },
  { id: 'timberland', name: 'Timberland', emoji: '🌲' },
  { id: 'ugg', name: 'UGG', emoji: '🐑' },
]

export function usePickBrands() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['nike', 'jordan', 'adidas']))
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredBrands = DEFAULT_BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleBrand = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleContinue = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      await new Promise(res => setTimeout(res, 800))

      const selected = DEFAULT_BRANDS.filter(b => selectedIds.has(b.id)).map(b => b.name)
      console.log('=== SELECTED BRANDS ===')
      console.log(selected)

      Toast.show({
        type: 'success',
        text1: 'Brands Saved!',
        text2: "We'll show you drops from your favorite brands.",
      })

      await new Promise(res => setTimeout(res, 400))
      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.message ?? 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    brands: filteredBrands,
    selectedIds,
    setSelectedIds, // 👈 add this
    search,
    setSearch,
    toggleBrand,
    handleContinue,
    loading,
    selectedCount: selectedIds.size,
  }
}