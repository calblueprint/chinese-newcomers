import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import firebaseApp from '../firebase/firebaseApp';
import { getUser } from '../firebase/firestore/user';
import { langToDictMap } from '../translation/languages';
import { Dictionary, RegularUser } from '../types/types';

export type AuthDispatch = React.Dispatch<AuthContextAction>;

export const AuthContext = createContext<AuthState>({} as AuthState);

export interface AuthState {
  isLoading: boolean;
  userObject: RegularUser | null;
  dispatch: AuthDispatch;
  langState: Dictionary | null;
  langUpdate: React.Dispatch<React.SetStateAction<Dictionary>>;
}

export type AuthContextAction =
  | { type: 'RESTORE_USER'; userObject: RegularUser | null }
  | { type: 'SIGN_IN'; userObject: RegularUser | null }
  | { type: 'SIGN_OUT' }
  | { type: 'CHANGE_BOOKMARK'; bookmarkedArray: string[] | undefined }
  | { type: 'UPDATE_LANGUAGE'; language: string | undefined };

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
        case 'CHANGE_BOOKMARK':
          return {
            ...prevState,
            userObject: {
              ...prevState.userObject,
              bookmarkedJobs: action.bookmarkedArray,
            } as RegularUser,
          };
        case 'UPDATE_LANGUAGE':
          return {
            ...prevState,
            userObject: {
              ...prevState.userObject,
              language: action.language,
            } as RegularUser,
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
      langState: null,
      langUpdate: () => null,
    },
  );

// get translated string function
const I18n = ({ str }) => {
  const dict = React.useContext(AuthContext).langState;
  const translated = dict && dict[str] ? dict[str] : str;
  return translated;
};

// wrapper function for I18n
export function GetText(str: string) {
  return <I18n str={str} />;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, dispatch] = useAuthReducer();
  const [langState, langUpdate] = React.useState<Dictionary>(); // set this state in the useAuthReducer switch statement --> a dictionary

  // Subscribe to auth state changes and restore the user if they're already signed in
  useEffect(() => {
    const unsubscribe = getAuth(firebaseApp).onAuthStateChanged(async user => {
      let UserObject: RegularUser | null = null;
      if (user) {
        UserObject = await getUser(user.uid);
        if (UserObject?.language) {
          const val = langToDictMap.get(UserObject?.language);
          langUpdate(val);
        }
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
      langState,
      langUpdate,
    }),
    [authState, dispatch, langState, langUpdate],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
