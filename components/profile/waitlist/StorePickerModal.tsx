// components/profile/waitlist/StorePickerModal.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'

export interface Store {
  id: string
  name: string
  address: string
  distance: string
  hasStock?: boolean
}

const MOCK_STORES: Store[] = [
  { id: '1', name: 'Nike Factory Store - Downtown', address: '123 Main St', distance: '0.8 mi' },
  { id: '2', name: 'Foot Locker - Westfield Mall', address: '456 Mall Dr, Unit 12', distance: '1.4 mi' },
  { id: '3', name: 'Champs Sports - Northgate', address: '789 Northgate Blvd', distance: '2.1 mi' },
  { id: '4', name: 'JD Sports - City Center', address: '321 5th Ave', distance: '2.6 mi' },
  { id: '5', name: "Dick's Sporting Goods", address: '555 Commerce Way', distance: '3.2 mi' },
  { id: '6', name: 'Finish Line - Eastgate', address: '888 Eastgate Rd', distance: '4.0 mi' },
  { id: '7', name: 'Sneaker Villa - Uptown', address: '12 Uptown Plaza', distance: '4.7 mi' },
  { id: '8', name: 'Extra Butter', address: '60 Orchard St', distance: '5.1 mi' },
]

interface StorePickerModalProps {
  visible: boolean
  selectedStores: string[]
  onConfirm: (selectedIds: string[]) => void
  onClose: () => void
}

export const StorePickerModal: React.FC<StorePickerModalProps> = ({
  visible,
  selectedStores,
  onConfirm,
  onClose,
}) => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedStores))

  const filtered = MOCK_STORES.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase()),
  )

  const toggle = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const handleConfirm = () => {
    onConfirm(Array.from(selected))
    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <BaseContainer  backgroundColor="#fff">
        <View style={styles.inner}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#1a1a1a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Choose Stores</Text>
            <View style={styles.closeBtn} />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Select stores you want us to monitor. We'll alert you the moment your size is back.
          </Text>

          {/* Search */}
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={16} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stores..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={16} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {/* Selection bar */}
          {selected.size > 0 && (
            <View style={styles.selectionBar}>
              <Ionicons name="checkmark-done-circle" size={15} color="#22c55e" />
              <Text style={styles.selectionText}>
                {selected.size} store{selected.size > 1 ? 's' : ''} selected
              </Text>
              <TouchableOpacity onPress={() => setSelected(new Set())}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Store list — own ScrollView, not nested inside another */}
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {filtered.length === 0 ? (
              <View style={styles.empty}>
                <Ionicons name="storefront-outline" size={36} color="#d1d5db" />
                <Text style={styles.emptyText}>No stores found</Text>
              </View>
            ) : (
              filtered.map(item => {
                const isSelected = selected.has(item.id)
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.storeRow, isSelected && styles.storeRowSelected]}
                    onPress={() => toggle(item.id)}
                    activeOpacity={0.75}
                  >
                    <View style={styles.storeInfo}>
                      <Text style={[styles.storeName, isSelected && styles.storeNameSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.storeAddress}>{item.address}</Text>
                    </View>
                    <View style={styles.storeRight}>
                      <Text style={styles.storeDistance}>{item.distance}</Text>
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={13} color="#fff" />}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>

          {/* CTA — pinned outside ScrollView */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.confirmBtn, selected.size === 0 && styles.confirmBtnDisabled]}
              onPress={handleConfirm}
              disabled={selected.size === 0}
              activeOpacity={0.85}
            >
              <Ionicons name="notifications" size={18} color={selected.size === 0 ? '#9ca3af' : '#fff'} />
              <Text style={[styles.confirmText, selected.size === 0 && styles.confirmTextDisabled]}>
                {selected.size === 0
                  ? 'Select at least one store'
                  : `Monitor ${selected.size} Store${selected.size > 1 ? 's' : ''}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseContainer>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingTop:10,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e5e7eb',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    paddingHorizontal: 16,
    marginBottom: 14,
    lineHeight: 18,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  selectionText: {
    flex: 1,
    fontSize: 12,
    color: '#166834',
    fontWeight: '600',
  },
  clearText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  storeRowSelected: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  storeInfo: {
    flex: 1,
    gap: 2,
  },
  storeName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  storeNameSelected: {
    color: '#166534',
  },
  storeAddress: {
    fontSize: 11,
    color: '#9ca3af',
  },
  storeRight: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 8,
  },
  storeDistance: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 48,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  confirmBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmBtnDisabled: {
    backgroundColor: '#f3f4f6',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  confirmTextDisabled: {
    color: '#9ca3af',
  },
})