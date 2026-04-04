import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { LockerItem } from '@/types/locker'

interface ActionOption {
  icon: keyof typeof Feather.glyphMap
  label: string
  color?: string
  onPress: () => void
}

interface ItemActionSheetProps {
  visible: boolean
  item: LockerItem | null
  onClose: () => void
  onEdit: (item: LockerItem) => void
  onDelete: (id: string) => void
  onShare: (item: LockerItem) => void
}

const ItemActionSheet: React.FC<ItemActionSheetProps> = ({
  visible,
  item,
  onClose,
  onEdit,
  onDelete,
  onShare,
}) => {
  if (!item) return null

  const options: ActionOption[] = [
    {
      icon: 'edit-2',
      label: 'Edit Item',
      onPress: () => {
        onClose()
        onEdit(item)
      },
    },
    {
      icon: 'share-2',
      label: 'Share',
      onPress: () => {
        onClose()
        onShare(item)
      },
    },
    {
      icon: 'trash-2',
      label: 'Remove from Locker',
      color: '#EF4444',
      onPress: () => onDelete(item.id),
    },
  ]

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        className="flex-1 bg-black/40 justify-end"
        onPress={onClose}
      >
        <Pressable>
          <View className="bg-white rounded-t-3xl px-4 pt-4 pb-10">
            {/* Handle */}
            <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-5" />

            {/* Item name */}
            <Text className="text-base font-black text-gray-900 mb-4 px-1" numberOfLines={1}>
              {item.name}
            </Text>

            {/* Options */}
            <View className="gap-1">
              {options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={opt.onPress}
                  className="flex-row items-center gap-4 px-3 py-4 rounded-2xl active:bg-gray-50"
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: opt.color ? '#FEF2F2' : '#F3F4F6',
                    }}
                  >
                    <Feather
                      name={opt.icon}
                      size={18}
                      color={opt.color ?? '#374151'}
                    />
                  </View>
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: opt.color ?? '#111827' }}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Cancel */}
            <TouchableOpacity
              onPress={onClose}
              className="mt-3 bg-gray-100 rounded-2xl py-4 items-center"
            >
              <Text className="text-sm font-bold text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ItemActionSheet