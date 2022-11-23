import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { UserProvider } from './src/context/context';
import './src/firebase/firebaseApp';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RootNavigation />
      </UserProvider>
    </ThemeProvider>
  );
}
