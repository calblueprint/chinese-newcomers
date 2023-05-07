import React, { ReactElement, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import AdminStack from './BottomTabNavigators/AdminBottomTabNavigator';
import EmployerStack from './BottomTabNavigators/EmployerBottomTabNavigator';
import UserStack from './BottomTabNavigators/UserBottomTabNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

export default function AppNavigator() {
  const { userObject, isLoading } = useContext(AuthContext);
  let activeStack: ReactElement;
  if (isLoading) {
    activeStack = <LoadingSpinner />;
  } else if (userObject === null) {
    activeStack = (
      <SafeAreaProvider>
        <AuthStackNavigator />
      </SafeAreaProvider>
    );
  } else if (userObject.access === 'admin') {
    activeStack = <AdminStack />;
  } else if (userObject.access === 'employer') {
    activeStack = <EmployerStack />;
  } else {
    activeStack = <UserStack />;
  }

  return activeStack;
}
