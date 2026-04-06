import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "GOSNKR",
  slug: "GOSNKR",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "gosnkr",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
  },
  ios: {
    supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY // 👈 iOS
    },
  },
  android: {
    package: "com.ali.gosnkr",
    softwareKeyboardLayoutMode: "pan",
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
      },
    },
  },
  androidStatusBar: {
    barStyle: "dark-content",
  },
  web: { bundler: "metro", output: "static" },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-secure-store",
    "expo-location",
    "expo-sharing",
    [
      "expo-navigation-bar",
      {
        barStyle: "light-content",
      },
    ],
  ],
  experiments: { typedRoutes: true },
});