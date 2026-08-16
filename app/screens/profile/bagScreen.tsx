// app/screens/profile/bagScreen.tsx
// "Bag" is the consumer's active holds/reserves - different from cart
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

const BAG_ITEMS = [
  { id: '1', product: 'Air Jordan 4 Retro', store: 'Kicks City', size: '10.5', price: 210, holdExpiresIn: '2h 34m', type: 'hold' },
  { id: '2', product: 'Nike Dunk Low Panda', store: 'Urban Vault', size: '9', price: 110, holdExpiresIn: '5h 10m', type: 'reserve' },
]

export default function BagScreen() {
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#f9fafb">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bag</Text>
        <View style={{ width: 22 }} />
      </View>

      {BAG_ITEMS.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="shopping-bag" size={48} color="#d1d5db" />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>Holds and reserves will appear here</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => router.back()}>
            <Text style={styles.browseBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={BAG_ITEMS}
            keyExtractor={i => i.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.imageBox} />
                <View style={styles.info}>
                  <View style={styles.typeBadge}>
                    <Feather name={item.type === 'hold' ? 'clock' : 'map-pin'} size={10} color="#f59e0b" />
                    <Text style={styles.typeText}>{item.type === 'hold' ? 'On Hold' : 'Reserved'}</Text>
                  </View>
                  <Text style={styles.productName}>{item.product}</Text>
                  <Text style={styles.store}>{item.store} · Size {item.size}</Text>
                  <Text style={styles.expires}>Expires in {item.holdExpiresIn}</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.payBtn}
                    onPress={() => router.push('/screens/order/paymentScreen')}
                  >
                    <Text style={styles.payBtnText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerLabel}>Total</Text>
              <Text style={styles.footerTotal}>${BAG_ITEMS.reduce((s, i) => s + i.price, 0)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => router.push('/screens/order/paymentScreen')}
            >
              <Text style={styles.checkoutBtnText}>Checkout All</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a' },
  emptySubtitle: { fontSize: 14, color: '#6b7280' },
  browseBtn: { marginTop: 8, backgroundColor: '#0a0a0a', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12 },
  browseBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  list: { padding: 16, paddingBottom: 120 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 14, gap: 12, alignItems: 'center' },
  imageBox: { width: 80, height: 80, backgroundColor: '#f9fafb', borderRadius: 12 },
  info: { flex: 1 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fffbeb', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 4 },
  typeText: { fontSize: 11, fontWeight: '600', color: '#f59e0b' },
  productName: { fontSize: 14, fontWeight: '600', color: '#0a0a0a', marginBottom: 2 },
  store: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  expires: { fontSize: 12, color: '#ef4444', fontWeight: '600' },
  right: { alignItems: 'flex-end', gap: 10 },
  price: { fontSize: 16, fontWeight: '800', color: '#0a0a0a' },
  payBtn: { backgroundColor: '#22c55e', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  payBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  footerLabel: { fontSize: 16, fontWeight: '600', color: '#374151' },
  footerTotal: { fontSize: 20, fontWeight: '800', color: '#0a0a0a' },
  checkoutBtn: { backgroundColor: '#0a0a0a', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  checkoutBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
