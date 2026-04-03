// components/notificationSettings/SettingsToggleItem.tsx
import React from 'react'
import { View, Text, Switch } from 'react-native'
import type { NotificationSetting } from '@/services/hooks/discover/useNotificationSettings'

interface SettingsToggleItemProps {
  item: NotificationSetting
  icon: React.ReactNode
  onToggle: () => void
  masterEnabled?: boolean   // when false, all non-master items are dimmed
  isLast?: boolean
}

const SettingsToggleItem: React.FC<SettingsToggleItemProps> = ({
  item,
  icon,
  onToggle,
  masterEnabled = true,
  isLast = false,
}) => {
  const dimmed = !masterEnabled

  return (
    <>
      <View className={`flex-row items-center px-4 py-3.5 gap-3.5 ${dimmed ? 'opacity-40' : ''}`}>
        {/* Icon bubble */}
        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          {icon}
        </View>

        {/* Text */}
        <View className="flex-1">
          <View className="flex-row items-center gap-2 flex-wrap">
            <Text className="text-sm font-semibold text-gray-900">{item.label}</Text>
            {item.badge ? (
              <View
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${item.badgeColor}20` }}
              >
                <Text
                  className="text-[10px] font-semibold"
                  style={{ color: item.badgeColor }}
                >
                  {item.badge}
                </Text>
              </View>
            ) : null}
          </View>
          <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        {/* Toggle */}
        <Switch
          value={item.enabled}
          onValueChange={onToggle}
          disabled={dimmed}
          trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>

      {/* Divider (not after last item) */}
      {!isLast && <View className="h-px bg-gray-100 ml-16" />}
    </>
  )
}

export default SettingsToggleItem