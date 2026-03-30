import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OnboardingLayout() {

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </SafeAreaProvider>
    );
}