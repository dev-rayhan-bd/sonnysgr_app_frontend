// components/profile/waitlist/SneakerCard.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { WantedPair, SneakerAlert } from '@/services/hooks/profile/useWantedPairs'

// ─── Alert Dot ───────────────────────────────────────────────────────────────

const AlertDot: React.FC<{ active: boolean }> = ({ active }) => (
  <View style={[styles.dot, active ? styles.dotActive : styles.dotInactive]} />
)

// ─── Alert Icon Row ───────────────────────────────────────────────────────────

interface AlertIconRowProps {
  alerts: SneakerAlert
  onToggle: (key: keyof SneakerAlert) => void
  onManageAlerts: () => void
}

const AlertIconRow: React.FC<AlertIconRowProps> = ({ alerts, onToggle, onManageAlerts }) => {
  const items: { key: keyof SneakerAlert; label: string; icon: string }[] = [
    { key: 'inSize',  label: 'In Size', icon: '👟' },
    { key: 'nearby',  label: 'Nearby',  icon: '📍' },
    { key: 'stores',  label: 'Stores',  icon: '🏪' },
    { key: 'price',   label: 'Price',   icon: '💰' },
  ]

  return (
    <View style={styles.alertRow}>
      <View style={styles.alertIcons}>
        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.alertItem}
            onPress={() => onToggle(item.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.alertIcon}>{item.icon}</Text>
            <Text style={styles.alertLabel}>{item.label}</Text>
            <AlertDot active={alerts[item.key]} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onManageAlerts} activeOpacity={0.7}>
        <Text style={styles.manageText}>Tap to manage alerts →</Text>
      </TouchableOpacity>
    </View>
  )
}

// ─── SneakerCard ─────────────────────────────────────────────────────────────

interface SneakerCardProps {
  pair: WantedPair
  /** Tap anywhere on the card row (image + info) */
  onPress: (pair: WantedPair) => void
  /**
   * Tap the green "Available Now · X stores near you" banner.
   * When NOT provided, the banner falls back to onPress.
   */
  onAvailableNowPress?: (pair: WantedPair) => void
  onToggleAlert: (pairId: string, key: keyof SneakerAlert) => void
  onManageAlerts: (pair: WantedPair) => void
}

export const SneakerCard: React.FC<SneakerCardProps> = ({
  pair,
  onPress,
  onAvailableNowPress,
  onToggleAlert,
  onManageAlerts,
}) => {
  const isAvailable = pair.status === 'available'

  // "Available Now" banner handler — uses dedicated prop if provided, else generic onPress
  const handleAvailableBannerPress = () => {
    if (onAvailableNowPress) {
      onAvailableNowPress(pair)
    } else {
      onPress(pair)
    }
  }

  return (
    <View style={styles.card}>
      {/* Top row: thumbnail + info */}
      <TouchableOpacity
        style={styles.cardTop}
        onPress={() => onPress(pair)}
        activeOpacity={0.85}
      >
        {/* Thumbnail */}
        <View style={styles.thumbnail}>
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeBadgeText}>Sz {pair.size}</Text>
          </View>
          {pair.imageUrl ? (
            <Image
              source={{ uri: pair.imageUrl }}
              style={styles.sneakerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.sneakerImagePlaceholder}>
              <Text style={styles.placeholderEmoji}>👟</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.brandText}>{pair.brand}</Text>
          <Text style={styles.nameText}>{pair.name}</Text>
          <Text style={styles.addedText}>Added to Wanted on {pair.addedOn}</Text>
        </View>
      </TouchableOpacity>

      {/* Status Banner */}
      {isAvailable ? (
        /**
         * ✅ Tapping the green "Available Now" banner navigates to JoinWaitlistScreen
         * via the onAvailableNowPress prop passed from WantedPairsScreen.
         */
        <TouchableOpacity
          style={styles.availableBanner}
          onPress={handleAvailableBannerPress}
          activeOpacity={0.85}
        >
          <Text style={styles.availableBannerText}>
            ✓ Available Now · {pair.storesNearby} stores near you
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.watchingBanner}>
          <Text style={styles.watchingText}>🔔 Not in stock near you · Watching...</Text>
        </View>
      )}

      {/* Alert Icon Row */}
      <AlertIconRow
        alerts={pair.alerts}
        onToggle={key => onToggleAlert(pair.id, key)}
        onManageAlerts={() => onManageAlerts(pair)}
      />
    </View>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  sizeBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 1,
  },
  sizeBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  sneakerImage: {
    width: '100%',
    height: '100%',
  },
  sneakerImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 28,
  },
  cardInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  addedText: {
    fontSize: 11,
    color: '#aaa',
  },
  // ── Available banner (green, tappable → navigates) ──
  availableBanner: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    alignItems: 'center',
  },
  availableBannerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  // ── Watching banner (grey, not tappable) ──
  watchingBanner: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  watchingText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  alertIcons: {
    flexDirection: 'row',
    gap: 14,
  },
  alertItem: {
    alignItems: 'center',
    gap: 2,
  },
  alertIcon: {
    fontSize: 16,
  },
  alertLabel: {
    fontSize: 9,
    color: '#888',
    fontWeight: '500',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#22c55e',
  },
  dotInactive: {
    backgroundColor: '#ddd',
  },
  manageText: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
  },
})