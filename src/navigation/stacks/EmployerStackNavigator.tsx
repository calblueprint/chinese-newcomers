import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  EmployerStackParamList,
} from '../../types/navigation';
import EmployerHome from '../../screens/EmployerHome/EmployerHome';

const EmployerStack = createNativeStackNavigator<EmployerStackParamList>();

export default function EmployerStackNavigator() {
  return (
    <EmployerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EmployerStack.Screen name="EmployerHome" component={EmployerHome} />
    </EmployerStack.Navigator>
  );
}
