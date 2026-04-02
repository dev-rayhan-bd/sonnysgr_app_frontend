// components/map/MapSearchBar.tsx
import React from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Store } from "@/services/hooks/map/useMap";

const GREEN = "#22C55E";

interface MapSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onFilterPress: () => void;
  onLocationPress: () => void;
  onSelectSuggestion: (store: Store) => void;  
  suggestions: Store[];                          // 👈 new
  activeFilterCount?: number;
  isFetchingLocation?: boolean;
  placeholder?: string;
}

const MapSearchBar = ({
  value,
  onChangeText,
  onClear,
  onFilterPress,
  onLocationPress,
  onSelectSuggestion,
  suggestions = [],
  activeFilterCount = 0,
  isFetchingLocation = false,
  placeholder = "Search stores, brands...",
}: MapSearchBarProps) => {
  const hasValue = value.length > 0;
  const hasFilters = activeFilterCount > 0;
  const showSuggestions = hasValue && suggestions.length > 0;

  return (
    <View>
      {/* Search bar row */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: showSuggestions ? 14 : 14,
            paddingHorizontal: 14,
            height: 52,
            borderWidth: 1.5,
            borderColor: hasValue ? GREEN : hasFilters ? GREEN : "transparent",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Feather
            name="search"
            size={18}
            color="#8A8A9A"
            style={{ marginRight: 10 }}
          />

          <TextInput
            style={{
              flex: 1,
              color: "#0F0F0F",
              fontSize: 15,
              fontWeight: "400",
              height: "100%",
            }}
            placeholder={placeholder}
            placeholderTextColor="#AFAFBF"
            value={value}
            onChangeText={onChangeText}
            returnKeyType="search"
            cursorColor={GREEN}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {hasValue ? (
            <TouchableOpacity
              onPress={onClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#C8C8D8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="x" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onFilterPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ position: "relative" }}
            >
              <Feather
                name="sliders"
                size={18}
                color={hasFilters ? GREEN : "#8A8A9A"}
              />
              {hasFilters && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
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
          )}
        </View>

        {/* Location button */}
        <TouchableOpacity
          onPress={onLocationPress}
          activeOpacity={0.8}
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {isFetchingLocation ? (
            <ActivityIndicator size="small" color={GREEN} />
          ) : (
            <Feather name="navigation" size={20} color="#0F0F0F" />
          )}
        </TouchableOpacity>
      </View>

      {/* ── Suggestions dropdown ── */}
      {showSuggestions && (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            marginTop: 8,
            // only the search bar width, not including location button
            marginRight: 62,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => onSelectSuggestion(item)}
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderTopColor: "#F0F0F5",
                  gap: 12,
                }}
              >
                {/* Icon */}
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    backgroundColor: "#F5F5F7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="map-pin" size={15} color={GREEN} />
                </View>

                {/* Text */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#0F0F0F",
                      marginBottom: 2,
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#8A8A9A" }}
                    numberOfLines={1}
                  >
                    {item.tag} · {item.distance}
                  </Text>
                </View>

                {/* Arrow */}
                <Feather name="arrow-up-left" size={16} color="#C8C8D8" />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default MapSearchBar;