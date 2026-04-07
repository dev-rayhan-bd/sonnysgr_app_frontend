import React from 'react';
import { View, Text } from 'react-native';
import { InventorySummary, SyncInfo } from '@/services/hooks/retailer/inventory/useInventory';

interface InventoryStatsProps {
  summary: InventorySummary;
  syncInfo: SyncInfo;
}

const InventoryStats: React.FC<InventoryStatsProps> = ({ summary, syncInfo }) => {
  return (
    <View style={{ backgroundColor: '#fff' }}>

      {/* Counts row */}
      <View style={{
        paddingHorizontal: 16, paddingTop: 4, paddingBottom: 6,
        borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00C853' }}>
            {summary.active} Active
          </Text>
          <Text style={{ fontSize: 12, color: '#D1D5DB' }}>·</Text>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#F59E0B' }}>
            {summary.lowStock} Low Stock
          </Text>
          <Text style={{ fontSize: 12, color: '#D1D5DB' }}>·</Text>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#EF4444' }}>
            {summary.outOfStock} Out of Stock
          </Text>
        </View>
        <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          {summary.onHold} On Hold
        </Text>
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