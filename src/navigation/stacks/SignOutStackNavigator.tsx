import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignoutScreen from '../../screens/Authentication/Signout/SignoutScreen';
import AccessScreen from '../../screens/Access/AccessScreen';
import { SignoutStackParamList } from '../../types/navigation';

const SignoutStack = createNativeStackNavigator<SignoutStackParamList>();

export default function SignoutStackNavigator() {
  return (
    <SignoutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SignoutStack.Screen name="SignoutScreen" component={SignoutScreen} />
      <SignoutStack.Screen name="AccessScreen" component={AccessScreen} />
    </SignoutStack.Navigator>
  );
}
