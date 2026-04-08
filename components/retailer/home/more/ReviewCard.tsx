import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export const ReviewCard = ({ review }: { review: any }) => (
  <View style={[s.card, review.needsResponse && s.alertBorder]}>
    <View style={s.header}>
      <View style={s.userRow}>
        <View style={s.avatar}><Text style={s.avatarText}>{review.initials}</Text></View>
        <View>
          <Text style={s.name}>{review.author}</Text>
          {review.verified && (
            <View style={s.verifiedBadge}>
              <Text style={s.verifiedText}>Verified</Text>
              <Feather name="check" size={10} color="#10B981" />
            </View>
          )}
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <View style={s.stars}>
          {[1,2,3,4,5].map(i => <FontAwesome key={i} name="star" size={12} color={i <= review.rating ? "#F59E0B" : "#E5E7EB"} />)}
        </View>
        <Text style={s.date}>{review.date}</Text>
      </View>
    </View>

    <View style={s.productRow}>
      <MaterialCommunityIcons name="shoe-sneaker" size={16} color="#9CA3AF" />
      <Text style={s.productText}>For: {review.product}</Text>
    </View>

    <Text style={s.comment}>{review.comment}</Text>

    <View style={s.tagRow}>
       <View style={s.miniTag}><Text style={s.tagText}>Service ⭐</Text></View>
       <View style={s.miniTag}><Text style={s.tagText}>Auth ⭐⭐⭐</Text></View>
    </View>

    <View style={s.footer}>
      <View style={s.helpful}>
        <Text style={s.helpfulText}>Helpful ({review.helpful}) 👍</Text>
        <TouchableOpacity><Text style={s.reportText}>Report</Text></TouchableOpacity>
      </View>
      {review.needsResponse && (
        <TouchableOpacity style={s.respondBtn}>
          <Text style={s.respondText}>Respond</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6' },
  alertBorder: { borderColor: '#FECACA', borderWidth: 1.5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarText: { color: '#fff', fontWeight: '700' },
  name: { fontWeight: '700', fontSize: 14 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 6, borderRadius: 4, marginTop: 2 },
  verifiedText: { color: '#10B981', fontSize: 9, fontWeight: '800', marginRight: 2 },
  stars: { flexDirection: 'row' },
  date: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  productText: { fontSize: 12, color: '#9CA3AF', marginLeft: 6 },
  comment: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  miniTag: { backgroundColor: '#F9FAFB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#6B7280' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  helpful: { flexDirection: 'row', gap: 12 },
  helpfulText: { fontSize: 11, color: '#9CA3AF' },
  reportText: { fontSize: 11, color: '#9CA3AF' },
  respondBtn: { backgroundColor: '#EF4444', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  respondText: { color: '#fff', fontWeight: '700', fontSize: 12 }
});