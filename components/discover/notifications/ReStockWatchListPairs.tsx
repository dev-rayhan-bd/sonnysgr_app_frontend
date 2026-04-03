// components/notifications/restock/RestockWatchlistPairs.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'
import type { WatchlistPair } from '@/services/hooks/discover/useReStockAlert'

interface Props {
  pairs: WatchlistPair[]
}

const tagColors: Record<string, { bg: string; text: string }> = {
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  red: { bg: 'bg-red-100', text: 'text-red-500' },
}

const RestockWatchlistPairs: React.FC<Props> = ({ pairs }) => {
  const router = useRouter()

  if (!pairs.length) return null

  return (
    <View className="mt-8 px-4">
      <Text className="text-base font-bold text-gray-900">
        {pairs.length} Pairs Back in Stock
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5 mb-3">
        Sneakers on your watchlist are available
      </Text>

      {pairs.map((pair) => {
        const tag = pair.tagColor ? tagColors[pair.tagColor] : null
        return (
          <View
            key={pair.id}
            className="flex-row items-center py-3 border-b border-gray-100 gap-3"
          >
            {/* Tag badge (absolute-style left strip) */}
            {tag && pair.tag && (
              <View className={`px-2 py-0.5 rounded-full ${tag.bg} self-start mt-1`}>
                <Text className={`text-[10px] font-semibold ${tag.text}`}>{pair.tag}</Text>
              </View>
            )}

            {/* Product image */}
            <Image
              source={{ uri: pair.imageUrl }}
              className="w-16 h-12"
              resizeMode="contain"
            />

            {/* Info */}
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-900 leading-snug" numberOfLines={2}>
                {pair.name}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {pair.brand} · {pair.storeDistance}
              </Text>
              <Text className="text-sm font-bold text-gray-900 mt-1">${pair.price}</Text>
            </View>

            {/* Buy button */}
            <TouchableOpacity
              onPress={() => router.push(`/`)}
              activeOpacity={0.8}
              className="bg-gray-900 rounded-lg px-4 py-2"
            >
              <Text className="text-white text-xs font-bold">Buy →</Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

export default RestockWatchlistPairs