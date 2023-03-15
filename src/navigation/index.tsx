import React, { useState, useEffect, useMemo, ReactElement } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './BottomTabNavigators/UserBottomTabNavigator';
import { getUser } from '../firebase/firestore/user';

import {
  AuthContext,
  useAuthReducer,
  getAuthContext,
} from '../context/AuthContext';
import AdminStack from './BottomTabNavigators/AdminBottomTabNavigator';

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

  const [activeStack, setActiveStack] = useState<ReactElement>();

  useEffect(() => {
    const loadStack = async () => {
      if (authState.userToken !== null) {
        try {
          const userObject = await getUser(authState.userToken);
          const stack =
            userObject !== null && userObject.access === 'admin' ? (
              <AdminStack />
            ) : (
              <UserStack />
            );
          setActiveStack(stack);
        } catch (e) {
          console.log(e);
        }
      } else {
        setActiveStack(<AdminStack />);
      }
    };
    loadStack();
  }, [authState.userToken]);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {activeStack}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
