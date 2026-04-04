// components/discover/alertPreferences/StoreAlertRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { StoreAlertSetting } from '@/services/hooks/profile/useAlertPreferences'

interface Props {
  store: StoreAlertSetting
  onToggleExpand: () => void
  onToggleAlert: (alertId: string) => void
  isLast?: boolean
}

const StoreAlertRow: React.FC<Props> = ({ store, onToggleExpand, onToggleAlert, isLast }) => (
  <View className={!isLast ? 'border-b border-gray-100' : ''}>
    {/* Header row */}
    <TouchableOpacity
      onPress={onToggleExpand}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3.5 gap-3"
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center"
        style={{ backgroundColor: store.brandColor }}
      >
        <Text className="text-white text-xs font-extrabold">{store.initials}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900">{store.storeName}</Text>
        <Text className="text-xs text-gray-400">{store.alertCount} alerts on</Text>
      </View>
      <Text className="text-sm font-semibold text-green-600 mr-1">Customize</Text>
      <Feather
        name={store.expanded ? 'chevron-up' : 'chevron-down'}
        size={16}
        color="#22C55E"
      />
    </TouchableOpacity>

    {/* Expanded per-alert toggles */}
    {store.expanded && (
      <View className="px-4 pb-3 gap-2 bg-gray-50">
        {store.alerts.map(a => (
          <View key={a.id} className="flex-row items-center justify-between py-1.5">
            <Text className="text-sm text-gray-700 font-medium">{a.label}</Text>
            <Switch
              value={a.enabled}
              onValueChange={() => onToggleAlert(a.id)}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#fff"
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>
        ))}
      </View>
    )}
  </View>
)

export default StoreAlertRow