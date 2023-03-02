import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignoutScreen from '../../screens/Authentication/Signout/SignoutScreen';
import { SignoutStackParamList } from '../types';

const SignoutStack = createNativeStackNavigator<SignoutStackParamList>();

export default function SignoutStackNavigator() {
    return (
        <SignoutStack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <SignoutStack.Screen name= "SignoutScreen" component={SignoutScreen} />
        </SignoutStack.Navigator>
    )
}