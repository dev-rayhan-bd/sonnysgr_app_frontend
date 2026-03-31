import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { AdBanner } from '@/services/hooks/discover/useDiscover';

interface DiscoverAdProps {
  ad: AdBanner;
  onPress?: (ad: AdBanner) => void;
}

/**
 * Figma exact (Image 2 — the "DROPPING SOON" variant):
 * - Dark card (#0D1B14 / very dark green-black) with borderRadius 18
 * - "DROPPING SOON" small gray pill/text centered at top
 * - Full-width sneaker image fills the card height
 * - Bottom overlay: brand+name left in white, date below in gray
 * - CTA button: green pill bottom-left "Notify Me"
 *
 * Image 1 variant (AD Adidas / Get By 70%):
 * - Same dark card
 * - "AD  Adidas" small row top-left
 * - Product name + date left
 * - CTA "Get By 70% 🔥"
 * - Image on RIGHT side (partial)
 *
 * We implement BOTH variants via ctaVariant prop from the hook.
 */
export const DiscoverAd: React.FC<DiscoverAdProps> = ({ ad, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (ad.ctaVariant === 'discount') {
    return <AdDiscount ad={ad} onPress={onPress} pulseAnim={pulseAnim} />;
  }
  return <AdDropping ad={ad} onPress={onPress} pulseAnim={pulseAnim} />;
};

// ── Variant A: "DROPPING SOON" full-image card ──────────────────────────
const AdDropping: React.FC<{
  ad: AdBanner;
  onPress?: (ad: AdBanner) => void;
  pulseAnim: Animated.Value;
}> = ({ ad, onPress, pulseAnim }) => (
  <TouchableOpacity
    style={styles.droppingCard}
    onPress={() => onPress?.(ad)}
    activeOpacity={0.92}
  >
    {/* Background image fills card */}
    <Image source={{ uri: ad.image }} style={styles.droppingImage} resizeMode="cover" />

    {/* Dark overlay gradient sim */}
    <View style={styles.droppingOverlay} />

    {/* "DROPPING SOON" top center */}
    <View style={styles.droppingTagWrap}>
      <Text style={styles.droppingTag}>{ad.tag}</Text>
    </View>

    {/* Bottom content */}
    <View style={styles.droppingBottom}>
      <Text style={styles.droppingBrand}>{ad.brandLabel}</Text>
      <Text style={styles.droppingName}>{ad.productName}</Text>
      <Text style={styles.droppingDate}>{ad.releaseDate}</Text>

      <Animated.View style={{ transform: [{ scale: pulseAnim }], alignSelf: 'flex-start', marginTop: 10 }}>
        <View style={styles.ctaGreen}>
          <Text style={styles.ctaText}>{ad.ctaLabel}</Text>
        </View>
      </Animated.View>
    </View>
  </TouchableOpacity>
);

// ── Variant B: "AD Adidas / Get By 70%" side-image card ─────────────────
const AdDiscount: React.FC<{
  ad: AdBanner;
  onPress?: (ad: AdBanner) => void;
  pulseAnim: Animated.Value;
}> = ({ ad, onPress, pulseAnim }) => (
  <TouchableOpacity
    style={styles.discountCard}
    onPress={() => onPress?.(ad)}
    activeOpacity={0.92}
  >
    {/* Left content */}
    <View style={styles.discountLeft}>
      <View style={styles.adRow}>
        <View style={styles.adLabel}>
          <Text style={styles.adLabelText}>AD</Text>
        </View>
        <Text style={styles.adBrand}>{ad.brandLabel}</Text>
      </View>

      <Text style={styles.discountName}>{ad.productName}</Text>
      <Text style={styles.discountDate}>{ad.releaseDate}</Text>

      <Animated.View style={{ transform: [{ scale: pulseAnim }], alignSelf: 'flex-start', marginTop: 12 }}>
        <View style={styles.ctaGreen}>
          <Text style={styles.ctaText}>{ad.ctaLabel}</Text>
        </View>
      </Animated.View>
    </View>

    {/* Right image */}
    <View style={styles.discountImgWrap}>
      <Image source={{ uri: ad.image }} style={styles.discountImg} resizeMode="cover" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ── Dropping card
  droppingCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden',
    height: 180,
    position: 'relative',
    backgroundColor: '#0D1B14',
  },
  droppingImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  droppingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  droppingTagWrap: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  droppingTag: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
  },
  droppingBottom: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  droppingBrand: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  droppingName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    marginTop: 2,
  },
  droppingDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  // ── Discount card
  discountCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0D1B14',
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    minHeight: 140,
  },
  discountLeft: {
    flex: 1,
  },
  adRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  adLabel: {
    backgroundColor: '#00C853',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  adLabelText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  adBrand: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
  },
  discountName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: 21,
  },
  discountDate: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 3,
  },
  discountImgWrap: {
    width: 110,
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: '#1a3322',
  },
  discountImg: {
    width: '100%',
    height: '100%',
  },

  // ── Shared CTA
  ctaGreen: {
    backgroundColor: '#00C853',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
});

export default DiscoverAd;