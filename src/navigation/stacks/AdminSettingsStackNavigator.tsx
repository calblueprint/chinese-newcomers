import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';
import AccessScreen from '../../screens/AdminSettings/Access/AccessScreen';
import AdminSettingsScreen from '../../screens/AdminSettings/AdminSettings/AdminSettingsScreen';
import EmployerApprovalScreen from '../../screens/AdminSettings/EmployerApproval/EmployerApproval';
import { AdminSettingsStackParamList } from '../../types/navigation';

const AdminSettingsStack = createStackNavigator<AdminSettingsStackParamList>();

function EmployerApprovalHeader() {
  return <Header title="EmployerApproval"/>
}

export default function AdminSettingsStackNavigator() {
  return (
    <AdminSettingsStack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <AdminSettingsStack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} />
      <AdminSettingsStack.Screen name="AccessScreen" component={AccessScreen} />
      <AdminSettingsStack.Screen 
        name="EmployerApprovalScreen" 
        component={EmployerApprovalScreen} 
        options={{
          headerTitle: EmployerApprovalHeader,
          headerStyle: styles.headerStyle
        }}
      />
    </AdminSettingsStack.Navigator>
  );
}
