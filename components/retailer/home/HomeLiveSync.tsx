import React from 'react';
import { View, Text } from 'react-native';

export interface SyncStatus {
  isSynced: boolean;
  lastSyncedLabel: string;
  activePairs: number;
  syncErrors: number;
}

interface HomeLiveSyncProps {
  syncStatus: SyncStatus;
}

const HomeLiveSync: React.FC<HomeLiveSyncProps> = ({ syncStatus }) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      borderTopWidth: 1, borderTopColor: '#F3F4F6',
      paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14,
    }}>
      {/* Top row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{
            width: 8, height: 8, borderRadius: 4,
            backgroundColor: syncStatus.isSynced ? '#00C853' : '#EF4444',
          }} />
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#111' }}>Live Sync</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#D1D5DB' }}>•</Text>
        <Text style={{
          fontSize: 12, fontWeight: '500',
          color: syncStatus.isSynced ? '#00C853' : '#EF4444',
        }}>
          {syncStatus.lastSyncedLabel}
        </Text>
      </View>

      {/* Bottom row */}
      <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>
        {syncStatus.activePairs} pairs active · {syncStatus.syncErrors} sync errors
      </Text>
    </View>
  );
};

export default HomeLiveSync;