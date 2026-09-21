import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProductFoundCardProps {
  productName: string;
  imageUri?: string;
  onPress?: () => void;
}

const ProductFoundCard = ({ productName, imageUri, onPress }: ProductFoundCardProps) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress} disabled={!onPress}>
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.thumb} resizeMode="contain" />
    ) : (
      <View style={styles.thumbPlaceholder}>
        <Feather name="image" size={20} color="#9CA3AF" />
      </View>
    )}

    <View style={styles.textCol}>
      <View style={styles.titleRow}>
        <View style={styles.checkCircle}>
          <Feather name="check" size={11} color="#fff" />
        </View>
        <Text style={styles.title}>Product found - Review details</Text>
      </View>
      <Text style={styles.subtitle} numberOfLines={1}>{productName}</Text>
    </View>

    <Feather name="chevron-right" size={18} color="#16A34A" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
  },
  thumb: { width: 48, height: 48, marginRight: 12 },
  thumbPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textCol: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  title: { fontSize: 13, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 12, color: '#4B7A5A', marginLeft: 22 },
});

export default ProductFoundCard;