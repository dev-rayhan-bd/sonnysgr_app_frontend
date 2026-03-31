import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { BrandProduct, StockStatus } from '@/services/hooks/discover/useDiscover';

interface DiscoverBrandsProps {
  brands: BrandProduct[];
  onSeeAll?: () => void;
  onBuyPress?: (b: BrandProduct) => void;
  onBrandPress?: (b: BrandProduct) => void;
}

/**
 * Figma exact (both images):
 * - White card list, each row has:
 *   LEFT:  square thumbnail image (~58px), with a small colored letter badge (J/N/A) overlaid top-left
 *   MIDDLE: product name bold (1 line), store + distance small gray below
 *   RIGHT: price bold top, then stock pill + "Buy" button below (stacked vertically)
 * - Stock pill: "In Stock" green filled, "Low Stock" orange filled — small pill
 * - "Buy" is a small green rounded button
 * - Rows separated by thin #F5F5F5 divider
 * - Outer card: white bg, rounded 16, shadow
 */

type StockConfig = { label: string; bg: string; text: string };

const STOCK: Record<StockStatus, StockConfig> = {
  'In Stock':      { label: 'In Stock',      bg: '#00C853', text: '#fff' },
  'Low Stock':     { label: 'Low Stock',     bg: '#FF6D00', text: '#fff' },
  'Dropping Soon': { label: 'Dropping Soon', bg: '#1565C0', text: '#fff' },
};

const BrandRow: React.FC<{
  brand: BrandProduct;
  isLast: boolean;
  onPress?: () => void;
  onBuy?: () => void;
}> = ({ brand, isLast, onPress, onBuy }) => {
  const stock = STOCK[brand.stockStatus];
  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Left: image thumbnail with brand badge overlay */}
      <View style={styles.thumbWrap}>
        <Image source={{ uri: brand.image }} style={styles.thumb} resizeMode="cover" />
        {/* Brand letter badge */}
        <View style={[styles.brandBadge, { backgroundColor: brand.brandColor }]}>
          <Text style={styles.brandInitial}>{brand.brandInitial}</Text>
        </View>
      </View>

      {/* Middle: text */}
      <View style={styles.mid}>
        <Text style={styles.productName} numberOfLines={1}>{brand.name}</Text>
        <Text style={styles.storeMeta}>{brand.store}</Text>
        <Text style={styles.storeMeta}>{brand.distance}</Text>
      </View>

      {/* Right: price + stock + buy */}
      <View style={styles.right}>
        <Text style={styles.price}>${brand.price}</Text>
        <View style={[styles.stockPill, { backgroundColor: stock.bg }]}>
          <Text style={[styles.stockText, { color: stock.text }]}>{stock.label}</Text>
        </View>
        <TouchableOpacity style={styles.buyBtn} onPress={onBuy} activeOpacity={0.8}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const DiscoverBrands: React.FC<DiscoverBrandsProps> = ({
  brands,
  onSeeAll,
  onBuyPress,
  onBrandPress,
}) => (
  <View style={styles.section}>
    {/* Header */}
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>From Your Brands</Text>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Text style={styles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.subTitle}>Based on your brands</Text>

    {/* Card */}
    <View style={styles.card}>
      {brands.map((b, i) => (
        <BrandRow
          key={b.id}
          brand={b}
          isLast={i === brands.length - 1}
          onPress={() => onBrandPress?.(b)}
          onBuy={() => onBuyPress?.(b)}
        />
      ))}
    </View>
  </View>
);

const THUMB = 62;

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00C853',
  },
  subTitle: {
    fontSize: 11,
    color: '#B0B0B0',
    fontWeight: '400',
    marginTop: 2,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  thumbWrap: {
    width: THUMB,
    height: THUMB,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EBEBEB',
    flexShrink: 0,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  brandBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandInitial: {
    fontSize: 11,
    fontWeight: '900',
    color: '#fff',
  },
  mid: {
    flex: 1,
    gap: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  storeMeta: {
    fontSize: 11,
    color: '#B0B0B0',
    fontWeight: '400',
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
    flexShrink: 0,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  stockPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  stockText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  buyBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
});

export default DiscoverBrands;