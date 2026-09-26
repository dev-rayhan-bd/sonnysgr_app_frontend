// components/map/StoreMarker.tsx
import { Store } from "@/services/hooks/map/useMap";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";

const GREEN = "#22C55E";
const DARK = "#0F0F0F";

interface StoreMarkerProps {
  store: Store;
  isSelected: boolean;
  onPress: (store: Store) => void;
}

const StoreMarker = ({ store, isSelected, onPress }: StoreMarkerProps) => {
  const pinColor = isSelected ? GREEN : DARK;

  return (
    <Marker
      coordinate={{ latitude: store.latitude, longitude: store.longitude }}
      onPress={() => onPress(store)}
      tracksViewChanges={false}
      anchor={{ x: 0.5, y: 1 }}
    >
      <View style={{ alignItems: "center" }}>
        {/* Label pill — only the selected store gets the expanded pill in the
            reference design; others show just the icon pin. */}
        {isSelected ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: GREEN,
              borderRadius: 100,
              paddingLeft: 6,
              paddingRight: 12,
              paddingVertical: 6,
              gap: 6,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 6,
              marginBottom: 2,
            }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "rgba(255,255,255,0.25)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>
                {store.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "800" }}>
                {store.name}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, fontWeight: "600" }}>
                {store.stock} matches
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 100,
              paddingHorizontal: 10,
              paddingVertical: 6,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 3,
              marginBottom: 2,
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: DARK,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="package" size={9} color="#fff" />
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", color: DARK }}>
                {store.name}
              </Text>
              <Text style={{ fontSize: 10, color: "#8A8A9A", fontWeight: "600" }}>
                {store.stock} matches
              </Text>
            </View>
          </View>
        )}

        {/* Pin dot */}
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: pinColor,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      </View>
    </Marker>
  );
};

export default StoreMarker;