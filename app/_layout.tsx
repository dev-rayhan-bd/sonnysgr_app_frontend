// app/_layout.tsx
import "../global.css";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ShowToast from "@/components/shared/ShowToast";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (

    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <ShowToast />
    </SafeAreaProvider>

  );
}