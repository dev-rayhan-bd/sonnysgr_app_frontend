import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCountdown } from '@/services/hooks/retailer/refund/useClaims';
import type {
  NotificationItem,
  NotificationType,
  NotificationAction,
} from '@/services/hooks/retailer/home/useNotifications';

// ─── Per-type theme ───────────────────────────────────────────────────────────

interface Theme {
  icon: React.ComponentProps<typeof Feather>['name'];
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
}

const NEUTRAL = { cardBg: '#FFFFFF', cardBorder: '#E5E7EB' };

const THEMES: Record<NotificationType, Theme> = {
  refund: {
    icon: 'corner-up-left',
    iconColor: '#DC2626',
    iconBg: '#FECACA',
    cardBg: '#FEF2F2',
    cardBorder: '#FCA5A5',
  },
  stock: {
    icon: 'alert-triangle',
    iconColor: '#D97706',
    iconBg: '#FDE68A',
    cardBg: '#FFFBEB',
    cardBorder: '#FCD34D',
  },
  order: { icon: 'shopping-bag', iconColor: '#16A34A', iconBg: '#DCFCE7', ...NEUTRAL },
  hold: { icon: 'lock', iconColor: '#16A34A', iconBg: '#DCFCE7', ...NEUTRAL },
  pickup: { icon: 'package', iconColor: '#374151', iconBg: '#F3F4F6', ...NEUTRAL },
  sync: { icon: 'refresh-cw', iconColor: '#374151', iconBg: '#F3F4F6', ...NEUTRAL },
};

// ─── Countdown pill ───────────────────────────────────────────────────────────

const CountdownPill: React.FC<{ deadlineIso: string }> = ({ deadlineIso }) => {
  const { h, m, expired } = useCountdown(deadlineIso);
  if (expired) return null;

  return (
    <View style={styles.countdown}>
      <Feather name="clock" size={12} color="#DC2626" />
      <Text style={styles.countdownText}>
        {parseInt(h, 10)}h {m}m left
      </Text>
    </View>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

interface Props {
  item: NotificationItem;
  onCardPress: (item: NotificationItem) => void;
  onActionPress: (item: NotificationItem, action: NotificationAction) => void;
}

export const NotificationCard: React.FC<Props> = ({ item, onCardPress, onActionPress }) => {
  const theme = THEMES[item.type];
  const hasActions = !!item.primary;
  const isOutline = item.primary?.variant === 'outline';
  // Standalone location row is an urgent-card affordance only (see design).
  const showLocation = item.section === 'Needs attention' && !!item.location && !item.meta;

  return (
    <View style={styles.wrapper}>
      {/* Left gutter keeps every card aligned whether or not it has a dot */}
      <View style={styles.dotGutter} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onCardPress(item)}
        style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
      >
        {/* Unread dot — pinned to the card's top-left edge, as in the design */}
        {item.unread && <View style={styles.dot} />}

        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: theme.iconBg }]}>
            <Feather name={theme.icon} size={20} color={theme.iconColor} />
          </View>

          <View style={styles.body}>
            {/* Title + time */}
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            <Text style={styles.subtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>

            {/* Meta line (customer · pickup · store) */}
            {!!item.meta && (
              <View style={styles.metaRow}>
                <Feather name="user" size={12} color="#6B7280" />
                <Text style={styles.metaText} numberOfLines={1}>
                  {item.meta}
                </Text>
              </View>
            )}

            {/* Location + countdown row */}
            {showLocation || !!item.deadlineIso ? (
              <View style={styles.metaRow}>
                {showLocation && (
                  <>
                    <Feather name="map-pin" size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{item.location}</Text>
                  </>
                )}
                {!!item.deadlineIso && <CountdownPill deadlineIso={item.deadlineIso} />}
              </View>
            ) : null}
          </View>

        </View>

        {/* Chevron — vertically centred on the card, does not consume row width */}
        <Feather name="chevron-right" size={20} color="#6B7280" style={styles.chevron} />

        {/* Actions */}
        {hasActions && (
          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onActionPress(item, item.primary!)}
              style={isOutline ? styles.btnOutline : styles.btnPrimary}
            >
              <Text style={isOutline ? styles.btnOutlineText : styles.btnPrimaryText}>
                {item.primary!.label}
              </Text>
            </TouchableOpacity>

            {!!item.secondary && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onActionPress(item, item.secondary!)}
                style={styles.btnGhost}
              >
                <Text style={styles.btnGhostText}>{item.secondary.label}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationCard;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  dotGutter: { width: 16 },
  dot: {
    position: 'absolute',
    top: 12,
    left: -13,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C853',
  },

  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginRight: 16,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, marginLeft: 12, paddingRight: 18 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { flexShrink: 1, fontSize: 13.5, fontWeight: '800', color: '#0A0A0A' },
  time: { fontSize: 11.5, color: '#9CA3AF', marginRight: -18 },
  subtitle: { fontSize: 12.5, color: '#4B5563', marginTop: 3, lineHeight: 17 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  metaText: { fontSize: 12, color: '#6B7280', flexShrink: 1 },

  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEE2E2',
  },
  countdownText: { fontSize: 11.5, fontWeight: '700', color: '#DC2626' },

  chevron: { position: 'absolute', right: 10, top: '38%' },

  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 14 },
  btnPrimary: {
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  btnOutline: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: { color: '#111', fontSize: 13, fontWeight: '700' },
  btnGhost: { paddingVertical: 6, paddingHorizontal: 2 },
  btnGhostText: { color: '#111', fontSize: 13, fontWeight: '600' },
});