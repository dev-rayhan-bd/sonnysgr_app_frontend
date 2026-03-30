// components/profilesetup/SizeGrid.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  unit: string
  sizes: string[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
  onAddCustom: () => void
}

export default function SizeGrid({
  unit,
  sizes,
  selectedSize,
  onSelectSize,
  onAddCustom,
}: Props) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.unitLabel}>{unit}</Text>
        <TouchableOpacity onPress={onAddCustom} activeOpacity={0.7}>
          <Text style={styles.addCustom}>Can't find yours? Add custom</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {sizes.map((size, index) => {
          const isSelected = size === selectedSize
          return (
            <TouchableOpacity
              key={`${size}-${index}`}
              onPress={() => onSelectSize(size)}
              activeOpacity={0.7}
              style={[styles.cell, isSelected && styles.cellSelected]}
            >
              <Text style={[styles.cellText, isSelected && styles.cellTextSelected]}>
                {size}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  addCustom: {
    fontSize: 11,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cell: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  cellText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  cellTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
})