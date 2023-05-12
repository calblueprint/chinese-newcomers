import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdminSigninScreen from '../../screens/Authentication/AdminSignin/AdminSignin';
import EmailPasswordRegisterScreen from '../../screens/Authentication/EmailPasswordRegister/EmailPasswordRegister';
import EmployerRegisterScreen from '../../screens/Authentication/EmployerRegister/EmployerRegister';
import PhoneNumberScreen from '../../screens/Authentication/PhoneNumber/PhoneNumber';
import SigninScreen from '../../screens/Authentication/Signin/Signin';
import UserTypeScreen from '../../screens/Authentication/UserType/UserType';
import VerificationScreen from '../../screens/Authentication/VerificationCode/VerificationCode';
import WelcomeScreen from '../../screens/Authentication/Welcome/Welcome';
import { AuthStackParamList } from '../../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="SigninScreen" component={SigninScreen} />
      <AuthStack.Screen
        name="AdminSigninScreen"
        component={AdminSigninScreen}
      />
      <AuthStack.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
      />
      <AuthStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <AuthStack.Screen name="UserTypeScreen" component={UserTypeScreen} />
      <AuthStack.Screen
        name="EmailPasswordRegisterScreen"
        component={EmailPasswordRegisterScreen}
      />
      <AuthStack.Screen
        name="EmployerRegisterScreen"
        component={EmployerRegisterScreen}
      />
    </AuthStack.Navigator>
  );
}
