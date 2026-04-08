import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useReviews } from '@/services/hooks/retailer/more/useReview';
import { RatingSummary } from '@/components/retailer/home/more/RatingSummary';
import { ReviewCard } from '@/components/retailer/home/more/ReviewCard';
import BaseContainer from '@/components/shared/BaseContainer';
import { router } from 'expo-router';
export default function ReviewsScreen() {
  const { stats, filteredReviews, activeFilter, setActiveFilter } = useReviews();
  const filters = ['All (247)', '5★', '4★', '3★ or below', 'Unverified'];

  return (
<BaseContainer scrollable backgroundColor='#fff'>
      <View style={styles.header}>
       <TouchableOpacity onPress={() => router.back()}>
  <Feather name="arrow-left" size={24} />
</TouchableOpacity>
        <View style={styles.titleBox}><Text style={styles.title}>Reviews</Text></View>
        <TouchableOpacity><Feather name="filter" size={20} /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <RatingSummary stats={stats} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {filters.map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, activeFilter === f && styles.activeChip]}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.activeText]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ padding: 16 }}>
          {filteredReviews.map(r => <ReviewCard key={r.id} review={r} />)}
        </View>
      </ScrollView>
</BaseContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' ,paddingTop:40 },
  titleBox: { backgroundColor: '#FFED4A', paddingHorizontal: 12, paddingVertical: 2, borderRadius: 4 },
  title: { fontSize: 20, fontWeight: '900' },
  filterBar: { paddingLeft: 16, marginBottom: 8 },
  filterChip: { backgroundColor: '#F9FAFB', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#F3F4F6' },
  activeChip: { backgroundColor: '#111', borderColor: '#111' },
  filterText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  activeText: { color: '#fff' }
});