import { Store } from '@/services/hooks/map/useMap'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const GREEN = '#22C55E'
const DARK = '#0F0F0F'
const TAB_BAR_HEIGHT = 60
const DRAG_HANDLE_HEIGHT = 24
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.34

interface StoreBottomSheetProps {
  store: Store | null
  onClose: () => void
  onToggleFollow: (storeId: string) => void
}

const StoreBottomSheet = ({ store, onClose, onToggleFollow }: StoreBottomSheetProps) => {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const tabBarTotal = TAB_BAR_HEIGHT + insets.bottom
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current

  const show = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [translateY])

  const hide = useCallback(
    (cb?: () => void) => {
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(cb)
    },
    [translateY],
  )

  useEffect(() => {
    if (store) show()
    else hide()
  }, [hide, show, store])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy)
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > SHEET_HEIGHT * 0.3 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: SHEET_HEIGHT,
            duration: 220,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(onClose)
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  if (!store) return null

  const initials = store.name.slice(0, 1).toUpperCase()
  // Rough "open/closed" derivation from the existing hours string, e.g. "Open until 8 PM"
  const isOpen = store.hours.toLowerCase().startsWith('open')
  const closesLabel = store.hours.replace(/^open until\s*/i, '')

  const handleDirections = useCallback(() => {
    // Navigate to the in-app directions screen instead of opening the
    // external Google Maps app. Store coords are passed as params so the
    // directions screen can build its route/map region from real data.
    router.push({
      pathname: '/screens/order/directionsScreen',
      params: {
        storeId: store.id,
        storeName: store.name,
        latitude: String(store.latitude),
        longitude: String(store.longitude),
      },
    } as any)
  }, [router, store])

  const handleViewInventory = useCallback(() => {
    router.push(`/screens/discover/storeListScreen?storeId=${store.id}` as any)
  }, [router, store])

  return (
    <>
      <Pressable
        onPress={() => hide(onClose)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 20,
          transform: [{ translateY }],
          paddingBottom: tabBarTotal + 20,
        }}
      >
        <View
          {...panResponder.panHandlers}
          style={{ height: DRAG_HANDLE_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#E0E0EA' }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, gap: 14 }}>
          {/* Store logo square */}
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: GREEN,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>{initials}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: DARK }}>{store.name}</Text>
            <Text style={{ fontSize: 13, color: '#8A8A9A', marginTop: 2 }}>
              {store.tag} · {store.distance}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: isOpen ? GREEN : '#EF4444',
                }}
              />
              <Text style={{ fontSize: 13, fontWeight: '700', color: isOpen ? GREEN : '#EF4444' }}>
                {isOpen ? 'Open' : 'Closed'}
              </Text>
              {isOpen && closesLabel ? (
                <Text style={{ fontSize: 13, color: '#8A8A9A' }}>· Closes {closesLabel}</Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => onToggleFollow(store.id)}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather
              name={store.isFollowing ? 'heart' : 'heart'}
              size={20}
              color={store.isFollowing ? GREEN : '#D1D5DB'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: DARK }}>
            {store.stock} products match your sizes
          </Text>
          <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
            Inventory updated 5 min ago
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 18 }}>
          <TouchableOpacity
            onPress={handleViewInventory}
            activeOpacity={0.85}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 14,
              backgroundColor: GREEN,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}>View inventory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDirections}
            activeOpacity={0.85}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: '#E5E7EB',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Feather name="navigation" size={15} color={DARK} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: DARK }}>Directions</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  )
}

export default StoreBottomSheet