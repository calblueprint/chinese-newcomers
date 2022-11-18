import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { UserContext } from '../context/context';
import { getAuth } from 'firebase/auth';
import { getEmptyUser } from '../utils/utils';
import { User } from '../types/types';
import { getUser } from '../firebase/firestore/user';

const auth = getAuth();

async function getCurrentUser(): Promise<User | null> {
  const uid = auth.currentUser?.uid;
  if (uid !== undefined) {
    const user = await getUser(uid);
    return user;
  }
  throw new Error('could not fetch current client from firebase');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootNavigation() {
  const [user, setUser] = useState<firebase.User | null>(null);
  // const { user } = useAuthentication();
  const { update } = React.useContext(UserContext);
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        if (authenticatedUser != null) {
          setUser(authenticatedUser);
          const currUser = await getCurrentUser();
          update(currUser); // update app context
        } else {
          setUser(null);
          // is this necessary?
          update(getEmptyUser()); // update app context
        }
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribeAuth;
  }, []);
  // TODO: switch this order after authentication has been properly implemented
  return user != null ? <UserStack /> : <AuthStack />;
}
