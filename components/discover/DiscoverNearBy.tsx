import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SneakerProduct } from '@/services/hooks/discover/useDiscover';

interface DiscoverNearByProps {
  products: SneakerProduct[];
  onSeeAll?: () => void;
  onProductPress?: (product: SneakerProduct) => void;
  onWishlistToggle?: (productId: string) => void;
}

const TagPill: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <View style={[styles.tag, { backgroundColor: color + '22', borderColor: color + '44' }]}>
    <View style={[styles.tagDot, { backgroundColor: color }]} />
    <Text style={[styles.tagText, { color }]}>{label}</Text>
  </View>
);

const NearByCard: React.FC<{
  product: SneakerProduct;
  onPress?: () => void;
  onWishlist?: () => void;
}> = ({ product, onPress, onWishlist }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    {/* Wishlist Button */}
    <TouchableOpacity style={styles.wishlistBtn} onPress={onWishlist} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Ionicons
        name={product.isWishlisted ? 'heart' : 'heart-outline'}
        size={18}
        color={product.isWishlisted ? '#FF3B6B' : '#ccc'}
      />
    </TouchableOpacity>

    {/* Tag */}
    {product.tag && (
      <View style={styles.tagWrapper}>
        <TagPill label={product.tag} color={product.tagColor || '#00C853'} />
      </View>
    )}

    {/* Product Image */}
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
    </View>

    {/* Info */}
    <View style={styles.cardInfo}>
      <Text style={styles.storeMeta}>
        {product.store} · {product.distance}
      </Text>
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  </TouchableOpacity>
);

export const DiscoverNearBy: React.FC<DiscoverNearByProps> = ({
  products,
  onSeeAll,
  onProductPress,
  onWishlistToggle,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby</Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all →</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map(product => (
          <NearByCard
            key={product.id}
            product={product}
            onPress={() => onProductPress?.(product)}
            onWishlist={() => onWishlistToggle?.(product.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
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
  scrollContent: {
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
  },
  card: {
    width: 155,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tagWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    backgroundColor: '#F7F7F7',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    padding: 12,
    gap: 3,
  },
  storeMeta: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 18,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
    marginTop: 4,
  },
});

export default DiscoverNearBy;