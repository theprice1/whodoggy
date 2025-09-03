module.exports = {
  expo: {
    name: "WhoDoggy",
    slug: "whodoggy",
    version: "1.0.0",
    // Removed sdkVersion - not needed in modern Expo
    platforms: ["ios", "android"],
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.thepr1ce1.whodoggy",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.thepr1ce1.whodoggy",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "3f916ac8-7a8c-4e53-aa7f-83c0c023a9e3",
      },
    },
  },
};
