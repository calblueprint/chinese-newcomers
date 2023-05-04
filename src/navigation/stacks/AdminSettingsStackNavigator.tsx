import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import AccessScreen from '../../screens/AdminSettings/Access/AccessScreen';
import AdminSettingsScreen from '../../screens/AdminSettings/AdminSettings/AdminSettingsScreen';
import EmployerApprovalScreen from '../../screens/AdminSettings/EmployerApproval/EmployerApproval';
import { AdminSettingsStackParamList } from '../../types/navigation';
import styles from '../../components/Header/styles';


function EmployerApprovalHeader() {
  return <Header title="Approve Employers"/>
}
const AdminSettingsStack =
  createStackNavigator<AdminSettingsStackParamList>();

export default function AdminSettingsStackNavigator() {
  return (
    <AdminSettingsStack.Navigator
    >
      <AdminSettingsStack.Screen
        name="AdminSettingsScreen"
        component={AdminSettingsScreen}
      />
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
