// components/map/StoreBottomSheet.tsx
import { Store } from "@/services/hooks/map/useMap";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StoreProductCard from "./StoreProductCard";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const GREEN = "#22C55E";

// ─── Layout constants ─────────────────────────────────────────────────────────
const TAB_BAR_HEIGHT = 60;       // adjust if your tab bar differs
const DRAG_HANDLE_HEIGHT = 28;   // pill handle area
const BUTTON_HEIGHT = 54;        // "View full store" row
// Sheet visible height — the white card area above the tab bar
const SHEET_VISIBLE = SCREEN_HEIGHT * 0.80;

interface StoreBottomSheetProps {
  store: Store | null;
  onClose: () => void;
  onToggleFollow: (storeId: string) => void;
}

const StoreBottomSheet = ({
  store,
  onClose,
  onToggleFollow,
}: StoreBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Tab bar area total (button + home indicator)
  const tabBarTotal = TAB_BAR_HEIGHT + insets.bottom;

  // Sheet animation height — just the visible content area
  const SHEET_FULL_HEIGHT = SHEET_VISIBLE;

  // Footer total: button + padding top/bottom + tab bar clearance
  const FOOTER_TOTAL = BUTTON_HEIGHT + 24 + tabBarTotal;

  // ScrollView height = visible sheet - drag handle - footer
  const SCROLL_HEIGHT = SHEET_VISIBLE - DRAG_HANDLE_HEIGHT - FOOTER_TOTAL;

  // Animation: starts fully hidden (translateY = SHEET_FULL_HEIGHT)
  const translateY = useRef(new Animated.Value(SHEET_FULL_HEIGHT)).current;

  const show = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 340,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const hide = useCallback(
    (cb?: () => void) => {
      Animated.timing(translateY, {
        toValue: SHEET_FULL_HEIGHT,
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(cb);
    },
    [translateY, SHEET_FULL_HEIGHT],
  );

  useEffect(() => {
    if (store) show();
    else hide();
  }, [store, show, hide]);

  // ── Swipe down to dismiss (drag handle only) ───────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > SHEET_VISIBLE * 0.3 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: SHEET_FULL_HEIGHT,
            duration: 240,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 240,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!store) return null;

  return (
    <>
      {/* ── Full-screen backdrop — tap anywhere above sheet to close ── */}
      <Pressable
        onPress={() => hide(onClose)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* ── Sheet ── */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SHEET_VISIBLE,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 20,
          transform: [{ translateY }],
        }}
      >
        {/* Drag handle — pan responder ONLY here */}
        <View
          {...panResponder.panHandlers}
          style={{
            height: DRAG_HANDLE_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#E0E0EA",
            }}
          />
        </View>

        {/* ── Scrollable body — explicit height so scroll works ── */}
        <ScrollView
          style={{ height: SCROLL_HEIGHT }}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          bounces
          keyboardShouldPersistTaps="handled"
        >
          {/* Store header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 12,
            }}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: "#0F0F0F",
                  letterSpacing: -0.5,
                }}
              >
                {store.name}
              </Text>
              <Text style={{ fontSize: 13, color: "#8A8A9A", marginTop: 3 }}>
                {store.distance} • {store.hours}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onToggleFollow(store.id)}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderRadius: 100,
                backgroundColor: store.isFollowing ? "#0F0F0F" : "#F5F5F7",
              }}
            >
              {store.isFollowing && (
                <Feather name="check" size={13} color="#fff" />
              )}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: store.isFollowing ? "#FFFFFF" : "#0F0F0F",
                }}
              >
                {store.isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: "#F0F0F5",
              marginHorizontal: 20,
            }}
          />

          {/* Meta row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexWrap: "wrap",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Feather name="map-pin" size={12} color="#8A8A9A" />
              <Text style={{ fontSize: 13, color: "#3A3A4A", fontWeight: "500" }}>
                {store.tag}
              </Text>
            </View>
            <Text style={{ color: "#D0D0DF" }}>•</Text>
            <Text style={{ fontSize: 13, fontWeight: "700", color: GREEN }}>
              {store.stock} in stock
            </Text>
            <Text style={{ color: "#D0D0DF" }}>•</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Text style={{ fontSize: 13 }}>⭐</Text>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#0F0F0F" }}>
                {store.rating}
              </Text>
            </View>
          </View>

          {/* Section label */}
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#8A8A9A",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              In Your Size · US 10
            </Text>
          </View>

          {/* Horizontal product scroll */}
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

        {/* ── Footer: pill button floats above the tab bar ── */}
        <View
          style={{
            paddingHorizontal: 40,
            paddingTop: 12,
            paddingBottom: tabBarTotal + 24,
            backgroundColor: "#FFFFFF",
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/")}
            activeOpacity={0.85}
            style={{
              height: BUTTON_HEIGHT,
              borderRadius: 100,
              backgroundColor: "#0F0F0F",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>
              View full store
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default StoreBottomSheet;