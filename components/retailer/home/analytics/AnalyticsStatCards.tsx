import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AnalyticsStatCardsProps {
  orders: number;
  ordersChange: string;
  rating: number;
  totalRatings: number;
}

const AnalyticsStatCards: React.FC<AnalyticsStatCardsProps> = ({
  orders,
  ordersChange,
  rating,
  totalRatings,
}) => {
  
  // Internal Helper for the Card UI
  const StatCard = ({ label, value, change, isPositive = true, accent = '#111', isLast = false }: any) => (
    <View style={[s.card, { borderLeftColor: accent }, !isLast && { marginRight: 8 }]}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.value}>{value}</Text>
      <View style={s.changeRow}>
        <Feather 
          name={isPositive ? "arrow-up-right" : "arrow-down-right"} 
          size={10} 
          color={isPositive ? "#00C853" : "#EF4444"} 
        />
        <Text style={[s.changeText, { color: isPositive ? "#00C853" : "#EF4444" }]}>
          {change}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      {/* Row 1: Real Data from Props */}
      <View style={s.row}>
        <StatCard 
          label="ORDERS" 
          value={orders} 
          change={ordersChange} 
          accent="#111" 
        />
        <StatCard 
          label="RATING" 
          value={`${rating} ⭐`} 
          change={`${totalRatings} total`} 
          accent="#F59E0B" 
          isLast 
        />
      </View>

      {/* Row 2: Placeholders (since we can't change the screen props yet) */}
      <View style={s.row}>
        <StatCard 
          label="AVG ORDER" 
          value="$237" 
          change="$18 vs last month" 
          accent="#111" 
        />
        <StatCard 
          label="PICKUP RATE" 
          value="94%" 
          change="Same as last month" 
          accent="#00C853" 
          isLast 
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { marginBottom: 12 },
  row: { flexDirection: 'row', marginBottom: 8 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderLeftWidth: 4, // The thick accent line on the left
  },
  label: { fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.5 },
  value: { fontSize: 18, fontWeight: '900', color: '#111', marginTop: 4 },
  changeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  changeText: { fontSize: 10, fontWeight: '600', marginLeft: 2 },
});

export default AnalyticsStatCards;