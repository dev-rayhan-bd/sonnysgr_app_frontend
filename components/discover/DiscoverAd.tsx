import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import { AdBanner } from '@/services/hooks/discover/useDiscover';

const { width: SCREEN_W } = Dimensions.get('window');
// Card width = screen minus horizontal margins (20 each side)
const CARD_W = SCREEN_W - 40;
// Auto-advance interval in ms
const AUTO_SLIDE_MS = 3500;

interface DiscoverAdProps {
  /** ✅ Now accepts AdBanner[] — the type error is gone */
  ads: AdBanner[];
  onPress?: (ad: AdBanner) => void;
}

// ─────────────────────────────────────────────────────────────────────────
export const DiscoverAd: React.FC<DiscoverAdProps> = ({ ads, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList<AdBanner>>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Shared pulse animation (one instance, passed to each card)
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % ads.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, AUTO_SLIDE_MS);
  }, [ads.length]);

  useEffect(() => {
    if (ads.length > 1) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [ads.length, startTimer]);

  // ── Track visible index via viewability ──────────────────────────────
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Reset timer when user swipes manually
  const onScrollBeginDrag = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const onMomentumScrollEnd = useCallback(() => {
    if (ads.length > 1) startTimer();
  }, [ads.length, startTimer]);

  // ── Render each ad card ───────────────────────────────────────────────
  const renderItem = useCallback(
    ({ item }: { item: AdBanner }) => {
      if (item.ctaVariant === 'discount') {
        return (
          <AdDiscount
            ad={item}
            onPress={onPress}
            pulseAnim={pulseAnim}
            cardWidth={CARD_W}
          />
        );
      }
      return (
        <AdDropping
          ad={item}
          onPress={onPress}
          pulseAnim={pulseAnim}
          cardWidth={CARD_W}
        />
      );
    },
    [onPress, pulseAnim]
  );

  const keyExtractor = useCallback((item: AdBanner) => item.id, []);

  if (ads.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={ads}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + 12}   // card + gap so cards peek slightly
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.flatContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollBeginDrag={onScrollBeginDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: CARD_W + 12,
          offset: (CARD_W + 12) * index,
          index,
        })}
      />

      {/* Dot indicators */}
      {ads.length > 1 && (
        <View style={styles.dots}>
          {ads.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

// ─── Variant A: "DROPPING SOON" — full-bleed image card ──────────────────
interface CardProps {
  ad: AdBanner;
  onPress?: (ad: AdBanner) => void;
  pulseAnim: Animated.Value;
  cardWidth: number;
}

const AdDropping: React.FC<CardProps> = ({ ad, onPress, pulseAnim, cardWidth }) => (
  <TouchableOpacity
    style={[styles.droppingCard, { width: cardWidth }]}
    onPress={() => onPress?.(ad)}
    activeOpacity={0.92}
  >
    <Image source={{ uri: ad.image }} style={styles.droppingImage} resizeMode="cover" />
    <View style={styles.droppingOverlay} />

    {/* Tag centered at top */}
    <View style={styles.droppingTagWrap}>
      <Text style={styles.droppingTag}>{ad.tag}</Text>
    </View>

    {/* Content bottom-left */}
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

// ─── Variant B: "AD" side-image card ─────────────────────────────────────
const AdDiscount: React.FC<CardProps> = ({ ad, onPress, pulseAnim, cardWidth }) => (
  <TouchableOpacity
    style={[styles.discountCard, { width: cardWidth }]}
    onPress={() => onPress?.(ad)}
    activeOpacity={0.92}
  >
    {/* Left text */}
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

// ─── Styles ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flatContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Dots
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#00C853',
    borderRadius: 3,
  },

  // ── Dropping variant
  droppingCard: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0D1B14',
    position: 'relative',
  },
  droppingImage: {
    ...StyleSheet.absoluteFillObject,
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

  // ── Discount variant
  discountCard: {
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

  // Shared CTA
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