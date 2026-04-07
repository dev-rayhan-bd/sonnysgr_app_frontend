// components/discover/explore/FeaturedDropBanner.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { FeaturedDrop } from '@/services/hooks/discover/useExplore'

interface Props {
  drop: FeaturedDrop
  onPress: () => void
}

const FeaturedDropBanner: React.FC<Props> = ({ drop, onPress }) => (
  <View
    className="mt-5 rounded-3xl overflow-hidden bg-gray-900"
    style={{ minHeight: 180 }}
  >
    {drop.imageUri && (
      <Image
        source={{ uri: drop.imageUri }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ opacity: 0.5 }}
      />
    )}
    <View className="p-5 justify-between" style={{ minHeight: 180 }}>
      <View className="bg-green-500 self-start px-3 py-1 rounded-full">
        <Text className="text-white text-[10px] font-extrabold tracking-widest">
          {drop.label}
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-white/60 text-xs font-semibold">{drop.brand}</Text>
        <Text className="text-white text-xl font-extrabold mt-0.5 leading-tight">
          {drop.name}
        </Text>
        <Text className="text-white/50 text-xs mt-1">{drop.subtitle}</Text>
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-white text-lg font-extrabold">${drop.price}</Text>
          <TouchableOpacity onPress={onPress} className="bg-green-500 px-5 py-2.5 rounded-full">
            <Text className="text-white text-xs font-extrabold">{drop.ctaText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
)

export default FeaturedDropBanner