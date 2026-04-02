// components/map/StoreMarker.tsx
import { Store } from "@/services/hooks/map/useMap";
import React from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";

const GREEN = "#22C55E";

interface StoreMarkerProps {
    store: Store;
    isSelected: boolean;
    onPress: (store: Store) => void;
}

const StoreMarker = ({ store, isSelected, onPress }: StoreMarkerProps) => {
    return (
        <Marker
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            onPress={() => onPress(store)}
            tracksViewChanges={false}
        >
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? GREEN : "#E0E0EA",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0.15 : 0.08,
                    shadowRadius: 6,
                    elevation: isSelected ? 6 : 3,
                    alignItems: "flex-start",
                    minWidth: 120,
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#0F0F0F",
                        marginBottom: 3,
                    }}
                >
                    {store.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <View
                        style={{
                            width: 7,
                            height: 7,
                            borderRadius: 4,
                            backgroundColor: GREEN,
                        }}
                    />
                    <Text style={{ fontSize: 12, color: "#3A3A4A", fontWeight: "500" }}>
                        {store.stock} in stock
                    </Text>
                </View>
            </View>

            {/* Tail / pointer */}
            <View
                style={{
                    alignSelf: "center",
                    width: 0,
                    height: 0,
                    borderLeftWidth: 6,
                    borderRightWidth: 6,
                    borderTopWidth: 7,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderTopColor: isSelected ? GREEN : "#E0E0EA",
                    marginTop: -1,
                }}
            />
        </Marker>
    );
};

export default StoreMarker;