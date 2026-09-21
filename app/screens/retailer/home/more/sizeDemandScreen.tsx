import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useSizeDemand, type StockRow } from '@/services/hooks/retailer/home/useSizeDemand';

export default function SizeDemandScreen() {
  const {
    store,
    dayRanges,
    dayRange,
    setDayRange,
    genderCategories,
    category,
    setCategory,
    categoryLabel,
    topSize,
    sizeBars,
    maxSearches,
    restockNote,
    stockRows,
  } = useSizeDemand();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View className="flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Size Demand</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Store + Radius selectors */}
        <View style={s.selectorsRow}>
          <TouchableOpacity style={s.selectorPill}>
            <Feather name="home" size={16} color="#10B981" />
            <Text style={s.selectorText} numberOfLines={1}>{store.name}</Text>
            <Feather name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={s.selectorPill}>
            <Feather name="map-pin" size={16} color="#10B981" />
            <Text style={s.selectorText}>{store.radiusMiles} mi</Text>
            <Feather name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Day range tabs */}
        <View style={s.dayTabsRow}>
          {dayRanges.map((d) => (
            <TouchableOpacity
              key={d.key}
              onPress={() => setDayRange(d.key)}
              style={[s.dayTab, dayRange === d.key && s.dayTabActive]}
            >
              <Text style={[s.dayTabText, dayRange === d.key && s.dayTabTextActive]}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gender category tabs */}
        <View style={s.categoryTabsRow}>
          {genderCategories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCategory(c)}
              style={[s.categoryTab, category === c && s.categoryTabActive]}
            >
              <Text style={[s.categoryTabText, category === c && s.categoryTabTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sub-category dropdown */}
        <TouchableOpacity style={s.subCategoryPill}>
          <Text style={s.subCategoryText}>{categoryLabel}</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>

        <Text style={s.aggregatedText}>Aggregated nearby shopper activity · Updated today</Text>

        {/* Top requested size card */}
        <View style={s.topSizeCard}>
          <View style={{ flex: 1 }}>
            <Text style={s.topSizeLabel}>Top requested size</Text>
            <Text style={s.topSizeValue}>{topSize.label}</Text>
            <Text style={s.topSizeSub}>{topSize.searches} searches in the last {dayRange} days</Text>
            <View style={s.topSizeTrendRow}>
              <Feather name="arrow-up-right" size={13} color="#059669" />
              <Text style={s.topSizeTrendText}>+{topSize.trendPct}% vs previous {dayRange} days</Text>
            </View>
          </View>
          <View style={s.topSizeIconWrap}>
            <Feather name="trending-up" size={22} color="#10B981" />
          </View>
        </View>

        {/* Demand by size bar chart */}
        <View style={s.section}>
          <View style={s.sectionHeaderRow}>
            <Text style={s.sectionTitle}>Demand by Size</Text>
            <Text style={s.sectionSubtitle}>Shopper searches (last {dayRange} days)</Text>
          </View>

          <View style={s.chartCard}>
            {sizeBars.map((bar) => (
              <View key={bar.size} style={s.barRow}>
                <Text style={s.barSizeLabel}>{bar.size}</Text>
                <View style={s.barTrack}>
                  <View
                    style={[
                      s.barFill,
                      { width: `${Math.max((bar.searches / maxSearches) * 100, 6)}%` as any },
                    ]}
                  />
                </View>
                <Text style={s.barValueLabel}>{bar.searches}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Restock recommendation */}
        <View style={s.restockCard}>
          <View style={s.restockIconWrap}>
            <Ionicons name="bulb-outline" size={18} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.restockTitle}>Restock recommendation</Text>
            <Text style={s.restockBody}>{restockNote}</Text>
            <Text style={s.restockFootnote}>Based on local searches and your current inventory.</Text>
          </View>
        </View>

        {/* Stock vs Demand table */}
        <View style={s.section}>
          <Text style={s.sectionTitleStandalone}>Your Stock vs Demand</Text>
          <View style={s.tableCard}>
            <View style={s.tableHeaderRow}>
              <Text style={[s.tableHeaderCell, s.colSize]}>Size</Text>
              <Text style={[s.tableHeaderCell, s.colSearches]}>Searches{'\n'}(last {dayRange} days)</Text>
              <Text style={[s.tableHeaderCell, s.colOnHand]}>On Hand{'\n'}(units)</Text>
              <Text style={[s.tableHeaderCell, s.colSuggested]}>Suggested{'\n'}(units)</Text>
              <Text style={[s.tableHeaderCell, s.colGap]}>Gap</Text>
            </View>

            {stockRows.map((row) => (
              <StockTableRow key={row.size} row={row} />
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={s.actionsContainer}>
          <TouchableOpacity style={s.primaryBtn}>
            <Text style={s.primaryBtnText}>View Products to Restock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.secondaryBtn}>
            <Text style={s.secondaryBtnText}>Add to Sourcing List</Text>
          </TouchableOpacity>
          <Text style={s.disclaimerText}>Suggestions are estimates, not guaranteed sales.</Text>
        </View>
      </View>
    </BaseContainer>
  );
}

function StockTableRow({ row }: { row: StockRow }) {
  const gap = row.suggested - row.onHand;
  const isCovered = gap <= 0;

  return (
    <View style={s.tableRow}>
      <Text style={[s.tableCell, s.colSize, s.tableCellStrong]}>{row.size}</Text>
      <Text style={[s.tableCell, s.colSearches]}>{row.searches}</Text>
      <Text style={[s.tableCell, s.colOnHand]}>{row.onHand}</Text>
      <Text style={[s.tableCell, s.colSuggested]}>{row.suggested}</Text>
      <Text
        style={[
          s.tableCell,
          s.colGap,
          s.tableCellStrong,
          { color: isCovered ? '#059669' : '#EA580C' },
        ]}
      >
        {isCovered ? 'Covered' : `+${gap}`}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#111827' },

  selectorsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 8 },
  selectorPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectorText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#111827' },

  dayTabsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 14 },
  dayTab: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  dayTabActive: { backgroundColor: '#111827' },
  dayTabText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  dayTabTextActive: { color: '#fff' },

  categoryTabsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 8 },
  categoryTab: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  categoryTabActive: { backgroundColor: '#111827' },
  categoryTabText: { fontSize: 13, fontWeight: '700', color: '#9CA3AF' },
  categoryTabTextActive: { color: '#fff' },

  subCategoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  subCategoryText: { fontSize: 13, fontWeight: '700', color: '#111827' },

  aggregatedText: { textAlign: 'center', color: '#9CA3AF', fontSize: 11, marginTop: 10, marginBottom: 18 },

  topSizeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 26,
  },
  topSizeLabel: { fontSize: 12, fontWeight: '800', color: '#059669' },
  topSizeValue: { fontSize: 22, fontWeight: '900', color: '#111827', marginTop: 4 },
  topSizeSub: { fontSize: 12, color: '#4B5563', marginTop: 4, fontWeight: '600' },
  topSizeTrendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  topSizeTrendText: { fontSize: 12, fontWeight: '800', color: '#059669' },
  topSizeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  section: { paddingHorizontal: 16, marginBottom: 22 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  sectionTitleStandalone: { fontSize: 16, fontWeight: '900', color: '#111827', marginBottom: 14 },
  sectionSubtitle: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },

  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  barSizeLabel: { width: 34, fontSize: 13, fontWeight: '800', color: '#111827' },
  barTrack: { flex: 1, height: 16, backgroundColor: '#F3F4F6', borderRadius: 8, overflow: 'hidden', marginHorizontal: 8 },
  barFill: { height: '100%', backgroundColor: '#34D399', borderRadius: 8 },
  barValueLabel: { width: 30, fontSize: 12, fontWeight: '700', color: '#6B7280', textAlign: 'right' },

  restockCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 26,
  },
  restockIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  restockTitle: { fontSize: 13, fontWeight: '900', color: '#065F46' },
  restockBody: { fontSize: 12, color: '#065F46', marginTop: 4, lineHeight: 17, fontWeight: '600' },
  restockFootnote: { fontSize: 11, color: '#6B7280', marginTop: 6 },

  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tableHeaderRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tableHeaderCell: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  tableCell: { fontSize: 13, color: '#374151', fontWeight: '600' },
  tableCellStrong: { fontWeight: '800', color: '#111827' },
  colSize: { flex: 0.9 },
  colSearches: { flex: 1.3 },
  colOnHand: { flex: 1.1 },
  colSuggested: { flex: 1.2 },
  colGap: { flex: 0.9, textAlign: 'right' },

  actionsContainer: { paddingHorizontal: 16, marginTop: 4, gap: 10 },
  primaryBtn: { backgroundColor: '#111827', paddingVertical: 16, borderRadius: 18, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  secondaryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#111827', fontSize: 14, fontWeight: '800' },
  disclaimerText: { textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 4 },
});