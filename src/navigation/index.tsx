import React, { useState, useEffect, useMemo } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { UserContext } from '../context/context';
import { getAuth } from 'firebase/auth';
import { getEmptyUser } from '../utils/utils';
import { User } from '../types/types';
import { getUser } from '../firebase/firestore/user';
import {
  AuthContext,
  AuthContextType,
  useAuthReducer,
  getAuthContext
} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootNavigation() {
  const [authState, dispatch] = useAuthReducer();

  useEffect(() => {
    const restoreAuthToken = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('uid');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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
