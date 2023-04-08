import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import firebaseApp from '../firebase/firebaseApp';
import { getUser } from '../firebase/firestore/user';
import { User } from '../types/types';

export type AuthDispatch = React.Dispatch<AuthContextAction>;

export const AuthContext = createContext<AuthState>({} as AuthState);

export interface AuthState {
  isLoading: boolean;
  userObject: User | null;
  dispatch: AuthDispatch;
}

export type AuthContextAction =
  | { type: 'RESTORE_USER'; userObject: User | null }
  | { type: 'SIGN_IN'; userObject: User | null }
  | { type: 'SIGN_OUT' };

export const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            isLoading: false,
            userObject: action.userObject,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            userObject: action.userObject,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoading: false,
            userObject: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      userObject: null,
      dispatch: () => null,
    },
  );

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, dispatch] = useAuthReducer();

  // Subscribe to auth state changes and restore the user if they're already signed in
  useEffect(() => {
    const unsubscribe = getAuth(firebaseApp).onAuthStateChanged(async user => {
      let UserObject: User | null = null;
      if (user) {
        UserObject = await getUser(user.uid);
      }
      dispatch({
        type: 'RESTORE_USER',
        userObject: UserObject,
      });
    });
    return unsubscribe;
  }, [dispatch]);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      dispatch,
    }),
    [authState, dispatch],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}