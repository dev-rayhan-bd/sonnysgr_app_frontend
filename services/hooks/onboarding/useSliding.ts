import { useRef, useState, useCallback } from 'react'
import { FlatList, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export interface SlideItem {
  id: string
  [key: string]: unknown
}

interface UseSlidingOptions {
  totalSlides: number
  onFinish: () => void
}

interface UseSlidingReturn<T extends SlideItem> {
  currentIndex: number
  isFirst: boolean
  isLast: boolean
  // React 18: useRef(null) gives RefObject<T | null>
  flatListRef: React.RefObject<FlatList<T> | null>
  goNext: () => void
  goBack: () => void
  goToIndex: (index: number) => void
  onMomentumScrollEnd: (e: {
    nativeEvent: { contentOffset: { x: number } }
  }) => void
}

export function useSliding<T extends SlideItem>({
  totalSlides,
  onFinish,
}: UseSlidingOptions): UseSlidingReturn<T> {
  const [currentIndex, setCurrentIndex] = useState(0)
  // React 18 compatible — initial null, type is FlatList<T> | null
  const flatListRef = useRef<FlatList<T> | null>(null)

  const scrollToIndex = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      })
      setCurrentIndex(index)
    },
    [],
  )

  const goNext = useCallback(() => {
    if (currentIndex >= totalSlides - 1) {
      onFinish()
      return
    }
    scrollToIndex(currentIndex + 1)
  }, [currentIndex, totalSlides, onFinish, scrollToIndex])

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return
    scrollToIndex(currentIndex - 1)
  }, [currentIndex, scrollToIndex])

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return
      scrollToIndex(index)
    },
    [totalSlides, scrollToIndex],
  )

  const onMomentumScrollEnd = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      const newIndex = Math.round(e.nativeEvent.contentOffset.x / width)
      setCurrentIndex(newIndex)
    },
    [],
  )

  return {
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalSlides - 1,
    flatListRef,
    goNext,
    goBack,
    goToIndex,
    onMomentumScrollEnd,
  }
}