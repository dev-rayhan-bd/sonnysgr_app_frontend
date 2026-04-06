import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import type { PublicLockerItem } from '@/types/lockerbrowser'

const { width } = Dimensions.get('window')
const COL_GAP = 3
const PADDING = 0
const COL_WIDTH = (width - PADDING * 2 - COL_GAP) / 2

// Alternate heights for masonry feel
const HEIGHTS = [160, 200, 175, 195, 165, 210, 180, 155]

interface PublicLockerGridProps {
  items: PublicLockerItem[]
  onItemPress?: (item: PublicLockerItem) => void
}

const PublicLockerGrid: React.FC<PublicLockerGridProps> = ({ items, onItemPress }) => {
  // Split into two columns
  const leftCol: PublicLockerItem[] = []
  const rightCol: PublicLockerItem[] = []
  items.forEach((item, i) => {
    if (i % 2 === 0) leftCol.push(item)
    else rightCol.push(item)
  })

  const renderItem = (item: PublicLockerItem, colIndex: number, rowIndex: number) => {
    const height = HEIGHTS[(colIndex * 4 + rowIndex) % HEIGHTS.length]
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => onItemPress?.(item)}
        activeOpacity={0.9}
        style={[styles.item, { height }]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* For Sale badge */}
        {item.isForSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>For Sale</Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {/* Left column */}
      <View style={styles.column}>
        {leftCol.map((item, i) => renderItem(item, 0, i))}
      </View>
      {/* Right column */}
      <View style={[styles.column, { marginLeft: COL_GAP }]}>
        {rightCol.map((item, i) => renderItem(item, 1, i))}
      </View>
    </View>
  )
}

export default PublicLockerGrid

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 100,
  },
  column: {
    width: COL_WIDTH,
  },
  item: {
    width: COL_WIDTH,
    marginBottom: COL_GAP,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  saleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  saleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
})