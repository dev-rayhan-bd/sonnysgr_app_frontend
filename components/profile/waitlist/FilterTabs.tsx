// components/profile/waitlist/FilterTabs.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { FilterTab } from '@/services/hooks/profile/useWantedPairs'

interface FilterTabsProps {
  activeTab: FilterTab
  onTabChange: (tab: FilterTab) => void
  availableCount: number
}

const TABS: FilterTab[] = ['All', 'Available Now', 'Still Watching', 'Alerts On']

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  onTabChange,
  availableCount,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab
        const showCheck = tab === 'Available Now'
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab === 'All' ? `All (${availableCount})` : showCheck ? `${tab} ✓` : tab}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tabActive: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
})