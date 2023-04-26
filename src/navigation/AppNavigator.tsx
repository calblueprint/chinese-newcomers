import React, { ReactElement, useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import AdminStack from './BottomTabNavigators/AdminBottomTabNavigator';
import UserStack from './BottomTabNavigators/UserBottomTabNavigator';
import AuthStackNavigator from './stacks/AuthStackNavigator';

export default function AppNavigator() {
  const { userObject, isLoading } = useContext(AuthContext);
  let activeStack: ReactElement;
  if (isLoading) {
    activeStack = <LoadingSpinner />;
  } else if (userObject === null) {
    activeStack = <AuthStackNavigator />;
  } else {
    activeStack =
      userObject.access === 'admin' ? <AdminStack /> : <UserStack />;
  }

  return activeStack;
}
