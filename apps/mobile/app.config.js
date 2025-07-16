export default {
  expo: {
    name: 'WhoDoggy',
    slug: 'whodoggy',
    version: '1.0.0',
    sdkVersion: '51.0.0',
    platforms: ['ios', 'android', 'web'],
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
// This configuration file is used by Expo to set up the mobile application.
// It includes settings for the app's name, version, icon, splash screen, and platform-specific configurations.
