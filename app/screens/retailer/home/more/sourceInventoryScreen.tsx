import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useSourceInventory, type SourceListing } from '@/services/hooks/retailer/home/useSourceInventory';

export default function SourceInventoryScreen() {
  const {
    shipTo,
    searchQuery,
    setSearchQuery,
    filters,
    activeFilter,
    setActiveFilter,
    listings,
    demandMatchCount,
  } = useSourceInventory();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View className="flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Source Inventory</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="search" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Ship to selector */}
        <TouchableOpacity style={s.shipToPill}>
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text style={s.shipToText}>Ship to: {shipTo}</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>

        {/* Search bar */}
        <View style={s.searchBar}>
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={s.searchInput}
            placeholder="Search product, SKU or supplier"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Protected sourcing banner */}
        <View style={s.protectedBanner}>
          <View style={s.protectedIconWrap}>
            <Feather name="shield" size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.protectedTitle}>Protected sourcing</Text>
            <Text style={s.protectedSubtitle}>Verified suppliers · Secure payment · Order tracking</Text>
          </View>
        </View>

        {/* Demand match alert */}
        {demandMatchCount > 0 && (
          <TouchableOpacity style={s.demandAlert} activeOpacity={0.85}>
            <MaterialCommunityIcons name="chart-bar" size={18} color="#B45309" />
            <Text style={s.demandAlertText}>
              {demandMatchCount} listings match products your customers want
            </Text>
            <Text style={s.demandAlertLink}>View Matches →</Text>
          </TouchableOpacity>
        )}

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[s.filterPill, activeFilter === filter && s.filterPillActive]}
            >
              <Text style={[s.filterText, activeFilter === filter && s.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Listings */}
        <View style={{ paddingHorizontal: 16 }}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}

          {listings.length === 0 && (
            <View style={s.emptyState}>
              <Feather name="search" size={28} color="#D1D5DB" />
              <Text style={s.emptyStateText}>No listings match this filter yet.</Text>
            </View>
          )}
        </View>

        {/* Buyer protection footer */}
        <View style={s.protectionFooter}>
          <View style={s.protectionFooterHeader}>
            <Feather name="shield" size={16} color="#059669" />
            <Text style={s.protectionFooterTitle}>GoSNKR Buyer Protection</Text>
          </View>
          <Text style={s.protectionFooterBody}>
            Keep payment and messages inside GoSNKR. Funds release after delivery confirmation.
          </Text>
          <TouchableOpacity>
            <Text style={s.protectionFooterLink}>How protection works →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
}

function ListingCard({ listing }: { listing: SourceListing }) {
  return (
    <View style={s.card}>
      {/* Badge row */}
      {(listing.isDemandMatch || listing.isBulkAvailable) && (
        <View style={s.badgeRow}>
          {listing.isDemandMatch && (
            <View style={s.demandBadge}>
              <Feather name="trending-up" size={11} color="#fff" />
              <Text style={s.demandBadgeText}>Demand Match</Text>
              <View style={s.newDot}>
                <Text style={s.newDotText}>New</Text>
              </View>
            </View>
          )}
          {listing.isBulkAvailable && (
            <View style={s.bulkBadge}>
              <Feather name="package" size={11} color="#B45309" />
              <Text style={s.bulkBadgeText}>Bulk Available</Text>
            </View>
          )}
        </View>
      )}

      {/* Product row */}
      <View style={s.productRow}>
        <View style={s.imgPlaceholder}>
          <MaterialCommunityIcons name="shoe-sneaker" size={30} color="#9CA3AF" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.productName}>{listing.productName}</Text>
          <Text style={s.productSize}>{listing.sizeLabel}</Text>
          <Text style={s.availabilityText}>
            {listing.availableCount} available · Minimum {listing.minPairs} pair{listing.minPairs > 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Feather name="heart" size={20} color="#D1D5DB" />
        </TouchableOpacity>
      </View>

      {/* Supplier row */}
      <View style={s.supplierRow}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{listing.supplier.initials}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={s.supplierNameRow}>
            <Text style={s.supplierName}>{listing.supplier.name}</Text>
            <Feather name="check-circle" size={13} color="#10B981" />
          </View>
          <Text style={s.supplierMeta}>
            {listing.supplier.rating} ★ · {listing.supplier.completedOrders} completed orders
            {listing.supplier.respondsIn ? ` · Responds in ${listing.supplier.respondsIn}` : ''}
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color="#D1D5DB" />
      </View>

      {/* Pricing grid */}
      <View style={s.pricingRow}>
        <PricingCell label="Item" value={`$${listing.pricing.itemCost}`} />
        <PricingCell label="Shipping + fees" value={`$${listing.pricing.shippingFees}`} />
        <PricingCell label="Landed cost" value={`$${listing.pricing.landedCost}`} valueColor="#059669" />
        <PricingCell label="Expected retail" value={`$${listing.pricing.expectedRetail}`} valueColor="#059669" />
        <PricingCell label="Estimated margin" value={`${listing.pricing.estimatedMarginPct}%`} valueColor="#059669" />
      </View>

      {/* Fulfillment note */}
      <View style={s.fulfillmentRow}>
        <Feather
          name={listing.fulfillment === 'ships' ? 'truck' : 'package'}
          size={13}
          color="#6B7280"
        />
        <Text style={s.fulfillmentText}>{listing.fulfillmentNote}</Text>
      </View>

      {/* Actions */}
      <View style={s.cardActions}>
        <TouchableOpacity style={s.quoteBtn}>
          <Text style={s.quoteBtnText}>Request Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.listingBtn} onPress={() => router.push('/')}>
          <Text style={s.listingBtnText}>View Listing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PricingCell({
  label,
  value,
  valueColor = '#111827',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={s.pricingCell}>
      <Text style={s.pricingLabel}>{label}</Text>
      <Text style={[s.pricingValue, { color: valueColor }]}>{value}</Text>
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
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#111827' },

  shipToPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  shipToText: { fontSize: 13, color: '#4B5563', fontWeight: '600' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },

  protectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 12,
  },
  protectedIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  protectedTitle: { fontSize: 14, fontWeight: '900', color: '#065F46' },
  protectedSubtitle: { fontSize: 12, color: '#047857', marginTop: 2, fontWeight: '600' },

  demandAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEFCE8',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  demandAlertText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#854D0E' },
  demandAlertLink: { fontSize: 12, fontWeight: '800', color: '#D97706' },

  filterContainer: { paddingHorizontal: 16, gap: 8, paddingBottom: 18 },
  filterPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  filterPillActive: { backgroundColor: '#111827' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  filterTextActive: { color: '#fff' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  demandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  demandBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  newDot: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 6, borderRadius: 6, marginLeft: 2 },
  newDotText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  bulkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  bulkBadgeText: { color: '#B45309', fontSize: 11, fontWeight: '800' },

  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  imgPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: { fontSize: 15, fontWeight: '800', color: '#111827' },
  productSize: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  availabilityText: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '600' },

  supplierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 12 },
  supplierNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  supplierName: { fontSize: 13, fontWeight: '800', color: '#111827' },
  supplierMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },

  pricingRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 },
  pricingCell: { width: '33.33%', marginBottom: 10 },
  pricingLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },
  pricingValue: { fontSize: 14, fontWeight: '800', marginTop: 2 },

  fulfillmentRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  fulfillmentText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },

  cardActions: { flexDirection: 'row', gap: 10 },
  quoteBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111827',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },
  quoteBtnText: { fontSize: 13, fontWeight: '800', color: '#111827' },
  listingBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },
  listingBtnText: { fontSize: 13, fontWeight: '800', color: '#fff' },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 10 },
  emptyStateText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },

  protectionFooter: {
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginTop: 4,
  },
  protectionFooterHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  protectionFooterTitle: { fontSize: 13, fontWeight: '900', color: '#065F46' },
  protectionFooterBody: { fontSize: 12, color: '#047857', lineHeight: 17, fontWeight: '600' },
  protectionFooterLink: { fontSize: 12, fontWeight: '800', color: '#059669', marginTop: 8 },
});