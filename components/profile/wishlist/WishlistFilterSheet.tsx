import { View, Text, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type {
  WishlistSortOption,
  WishlistFilterState,
} from '@/services/hooks/profile/useWishlistFilter'

interface WishlistFilterSheetProps {
  visible: boolean
  draft: WishlistFilterState
  sortOptions: WishlistSortOption[]
  categoryOptions: WishlistFilterState['category'][]
  onClose: () => void
  onSetSort: (sort: WishlistSortOption) => void
  onSetCategory: (category: WishlistFilterState['category']) => void
  onReset: () => void
  onApply: () => void
}

export default function WishlistFilterSheet({
  visible,
  draft,
  sortOptions,
  categoryOptions,
  onClose,
  onSetSort,
  onSetCategory,
  onReset,
  onApply,
}: WishlistFilterSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} className="flex-1 bg-black/40" />

      <View
        className="bg-white rounded-t-3xl px-5 pt-5 pb-20"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-5" />

        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-extrabold text-gray-900">Filter & Sort</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Product Type
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 24 }}
        >
          {categoryOptions.map((option) => {
            const isActive = draft.category === option
            return (
              <TouchableOpacity
                key={option}
                onPress={() => onSetCategory(option)}
                className={`px-4 py-2.5 rounded-xl border ${
                  isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Sort By
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 24 }}
        >
          {sortOptions.map((option) => {
            const isActive = draft.sort === option
            return (
              <TouchableOpacity
                key={option}
                onPress={() => onSetSort(option)}
                className={`px-4 py-2.5 rounded-xl border ${
                  isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={onReset}
            className="flex-1 py-4 rounded-2xl border border-gray-200 items-center"
          >
            <Text className="text-sm font-semibold text-gray-600">Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onApply}
            className="flex-1 py-4 rounded-2xl bg-gray-900 items-center"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Text className="text-sm font-bold text-white">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
