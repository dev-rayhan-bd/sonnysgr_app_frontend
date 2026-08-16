import React, { useMemo } from 'react'
import {
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import { usePublicLocker } from '@/services/hooks/profile/usePublicLocker'

export default function ItemDetailScreen() {
  const router = useRouter()
  const { itemId, lockerId, username } = useLocalSearchParams<{
    itemId?: string
    lockerId?: string
    username?: string
  }>()

  const { profile } = usePublicLocker(lockerId)

  const item = useMemo(
    () => profile.items.find((current) => current.id === itemId),
    [itemId, profile.items],
  )

  const handleShare = async () => {
    if (!item) return
    try {
      await Share.share({
        message: `Check out ${item.name} in @${username || profile.username}'s GoSNKR locker.`,
      })
    } catch (_) {}
  }

  if (!item) {
    return (
      <BaseContainer backgroundColor="#FFFFFF">
        <View className="flex-1 px-4 pt-12 items-center justify-center">
          <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center">
            <Feather name="search" size={24} color="#9CA3AF" />
          </View>
          <Text className="text-lg font-black text-gray-900 mt-4">Pair not found</Text>
          <Text className="text-sm text-gray-400 text-center mt-1">
            This locker item may have been removed.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 px-5 py-3 rounded-xl bg-gray-900"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </BaseContainer>
    )
  }

  return (
    <BaseContainer backgroundColor="#FFFFFF" scrollable>
      <View className="pb-12">
        <View className="absolute top-12 left-4 right-4 z-10 flex-row justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center shadow-sm"
          >
            <Feather name="arrow-left" size={20} color="#111827" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center shadow-sm"
          >
            <Feather name="share-2" size={18} color="#111827" />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-100" style={{ height: 430 }}>
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="px-4 pt-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="text-2xl font-black text-gray-900 leading-8">{item.name}</Text>
              <Text className="text-sm text-gray-400 mt-1">Size {item.size || '—'}</Text>
            </View>

            {item.isForSale ? (
              <View className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 items-end">
                <Text className="text-[10px] font-bold text-green-600 uppercase tracking-wider">
                  For sale
                </Text>
                <Text className="text-lg font-black text-green-700">
                  ${item.price?.toLocaleString() ?? '—'}
                </Text>
              </View>
            ) : null}
          </View>

          <View className="flex-row gap-3 mt-5">
            <View className="flex-1 rounded-2xl bg-gray-50 px-4 py-4">
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Condition
              </Text>
              <Text className="text-base font-black text-gray-900 mt-1">{item.condition}</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-gray-50 px-4 py-4">
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Locker
              </Text>
              <Text className="text-base font-black text-gray-900 mt-1" numberOfLines={1}>
                @{username || profile.username}
              </Text>
            </View>
          </View>

          <Text className="text-[10px] font-bold text-gray-400 tracking-[1.6px] uppercase mt-7 mb-3">
            Owner
          </Text>
          <View className="rounded-2xl border border-gray-100 bg-white px-4 py-4 flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-gray-900 items-center justify-center">
              <Text className="text-white text-sm font-black">{profile.initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-black text-gray-900">{profile.displayName}</Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {profile.role} · {profile.location}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Feather name="star" size={13} color="#22C55E" />
              <Text className="text-xs font-bold text-gray-700">{profile.stats.avgCondition}</Text>
            </View>
          </View>

          <View className="mt-5 rounded-2xl bg-gray-50 px-4 py-4 flex-row gap-3">
            <Feather name="shield" size={18} color="#22C55E" />
            <Text className="flex-1 text-xs text-gray-500 leading-5">
              Locker details are provided by the owner. Always verify condition and handoff details before completing a transaction.
            </Text>
          </View>
        </View>
      </View>
    </BaseContainer>
  )
}
