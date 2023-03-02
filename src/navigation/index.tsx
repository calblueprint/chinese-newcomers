import React, { useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStack from './userStack';
import AuthStack from './authStack';
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
    <AuthContext.Provider value={authContext}>
      {authState.userToken !== null ? <UserStack /> : <AuthStack />}
    </AuthContext.Provider>
  );
}
