import React, { useState, useEffect, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { UserContext } from '../context/context';
import { getEmptyUser } from '../utils/utils';
import { User } from '../types/types';
import { getUser } from '../firebase/firestore/user';
import {
  AuthContext,
  AuthContextType,
  useAuthReducer,
  getAuthContext
} from '../context/AuthContext';
import AdminStack from './adminStack';

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

  const [activeStack, setActiveStack] = useState(null);

  useEffect(() => {
    const loadStack = async () => {
      if (authState.userToken !== null) {
        try {
          const userObject = await getUser(authState.userToken);
          if (userObject !== null) {
            if (userObject.access === "admin") {
              setActiveStack(<AdminStack/>)
            } else {
              setActiveStack(<UserStack/>)
            } 
          }
        } catch (e) {
          setActiveStack(<AuthStack/>)
          console.log(e);
        }
      } else {
        setActiveStack(<AuthStack/>)
      }
    }
    loadStack();
  }, [authState.userToken])

  return (
    <AuthContext.Provider value={authContext}>
      {activeStack}
    </AuthContext.Provider>
  );
}
