// app/tabs/searchResultsScreen.tsx
import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  StyleSheet, FlatList,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

type Condition = 'NEW' | 'PRE-OWNED'
type SortOption = 'Best Condition' | 'Price: Low to High' | 'Price: High to Low' | 'Nearest'

interface SearchResult {
  id: string
  name: string
  store: string
  condition: Condition
  size: string
  price: number
  distance: string
  colorSwatch: string
  isFeatured?: boolean
  image: string
}

const MOCK_RESULTS: SearchResult[] = [
  { id: '1', name: 'Supreme Box Logo Hoodie FW23', store: 'Kicks City', condition: 'NEW', size: 'M', price: 320, distance: '0.8 mi', colorSwatch: '#000', image: '' },
  { id: '2', name: 'Supreme Box Logo Tee SS24', store: 'Urban Vault', condition: 'NEW', size: 'L', price: 285, distance: '1.2 mi', colorSwatch: '#fff', image: '' },
  { id: '3', name: 'Supreme Classic Hoodie', store: 'Street Elite', condition: 'PRE-OWNED', size: 'M', price: 295, distance: '1.5 mi', colorSwatch: '#dc2626', image: '' },
  { id: '4', name: 'Supreme Essential Tee', store: 'Kicks City', condition: 'NEW', size: 'S', price: 180, distance: '0.8 mi', colorSwatch: '#000', image: '' },
  { id: '5', name: 'Supreme Overdyed Hoodie', store: 'Premium Threads', condition: 'NEW', size: 'XL', price: 340, distance: '2.3 mi', colorSwatch: '#c2b280', isFeatured: true, image: '' },
  { id: '6', name: 'Supreme Classic Crewneck', store: 'Urban Vault', condition: 'PRE-OWNED', size: 'M', price: 250, distance: '1.2 mi', colorSwatch: '#000', image: '' },
]

const CONDITION_COLOR: Record<Condition, string> = {
  'NEW': '#0a0a0a',
  'PRE-OWNED': '#f59e0b',
}

export default function SearchResultsScreen() {
  const router = useRouter()
  const [sort, setSort] = useState<SortOption>('Best Condition')
  const [activeFilters, setActiveFilters] = useState<string[]>(['Size M', 'In Stock'])
  const [isGrid, setIsGrid] = useState(false)

  const removeFilter = (f: string) => setActiveFilters(prev => prev.filter(x => x !== f))

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      onPress={() => router.push('/screens/product/productScreen')}
      style={styles.card}
      activeOpacity={0.9}
    >
      {/* Image */}
      <View style={styles.imageBox}>
        <View style={[styles.conditionBadge, { backgroundColor: CONDITION_COLOR[item.condition] }]}>
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
        {item.isFeatured && (
          <View style={[styles.conditionBadge, { backgroundColor: '#f59e0b', left: 52 }]}>
            <Text style={styles.conditionText}>Featured</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoCol}>
        <View style={styles.metaRow}>
          <Text style={[styles.conditionLabel, { color: CONDITION_COLOR[item.condition] }]}>
            {item.condition}
          </Text>
          <Text style={styles.distanceText}>· {item.distance}</Text>
        </View>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.storeName}>{item.store}</Text>

        <View style={styles.sizeRow}>
          <View style={styles.sizeLeft}>
            <Text style={styles.sizeText}>Size {item.size}</Text>
            <View style={[styles.colorDot, { backgroundColor: item.colorSwatch }]} />
          </View>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="map-pin" size={12} color="#374151" />
            <Text style={styles.actionBtnText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="heart" size={12} color="#374151" />
            <Text style={styles.actionBtnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => router.push('/screens/discover/buyNowScreen')}
          >
            <Text style={styles.buyBtnText}>Buy</Text>
            <Feather name="arrow-right" size={12} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <BaseContainer backgroundColor="#fff">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Stats + sort */}
      <View style={styles.statsRow}>
        <View>
          <Text style={styles.resultCount}>{MOCK_RESULTS.length} results</Text>
          <Text style={styles.activeFilterSummary}>
            {activeFilters.join(' · ')}
          </Text>
        </View>
        <TouchableOpacity style={styles.sortBtn}>
          <Text style={styles.sortText}>Sort: {sort}</Text>
          <Feather name="chevron-down" size={14} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContent}>
        {activeFilters.map(f => (
          <TouchableOpacity key={f} style={styles.activeChip} onPress={() => removeFilter(f)}>
            <Text style={styles.activeChipText}>{f}</Text>
            <Text style={styles.chipX}>×</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addFilterChip}>
          <Text style={styles.addFilterText}>+ Add Filter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* View toggle */}
      <View style={styles.viewToggleRow}>
        <TouchableOpacity
          style={[styles.viewToggleBtn, !isGrid && styles.viewToggleActive]}
          onPress={() => setIsGrid(false)}
        >
          <Feather name="list" size={16} color={isGrid ? '#6b7280' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewToggleBtn, isGrid && styles.viewToggleActive]}
          onPress={() => setIsGrid(true)}
        >
          <Feather name="grid" size={16} color={isGrid ? '#fff' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_RESULTS}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  resultCount: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  activeFilterSummary: { fontSize: 13, color: '#22c55e', marginTop: 2 },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  chipsScroll: { paddingTop: 10 },
  chipsContent: { paddingHorizontal: 16, gap: 8 },
  activeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#22c55e', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  activeChipText: { fontSize: 12, fontWeight: '600', color: '#15803d' },
  chipX: { fontSize: 16, fontWeight: '500', color: '#15803d' },
  addFilterChip: { backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  addFilterText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  viewToggleRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 10, gap: 8 },
  viewToggleBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  viewToggleActive: { backgroundColor: '#0a0a0a' },
  list: { paddingHorizontal: 16, paddingTop: 12, gap: 12, paddingBottom: 40 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', padding: 12, gap: 12 },
  imageBox: { width: 117, height: 117, backgroundColor: '#f9fafb', borderRadius: 14, overflow: 'hidden' },
  conditionBadge: { position: 'absolute', top: 6, left: 6, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  conditionText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  infoCol: { flex: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  conditionLabel: { fontSize: 10, fontWeight: '400' },
  distanceText: { fontSize: 10, color: '#6b7280' },
  productName: { fontSize: 15, fontWeight: '600', color: '#0a0a0a', lineHeight: 22, marginBottom: 2 },
  storeName: { fontSize: 13, color: '#6b7280', marginBottom: 6 },
  sizeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sizeLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sizeText: { fontSize: 13, fontWeight: '600', color: '#22c55e' },
  colorDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  priceText: { fontSize: 16, fontWeight: '800', color: '#0a0a0a' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f3f4f6', borderRadius: 10, paddingHorizontal: 12, height: 32 },
  actionBtnText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  buyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#0a0a0a', borderRadius: 10, height: 32 },
  buyBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
})
