import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DiscoverHeaderProps {
  notificationCount?: number;
  location?: string;
  radius?: string;
  onAvatarPress?: () => void;
  onLocationPress?: () => void;
}

export const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  notificationCount = 2,
  location = 'Novi, MI',
  radius = '10 mi',
  onAvatarPress,
  onLocationPress,
}) => {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/screens/discover/notificationsScreen');
  };

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 54 : 36,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      }}
    >
      {/* Logo row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 24, fontWeight: '900' }}>
          <Text style={{ color: '#000' }}>GO</Text>
          <Text style={{ color: '#22C55E' }}>SNKR</Text>
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <TouchableOpacity
            onPress={handleNotificationPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}
          >
            <Ionicons name="notifications-outline" size={24} color="#1C1C1E" />
            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  backgroundColor: '#EF4444',
                  borderWidth: 1.5,
                  borderColor: '#fff',
                }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.75}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 1.5,
                borderColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F3F4F6',
              }}
            >
              <Ionicons name="person-outline" size={16} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location row */}
      <TouchableOpacity
        onPress={onLocationPress}
        activeOpacity={0.7}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 }}
      >
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151' }}>{location}</Text>
        <Feather name="chevron-down" size={14} color="#374151" />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, gap: 4 }}>
          <Ionicons name="navigate-circle-outline" size={14} color="#9CA3AF" />
          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{radius}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverHeader;