import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProductSizeTable = ({ sizes, onUpdateQty }: any) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Size</Text>
      <Text style={styles.headerText}>Qty</Text>
      <Text style={styles.headerText}>Price</Text>
      <Text style={styles.headerText}>Status</Text>
    </View>
    {sizes.map((item: any, index: number) => (
      <View key={index} style={styles.row}>
        <Text style={styles.sizeText}>{item.size}</Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => onUpdateQty(index, -1)} style={styles.qtyBtn}>
            <Feather name="minus" size={14} color="#111" />
          </TouchableOpacity>
          <Text style={styles.qtyVal}>{item.qty}</Text>
          <TouchableOpacity onPress={() => onUpdateQty(index, 1)} style={styles.qtyBtn}>
            <Feather name="plus" size={14} color="#111" />
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>$ {item.price}</Text>
        <Text style={styles.statusBadge}>Active</Text>
      </View>
    ))}
    <TouchableOpacity style={styles.addBtn}>
      <Feather name="plus" size={16} color="#9CA3AF" />
      <Text style={styles.addText}>Add another size</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 20, padding: 16, borderColor: '#F3F4F6', borderWidth: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
  headerText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  sizeText: { fontSize: 14, fontWeight: '700', width: 40 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 8, padding: 4 },
  qtyBtn: { padding: 4 },
  qtyVal: { paddingHorizontal: 10, fontWeight: '700', fontSize: 13 },
  priceText: { fontWeight: '700', fontSize: 13 },
  statusBadge: { color: '#22C55E', fontSize: 11, fontWeight: '700' },
  addBtn: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, alignItems: 'center' },
  addText: { color: '#9CA3AF', fontSize: 13, marginLeft: 6 },
});

export default ProductSizeTable;