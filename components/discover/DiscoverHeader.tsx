import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or use your icon library

interface DiscoverHeaderProps {
  userName: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  userName,
  notificationCount = 2,
  onNotificationPress,
  onAvatarPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>
        <Text style={styles.logoGo}>GO</Text>
        <Text style={styles.logoSnkr}>SNKR</Text>
      </Text>

      {/* Right Actions */}
      <View style={styles.actions}>
        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.notifWrapper}
          onPress={onNotificationPress}
          activeOpacity={0.75}
        >
          <Ionicons name="notifications-outline" size={22} color="#1a1a1a" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={onAvatarPress}
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  logoGo: {
    color: '#1a1a1a',
  },
  logoSnkr: {
    color: '#00D46A', // primary green
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifWrapper: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#00D46A',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  avatarWrapper: {
    padding: 2,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DiscoverHeader;