import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProductSizeTable = ({ sizes, onUpdateQty, onRemove, onAddSize }: any) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.sizeCol]}>Size</Text>
      <Text style={[styles.headerText, styles.qtyCol]}>Qty</Text>
      <Text style={[styles.headerText, styles.priceCol]}>Price</Text>
      <View style={styles.deleteCol} />
    </View>
    {sizes.map((item: any, index: number) => (
      <View key={index} style={styles.row}>
        <Text style={[styles.sizeText, styles.sizeCol]}>{item.size}</Text>

        <View style={[styles.qtyContainer, styles.qtyCol]}>
          <TouchableOpacity onPress={() => onUpdateQty(index, -1)} style={styles.qtyBtn}>
            <Feather name="minus" size={14} color="#111" />
          </TouchableOpacity>
          <Text style={styles.qtyVal}>{item.qty}</Text>
          <TouchableOpacity onPress={() => onUpdateQty(index, 1)} style={styles.qtyBtn}>
            <Feather name="plus" size={14} color="#111" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.priceText, styles.priceCol]}>${item.price}</Text>

        <TouchableOpacity
          style={styles.deleteCol}
          onPress={() => onRemove?.(index)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="trash-2" size={16} color="#D1D5DB" />
        </TouchableOpacity>
      </View>
    ))}
    <TouchableOpacity style={styles.addBtn} onPress={onAddSize}>
      <Feather name="plus" size={16} color="#22C55E" />
      <Text style={styles.addText}>Add size or scan another</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 20, padding: 16, borderColor: '#F3F4F6', borderWidth: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  headerText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  sizeCol: { width: 44 },
  qtyCol: { flex: 1, alignItems: 'center' },
  priceCol: { width: 56, textAlign: 'right' },
  deleteCol: { width: 28, alignItems: 'flex-end' },
  sizeText: { fontSize: 14, fontWeight: '700', color: '#111' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 8, padding: 4, alignSelf: 'center' },
  qtyBtn: { padding: 4 },
  qtyVal: { paddingHorizontal: 10, fontWeight: '700', fontSize: 13 },
  priceText: { fontWeight: '700', fontSize: 13, color: '#111' },
  addBtn: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, alignItems: 'center' },
  addText: { color: '#22C55E', fontSize: 13, fontWeight: '700', marginLeft: 6 },
});

export default ProductSizeTable;