import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TopProduct } from '@/types/analytics';

interface AnalyticsTopProductsProps {
  products: TopProduct[];
  onViewAll?: () => void;
}

const AnalyticsTopProducts: React.FC<AnalyticsTopProductsProps> = ({ products, onViewAll }) => (
  <View style={s.section}>
    <View style={s.headerRow}>
      <Text style={s.sectionTitle}>Top Products</Text>
      <TouchableOpacity onPress={onViewAll} hitSlop={8}>
        <Text style={s.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    {products.map((p, index) => (
      <View
        key={p.rank}
        style={[s.row, index === products.length - 1 && { borderBottomWidth: 0 }]}
      >
        <Text style={s.rank}>{p.rank}</Text>
        <View style={s.info}>
          <Text style={s.name}>{p.name}</Text>
          <Text style={s.sub}>{p.sub}</Text>
        </View>
        <Text style={s.price}>{p.price}</Text>
      </View>
    ))}
  </View>
);

const s = StyleSheet.create({
  section: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6',
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#111' },
  viewAll: { fontSize: 12, fontWeight: '700', color: '#00C853' },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, borderColor: '#F3F4F6',
  },
  rank: { fontSize: 13, fontWeight: '800', color: '#111', width: 20 },
  info: { flex: 1, marginLeft: 8 },
  name: { fontSize: 13, fontWeight: '700', color: '#111' },
  sub: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  price: { fontSize: 13, fontWeight: '800', color: '#111' },
});

export default AnalyticsTopProducts;