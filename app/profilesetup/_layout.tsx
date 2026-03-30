import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
export default function ProfileSetupLayout() {

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </SafeAreaProvider>
    );
}