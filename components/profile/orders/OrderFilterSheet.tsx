// components/orders/OrderFilterSheet.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { SortOption,FilterState } from '@/services/hooks/profile/useOrderFilter'

interface OrderFilterSheetProps {
  visible: boolean
  draft: FilterState
  sortOptions: SortOption[]
  onClose: () => void
  onSetSort: (sort: SortOption) => void
  onReset: () => void
  onApply: () => void
}

const OrderFilterSheet: React.FC<OrderFilterSheetProps> = ({
  visible,
  draft,
  sortOptions,
  onClose,
  onSetSort,
  onReset,
  onApply,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40"
      />

      {/* Sheet */}
      <View
        className="bg-white rounded-t-3xl px-5 pt-5 pb-20"
        style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 }}
      >
        {/* Handle */}
        <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-5" />

        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-extrabold text-gray-900">Filter & Sort</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Sort section */}
        <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Sort By
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 24 }}
        >
          {sortOptions.map(opt => {
            const isActive = draft.sort === opt
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => onSetSort(opt)}
                className={`px-4 py-2.5 rounded-xl border ${
                  isActive
                    ? 'bg-gray-900 border-gray-900'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Action buttons */}
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
            style={{ shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 3 }}
          >
            <Text className="text-sm font-bold text-white">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default OrderFilterSheet