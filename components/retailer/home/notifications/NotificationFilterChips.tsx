import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import type { NotificationFilter } from '@/services/hooks/retailer/home/useNotifications';

interface Props {
  filters: NotificationFilter[];
  active: NotificationFilter;
  counts: Record<NotificationFilter, number>;
  onChange: (f: NotificationFilter) => void;
}

const NotificationFilterChips: React.FC<Props> = ({ filters, active, counts, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.row}
    style={styles.scroll}
  >
    {filters.map(f => {
      const isActive = f === active;
      const count = counts[f] ?? 0;
      return (
        <TouchableOpacity
          key={f}
          activeOpacity={0.8}
          onPress={() => onChange(f)}
          style={[styles.chip, isActive ? styles.chipActive : styles.chipIdle]}
        >
          <Text style={[styles.label, isActive ? styles.labelActive : styles.labelIdle]}>
            {f}
          </Text>
          {count > 0 && (
            <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeIdle]}>
              <Text style={[styles.badgeText, isActive ? styles.badgeTextActive : styles.badgeTextIdle]}>
                {count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, paddingVertical: 4, gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1,
  },
  chipActive: { backgroundColor: '#0A0A0A', borderColor: '#0A0A0A' },
  chipIdle: { backgroundColor: '#fff', borderColor: '#E5E7EB' },
  label: { fontSize: 13, fontWeight: '700' },
  labelActive: { color: '#fff' },
  labelIdle: { color: '#111' },
  badge: {
    minWidth: 20,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: { backgroundColor: '#00C853' },
  badgeIdle: { backgroundColor: '#F3F4F6' },
  badgeText: { fontSize: 11, fontWeight: '800' },
  badgeTextActive: { color: '#fff' },
  badgeTextIdle: { color: '#374151' },
});

export default NotificationFilterChips;