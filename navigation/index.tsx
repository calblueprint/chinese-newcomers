import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  // TODO: switch this order after authentication has been properly implemented
  return user ? <AuthStack /> : <UserStack /> ; 
}
