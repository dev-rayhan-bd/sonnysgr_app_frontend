import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import {
  useLocalDemand,
  type OpportunityItem,
  type SizeDemand,
} from '@/services/hooks/retailer/home/useLocalDemand';

export default function LocalDemandScreen() {
  const {
    store,
    dayRanges,
    dayRange,
    setDayRange,
    categoryFilters,
    category,
    setCategory,
    missedSearchesCount,
    opportunities,
    bestOpportunity,
  } = useLocalDemand();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View className="flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Local Demand</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="info" size={20} color="#111827" />
          </TouchableOpacity>
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

        {/* Category filter tabs */}
        <View style={s.categoryTabsRow}>
          {categoryFilters.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCategory(c)}
              style={[s.categoryTab, category === c && s.categoryTabActive]}
            >
              <Text style={[s.categoryTabText, category === c && s.categoryTabTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.aggregatedText}>Aggregated nearby shopper activity · Updated today</Text>

        {/* Missed searches banner */}
        <TouchableOpacity style={s.missedBanner} activeOpacity={0.85}>
          <View style={s.missedIconWrap}>
            <Feather name="bar-chart-2" size={18} color="#10B981" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.missedTitle}>{missedSearchesCount} missed searches this week</Text>
            <Text style={s.missedSubtitle}>Products and sizes shoppers wanted but you did not have.</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Section title */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Top Opportunities Near You</Text>
          <Text style={s.sectionSubtitle}>Based on search demand</Text>
        </View>

        {/* Opportunity cards */}
        <View style={{ paddingHorizontal: 16 }}>
          {opportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}

          {opportunities.length === 0 && (
            <View style={s.emptyState}>
              <Feather name="search" size={28} color="#D1D5DB" />
              <Text style={s.emptyStateText}>No opportunities in this category yet.</Text>
            </View>
          )}
        </View>

        {/* Best opportunity callout */}
        {bestOpportunity && (
          <View style={s.bestOppCard}>
            <View style={s.bestOppHeader}>
              <View style={s.bestOppIconWrap}>
                <Ionicons name="flash" size={16} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.bestOppTitle}>Best opportunity</Text>
                <Text style={s.bestOppBody}>
                  {bestOpportunity.itemName} {bestOpportunity.reason}
                </Text>
                <Text style={s.bestOppBuyers}>Potential demand: {bestOpportunity.potentialBuyers} buyers</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#B45309" />
            </View>
            <TouchableOpacity style={s.bestOppBtn}>
              <Feather name="plus-circle" size={16} color="#fff" />
              <Text style={s.bestOppBtnText}>Add to Sourcing List</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BaseContainer>
  );
}

function OpportunityCard({ item }: { item: OpportunityItem }) {
  const statusMeta = getStockStatusMeta(item.stockStatus);

  return (
    <View style={s.card}>
      <View style={s.cardTopRow}>
        <View style={s.rankBadge}>
          <Text style={s.rankBadgeText}>#{item.rank}</Text>
        </View>

        <View style={s.imgPlaceholder}>
          <MaterialCommunityIcons name="shoe-sneaker" size={26} color="#9CA3AF" />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={s.nameRow}>
            <Text style={s.itemName} numberOfLines={1}>{item.name}</Text>
            <View style={[s.statusDot, { backgroundColor: statusMeta.dotColor }]} />
            <Text style={[s.statusLabel, { color: statusMeta.dotColor }]}>{statusMeta.label}</Text>
          </View>
          <View style={s.metaRow}>
            <Text style={s.searchesText}>{item.searchesLabel}</Text>
            <Feather
              name={item.trendPct >= 0 ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={item.trendPct >= 0 ? '#10B981' : '#EF4444'}
            />
            <Text style={[s.trendText, { color: item.trendPct >= 0 ? '#10B981' : '#EF4444' }]}>
              {Math.abs(item.trendPct)}% vs last week
            </Text>
          </View>
        </View>
      </View>

      <Text style={s.sizesLabel}>Most requested sizes</Text>
      <View style={s.sizesRow}>
        {item.sizes.map((size) => (
          <SizeChip key={size.label} size={size} />
        ))}
      </View>

      <View style={s.cardBottomRow}>
        <TouchableOpacity style={s.viewDemandBtn}>
          <Feather name="bar-chart-2" size={14} color="#111827" />
          <Text style={s.viewDemandText}>View Demand</Text>
        </TouchableOpacity>

        <PrimaryActionButton action={item.primaryAction} />
      </View>
    </View>
  );
}

function SizeChip({ size }: { size: SizeDemand }) {
  if (size.status === 'out') {
    return (
      <View style={[s.sizeChip, s.sizeChipOut]}>
        <Text style={s.sizeChipLabel}>{size.label}</Text>
        <Text style={s.sizeChipOutText}>Out</Text>
      </View>
    );
  }
  if (size.status === 'low') {
    return (
      <View style={[s.sizeChip, s.sizeChipLow]}>
        <Text style={s.sizeChipLabel}>{size.label}</Text>
        <Text style={s.sizeChipLowText}>Low</Text>
      </View>
    );
  }
  return (
    <View style={s.sizeChip}>
      <Text style={s.sizeChipLabel}>{size.label}</Text>
      <Text style={s.sizeChipSearches}>{size.searches} searches</Text>
    </View>
  );
}

function PrimaryActionButton({ action }: { action: OpportunityItem['primaryAction'] }) {
  const iconName = action.icon === 'plus' ? 'plus-circle' : action.icon === 'box' ? 'package' : 'file-text';
  const isSecondary = action.kind === 'view_details';

  return (
    <TouchableOpacity style={[s.primaryActionBtn, isSecondary && s.primaryActionBtnSecondary]}>
      <Feather name={iconName as any} size={14} color={isSecondary ? '#111827' : '#fff'} />
      <Text style={[s.primaryActionText, isSecondary && s.primaryActionTextSecondary]}>{action.label}</Text>
    </TouchableOpacity>
  );
}

function getStockStatusMeta(status: OpportunityItem['stockStatus']) {
  switch (status) {
    case 'not_stocked':
      return { label: 'Not Stocked', dotColor: '#EF4444' };
    case 'missing_sizes':
      return { label: 'Missing Top Sizes', dotColor: '#F59E0B' };
    case 'demand_covered':
      return { label: 'Demand Covered', dotColor: '#10B981' };
  }
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
  dayTab: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  dayTabActive: { backgroundColor: '#111827' },
  dayTabText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  dayTabTextActive: { color: '#fff' },

  categoryTabsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 8 },
  categoryTab: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryTabActive: { backgroundColor: '#D1FAE5' },
  categoryTabText: { fontSize: 13, fontWeight: '700', color: '#9CA3AF' },
  categoryTabTextActive: { color: '#059669' },

  aggregatedText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 14,
  },

  missedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 22,
  },
  missedIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  missedTitle: { fontSize: 14, fontWeight: '800', color: '#065F46' },
  missedSubtitle: { fontSize: 12, color: '#047857', marginTop: 2 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '900', color: '#111827' },
  sectionSubtitle: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center' },
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankBadgeText: { fontSize: 11, fontWeight: '900', color: '#B45309' },
  imgPlaceholder: {
    width: 56,
    height: 56,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemName: { fontSize: 14, fontWeight: '800', color: '#111827', flexShrink: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusLabel: { fontSize: 10, fontWeight: '800' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  searchesText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  trendText: { fontSize: 11, fontWeight: '700' },

  sizesLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', marginTop: 16, marginBottom: 8 },
  sizesRow: { flexDirection: 'row', gap: 8 },
  sizeChip: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  sizeChipLow: { backgroundColor: '#FEF3C7' },
  sizeChipOut: { backgroundColor: '#FEE2E2' },
  sizeChipLabel: { fontSize: 13, fontWeight: '900', color: '#111827' },
  sizeChipSearches: { fontSize: 9, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },
  sizeChipLowText: { fontSize: 9, color: '#B45309', marginTop: 2, fontWeight: '800' },
  sizeChipOutText: { fontSize: 9, color: '#DC2626', marginTop: 2, fontWeight: '800' },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  viewDemandBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  viewDemandText: { fontSize: 12, fontWeight: '800', color: '#111827' },

  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  primaryActionBtnSecondary: { backgroundColor: '#F3F4F6' },
  primaryActionText: { fontSize: 12, fontWeight: '800', color: '#fff' },
  primaryActionTextSecondary: { color: '#111827' },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 10 },
  emptyStateText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },

  bestOppCard: {
    backgroundColor: '#FFFBEB',
    marginHorizontal: 16,
    marginTop: 6,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  bestOppHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  bestOppIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bestOppTitle: { fontSize: 13, fontWeight: '900', color: '#92400E' },
  bestOppBody: { fontSize: 13, color: '#78350F', marginTop: 4, lineHeight: 18, fontWeight: '600' },
  bestOppBuyers: { fontSize: 12, color: '#B45309', marginTop: 6, fontWeight: '700' },
  bestOppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#D97706',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 16,
  },
  bestOppBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});