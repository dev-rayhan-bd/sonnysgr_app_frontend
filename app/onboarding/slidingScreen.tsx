import Button from '@/components/shared/Button'
import ShowPicture from '@/components/shared/ShowPicture'
import { useSliding, type SlideItem } from '@/services/hooks/onboarding/useSliding'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import React from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

import WelcomeSVG from '@/assets/images/onboarding/splash.svg'
import FindSVG from '@/assets/images/onboarding/find.svg'
import SizeSVG from '@/assets/images/onboarding/size.svg'
import BuySVG from '@/assets/images/onboarding/buy.svg'

const { width, height } = Dimensions.get('window')
const IMAGE_HEIGHT = height / 2

const GREEN = '#22C55E'

interface DotsProps {
  total: number
  current: number
  onPress: (i: number) => void
}

interface Slide extends SlideItem {
  SVG: React.FC<SvgProps>
  title: string
  titleHighlight?: string
  subtitle: string
  buttonText: string
}

const SLIDES: Slide[] = [
  {
    id: 'welcome',
    SVG: WelcomeSVG,
    title: 'Welcome to ',
    titleHighlight: 'GdSNKR',
    subtitle: 'Discover, track, and buy the sneakers you love — all in one place.',
    buttonText: 'Get Started',
  },
  {
    id: 'find',
    SVG: FindSVG,
    title: 'Find Sneakers\nNear You',
    subtitle: 'Locate verified sellers and retailers close to you with real-time availability.',
    buttonText: 'Next',
  },
  {
    id: 'size',
    SVG: SizeSVG,
    title: 'Your Size,\nEverywhere.',
    subtitle: 'Set your size once and instantly filter every listing to exactly what fits you.',
    buttonText: 'Next',
  },
  {
    id: 'buy',
    SVG: BuySVG,
    title: 'Buy It.\nMobile. Ship It.',
    subtitle: 'Checkout in seconds from your phone and track your order every step of the way.',
    buttonText: 'Start Exploring',
  },
]

interface SlidePageProps {
  slide: Slide
  onNext: () => void
  onSkip: () => void
  isLast: boolean
  isFirst: boolean
}

const SlidePage: React.FC<SlidePageProps> = ({
  slide,
  onNext,
  onSkip,
  isLast,
  isFirst,
}) => {
  const { SVG, title, titleHighlight, subtitle, buttonText } = slide
  const showSkip = !isFirst && !isLast

  return (
    <View style={{ width, flex: 1, backgroundColor: 'white' }}>
      {/* Full‑width image container with overflow hidden to crop */}
      <View style={{ width, height: IMAGE_HEIGHT, overflow: 'hidden' }}>
        <ShowPicture
          SvgComponent={SVG}
          width={width}
          height={IMAGE_HEIGHT}
          preserveAspectRatio="xMidYMid slice" // fills container like 'cover'
          resizeMode="cover"
        />
      </View>

      {/* Skip button under the image */}
      {showSkip && (
        <View className="items-center mt-4">
          <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
            <Text className="text-gray-500 text-base font-medium">Skip</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Text content */}
      <View className="px-7 flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          {title}
          {titleHighlight != null && (
            <Text style={{ color: GREEN }}>{titleHighlight}</Text>
          )}
        </Text>
        <Text className="text-gray-500 text-base leading-6">{subtitle}</Text>
      </View>

      {/* Button – explicit width prevents flex issues */}
      <View className="px-7 pb-8">
        <Button
          text={buttonText}
          onPress={onNext}
          useGradient={false}
          backgroundColor={GREEN}
          borderRadius={14}
          paddingVertical={16}
          fontSize={16}
          fontWeight="600"
          textColor="#FFFFFF"
          width="100%"   // ← fixes the missing text issue
        />
      </View>
    </View>
  )
}

const Dots: React.FC<DotsProps> = ({ total, current, onPress }) => (
  <View className="flex-row justify-center items-center gap-1.5 pb-7">
    {Array.from({ length: total }).map((_, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => onPress(i)}
        activeOpacity={0.7}
        className={`h-2 rounded-full ${
          i === current ? 'w-6 bg-green-500' : 'w-2 bg-gray-200'
        }`}
      />
    ))}
  </View>
)

const SlidingScreen: React.FC = () => {
  const router = useRouter()

  const {
    currentIndex,
    isLast,
    isFirst,
    flatListRef,
    goNext,
    goToIndex,
    onMomentumScrollEnd,
  } = useSliding<Slide>({
    totalSlides: SLIDES.length,
    onFinish: () => router.replace('/onboarding/slidingScreen'),
  })

  const handleSkip = () => goToIndex(SLIDES.length - 1)

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <SlidePage
      slide={item}
      onNext={goNext}
      onSkip={handleSkip}
      isLast={isLast}
      isFirst={isFirst}
    />
  )

  return (
    <BaseContainer backgroundColor="#FFFFFF">
      <FlatList<Slide>
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={renderItem}
        bounces={false}
        style={{ flex: 1 }}
      />
      <Dots
        total={SLIDES.length}
        current={currentIndex}
        onPress={goToIndex}
      />
    </BaseContainer>
  )
}

export default SlidingScreen