import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import firebaseApp from '../firebase/firebaseApp';
import { checkAndAddUser, getUser } from '../firebase/firestore/user';
import { activatedAdmin } from '../firebase/auth';
import { User } from '../types/types'

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export interface AuthContextType {
  signInPhone: (
    verificationId: string,
    verficationCode: string,
  ) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (
    email: string,
    password: string,
    phoneNumber: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  authState?: AuthState;
}

export interface AuthState {
  isLoading: boolean;
  userToken: string | null;
  isSignout: boolean;
  userObject: User;
}

export type AuthContextAction =
  | { type: 'RESTORE_TOKEN'; token: string | null; userObject: User }
  | { type: 'SIGN_IN'; token: string; userObject: User }
  | { type: 'SIGN_OUT' };

export const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userObject: action.userObject,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userObject: action.userObject
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
            isLoading: false,
            userObject: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userObject: null,
    },
  );

export const getAuthContext = (
  dispatch: React.Dispatch<AuthContextAction>,
): AuthContextType => ({
  signInEmail: async (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const { user } = userCredential;
        console.log('Email sign in successful', user.email);
        const newUser = await getUser(user.uid) as User; 
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid, userObject: newUser });
      })
      .catch(error => {
        console.warn('Email sign in error', error);
      });
  },
  signUpEmail: async (email: string, password: string, phoneNumber: string) => {
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const { user } = userCredential;
        await checkAndAddUser(user, 'admin', phoneNumber);
        const newUser = await getUser(user.uid) as User; 
        console.log('Email sign up successful', user.email);
        await activatedAdmin(phoneNumber);
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid, userObject: newUser });
      })
      .catch(error => {
        console.warn('Email sign up error', error);
      });
  },
  signInPhone: async (verficationId: string, verficationCode: string) => {
    const auth = getAuth(firebaseApp);
    try {
      const credential = await PhoneAuthProvider.credential(
        verficationId,
        verficationCode,
      );
      const result = await signInWithCredential(auth, credential);
      await checkAndAddUser(result.user, 'regular_user', null);
      const newUser = await getUser(user.uid) as User; 
      console.log('Phone authentication successful', result.user.phoneNumber);
      await AsyncStorage.setItem('uid', result.user.uid);
      dispatch({ type: 'SIGN_IN', token: result.user.uid, userObject: newUser });
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
  },
});
