// components/map/MapTopBar.tsx
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const GREEN = "#22C55E";
const DARK = "#0F0F0F";

interface MapTopBarProps {
  locationLabel: string;
  onLocationPillPress?: () => void;
  query: string;
  onChangeQuery: (text: string) => void;
  onClear: () => void;
  onFilterPress: () => void;
  activeFilterCount?: number;
  mySizesLabel: string;
  isOpenNow: boolean;
  onToggleOpenNow: () => void;
  radiusLabel: string;
  onRadiusPress: () => void;
}

const MapTopBar = ({
  locationLabel,
  onLocationPillPress,
  query,
  onChangeQuery,
  onClear,
  onFilterPress,
  activeFilterCount = 0,
  mySizesLabel,
  isOpenNow,
  onToggleOpenNow,
  radiusLabel,
  onRadiusPress,
}: MapTopBarProps) => {
  const hasFilters = activeFilterCount > 0;

  return (
    <View style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
      {/* ── Title row ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "800", color: DARK }}>
          Nearby stores
        </Text>
        <TouchableOpacity
          onPress={onLocationPillPress}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: "#F5F5F7",
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          <Feather name="map-pin" size={12} color={GREEN} />
          <Text style={{ fontSize: 12, fontWeight: "700", color: DARK }}>
            {locationLabel}
          </Text>
          <Feather name="chevron-down" size={12} color="#8A8A9A" />
        </TouchableOpacity>
      </View>

      {/* ── Search bar row ── */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F5F7",
            borderRadius: 14,
            paddingHorizontal: 14,
            height: 46,
          }}
        >
          <Feather name="search" size={17} color="#8A8A9A" style={{ marginRight: 10 }} />
          <TextInput
            style={{ flex: 1, color: DARK, fontSize: 14 }}
            placeholder="Search products, brands, stores"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={onChangeQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="x" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={onFilterPress}
          activeOpacity={0.8}
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: "#F5F5F7",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="sliders" size={18} color={hasFilters ? GREEN : DARK} />
          {hasFilters && (
            <View
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 15,
                height: 15,
                borderRadius: 8,
                backgroundColor: GREEN,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 8, fontWeight: "700" }}>
                {activeFilterCount > 9 ? "9+" : activeFilterCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Filter chip row ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, gap: 8 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#EAFBF0",
            borderRadius: 100,
            paddingHorizontal: 12,
            paddingVertical: 7,
          }}
        >
          <Text style={{ fontSize: 12 }}>👟</Text>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#15803D" }}>
            My sizes: {mySizesLabel}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onToggleOpenNow}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: isOpenNow ? DARK : "#F5F5F7",
            borderRadius: 100,
            paddingHorizontal: 12,
            paddingVertical: 7,
          }}
        >
          <Feather name="clock" size={12} color={isOpenNow ? "#fff" : DARK} />
          <Text style={{ fontSize: 12, fontWeight: "700", color: isOpenNow ? "#fff" : DARK }}>
            Open now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onRadiusPress}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#F5F5F7",
            borderRadius: 100,
            paddingHorizontal: 12,
            paddingVertical: 7,
          }}
        >
          <Feather name="navigation" size={12} color={DARK} />
          <Text style={{ fontSize: 12, fontWeight: "700", color: DARK }}>{radiusLabel}</Text>
          <Feather name="chevron-down" size={12} color="#8A8A9A" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MapTopBar;