// components/profilesetup/SelectedSizeChips.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { GenderTab } from '@/services/hooks/profilesetup/useSizeSelection'

interface SelectedEntry {
  tab: GenderTab
  size: string
}

interface Props {
  selectedSizes: SelectedEntry[]
  onRemove: (tab: GenderTab) => void
}

export default function SelectedSizeChips({ selectedSizes, onRemove }: Props) {
  if (selectedSizes.length === 0) return null

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your sizes:</Text>
      <View style={styles.chips}>
        {selectedSizes.map(({ tab, size }) => (
          <View key={tab} style={styles.chip}>
            <Text style={styles.chipText}>US {size}</Text>
            <TouchableOpacity
              onPress={() => onRemove(tab)}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={styles.remove}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    paddingTop: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  label: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  remove: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 18,
  },
})