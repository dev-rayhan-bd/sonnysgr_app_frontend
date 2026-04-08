import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TopProduct } from '@/types/analytics';

interface AnalyticsTopProductsProps {
  products: TopProduct[];
}

const AnalyticsTopProducts: React.FC<AnalyticsTopProductsProps> = ({ products }) => (
  <View style={s.section}>
    <Text style={s.sectionTitle}>Top Products</Text>
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
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#111', marginBottom: 4 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, borderColor: '#F3F4F6',
  },
  rank: { fontSize: 13, fontWeight: '800', color: '#111', width: 20 },
  info: { flex: 1, marginLeft: 8 },
  name: { fontSize: 12, fontWeight: '700', color: '#111' },
  sub: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
  price: { fontSize: 13, fontWeight: '800', color: '#111' },
});

export default AnalyticsTopProducts;