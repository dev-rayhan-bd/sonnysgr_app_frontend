import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import type { FilterLabel, FilterCounts } from '@/types/lockerbrowser'

interface PublicLockerFilterProps {
  filters: FilterLabel[]
  activeFilter: FilterLabel
  filterCounts: FilterCounts
  onSelect: (filter: FilterLabel) => void
}

const PublicLockerFilter: React.FC<PublicLockerFilterProps> = ({
  filters,
  activeFilter,
  filterCounts,
  onSelect,
}) => (
  <View style={styles.wrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {filters.map((filter) => {
        const isActive = filter === activeFilter
        return (
          <TouchableOpacity
            key={filter}
            onPress={() => onSelect(filter)}
            style={[styles.tab, isActive && styles.tabActive]}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {filter}
            </Text>
            <View style={[styles.countBubble, isActive && styles.countBubbleActive]}>
              <Text style={[styles.countText, isActive && styles.countTextActive]}>
                {filterCounts[filter]}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  </View>
)

export default PublicLockerFilter

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  tabActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#fff',
  },
  countBubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  countBubbleActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6B7280',
  },
  countTextActive: {
    color: '#fff',
  },
})