import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/services/hooks/discover/useDiscover';

interface DiscoverBrandsProps {
  brands: Brand[];
  onSeeAll?: () => void;
  onBuyPress?: (brand: Brand) => void;
  onBrandPress?: (brand: Brand) => void;
}

const BrandRow: React.FC<{
  brand: Brand;
  onPress?: () => void;
  onBuy?: () => void;
  isLast?: boolean;
}> = ({ brand, onPress, onBuy, isLast }) => {
  // Placeholder brand logos via colored circles
  const brandColors: Record<string, string> = {
    Jordan: '#C41E3A',
    Nike: '#111111',
    Adidas: '#000000',
    'New Balance': '#CF2F2F',
    Puma: '#FF0000',
  };
  const brandColor = brandColors[brand.logo] || '#333';

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Brand Logo Circle */}
      <View style={[styles.logoBg, { backgroundColor: brandColor + '15' }]}>
        <View style={[styles.logoInner, { backgroundColor: brandColor }]}>
          <Text style={styles.logoInitial}>{brand.logo.charAt(0)}</Text>
        </View>
      </View>

      {/* Text Info */}
      <View style={styles.textBlock}>
        <Text style={styles.productName} numberOfLines={1}>
          {brand.name}
        </Text>
        <Text style={styles.storeMeta}>{brand.product}</Text>
      </View>

      {/* Right side */}
      <View style={styles.rightBlock}>
        <Text style={styles.price}>${brand.price}</Text>
        <TouchableOpacity
          style={[
            styles.buyBtn,
            brand.tag === 'Low Stock' && styles.buyBtnLowStock,
          ]}
          onPress={onBuy}
          activeOpacity={0.8}
        >
          <Text style={styles.buyBtnText}>
            {brand.tag === 'Low Stock' ? 'Low Stock' : 'Buy'}
          </Text>
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
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>From Your Brands</Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subheading}>Based on your brands</Text>

      {/* Brand List Card */}
      <View style={styles.listCard}>
        {brands.map((brand, index) => (
          <BrandRow
            key={brand.id}
            brand={brand}
            onPress={() => onBrandPress?.(brand)}
            onBuy={() => onBuyPress?.(brand)}
            isLast={index === brands.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00D46A',
  },
  subheading: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
    marginBottom: 14,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logoBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitial: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  storeMeta: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '500',
  },
  rightBlock: {
    alignItems: 'flex-end',
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  buyBtn: {
    backgroundColor: '#00D46A',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buyBtnLowStock: {
    backgroundColor: '#FF9500',
  },
  buyBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.2,
  },
});

export default DiscoverBrands;