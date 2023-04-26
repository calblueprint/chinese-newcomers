import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EmployerHome from '../../screens/EmployerHome/EmployerHome';
import { EmployerStackParamList } from '../../types/navigation';

const EmployerStack = createNativeStackNavigator<EmployerStackParamList>();

export default function EmployerStackNavigator() {
  return (
    <EmployerStack.Navigator screenOptions
  )
}

export default function EmployerStackNavigator() {
  return (
    <EmployerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EmployerStack.Screen name="ApprovalScreen" component={EmployerHome} />
    </EmployerStack.Navigator>
  );
}
