import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import WelcomeScreen from '../screens/Authentication/Welcome/Welcome';
import SigninScreen from '../screens/Authentication/Signin/Signin';
import PhoneNumberScreen from '../screens/Authentication/PhoneNumber/PhoneNumber';
import VerificationCodeScreen from '../screens/Authentication/VerificationCode/VerificationCode';
import AdminSigninScreen from '../screens/Authentication/AdminSignin/AdminSignin';
import AdminRegisterScreen from '../screens/Authentication/AdminRegister/AdminRegister';

const Stack = createStackNavigator();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function AuthStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="PhoneNumberRegister" component={PhoneNumberScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
        <Stack.Screen name="AdminSignin" component={AdminSigninScreen} />
        <Stack.Screen name="AdminRegister" component={AdminRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
