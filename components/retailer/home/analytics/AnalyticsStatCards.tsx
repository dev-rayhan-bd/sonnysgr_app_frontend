import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AnalyticsStatCardsProps {
  orders: number;
  ordersChange: string;
  grossProfit: string;
  grossProfitMargin: string;
  grossProfitChange: string;
  avgOrder: string;
  avgOrderChange: string;
  pickupRate: string;
  pickupRateChange: string;
}

const AnalyticsStatCards: React.FC<AnalyticsStatCardsProps> = ({
  orders,
  ordersChange,
  grossProfit,
  grossProfitMargin,
  grossProfitChange,
  avgOrder,
  avgOrderChange,
  pickupRate,
  pickupRateChange,
}) => {

  const StatCard = ({ icon, label, value, change, isPositive = true, subValue, isLast = false }: any) => (
    <View style={[s.card, !isLast && { marginRight: 8 }]}>
      <View style={s.labelRow}>
        <Feather name={icon} size={13} color="#9CA3AF" />
        <Text style={s.label}>{label}</Text>
      </View>
      <Text style={s.value}>{value}</Text>
      {subValue ? <Text style={s.subValue}>{subValue}</Text> : null}
      <View style={s.changeRow}>
        {isPositive ? (
          <Feather name="arrow-up-right" size={10} color="#00C853" />
        ) : null}
        <Text style={[s.changeText, { color: isPositive ? '#00C853' : '#9CA3AF' }]}>
          {change}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      <View style={s.row}>
        <StatCard
          icon="box"
          label="ORDERS"
          value={orders}
          change={ordersChange}
        />
        <StatCard
          icon="dollar-sign"
          label="GROSS PROFIT"
          value={grossProfit}
          subValue={`${grossProfitMargin} margin`}
          change={grossProfitChange}
          isLast
        />
      </View>

      <View style={s.row}>
        <StatCard
          icon="tag"
          label="AVG. ORDER"
          value={avgOrder}
          change={avgOrderChange}
        />
        <StatCard
          icon="users"
          label="PICKUP RATE"
          value={pickupRate}
          change={pickupRateChange}
          isPositive={pickupRateChange !== 'No change'}
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
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: { fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.5 },
  value: { fontSize: 18, fontWeight: '900', color: '#111', marginTop: 6 },
  subValue: { fontSize: 10, color: '#00C853', fontWeight: '600', marginTop: 1 },
  changeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 2 },
  changeText: { fontSize: 10, fontWeight: '600' },
});

export default AnalyticsStatCards;