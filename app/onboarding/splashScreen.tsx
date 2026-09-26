/**
 * SplashScreen.tsx
 * Simple, static splash screen — logo, tagline, and a progress bar.
 * No blinking, no sparks, no squeeze animation.
 */

import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'

const { width } = Dimensions.get('window')

const LOAD_DURATION = 1400 // ms — how long the progress bar takes to fill
const HOLD_AFTER    = 200
  // ms — small pause once full before navigating

interface Props {
  nextRoute?: string
}

const SplashScreen: React.FC<Props> = ({
  nextRoute = '/onboarding/slidingScreen',
}) => {
  const router = useRouter()
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: LOAD_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // width interpolation isn't supported by the native driver
    }).start(() => {
      setTimeout(() => {
        router.replace(nextRoute as never)
      }, HOLD_AFTER)
    })
  }, [])

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ── Wordmark + tagline, centered ─────────────────────── */}
      <View style={s.center}>
        <Text style={s.logoGo}>GO</Text>
        <Text style={s.logoSnkr}>SNKR</Text>
        <Text style={s.tagline}>Your size. Nearby. Now.</Text>
      </View>

      {/* ── Loading bar + status text, near bottom ───────────── */}
      <View style={s.footer}>
        <View style={s.track}>
          <Animated.View style={[s.fill, { width: barWidth }]} />
        </View>
        <Text style={s.statusText}>Finding nearby inventory...</Text>
      </View>
    </View>
  )
}

export default SplashScreen

const s = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: '#000000',
    alignItems:      'center',
    justifyContent:  'center',
  },

  center: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  logoGo: {
    fontSize:      46,
    fontWeight:    '900',
    color:         '#ffffff',
    letterSpacing: 2,
    textAlign:     'center',
    lineHeight:    38,
  },
  logoSnkr: {
    fontSize:      50,
    fontWeight:    '900',
    color:         '#22c55e',
    letterSpacing: 1,
    textAlign:     'center',
    lineHeight:    46,
  },
  tagline: {
    marginTop: 12,
    fontSize:  14,
    color:     '#9ca3af',
    letterSpacing: 0.3,
  },

  footer: {
    position:   'absolute',
    bottom:     64,
    width:      '70%',
    alignItems: 'center',
  },
  track: {
    width:            '100%',
    height:           4,
    borderRadius:     2,
    backgroundColor:  '#3f3f46',
    overflow:         'hidden',
  },
  fill: {
    height:           '100%',
    borderRadius:     2,
    backgroundColor:  '#22c55e',
  },
  statusText: {
    marginTop: 14,
    fontSize:  13,
    color:     '#a1a1aa',
  },
})