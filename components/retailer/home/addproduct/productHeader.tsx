import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProductHeader = () => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
      <Feather name="arrow-left" size={22} color="#111" />
    </TouchableOpacity>
    <Text style={styles.title}>Add Product</Text>
    <View style={styles.btn} /> 
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff' },
  btn: { width: 40 },
  title: { fontSize: 17, fontWeight: '800', color: '#111' },
});

export default ProductHeader;