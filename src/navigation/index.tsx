import React, { useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './BottomTabNavigator';
import AuthStack from './stacks/AuthStackNavigator';

import {
  AuthContext,
  useAuthReducer,
  getAuthContext,
} from '../context/AuthContext';

export default function RootNavigation() {
  const [authState, dispatch] = useAuthReducer();

  useEffect(() => {
    const restoreAuthToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('uid');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } catch (e) {
        console.log(e);
      }
    };
    restoreAuthToken();
  }, []);

  const authContext = useMemo(() => getAuthContext(dispatch), []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {authState.userToken !== null ? <UserStack /> : <AuthStack />}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
