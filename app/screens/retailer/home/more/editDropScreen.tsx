// app/screens/retailer/home/more/editDropScreen.tsx
import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, TextInput, Switch,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const SIZES = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']

export default function EditDropScreen() {
  const router = useRouter()
  const [name, setName] = useState('Air Jordan 4 "Red Thunder"')
  const [retailPrice, setRetailPrice] = useState('210')
  const [dropDate, setDropDate] = useState('Aug 25, 2026')
  const [dropTime, setDropTime] = useState('10:00 AM')
  const [limitPerCustomer, setLimitPerCustomer] = useState('1')
  const [isOnline, setIsOnline] = useState(true)
  const [isInStore, setIsInStore] = useState(true)
  const [notifyFollowers, setNotifyFollowers] = useState(true)
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['9', '9.5', '10', '10.5', '11'])

  const toggleSize = (size: string) =>
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Drop</Text>
        <TouchableOpacity>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Product */}
        <Text style={styles.sectionTitle}>Product</Text>
        <View style={styles.productPreview}>
          <View style={styles.productImage} />
          <View style={styles.productMeta}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productSku}>SKU: 308497-006</Text>
          </View>
          <TouchableOpacity style={styles.changeProductBtn}>
            <Text style={styles.changeProductText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Drop name override */}
        <Text style={styles.sectionTitle}>Drop Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />

        {/* Date & time */}
        <Text style={styles.sectionTitle}>Drop Date & Time</Text>
        <View style={styles.row}>
          <View style={[styles.inputWrap, { flex: 1.4 }]}>
            <Feather name="calendar" size={14} color="#9ca3af" />
            <TextInput value={dropDate} onChangeText={setDropDate} style={styles.inlineInput} />
          </View>
          <View style={[styles.inputWrap, { flex: 1 }]}>
            <Feather name="clock" size={14} color="#9ca3af" />
            <TextInput value={dropTime} onChangeText={setDropTime} style={styles.inlineInput} />
          </View>
        </View>

        {/* Price */}
        <Text style={styles.sectionTitle}>Retail Price</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput value={retailPrice} onChangeText={setRetailPrice} keyboardType="numeric" style={styles.inlineInput} />
        </View>

        {/* Sizes */}
        <Text style={styles.sectionTitle}>Available Sizes</Text>
        <View style={styles.sizeGrid}>
          {SIZES.map(size => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeBtn, selectedSizes.includes(size) && styles.sizeBtnActive]}
              onPress={() => toggleSize(size)}
            >
              <Text style={[styles.sizeBtnText, selectedSizes.includes(size) && styles.sizeBtnTextActive]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Limit */}
        <Text style={styles.sectionTitle}>Limit Per Customer</Text>
        <View style={styles.limitRow}>
          {['1', '2', '3', 'No Limit'].map(l => (
            <TouchableOpacity
              key={l}
              style={[styles.limitBtn, limitPerCustomer === l && styles.limitBtnActive]}
              onPress={() => setLimitPerCustomer(l)}
            >
              <Text style={[styles.limitBtnText, limitPerCustomer === l && styles.limitBtnTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Channel */}
        <Text style={styles.sectionTitle}>Drop Channel</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Online (App)</Text>
          <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>In-Store</Text>
          <Switch value={isInStore} onValueChange={setIsInStore} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notify Followers</Text>
          <Switch value={notifyFollowers} onValueChange={setNotifyFollowers} trackColor={{ true: '#0a0a0a', false: '#e5e7eb' }} thumbColor="#fff" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  deleteText: { fontSize: 14, fontWeight: '600', color: '#ef4444' },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginTop: 20 },
  productPreview: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderRadius: 14, padding: 12 },
  productImage: { width: 56, height: 56, backgroundColor: '#e5e7eb', borderRadius: 10 },
  productMeta: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a' },
  productSku: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  changeProductBtn: {},
  changeProductText: { fontSize: 13, fontWeight: '600', color: '#22c55e' },
  input: { backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#0a0a0a', borderWidth: 1, borderColor: '#e5e7eb' },
  row: { flexDirection: 'row', gap: 10 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  inlineInput: { flex: 1, fontSize: 15, color: '#0a0a0a' },
  dollarSign: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sizeBtn: { width: 52, height: 40, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  sizeBtnActive: { backgroundColor: '#0a0a0a' },
  sizeBtnText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  sizeBtnTextActive: { color: '#fff' },
  limitRow: { flexDirection: 'row', gap: 8 },
  limitBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center' },
  limitBtnActive: { backgroundColor: '#0a0a0a' },
  limitBtnText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  limitBtnTextActive: { color: '#fff' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  switchLabel: { fontSize: 15, fontWeight: '600', color: '#0a0a0a' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 12, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  cancelBtn: { flex: 1, paddingVertical: 16, borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' },
  cancelBtnText: { fontSize: 15, fontWeight: '700', color: '#374151' },
  saveBtn: { flex: 2, paddingVertical: 16, borderRadius: 14, backgroundColor: '#0a0a0a', alignItems: 'center' },
  saveBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
})
