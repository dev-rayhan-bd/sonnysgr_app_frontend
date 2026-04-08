import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProductImageUpload = () => (
  <TouchableOpacity style={styles.container} activeOpacity={0.7}>
    <Feather name="camera" size={32} color="#9CA3AF" />
    <Text style={styles.mainText}>Add product photos</Text>
    <Text style={styles.subText}>Up to 8 - First photo = cover</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { height: 180, backgroundColor: '#fff', margin: 16, borderRadius: 20, borderWidth: 1, borderColor: '#F3F4F6', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  mainText: { fontSize: 14, fontWeight: '700', color: '#111', marginTop: 12 },
  subText: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
});

export default ProductImageUpload;