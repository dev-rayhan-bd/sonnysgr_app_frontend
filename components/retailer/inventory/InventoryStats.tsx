import React from 'react';
import { View, Text } from 'react-native';
import { InventorySummary, SyncInfo } from '@/services/hooks/retailer/inventory/useInventory';

interface InventoryStatsProps {
  summary: InventorySummary;
  syncInfo: SyncInfo;
}

const STAT_ITEMS = (summary: InventorySummary) => [
  { label: 'Active', value: summary.active, color: '#00C853', bg: '#ECFDF3' },
  { label: 'Low Stock', value: summary.lowStock, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Out of Stock', value: summary.outOfStock, color: '#EF4444', bg: '#FEF2F2' },
  { label: 'On Hold', value: summary.onHold, color: '#6B7280', bg: '#F9FAFB' },
];

const InventoryStats: React.FC<InventoryStatsProps> = ({ summary, syncInfo }) => {
  const stats = STAT_ITEMS(summary);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      {/* Stat cards row */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 10,
        gap: 8,
      }}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              backgroundColor: stat.bg,
              borderRadius: 14,
              paddingVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '800', color: stat.color }}>
              {stat.value}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '600', color: '#6B7280', marginTop: 2 }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Sync row */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 8,
        borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{
            width: 7, height: 7, borderRadius: 4,
            backgroundColor: syncInfo.isSynced ? '#00C853' : '#EF4444',
          }} />
          <Text style={{
            fontSize: 11, fontWeight: '500',
            color: syncInfo.isSynced ? '#00C853' : '#EF4444',
          }}>
            {syncInfo.lastSyncedLabel}
          </Text>
        </View>

        {syncInfo.isPosConnected && (
          <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500' }}>
            POS Connected
          </Text>
        )}
      </View>
    </View>
  );
};

export default InventoryStats;