import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { UserProvider } from './src/context/context';
import './src/firebase/firebaseApp';
import RootNavigation from './src/navigation';
import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold: require('./src/assets/DMSans-Bold.ttf'),
    DMSans_500Medium: require('./src/assets/DMSans-Medium.ttf'),
    DMSans_400Regular: require('./src/assets/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <RootNavigation />
      </UserProvider>
    </ThemeProvider>
  );
}
