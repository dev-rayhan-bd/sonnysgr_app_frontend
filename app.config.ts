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
  ios: { supportsTablet: true },
  android: {
    package: "com.ayonghosh.Testora",
    softwareKeyboardLayoutMode: "pan",
  },
  androidStatusBar: {
    barStyle: "dark-content", // ✅ kept — still valid
  },
  web: { bundler: "metro", output: "static" },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-secure-store",
    [
      "expo-navigation-bar",
      {
        "barStyle": "light-content", 
      }
    ]
  ],
  experiments: { typedRoutes: true }
});