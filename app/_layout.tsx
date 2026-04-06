import "../global.css";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import ShowToast from "@/components/shared/ShowToast";
import { Stack } from "expo-router";

// Suppress strict mode Reanimated warning
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <ShowToast />
    </SafeAreaProvider>
  );
}