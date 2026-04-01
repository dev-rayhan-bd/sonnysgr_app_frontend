// components/search/SearchResults.tsx
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
interface SearchResultsProps {
  results: any[];
  isFetching: boolean;
  isError: boolean;
  query: string;
  onSelectItem: (item: any) => void;
}

const EmptyState = ({ query }: { query: string }) => (
  <View style={{ alignItems: "center", paddingTop: 48, paddingBottom: 24 }}>
<Feather name="search" size={24} color="black" />
    <Text
      style={{
        marginTop: 12,
        fontSize: 15,
        fontWeight: "600",
        color: "#8A8A9A",
      }}
    >
      No results for "{query}"
    </Text>
    <Text style={{ marginTop: 4, fontSize: 13, color: "#B0B0C0" }}>
      Try a different name or brand.
    </Text>
  </View>
);

const SearchResults = ({
  results,
  isFetching,
  isError,
  query,
  onSelectItem,
}: SearchResultsProps) => {
  if (isFetching) {
    return (
      <View style={{ paddingTop: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0F0F0F" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ paddingTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: "#EF4444" }}>
          Something went wrong. Please try again.
        </Text>
      </View>
    );
  }

  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item._id}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectItem(item)}
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#F0F0F5",
          }}
        >
          {/* Avatar / thumbnail */}
          {item.picture || item.photos?.[0] ? (
            <Image
              source={{ uri: item.picture ?? item.photos[0] }}
              style={{
                width: 44,
                height: 44,
                borderRadius: item.picture ? 22 : 10,
                marginRight: 14,
                backgroundColor: "#F0F0F5",
              }}
            />
          ) : (
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: item.picture !== undefined ? 22 : 10,
                marginRight: 14,
                backgroundColor: "#F0F0F5",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#0F0F0F" }}
              >
                {(item.fullName ?? item.serviceType ?? "?")?.[0]}
              </Text>
            </View>
          )}

          {/* Info */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#0F0F0F",
                letterSpacing: -0.1,
              }}
            >
              {item.fullName ?? item.serviceType}
            </Text>
            <Text style={{ fontSize: 13, color: "#8A8A9A", marginTop: 2 }}>
              {item.email ??
                (item.clientName
                  ? `${item.clientName} • ${new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                  : "")}
            </Text>
          </View>

  <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      )}
    />
  );
};

export default SearchResults;