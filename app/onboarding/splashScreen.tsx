/**
 * SplashScreen.tsx
 * Pure React Native — zero native dependencies.
 */

import React, { useEffect, useRef } from 'react'
import {
  View,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'

// ── Replace with your actual imports ───────────────────────────
import SplashSvg   from '@/assets/images/onboarding/splash.svg'
import ShowPicture from '@/components/shared/ShowPicture'

const { width, height } = Dimensions.get('window')

// ── Geometry ───────────────────────────────────────────────────
const STREAK_W     = width * 0.86
const STREAK_H     = 5
const STREAK_TOP   = height * 0.62
const STREAK_LEFT  = (width - STREAK_W) / 2
const ANGLE        = '-18deg'
const POINT_TRAVEL = STREAK_W * 0.44

// ── Timing (ms) ────────────────────────────────────────────────
const T_LOGO_IN       = 650
const T_SPARK_SHOOT   = 500
const T_SPARK_HOLD    = 300
const T_SPARK_FADE    = 440
const T_SQUEEZE_PRESS = 300
const T_SQUEEZE_HOLD  = 480
const T_SCREEN_OUT    = 560
const SQUEEZE_ITERS   = 3

interface Props {
  nextRoute?: string
}

const SplashScreen: React.FC<Props> = ({
  nextRoute = '/onboarding/slidingScreen',
}) => {
  const router = useRouter()

  // ── Animated values ────────────────────────────────────────
  const logoOpacity   = useRef(new Animated.Value(0)).current
  const logoTint      = useRef(new Animated.Value(0)).current  // 0..1, only during spark
  const squeeze       = useRef(new Animated.Value(1)).current
  const sparkProgress = useRef(new Animated.Value(0)).current
  const sparkAlpha    = useRef(new Animated.Value(0)).current  // master spark visibility
  const pointAlpha    = useRef(new Animated.Value(0)).current
  const pointX        = useRef(new Animated.Value(0)).current
  const screenOpacity = useRef(new Animated.Value(1)).current

  // Pre-computed layer opacities — created ONCE in refs so they
  // never re-instantiate and always track sparkAlpha correctly.
  const bloomOpacity  = useRef(Animated.multiply(sparkAlpha, 0.11)).current
  const coronaOpacity = useRef(Animated.multiply(sparkAlpha, 0.20)).current
  const innerOpacity  = useRef(Animated.multiply(sparkAlpha, 0.40)).current
  const tipOpacity    = useRef(Animated.multiply(sparkAlpha, 0.93)).current

  // ── Spark + logo-flash cycle ──────────────────────────────
  const runSparkCycle = (onDone?: () => void) => {
    // Hard-reset everything to 0 before each cycle
    sparkProgress.setValue(0)
    sparkAlpha.setValue(0)
    pointAlpha.setValue(0)
    pointX.setValue(0)
    logoTint.setValue(0)

    Animated.sequence([
      // Flash point blinks on
      Animated.timing(pointAlpha, {
        toValue: 1, duration: 55, useNativeDriver: true,
      }),

      // Shoot streak + logo flash
      Animated.parallel([
        Animated.timing(sparkProgress, {
          toValue: 1, duration: T_SPARK_SHOOT,
          easing: Easing.out(Easing.exp), useNativeDriver: true,
        }),
        Animated.timing(pointX, {
          toValue: 1, duration: T_SPARK_SHOOT,
          easing: Easing.out(Easing.exp), useNativeDriver: true,
        }),
        Animated.timing(sparkAlpha, {
          toValue: 1, duration: 190, useNativeDriver: true,
        }),
        // Logo tint: ramp up then back to 0 within the shoot window
        Animated.sequence([
          Animated.timing(logoTint, {
            toValue: 1, duration: T_SPARK_SHOOT * 0.4,
            easing: Easing.out(Easing.quad), useNativeDriver: true,
          }),
          Animated.timing(logoTint, {
            toValue: 0, duration: T_SPARK_SHOOT * 0.6,
            easing: Easing.in(Easing.quad), useNativeDriver: true,
          }),
        ]),
      ]),

      Animated.delay(T_SPARK_HOLD),

      // Fade out spark layers AND point together
      Animated.parallel([
        Animated.timing(sparkAlpha, {
          toValue: 0, duration: T_SPARK_FADE, useNativeDriver: true,
        }),
        Animated.timing(pointAlpha, {
          toValue: 0, duration: T_SPARK_FADE * 0.55, useNativeDriver: true,
        }),
        // Guarantee logoTint is 0 after spark (belt + braces)
        Animated.timing(logoTint, {
          toValue: 0, duration: 80, useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        // Hard-reset all spark values to absolute 0 so nothing bleeds
        sparkAlpha.setValue(0)
        sparkProgress.setValue(0)
        pointAlpha.setValue(0)
        logoTint.setValue(0)
      }
      onDone?.()
    })
  }

  // ── Squeeze loop ──────────────────────────────────────────
  const runSqueezeLoop = (onDone?: () => void) => {
    squeeze.setValue(1)
    Animated.loop(
      Animated.sequence([
        Animated.timing(squeeze, {
          toValue: 0.82, duration: T_SQUEEZE_PRESS,
          easing: Easing.inOut(Easing.quad), useNativeDriver: true,
        }),
        Animated.spring(squeeze, {
          toValue: 1, friction: 3, tension: 150, useNativeDriver: true,
        }),
        Animated.delay(T_SQUEEZE_HOLD),
      ]),
      { iterations: SQUEEZE_ITERS },
    ).start(onDone)
  }

  // ── Master sequence ───────────────────────────────────────
  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1, duration: T_LOGO_IN,
      easing: Easing.out(Easing.quad), useNativeDriver: true,
    }).start(() => {
      runSparkCycle(() => {
        runSqueezeLoop(() => {
          runSparkCycle(() => {
            Animated.timing(screenOpacity, {
              toValue: 0, duration: T_SCREEN_OUT,
              easing: Easing.in(Easing.quad), useNativeDriver: true,
            }).start(() => router.replace(nextRoute as never))
          })
        })
      })
    })
  }, [])

  // ── Interpolations ────────────────────────────────────────
  const streakScaleX = sparkProgress.interpolate({
    inputRange: [0, 1], outputRange: [0.001, 1],
  })

  const pointTranslate = pointX.interpolate({
    inputRange: [0, 1], outputRange: [0, POINT_TRAVEL],
  })

  // Logo tint opacity 0→0.22 (green flash) then back to 0
  const logoTintOpacity = logoTint.interpolate({
    inputRange: [0, 1], outputRange: [0, 0.22],
  })

  // Shared streak transform — grows left→right
  const streakTransform = [
    { rotate: ANGLE },
    { translateX: -(STREAK_W / 2) },
    { scaleX: streakScaleX },
    { translateX: STREAK_W / 2 },
  ] as const

  return (
    <Animated.View style={[s.root, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ── Logo ───────────────────────────────────────────── */}
      <Animated.View
        style={[
          s.logoWrap,
          {
            top:       height * 0.28,
            opacity:   logoOpacity,
            transform: [{ scale: squeeze }],
          },
        ]}
      >

          <ShowPicture
            SvgComponent={SplashSvg}
            width={width * 0.72}
            height={height * 0.22}
          />
       
        <View style={s.logoPlaceholder} />

        {/* Green blink — ONLY visible during spark, hard-0 otherwise */}
        <Animated.View
          pointerEvents="none"
          style={[s.logoTint, { opacity: logoTintOpacity }]}
        />
      </Animated.View>

      {/* ═══════════════════════════════════════════════════════
          SPARK LAYERS
          All opacity is driven by sparkAlpha (0 when idle).
          Pre-multiplied refs prevent inline Value leaks.
      ══════════════════════════════════════════════════════ */}

      {/* Layer 1 — Outer bloom  60 px */}
      <Animated.View
        pointerEvents="none"
        style={[s.layer, {
          top:          STREAK_TOP - 27,
          left:         STREAK_LEFT,
          width:        STREAK_W,
          height:       60,
          borderRadius: 30,
          backgroundColor: '#22c55e',
          opacity:      bloomOpacity,
          transform:    streakTransform,
        }]}
      />

      {/* Layer 2 — Mid corona  36 px */}
      <Animated.View
        pointerEvents="none"
        style={[s.layer, {
          top:          STREAK_TOP - 15,
          left:         STREAK_LEFT,
          width:        STREAK_W,
          height:       36,
          borderRadius: 18,
          backgroundColor: '#4ade80',
          opacity:      coronaOpacity,
          transform:    streakTransform,
        }]}
      />

      {/* Layer 3 — Inner corona  18 px */}
      <Animated.View
        pointerEvents="none"
        style={[s.layer, {
          top:          STREAK_TOP - 6,
          left:         STREAK_LEFT,
          width:        STREAK_W,
          height:       18,
          borderRadius: 9,
          backgroundColor: '#86efac',
          opacity:      innerOpacity,
          transform:    streakTransform,
        }]}
      />

      {/* Layer 4 — Bright core line  5 px */}
      <Animated.View
        pointerEvents="none"
        style={[s.layer, {
          top:          STREAK_TOP - STREAK_H / 2,
          left:         STREAK_LEFT,
          width:        STREAK_W,
          height:       STREAK_H,
          borderRadius: STREAK_H / 2,
          overflow:     'hidden',
          opacity:      sparkAlpha,
          transform:    streakTransform,
        }]}
      >
        {/* Dark green tail */}
        <View style={[s.strip, { left: 0,     width: '45%', backgroundColor: '#052e16', opacity: 0.85 }]} />
        {/* Mid */}
        <View style={[s.strip, { left: '30%', width: '40%', backgroundColor: '#16a34a', opacity: 0.95 }]} />
        {/* Bright */}
        <View style={[s.strip, { left: '58%', width: '28%', backgroundColor: '#4ade80'                }]} />
        {/* Near-white */}
        <View style={[s.strip, { left: '78%', width: '16%', backgroundColor: '#dcfce7'                }]} />
        {/* White tip */}
        <View style={[s.strip, { left: '90%', right: 0,     backgroundColor: '#ffffff'                }]} />
      </Animated.View>

      {/* Layer 5 — White-hot tip orb */}
      <Animated.View
        pointerEvents="none"
        style={[s.layer, {
          top:          STREAK_TOP - 10,
          left:         STREAK_LEFT + STREAK_W - 22,
          width:        22,
          height:       22,
          borderRadius: 11,
          backgroundColor: '#ffffff',
          opacity:      tipOpacity,
          shadowColor:  '#86efac',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 14,
          elevation:    16,
          transform:    streakTransform,
        }]}
      />

      {/* ── Flash point (travels along streak) ─────────────── */}
      <Animated.View
        pointerEvents="none"
        style={[s.flashPoint, {
          top:     STREAK_TOP - 8,
          left:    STREAK_LEFT - 9,
          opacity: pointAlpha,
          transform: [
            { rotate: ANGLE },
            { translateX: pointTranslate },
          ],
        }]}
      />

    </Animated.View>
  )
}

export default SplashScreen

// ── Styles ──────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: '#000000',
    alignItems:      'center',
    justifyContent:  'center',
  },

  logoWrap: {
    position:  'absolute',
    alignSelf: 'center',
  },
  logoPlaceholder: {
    width:           width * 0.72,
    height:          height * 0.22,
    backgroundColor: 'transparent',
  },
  logoTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#22c55e',
    borderRadius:    12,
  },

  layer: {
    position: 'absolute',
  },

  strip: {
    position: 'absolute',
    top:      0,
    bottom:   0,
  },

  flashPoint: {
    position:        'absolute',
    width:           18,
    height:          18,
    borderRadius:    9,
    backgroundColor: '#ffffff',
    shadowColor:     '#22c55e',
    shadowOffset:    { width: 0, height: 0 },
    shadowOpacity:   1,
    shadowRadius:    22,
    elevation:       20,
  },
})