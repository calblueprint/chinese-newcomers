import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import WelcomeScreen from '../screens/Authentication/Welcome';
import SigninScreen from '../screens/Authentication/Signin';
import PhoneNumberScreen from '../screens/Authentication/PhoneNumber';
import VerificationCodeScreen from '../screens/Authentication/VerificationCode';

const Stack = createStackNavigator();

export default function AuthStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="PhoneNumberRegister" component={PhoneNumberScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
