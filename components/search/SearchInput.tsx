// components/search/SearchInput.tsx
import React from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onClear: () => void;
  onFilterPress: () => void;
  activeFilterCount?: number;
  isFetching?: boolean;
  placeholder?: string;
}

const GREEN = "#22C55E";

const SearchInput = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  onFilterPress,
  activeFilterCount = 0,
  isFetching = false,
  placeholder = "Sneakers, clothing, brands, SKU...",
}: SearchInputProps) => {
  const hasValue = value.length > 0;
  const hasFilters = activeFilterCount > 0;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F7",
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        borderWidth: 1.5,
        // green border when typing, green when filters active, transparent otherwise
        borderColor: hasValue ? GREEN : hasFilters ? GREEN : "transparent",
      }}
    >
      {/* Left — search / spinner */}
      {isFetching ? (
        <ActivityIndicator
          size="small"
          color="#8A8A9A"
          style={{ marginRight: 10 }}
        />
      ) : (
        <Feather
          name="search"
          size={20}
          color="#8A8A9A"
          style={{ marginRight: 10 }}
        />
      )}

      {/* Text input */}
      <TextInput
        style={{
          flex: 1,
          color: "#0F0F0F",
          fontSize: 16,
          fontWeight: "400",
          height: "100%",
        }}
        placeholder={placeholder}
        placeholderTextColor="#AFAFBF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        cursorColor={GREEN}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Right — clear X or filter icon */}
      {hasValue ? (
        <TouchableOpacity
          onPress={onClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#C8C8D8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="x" size={13} color="#ffffff" />
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
            size={20}
            color={hasFilters ? GREEN : "#8A8A9A"}
          />
          {hasFilters && (
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: GREEN,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 9, fontWeight: "700" }}>
                {activeFilterCount > 9 ? "9+" : activeFilterCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
