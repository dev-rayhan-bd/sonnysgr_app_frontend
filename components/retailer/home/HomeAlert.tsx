import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface StockAlert {
  id: string;
  message: string;
}

interface HomeAlertProps {
  alerts: StockAlert[];
  onView?: (alert: StockAlert) => void;
}

const HomeAlert: React.FC<HomeAlertProps> = ({ alerts, onView }) => {
  if (!alerts.length) return null;

  return (
    <View style={{ paddingHorizontal: 14, paddingBottom: 12, backgroundColor: '#fff' }}>
      {alerts.map(alert => (
        <View
          key={alert.id}
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: '#FFFBEB',
            borderWidth: 1, borderColor: '#FDE68A',
            borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
            <Feather name="alert-triangle" size={15} color="#F59E0B" />
            <Text style={{ fontSize: 12, color: '#92400E', fontWeight: '500', flex: 1 }} numberOfLines={1}>
              {alert.message}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => onView?.(alert)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginLeft: 8 }}
          >
            <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600' }}>View</Text>
            <Feather name="chevron-right" size={12} color="#00C853" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default HomeAlert;