import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ApprovalScreen from '../../screens/Approval/ApprovalScreen';
import { ApprovalStackParamList } from '../../types/navigation';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';

const ApprovalStack = createStackNavigator<ApprovalStackParamList>();

function ApprovalHeader() {
  return <Header title="Approve Jobs"/>
}

export default function ApprovalStackNavigator() {
  return (
    <ApprovalStack.Navigator>
      <ApprovalStack.Screen 
        name="ApprovalScreen" 
        component={ApprovalScreen}
        options={{
          headerTitle: ApprovalHeader,
          headerStyle: styles.headerStyle
        }} 
      />
    </ApprovalStack.Navigator>
  );
}
