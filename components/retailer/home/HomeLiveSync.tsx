import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface SyncStatus {
  isSynced: boolean;
  lastSyncedLabel: string;
  activePairs: number;
  syncErrors: number;
}

interface HomeLiveSyncProps {
  syncStatus: SyncStatus;
  onViewStatus?: () => void;
}

const HomeLiveSync: React.FC<HomeLiveSyncProps> = ({ syncStatus, onViewStatus }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 14,
        marginBottom: 14,
        backgroundColor: '#F0FDF4',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
        <View style={{
          width: 8, height: 8, borderRadius: 4,
          backgroundColor: syncStatus.isSynced ? '#00C853' : '#EF4444',
        }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#111' }}>
            Live inventory sync
          </Text>
          <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }} numberOfLines={1}>
            {syncStatus.activePairs} products active · {syncStatus.syncErrors > 0
              ? `${syncStatus.syncErrors} sync errors`
              : 'No sync errors'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onViewStatus}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginLeft: 8 }}
      >
        <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600' }}>View status</Text>
        <Feather name="chevron-right" size={12} color="#00C853" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeLiveSync;