import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface HomeHeaderProps {
  notificationCount?: number;
  avatarLabel?: string;
  onBellPress?: () => void;
  onAvatarPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  notificationCount = 0,
  avatarLabel = 'SK',
  onBellPress,
  onAvatarPress,
}) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 10,
      backgroundColor: '#fff',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#111' }}>GO </Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#00C853' }}>SNKR</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <TouchableOpacity onPress={onBellPress}>
          <Feather name="bell" size={22} color="#111" />
          {notificationCount > 0 && (
            <View style={{
              position: 'absolute', top: -4, right: -5,
              backgroundColor: '#EF4444', borderRadius: 10,
              width: 15, height: 15, alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>
                {notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onAvatarPress} style={{
          backgroundColor: '#00C853', borderRadius: 16,
          width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{avatarLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;