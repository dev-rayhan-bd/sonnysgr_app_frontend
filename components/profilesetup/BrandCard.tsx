// components/profilesetup/BrandCard.tsx
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import type { Brand } from '@/services/hooks/profilesetup/usePickBrands'

interface Props {
  brand: Brand
  selected: boolean
  onPress: (id: string) => void
}

export default function BrandCard({ brand, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={() => onPress(brand.id)}
      activeOpacity={0.75}
    >
      <Text style={styles.emoji}>{brand.emoji}</Text>
      <Text style={[styles.name, selected && styles.nameSelected]} numberOfLines={1}>
        {brand.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 8,
  },
  cardSelected: {
    backgroundColor: '#111827',
  },
  emoji: {
    fontSize: 26,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  nameSelected: {
    color: '#FFFFFF',
  },
})