import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProductBarcodeScanProps {
  onOpenScanner: () => void;
  onEnterManually: () => void;
}

const ProductBarcodeScan = ({ onOpenScanner, onEnterManually }: ProductBarcodeScanProps) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Feather name="maximize" size={20} color="#111" />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title}>Scan Barcode</Text>
        <Text style={styles.subtitle}>Scan a UPC to fill product details automatically</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.scanBtn} onPress={onOpenScanner} activeOpacity={0.85}>
      <Feather name="camera" size={16} color="#fff" />
      <Text style={styles.scanBtnText}>Open Scanner</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onEnterManually} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Text style={styles.manualText}>Enter barcode manually</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textCol: { flex: 1 },
  title: { fontSize: 15, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 12, color: '#4B7A5A', marginTop: 2 },
  scanBtn: {
    flexDirection: 'row',
    backgroundColor: '#111',
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  scanBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  manualText: { fontSize: 13, fontWeight: '700', color: '#16A34A' },
});

export default ProductBarcodeScan;