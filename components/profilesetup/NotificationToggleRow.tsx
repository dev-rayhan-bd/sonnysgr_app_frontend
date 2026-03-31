// components/profilesetup/NotificationToggleRow.tsx
import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import type { NotificationSetting } from '@/services/hooks/profilesetup/useEnableNotification'

interface Props {
  item: NotificationSetting
  onToggle: (id: string) => void
}

export default function NotificationToggleRow({ item, onToggle }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => onToggle(item.id)}
        trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E7EB"
        style={styles.switch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 15,
  },
  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
})