import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { AdBanner } from '@/services/hooks/discover/useDiscover';

interface DiscoverAdProps {
  ad: AdBanner;
  onPress?: (ad: AdBanner) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DiscoverAd: React.FC<DiscoverAdProps> = ({ ad, onPress }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Shimmer loop on the CTA badge
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Subtle pulse on the CTA
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(ad)}
      activeOpacity={0.92}
    >
      {/* Background dark card */}
      <View style={styles.card}>
        {/* Left content */}
        <View style={styles.leftContent}>
          <View style={styles.adLabelRow}>
            <View style={styles.adLabel}>
              <Text style={styles.adLabelText}>AD</Text>
            </View>
            <Text style={styles.brandName}>{ad.brand}</Text>
          </View>

          <Text style={styles.productTitle}>{ad.title}</Text>
          <Text style={styles.releaseDate}>{ad.subtitle}</Text>

          {/* CTA Badge */}
          <Animated.View
            style={[styles.ctaBadge, { transform: [{ scale: pulseAnim }] }]}
          >
            <Animated.Text style={[styles.ctaText, { opacity: shimmerOpacity }]}>
              {ad.ctaLabel} 🔥
            </Animated.Text>
          </Animated.View>
        </View>

        {/* Right: product image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: ad.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Green glow overlay */}
          <View style={styles.imageGlow} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#00D46A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0F1923',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 130,
    overflow: 'hidden',
  },
  leftContent: {
    flex: 1,
    gap: 4,
  },
  adLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  adLabel: {
    backgroundColor: '#00D46A',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  adLabelText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 0.5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
    lineHeight: 21,
  },
  releaseDate: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    marginTop: 2,
  },
  ctaBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#00D46A',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.2,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 212, 106, 0.12)',
  },
});

export default DiscoverAd;