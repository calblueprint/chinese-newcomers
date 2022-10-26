import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootNavigation() {
  const { user } = useAuthentication();

  // TODO: switch this order after authentication has been properly implemented
  return user != null ? <AuthStack /> : <UserStack />;
}
