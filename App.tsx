/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { AuthContextProvider } from './src/context/AuthContext';
import './src/firebase/firebaseApp';
import AppNavigator from './src/navigation/AppNavigator';

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
      <NavigationContainer>
        <AuthContextProvider>
          <AppNavigator />
        </AuthContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
