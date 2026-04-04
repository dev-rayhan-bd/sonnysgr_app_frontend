// components/discover/alertPreferences/GlobalAlertRow.tsx
import React from 'react'
import { View, Text, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { GlobalAlert } from '@/services/hooks/profile/useAlertPreferences'

interface Props {
  alert: GlobalAlert
  onToggle: () => void
  isLast?: boolean
}

const GlobalAlertRow: React.FC<Props> = ({ alert, onToggle, isLast }) => (
  <View className={`flex-row items-center px-4 py-3.5 gap-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
      <Ionicons name={alert.icon as any} size={18} color={alert.enabled ? '#22C55E' : '#9CA3AF'} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900">{alert.label}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">{alert.description}</Text>
    </View>
    <Switch
      value={alert.enabled}
      onValueChange={onToggle}
      trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
      thumbColor="#fff"
    />
  </View>
)

export default GlobalAlertRow