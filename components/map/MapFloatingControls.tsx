// components/map/MapFloatingControls.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const DARK = "#0F0F0F";
const GREEN = "#22C55E";

interface SearchThisAreaPillProps {
  onPress: () => void;
  top: number;
}

export const SearchThisAreaPill = ({ onPress, top }: SearchThisAreaPillProps) => (
  <View style={{ position: "absolute", top, left: 0, right: 0, alignItems: "center", zIndex: 5 }}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        paddingHorizontal: 14,
        paddingVertical: 9,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Feather name="rotate-cw" size={13} color={DARK} />
      <Text style={{ fontSize: 12, fontWeight: "700", color: DARK }}>Search this area</Text>
    </TouchableOpacity>
  </View>
);

interface StoreCountPillProps {
  count: number;
  onListView: () => void;
  bottom: number;
}

export const StoreCountPill = ({ count, onListView, bottom }: StoreCountPillProps) => (
  <View style={{ position: "absolute", left: 16, bottom, zIndex: 5 }}>
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "800", color: DARK, marginBottom: 4 }}>
        {count} stores
      </Text>
      <TouchableOpacity
        onPress={onListView}
        activeOpacity={0.7}
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Feather name="list" size={13} color={GREEN} />
        <Text style={{ fontSize: 12, fontWeight: "700", color: GREEN }}>List view</Text>
      </TouchableOpacity>
    </View>
  </View>
);

interface LocateButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  bottom: number;
}

export const LocateButton = ({ onPress, isLoading, bottom }: LocateButtonProps) => (
  <View style={{ position: "absolute", right: 16, bottom, zIndex: 5 }}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: GREEN,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Feather name="navigation" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);