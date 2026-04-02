// components/search/RecentSearches.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
interface RecentSearchesProps {
    items: string[];
    onSelect: (term: string) => void;
    onRemove: (term: string) => void;
    onClearAll: () => void;
}

const RecentSearches = ({
    items,
    onSelect,
    onRemove,
    onClearAll,
}: RecentSearchesProps) => {
    if (items.length === 0) return null;

    return (
        <View style={{ marginTop: 28 }}>
            {/* Section header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "700",
                        color: "#0F0F0F",
                        letterSpacing: -0.3,
                    }}
                >
                    Recent
                </Text>
                <TouchableOpacity onPress={onClearAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#8A8A9A",
                        }}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Items */}
            {items.map((term) => (
                <View
                    key={term}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 13,
                        borderBottomWidth: 1,
                        borderBottomColor: "#F0F0F5",
                    }}
                >
                    {/* Left — clock icon */}
                    <Feather name="clock" size={24} color="black" />

                    {/* Term */}
                    <TouchableOpacity
                        onPress={() => onSelect(term)}
                        activeOpacity={0.6}
                        style={{ flex: 1 }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "500",
                                color: "#1A1A2E",
                                letterSpacing: -0.1,
                            }}
                        >
                            {`  ${term}`}
                        </Text>
                    </TouchableOpacity>

                    {/* Right — remove */}
                    <TouchableOpacity
                        onPress={() => onRemove(term)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Feather name="x" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default RecentSearches;