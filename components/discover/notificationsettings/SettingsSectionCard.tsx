// components/notificationSettings/SettingsSectionCard.tsx
import React from 'react'
import { View, Text } from 'react-native'
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import SettingsToggleItem from './SettingsToggleItem'
import type {
  NotificationSection,
  NotificationSetting,
} from '@/services/hooks/discover/useNotificationSettings'

// ─── Icon resolver ────────────────────────────────────────────────────────────

const iconColor = (enabled: boolean) => (enabled ? '#374151' : '#9CA3AF')

const getIcon = (id: string, enabled: boolean): React.ReactNode => {
  const c = iconColor(enabled)
  switch (id) {
    case 'push_notifications':
      return <Feather name="bell" size={17} color={c} />
    case 'restock_alerts':
      return <MaterialCommunityIcons name="shoe-sneaker" size={17} color="#F97316" />
    case 'nearby_restock':
      return <Feather name="map-pin" size={17} color="#F97316" />
    case 'followed_store_restock':
      return <Feather name="heart" size={17} color="#EF4444" />
    case 'price_drop_alert':
      return <Feather name="tag" size={17} color="#F59E0B" />
    case 'order_status_updates':
      return <Ionicons name="bag-outline" size={17} color="#3B82F6" />
    case 'pickup_ready':
      return <MaterialIcons name="check-circle-outline" size={17} color="#22C55E" />
    case 'pickup_reminder':
      return <Feather name="clock" size={17} color="#F97316" />
    case 'order_cancelled':
      return <Feather name="x-circle" size={17} color="#EF4444" />
    case 'exclusive_drop_alerts':
      return <MaterialCommunityIcons name="fire" size={17} color="#F97316" />
    case 'release_reminders':
      return <Feather name="calendar" size={17} color="#8B5CF6" />
    case 'raffle_results':
      return <MaterialCommunityIcons name="ticket-outline" size={17} color="#6B7280" />
    case 'flash_sales':
      return <MaterialCommunityIcons name="lightning-bolt" size={17} color="#F59E0B" />
    case 'store_announcements':
      return <Feather name="speaker" size={17} color="#3B82F6" />
    case 'gosnkr_offers':
      return <Feather name="gift" size={17} color="#A855F7" />
    case 'quiet_hours':
      return <Feather name="moon" size={17} color="#6B7280" />
    default:
      return <Feather name="bell" size={17} color={c} />
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface SettingsSectionCardProps {
  section: NotificationSection
  masterEnabled: boolean
  onToggle: (sectionId: string, itemId: string) => void
}

const SettingsSectionCard: React.FC<SettingsSectionCardProps> = ({
  section,
  masterEnabled,
  onToggle,
}) => {
  const isPushGlobal = section.id === 'global'

  return (
    <View className="mb-4">
      {/* Section title */}
      {section.title ? (
        <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 mb-2">
          {section.title}
        </Text>
      ) : null}

      {/* Card */}
      <View
        className="bg-white mx-4 rounded-2xl overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {section.items.map((item: NotificationSetting, index: number) => (
          <SettingsToggleItem
            key={item.id}
            item={item}
            icon={getIcon(item.id, item.enabled)}
            onToggle={() => onToggle(section.id, item.id)}
            masterEnabled={isPushGlobal ? true : masterEnabled}
            isLast={index === section.items.length - 1}
          />
        ))}
      </View>
    </View>
  )
}

export default SettingsSectionCard