import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
const ACTIVE_COLOR = '#22C55E';
const INACTIVE_COLOR = '#94a3b8';
const BAR_BG = '#FFFFFF';

/**
 * Route-based config (robust, order-independent)
 */
const tabMap: Record<
  string,
  { label: string; icon: any; activeIcon: any }
> = {
  dashboard: {
    label: 'Dashboard',
    icon: 'home-variant-outline', // Clean geometric house outline
    activeIcon: 'home-variant',    // Solid house for active state
  },
  listing: {
    label: 'Listings',
    icon: 'package-variant-closed', // Box/Cube icon as seen in the image
    activeIcon: 'package-variant-closed',
  },
  requests: {
    label: 'Requests',
    icon: 'tray-full', // Tray/Inbox style icon shown in the middle
    activeIcon: 'tray-full',
  },
  messages: {
    label: 'Messages',
    icon: 'chat-outline', // Clean square speech bubble
    activeIcon: 'chat',
  },
  profile: {
    label: 'Profile',
    icon: 'account-outline', // Standard outline person icon
    activeIcon: 'account',
  },
};
const AnimatedTabItem = ({
  isFocused,
  navigation,
  route,
}: any) => {
  const config = tabMap[route.name];
  if (!config) return null;

  const iconScale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    iconScale.value = withSpring(isFocused ? 1.1 : 1);
  }, [isFocused]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route.name)}
      style={styles.tabItem}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <Animated.View style={iconStyle}>
          <MaterialCommunityIcons
            name={isFocused ? config.activeIcon : config.icon}
            size={26}
            color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
          />
        </Animated.View>
      </View>

      <Text
        style={[
          styles.label,
          {
            color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
            fontWeight: isFocused ? '700' : '500',
          },
        ]}
      >
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, navigation }: any) => {
  const { width } = useWindowDimensions();
  const TAB_BAR_WIDTH = width;

  return (
    <View style={styles.tabBarContainer}>
      <View style={[styles.tabBarInner, { width: TAB_BAR_WIDTH }]}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          return (
            <AnimatedTabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,                          // flush to bottom
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: BAR_BG,
    height: 75,
    borderRadius: 0,                    // no rounding — flat/square
    borderWidth: 0,
    borderTopWidth: 1,                  // only top border
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },   // shadow upward
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',                      // full width, not 95%
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // safe area on iOS
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconWrapper: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="listing" />
      <Tabs.Screen name="requests" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}