import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type OrderStatus = 'Pickup Ready' | 'Hold Confirmed' | 'Processing' | 'Cancelled';

export interface RecentOrder {
  id: string;
  productName: string;
  size: string;
  customer: string;
  placedAgo: string;
  price: number;
  status: OrderStatus;
  imageUri?: string;
}

interface HomeRecentOrdersProps {
  orders: RecentOrder[];
  onViewAll?: () => void;
  onOrderPress?: (order: RecentOrder) => void;
}

const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  'Pickup Ready':    { bg: '#00C853', text: '#fff',     label: 'Pickup Ready' },
  'Hold Confirmed':  { bg: '#FEF3C7', text: '#92400E',  label: 'Hold Confirmed' },
  'Processing':      { bg: '#F3F4F6', text: '#6B7280',  label: 'Processing' },
  'Cancelled':       { bg: '#FEE2E2', text: '#991B1B',  label: 'Cancelled' },
};

const placeholderBg = ['#F3F4F6', '#DBEAFE', '#FCE7F3'];
const placeholderStroke = ['#9CA3AF', '#93C5FD', '#F9A8D4'];

const HomeRecentOrders: React.FC<HomeRecentOrdersProps> = ({
  orders, onViewAll, onOrderPress,
}) => {
  return (
    <View style={{ paddingHorizontal: 14, paddingTop: 14 }}>
      {/* Section header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 12,
      }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111' }}>Recent Orders</Text>
        <TouchableOpacity onPress={onViewAll}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600' }}>View all</Text>
          <Feather name="arrow-right" size={14} color="#00C853" />
        </TouchableOpacity>
      </View>

      {/* Rows */}
      {orders.map((order, i) => {
        const cfg = statusConfig[order.status];
        const bg = placeholderBg[i % placeholderBg.length];
        const stroke = placeholderStroke[i % placeholderStroke.length];

        return (
          <TouchableOpacity
            key={order.id}
            onPress={() => onOrderPress?.(order)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 1, borderColor: '#E5E7EB',
              borderRadius: 16, padding: 12,
              marginBottom: 8, gap: 10,
            }}
          >
            {/* Thumbnail */}
            {order.imageUri ? (
              <Image
                source={{ uri: order.imageUri }}
                style={{ width: 48, height: 48, borderRadius: 12 }}
                resizeMode="cover"
              />
            ) : (
              <View style={{
                width: 48, height: 48, borderRadius: 12,
                backgroundColor: bg,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Feather name="package" size={20} color={stroke} />
              </View>
            )}

            {/* Details */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#111' }} numberOfLines={1}>
                {order.productName}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                {order.size} · {order.customer}
              </Text>
              <Text style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>
                {order.placedAgo}
              </Text>
            </View>

            {/* Price + status */}
            <View style={{ alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
                ${order.price}
              </Text>
              <View style={{
                backgroundColor: cfg.bg, borderRadius: 20,
                paddingHorizontal: 8, paddingVertical: 3,
              }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: cfg.text }}>
                  {cfg.label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomeRecentOrders;