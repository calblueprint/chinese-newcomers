import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';
import AccessScreen from '../../screens/AdminSettings/Access/AccessScreen';
import AdminSettingsScreen from '../../screens/AdminSettings/AdminSettings/AdminSettingsScreen';
import EmployerApprovalScreen from '../../screens/AdminSettings/EmployerApproval/EmployerApproval';
import { AdminSettingsStackParamList } from '../../types/navigation';


function EmployerApprovalHeader() {
  return <Header title="Approve Employers"/>
}

function AdminSettingsHeader() {
  return <Header title="Admin Settings"/>
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
        options={{
          headerTitle: AdminSettingsHeader,
          headerStyle: styles.headerStyle
        }}
      />
      <AdminSettingsStack.Screen name="AccessScreen" component={AccessScreen} />
      <AdminSettingsStack.Screen 
        name="EmployerApprovalScreen" 
        component={EmployerApprovalScreen} 
      />
    </AdminSettingsStack.Navigator>
  );
}
