import { Store } from '@/services/hooks/map/useMap'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StoreProductCard from './StoreProductCard'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const GREEN = '#22C55E'
const TAB_BAR_HEIGHT = 60
const DRAG_HANDLE_HEIGHT = 28
const BUTTON_HEIGHT = 54
const SHEET_VISIBLE = SCREEN_HEIGHT * 0.8

interface StoreBottomSheetProps {
  store: Store | null
  onClose: () => void
  onToggleFollow: (storeId: string) => void
}

const StoreBottomSheet = ({
  store,
  onClose,
  onToggleFollow,
}: StoreBottomSheetProps) => {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const tabBarTotal = TAB_BAR_HEIGHT + insets.bottom
  const sheetFullHeight = SHEET_VISIBLE
  const footerTotal = BUTTON_HEIGHT + 24 + tabBarTotal
  const scrollHeight = SHEET_VISIBLE - DRAG_HANDLE_HEIGHT - footerTotal
  const translateY = useRef(new Animated.Value(sheetFullHeight)).current

  const show = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 340,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [translateY])

  const hide = useCallback(
    (cb?: () => void) => {
      Animated.timing(translateY, {
        toValue: sheetFullHeight,
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(cb)
    },
    [sheetFullHeight, translateY],
  )

  useEffect(() => {
    if (store) {
      show()
    } else {
      hide()
    }
  }, [hide, show, store])

  const sectionLabel = useMemo(() => {
    if (!store) return 'Available Now'

    const hasSneakers = store.products.some((product) => product.productType === 'Sneakers')
    const hasClothing = store.products.some((product) => product.productType === 'Clothing')

    if (hasSneakers && hasClothing) return 'Sneakers & Clothing Nearby'
    if (hasClothing) return 'Clothing Nearby'
    return 'Sneakers Nearby'
  }, [store])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy)
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > SHEET_VISIBLE * 0.3 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: sheetFullHeight,
            duration: 240,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(onClose)
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 240,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  if (!store) return null

  return (
    <>
      <Pressable
        onPress={() => hide(onClose)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SHEET_VISIBLE,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 20,
          transform: [{ translateY }],
        }}
      >
        <View
          {...panResponder.panHandlers}
          style={{
            height: DRAG_HANDLE_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#E0E0EA',
            }}
          />
        </View>

        <ScrollView
          style={{ height: scrollHeight }}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          bounces
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 12,
            }}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '800',
                  color: '#0F0F0F',
                  letterSpacing: -0.5,
                }}
              >
                {store.name}
              </Text>
              <Text style={{ fontSize: 13, color: '#8A8A9A', marginTop: 3 }}>
                {store.distance} • {store.hours}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onToggleFollow(store.id)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderRadius: 100,
                backgroundColor: store.isFollowing ? '#0F0F0F' : '#F5F5F7',
              }}
            >
              {store.isFollowing && (
                <Feather name="check" size={13} color="#fff" />
              )}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: store.isFollowing ? '#FFFFFF' : '#0F0F0F',
                }}
              >
                {store.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#F0F0F5',
              marginHorizontal: 20,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexWrap: 'wrap',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Feather name="map-pin" size={12} color="#8A8A9A" />
              <Text style={{ fontSize: 13, color: '#3A3A4A', fontWeight: '500' }}>
                {store.tag}
              </Text>
            </View>
            <Text style={{ color: '#D0D0DF' }}>•</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: GREEN }}>
              {store.stock} items available
            </Text>
            <Text style={{ color: '#D0D0DF' }}>•</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 13 }}>★</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F0F0F' }}>
                {store.rating}
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#8A8A9A',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {sectionLabel}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
          >
            {store.products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 40,
            paddingTop: 12,
            paddingBottom: tabBarTotal + 24,
            backgroundColor: '#FFFFFF',
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/')}
            activeOpacity={0.85}
            style={{
              height: BUTTON_HEIGHT,
              borderRadius: 100,
              backgroundColor: '#0F0F0F',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
              View full store
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  )
}

export default StoreBottomSheet
