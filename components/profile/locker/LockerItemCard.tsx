import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { LockerItem, ConditionLabel } from '@/types/locker'

// ─── Condition Badge ──────────────────────────────────────────────────────────
const CONDITION_COLORS: Record<ConditionLabel, string> = {
  DS:     '#22C55E',
  VNDS:   '#84CC16',
  '9/10': '#3B82F6',
  '8/10': '#6366F1',
  '7/10': '#F59E0B',
  '6/10': '#F97316',
  '5/10': '#EF4444',
}

const ConditionBadge: React.FC<{ condition: ConditionLabel }> = ({ condition }) => (
  <View style={[styles.badge, { backgroundColor: CONDITION_COLORS[condition] ?? '#6B7280' }]}>
    <Text style={styles.badgeText}>{condition}</Text>
  </View>
)

// ─── Grid Card ────────────────────────────────────────────────────────────────
const { width } = Dimensions.get('window')
const GRID_PADDING = 16 * 2
const GRID_GAP = 12
const CARD_WIDTH = (width - GRID_PADDING - GRID_GAP) / 2

interface LockerItemCardGridProps {
  item: LockerItem
  onMenuPress: (id: string) => void
}

export const LockerItemCardGrid: React.FC<LockerItemCardGridProps> = ({ item, onMenuPress }) => (
  <View style={[styles.gridCard, { width: CARD_WIDTH }]}>
    <View>
      <Image
        source={{ uri: item.image }}
        style={{ width: CARD_WIDTH, height: CARD_WIDTH * 0.75 }}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => onMenuPress(item.id)}
        style={styles.menuBtn}
      >
        <Feather name="more-vertical" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
      <ConditionBadge condition={item.condition} />
    </View>
  </View>
)

// ─── List Card ────────────────────────────────────────────────────────────────
interface LockerItemCardListProps {
  item: LockerItem
  onMenuPress: (id: string) => void
}

export const LockerItemCardList: React.FC<LockerItemCardListProps> = ({ item, onMenuPress }) => (
  <View style={styles.listCard}>
    <Image source={{ uri: item.image }} style={styles.listImage} resizeMode="cover" />
    <View style={styles.listInfo}>
      <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.listBrand}>{item.brand}</Text>
      <ConditionBadge condition={item.condition} />
    </View>
    <View style={styles.listRight}>
      <Text style={styles.listValue}>${item.estimatedValue.toLocaleString()}</Text>
      <TouchableOpacity
        onPress={() => onMenuPress(item.id)}
        style={styles.listMenuBtn}
      >
        <Feather name="more-vertical" size={14} color="#6B7280" />
      </TouchableOpacity>
    </View>
  </View>
)

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#fff',
  },
  // Grid card
  gridCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 12,
  },
  menuBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardInfo: {
    padding: 10,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  // List card
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  listImage: {
    width: 80,
    height: 80,
  },
  listInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  listName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  listBrand: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  listRight: {
    paddingRight: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  listValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  listMenuBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
})