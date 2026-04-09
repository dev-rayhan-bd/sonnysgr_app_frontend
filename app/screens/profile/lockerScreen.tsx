import React, { useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import ItemActionSheet from '@/components/profile/locker/ItemActionSheet'
import LockerGrid, { ViewToggle } from '@/components/profile/locker/LockerGrid'
import LockerHeader from '@/components/profile/locker/LockerHeader'
import LockerStats from '@/components/profile/locker/LockerStats'
import { useLocker } from '@/services/hooks/profile/useLocker'
import type { LockerItem } from '@/types/locker'

const AddToLockerButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="mx-4 mb-4 py-4 rounded-full bg-green-500 flex-row items-center justify-center gap-2"
    style={{
      shadowColor: '#22C55E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    }}
  >
    <Feather name="plus" size={20} color="#fff" />
    <Text className="text-base font-black text-black tracking-wide">Add Item</Text>
  </TouchableOpacity>
)

interface LockerScreenProps {
  username?: string
  onBack?: () => void
  onAddItem?: () => void
  onEditItem?: (item: LockerItem) => void
}

const LockerScreen: React.FC<LockerScreenProps> = ({
  username = 'sonnysgr',
  onBack,
  onAddItem,
  onEditItem,
}) => {
  const {
    items,
    isPublic,
    viewMode,
    stats,
    selectedItem,
    showActionSheet,
    toggleVisibility,
    toggleViewMode,
    openItemMenu,
    closeActionSheet,
    deleteItem,
  } = useLocker()

  const router = useRouter()

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack()
      return
    }

    if (router.canGoBack()) {
      router.back()
    }
  }, [onBack, router])

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out ${username}'s locker on GoSNKR!`,
        url: `https://gosnkr.com/locker/${username}`,
      })
    } catch {
      // noop
    }
  }, [username])

  const handleShareItem = useCallback(async (item: LockerItem) => {
    try {
      await Share.share({
        message: `Check out my ${item.name} on GoSNKR!`,
        url: `https://gosnkr.com/item/${item.id}`,
      })
    } catch {
      // noop
    }
  }, [])

  const handleDeleteItem = useCallback(
    (id: string) => {
      Alert.alert('Remove Item', 'Are you sure you want to remove this from your locker?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => deleteItem(id),
        },
      ])
    },
    [deleteItem],
  )

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <LockerHeader
        username={username}
        pairCount={stats.totalPairs}
        isPublic={isPublic}
        onBack={handleBack}
        onShare={handleShare}
        onToggleVisibility={toggleVisibility}
      />

      <LockerStats stats={stats} />

      <View className="flex-row items-center justify-end px-4 py-3 border-b border-gray-100">
        <ViewToggle viewMode={viewMode} onToggle={toggleViewMode} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="flex-1"
      >
        <LockerGrid items={items} viewMode={viewMode} onMenuPress={openItemMenu} />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 pt-2 pb-6 bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <AddToLockerButton onPress={onAddItem ?? (() => {})} />
      </View>

      <ItemActionSheet
        visible={showActionSheet}
        item={selectedItem}
        onClose={closeActionSheet}
        onEdit={onEditItem ?? (() => {})}
        onDelete={handleDeleteItem}
        onShare={handleShareItem}
      />
    </BaseContainer>
  )
}

export default LockerScreen
