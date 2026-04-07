import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { InventoryProduct, StockStatus } from '@/services/hooks/retailer/inventory/useInventory';

interface InventoryCardProps {
  product: InventoryProduct;
  onPress?: (product: InventoryProduct) => void;
  onEditPress?: (product: InventoryProduct) => void;
}

// ── Status badge config ──────────────────────────────────────────────────────

const statusBadge: Record<StockStatus, { bg: string; text: string }> = {
  'In Stock':      { bg: '#00C853', text: '#fff' },
  'Low Stock':     { bg: '#F97316', text: '#fff' },
  'Out of Stock':  { bg: '#EF4444', text: '#fff' },
  'On Hold':       { bg: '#374151', text: '#fff' },
};

// ── Size pill config ─────────────────────────────────────────────────────────

const SIZES_VISIBLE = 6; // max sizes shown before "+ N more"

const InventoryCard: React.FC<InventoryCardProps> = ({
  product, onPress, onEditPress,
}) => {
  const badge = statusBadge[product.status];
  const badgeLabel =
    product.status === 'Low Stock' && product.lowCount != null
      ? `Low: ${product.lowCount}`
      : product.status;

  const visibleSizes = product.sizes.slice(0, SIZES_VISIBLE);
  const hiddenCount = product.sizes.length - SIZES_VISIBLE;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(product)}
      activeOpacity={0.85}
      style={{
        backgroundColor: '#fff',
        borderWidth: 1, borderColor: '#E5E7EB',
        borderRadius: 16, padding: 12,
        flexDirection: 'row', gap: 12, alignItems: 'flex-start',
        marginBottom: 10,
      }}
    >
      {/* ── Image / placeholder ── */}
      <View style={{ position: 'relative', flexShrink: 0 }}>
        {product.imageUri ? (
          <Image
            source={{ uri: product.imageUri }}
            style={{ width: 80, height: 80, borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{
            width: 80, height: 80, borderRadius: 12,
            backgroundColor: product.imageBg,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Feather name="package" size={30} color="#9CA3AF" />
          </View>
        )}

        {/* Status badge overlaid bottom-left */}
        <View style={{
          position: 'absolute', bottom: 5, left: 5,
          backgroundColor: badge.bg,
          borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
        }}>
          <Text style={{ color: badge.text, fontSize: 9, fontWeight: '700' }}>
            {badgeLabel}
          </Text>
        </View>
      </View>

      {/* ── Details ── */}
      <View style={{ flex: 1, minWidth: 0 }}>
        {/* Brand */}
        <Text style={{
          fontSize: 10, fontWeight: '600', color: '#9CA3AF',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          {product.brand}
        </Text>

        {/* Product name */}
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#111', marginTop: 1 }}
          numberOfLines={1}>
          {product.name}
        </Text>

        {/* Size pills */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
          {visibleSizes.map(({ size, qty }) => {
            const available = qty > 0;
            return (
              <View
                key={size}
                style={{
                  backgroundColor: available ? '#DCFCE7' : '#F3F4F6',
                  borderRadius: 8,
                  paddingHorizontal: 7, paddingVertical: 3,
                  marginRight: 4, marginBottom: 4,
                }}
              >
                <Text style={{
                  fontSize: 10, fontWeight: '600',
                  color: available ? '#15803D' : '#9CA3AF',
                }}>
                  {size}
                </Text>
              </View>
            );
          })}

          {/* Overflow pill */}
          {hiddenCount > 0 && (
            <View style={{
              backgroundColor: '#F3F4F6', borderRadius: 8,
              paddingHorizontal: 7, paddingVertical: 3,
              marginRight: 4, marginBottom: 4,
            }}>
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#9CA3AF' }}>
                +{hiddenCount}
              </Text>
            </View>
          )}
        </View>

        {/* Price + cost */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Text style={{ fontSize: 14, fontWeight: '800', color: '#111' }}>
            ${product.price}
          </Text>
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
            · Cost: ${product.cost}
          </Text>
        </View>

        {/* SKU */}
        <Text style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>
          {product.sku}
        </Text>
      </View>

      {/* ── Edit icon ── */}
      <TouchableOpacity onPress={() => onEditPress?.(product)} hitSlop={8}>
        <Feather name="edit-2" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default InventoryCard;