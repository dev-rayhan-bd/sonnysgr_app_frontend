import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LockerItemCardGrid, LockerItemCardList } from './LockerItemCard'
import type { LockerItem, ViewMode } from '@/types/locker'

// ─── View Toggle ──────────────────────────────────────────────────────────────
interface ViewToggleProps {
  viewMode: ViewMode
  onToggle: () => void
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => (
  <View style={styles.toggleWrapper}>
    <TouchableOpacity
      onPress={() => viewMode !== 'grid' && onToggle()}
      style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]}
    >
      <Feather name="grid" size={16} color={viewMode === 'grid' ? '#111827' : '#9CA3AF'} />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => viewMode !== 'list' && onToggle()}
      style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
    >
      <Feather name="list" size={16} color={viewMode === 'list' ? '#111827' : '#9CA3AF'} />
    </TouchableOpacity>
  </View>
)

// ─── Grid Container ───────────────────────────────────────────────────────────
interface LockerGridProps {
  items: LockerItem[]
  viewMode: ViewMode
  onMenuPress: (id: string) => void
}

const LockerGrid: React.FC<LockerGridProps> = ({ items, viewMode, onMenuPress }) => {
  if (viewMode === 'list') {
    return (
      <View style={styles.listContainer}>
        {items.map((item) => (
          <LockerItemCardList key={item.id} item={item} onMenuPress={onMenuPress} />
        ))}
      </View>
    )
  }

  // 2-column grid
  const rows: LockerItem[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }

  return (
    <View style={styles.gridContainer}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.gridRow}>
          {row.map((item) => (
            <LockerItemCardGrid key={item.id} item={item} onMenuPress={onMenuPress} />
          ))}
          {row.length === 1 && <View style={styles.gridSpacer} />}
        </View>
      ))}
    </View>
  )
}

export default LockerGrid

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 12,
  },
  toggleBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  listContainer: {
    marginTop: 8,
  },
  gridContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridSpacer: {
    flex: 1,
  },
})