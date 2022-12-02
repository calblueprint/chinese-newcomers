import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  signOut
} from 'firebase/auth';
import firebaseApp from '../firebase/firebaseApp';
import { getUser, checkAndAddUser } from '../firebase/firestore/user';
import { activatedAdmin } from '../firebase/auth';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export interface AuthContextType {
  signInPhone: (verificationId: string, verficationCode: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  authState?: AuthState;
}

export interface AuthState {
  isLoading: boolean;
  userToken: string | null;
  isSignout: boolean;
}

export type AuthContextAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

export const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
            isLoading: false
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

export const getAuthContext = (dispatch: React.Dispatch<AuthContextAction>): AuthContextType => ({
  signInEmail: async (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Email sign in successful', user.email);
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid });
      })
      .catch((error) => {
        console.warn('Email sign in error', error);
      });
  },
  signUpEmail: async (email: string, password: string, phoneNumber: string) => {
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await checkAndAddUser(user, 'admin', phoneNumber);
        console.log('Email sign up successful', user.email);
        await activatedAdmin(phoneNumber);
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid });
      })
      .catch((error) => {
        console.warn('Email sign up error', error);
      });
  },
  signInPhone: async (verficationId: string, verficationCode: string) => {
    const auth = getAuth(firebaseApp);
    try {
      const credential = await PhoneAuthProvider.credential(verficationId, verficationCode);
      const result = await signInWithCredential(auth, credential);
      await checkAndAddUser(result.user, 'regular_user', null);
      console.log('Phone authentication successful', result.user.phoneNumber);
      await AsyncStorage.setItem('uid', result.user.uid);
      dispatch({ type: 'SIGN_IN', token: result.user.uid });
    } catch (error) {
      console.warn('Phone sign up error', error);
      throw error;
    }
  },
  signOut: async () => {
    const auth = getAuth(firebaseApp);
    AsyncStorage.removeItem('uid');
    try {
      const result = await signOut(auth);
      console.log('Sign out successful', result);
    } catch (error) {
      console.warn('Sign out error', error);
    }
    dispatch({ type: 'SIGN_OUT' });
  }
});
