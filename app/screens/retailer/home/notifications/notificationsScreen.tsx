import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import BaseContainer from '@/components/shared/BaseContainer';
import { NotificationCard } from '@/components/retailer/home/notifications/NotificationCard';
import NotificationFilterChips from '@/components/retailer/home/notifications/NotificationFilterChips';
import LocationDropdown from '@/components/retailer/home/notifications/LocationDropdown';
import {
  useNotifications,
  FILTERS,
  LOCATIONS,
  NotificationItem,
  NotificationAction,
} from '@/services/hooks/retailer/home/useNotifications';

export default function NotificationsScreen() {
  const {
    activeFilter,
    setActiveFilter,
    location,
    setLocation,
    counts,
    sections,
    markAsRead,
    markAllRead,
    resolve,
    hasUnread,
    isEmpty,
  } = useNotifications();

  const navigate = useCallback(
    (route?: string, params?: Record<string, string>) => {
      if (!route) return;
      router.push(params ? { pathname: route as any, params } : (route as any));
    },
    [],
  );

  const handleCardPress = useCallback(
    (item: NotificationItem) => {
      markAsRead(item.id);
      navigate(item.route, item.params);
    },
    [markAsRead, navigate],
  );

  const handleActionPress = useCallback(
    (item: NotificationItem, action: NotificationAction) => {
      markAsRead(item.id);

      // Non-navigation actions (state changes on the order/hold)
      if (action.key === 'confirm-order' || action.key === 'prepare-item') {
        // TODO: call the real mutation here (e.g. useConfirmOrderMutation)
        resolve(item.id);
        return;
      }

      navigate(action.route, action.params);
    },
    [markAsRead, resolve, navigate],
  );

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.container}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={markAllRead}
              disabled={!hasUnread}
              activeOpacity={0.6}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.markRead, !hasUnread && styles.markReadDisabled]}>
                Mark all read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push('/screens/discover/notificationsSettingsScreen' as any)
              }
              activeOpacity={0.6}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="settings" size={22} color="#111" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Location dropdown ── */}
        <View style={styles.locationWrap}>
          <LocationDropdown value={location} options={LOCATIONS} onChange={setLocation} />
        </View>

        {/* ── Filter chips ── */}
        <NotificationFilterChips
          filters={FILTERS}
          active={activeFilter}
          counts={counts}
          onChange={setActiveFilter}
        />

        {/* ── Sections ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isEmpty ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Feather name="bell-off" size={26} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>You're all caught up</Text>
              <Text style={styles.emptySub}>
                New orders, holds, refunds and stock alerts will show up here.
              </Text>
            </View>
          ) : (
            sections.map(section => (
              <View key={section.title}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.data.map(item => (
                  <NotificationCard
                    key={item.id}
                    item={item}
                    onCardPress={handleCardPress}
                    onActionPress={handleActionPress}
                  />
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#0A0A0A', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  markRead: { fontSize: 14, fontWeight: '700', color: '#00C853' },
  markReadDisabled: { color: '#A7E8C3' },

  locationWrap: { paddingHorizontal: 16, paddingBottom: 12 },

  scroll: { flex: 1 },
  scrollContent: { paddingTop: 14, paddingBottom: 120 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0A0A0A',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
  },

  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 40 },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  emptySub: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginTop: 6, lineHeight: 19 },
});