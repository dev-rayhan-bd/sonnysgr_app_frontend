// components/search/SearchHeader.tsx
import React from "react";
import { Text, View } from "react-native";

const SearchHeader = () => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#0F0F0F",
          letterSpacing: -0.5,
        }}
      >
        Search
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#8A8A9A",
          marginTop: 2,
          fontWeight: "400",
        }}
      >
        Find your next pair.
      </Text>
    </View>
  );
};

export default SearchHeader;