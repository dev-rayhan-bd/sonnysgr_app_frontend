// app/_layout.tsx
import "../global.css";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ShowToast from "@/components/shared/ShowToast";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <ShowToast />
    </SafeAreaProvider>
  );
}