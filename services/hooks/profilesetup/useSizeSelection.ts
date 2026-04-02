// services/hooks/profilesetup/useSizeSelection.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

export type GenderTab = "Men's" | "Women's" | "Kids'"

interface SizeConfig {
  sizes: string[]
  unit: string
}

const SIZE_DATA: Record<GenderTab, SizeConfig> = {
  "Men's": {
    unit: 'US Shoe Size',
    sizes: [
      '6', '6.5', '7', '7.5', '8',
      '8.5', '9', '9.5', '10', '10.5',
      '11', '11.5', '12', '13', '14', '15',
    ],
  },
  "Women's": {
    unit: 'US Shoe Size',
    sizes: [
      '5', '5.5', '6', '6.5', '7',
      '7.5', '8', '8.5', '9', '9.5',
      '10', '10.5', '11', '11.5', '12',
      '13', '14', '15',
    ],
  },
  "Kids'": {
    unit: 'US Shoe Size',
    sizes: [
      '1Y', '1.5Y', '2Y', '2.5Y', '3Y',
      '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y',
      '6Y', '6.5Y', '7Y', '7.5Y', '8Y',
      '8.5Y', '9Y', '9.5Y',
    ],
  },
}

export function useSizeSelection() {
  const [activeTab, setActiveTab] = useState<GenderTab>("Women's")
  const [selectedSizes, setSelectedSizes] = useState<Record<GenderTab, string | null>>({
    "Men's": null,
    "Women's": null,
    "Kids'": null,
  })
  const [loading, setLoading] = useState(false)

  const currentConfig = SIZE_DATA[activeTab]
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
    setSelectedSizes(prev => ({ ...prev, [activeTab]: trimmed }))
  }

  const handleContinue = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      // TODO: replace with real API call
      await new Promise(res => setTimeout(res, 800))

      console.log('=== SIZE SELECTION DATA ===')
      console.log('Selected Sizes:', JSON.stringify(selectedSizes, null, 2))
      console.log('Active Tab:', activeTab)
      console.log('===========================')

      Toast.show({
        type: 'success',
        text1: 'Sizes Saved!',
        text2: 'We\'ll show you only what fits.',
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
    setSelectedSizes,
    selectSize,
    addCustomSize,
    handleContinue,
    allSelectedSizes,
    removeSelectedSize,
    loading,
  }
}