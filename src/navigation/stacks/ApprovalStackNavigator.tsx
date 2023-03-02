import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ApprovalScreen from '../../screens/Approval/ApprovalScreen';
import { ApprovalStackParamList } from '../types';

const ApprovalStack = createNativeStackNavigator<ApprovalStackParamList>();

export default function ApprovalStackNavigator() {
  return (
    <ApprovalStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ApprovalStack.Screen name="ApprovalScreen" component={ApprovalScreen} />
    </ApprovalStack.Navigator>
  );
}
