import { useState } from 'react'
import Toast from 'react-native-toast-message'
import type { GenderTab } from './useSizeSelection'

interface SizeConfig {
  sizes: string[]
  unit: string
}

const CLOTHING_SIZE_DATA: Record<GenderTab, SizeConfig> = {
  "Men's": {
    unit: 'Clothing Size',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  },
  "Women's": {
    unit: 'Clothing Size',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  "Kids'": {
    unit: 'Clothing Size',
    sizes: ['2T', '3T', '4T', '5T', 'XS', 'S', 'M', 'L', 'XL'],
  },
}

export function useClothingSelection() {
  const [activeTab, setActiveTab] = useState<GenderTab>("Women's")
  const [selectedSizes, setSelectedSizes] = useState<Record<GenderTab, string | null>>({
    "Men's": null,
    "Women's": null,
    "Kids'": null,
  })
  const [loading, setLoading] = useState(false)

  const currentConfig = CLOTHING_SIZE_DATA[activeTab]
  const currentSelected = selectedSizes[activeTab]

  const selectSize = (size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [activeTab]: prev[activeTab] === size ? null : size,
    }))
  }

  const addCustomSize = (size: string) => {
    const trimmed = size.trim()
    if (!trimmed) return

    setSelectedSizes(prev => ({
      ...prev,
      [activeTab]: trimmed,
    }))
  }

  const handleContinue = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      // TODO: replace with real API call
      await new Promise(res => setTimeout(res, 800))

      console.log('=== CLOTHING SIZE SELECTION DATA ===')
      console.log('Selected Clothing Sizes:', JSON.stringify(selectedSizes, null, 2))
      console.log('Active Tab:', activeTab)
      console.log('===================================')

      Toast.show({
        type: 'success',
        text1: 'Clothing Sizes Saved!',
        text2: "We'll personalize apparel picks too.",
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

  const removeSelectedSize = (tab: GenderTab) => {
    setSelectedSizes(prev => ({ ...prev, [tab]: null }))
  }

  const allSelectedSizes = (Object.entries(selectedSizes) as [GenderTab, string | null][])
    .filter(([, size]) => size !== null)
    .map(([tab, size]) => ({ tab, size: size! }))

  return {
    activeTab,
    setActiveTab,
    currentConfig,
    currentSelected,
    selectSize,
    addCustomSize,
    handleContinue,
    allSelectedSizes,
    removeSelectedSize,
    loading,
  }
}
