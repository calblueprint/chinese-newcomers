import 'dotenv/config';

export default {
  expo: {
    name: 'chinese-newcomers',
    slug: 'chinese-newcomers',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'org.calblueprint.cnsc'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      package: 'org.calblueprint.cnsc'
    },
    web: {
      favicon: './src/assets/favicon.png'
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: 'cd93534f-9ad5-4519-8be6-424af925ef8a'
      }
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 31,
            targetSdkVersion: 31,
            buildToolsVersion: '31.0.0'
          },
          ios: {
            deploymentTarget: '13.0'
          }
        }
      ]
    ]
  }
};
