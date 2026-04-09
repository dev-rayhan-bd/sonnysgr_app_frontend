import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import WishlistCard from './WishlistCard'
import type { WishlistItem } from '@/services/hooks/profile/useWishlist'

interface WishlistListProps {
  items: WishlistItem[]
  onToggleLike: (id: string) => void
}

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center py-24 gap-3">
      <Ionicons name="heart-outline" size={48} color="#D1D5DB" />
      <Text className="text-[15px] font-semibold text-gray-400">
        Nothing saved here yet
      </Text>
      <Text className="text-[13px] text-gray-300 text-center px-8">
        Tap the heart on any sneaker or clothing item to add it to your wishlist.
      </Text>
    </View>
  )
}

export default function WishlistList({ items, onToggleLike }: WishlistListProps) {
  if (items.length === 0) return <EmptyState />

  return (
    <View className="rounded-2xl overflow-hidden bg-white shadow-sm mx-5 mt-3">
      {items.map((item, index) => (
        <WishlistCard
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
          onToggleLike={onToggleLike}
        />
      ))}
    </View>
  )
}
