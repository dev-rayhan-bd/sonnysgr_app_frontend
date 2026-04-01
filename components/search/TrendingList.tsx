// components/search/TrendingList.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
type TrendingItem = {
    id: string | number;
    label: string;
};

interface TrendingListProps {
    items: TrendingItem[];
    onSelect: (label: string) => void;
}

const TrendingList = ({ items, onSelect }: TrendingListProps) => {
    return (
        <View style={{ marginTop: 28 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "700",
                        color: "#0F0F0F",
                        letterSpacing: -0.3,
                    }}
                >
                    Trending Now
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 6 }}>🔥</Text>
            </View>

            {/* Items */}
            {items.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelect(item.label)}
                    activeOpacity={0.6}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 13,
                        borderBottomWidth: 1,
                        borderBottomColor: "#F0F0F5",
                    }}
                >
                    {/* Left — search icon */}
                    <Feather name="search" size={24} color="black" />

                    {/* Label */}
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 15,
                            fontWeight: "500",
                            color: "#1A1A2E",
                            letterSpacing: -0.1,
                        }}
                    >
                        {`   ${item.label}`}
                    </Text>

                    {/* Right — trending arrow */}
                    <Feather name="trending-up" size={24} color="green" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TrendingList;