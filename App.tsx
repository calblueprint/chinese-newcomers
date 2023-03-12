/* eslint-disable global-require */
import React from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'react-native-elements';
import { UserProvider } from './src/context/context';
import './src/firebase/firebaseApp';
import RootNavigation from './src/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold: require('./src/assets/fonts/DMSans-Bold.ttf'),
    DMSans_500Medium: require('./src/assets/fonts/DMSans-Medium.ttf'),
    DMSans_400Regular: require('./src/assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider>
      <UserProvider>
        <RootNavigation />
      </UserProvider>
    </ThemeProvider>
  );
}