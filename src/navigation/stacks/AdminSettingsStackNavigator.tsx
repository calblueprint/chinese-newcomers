import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';
import AccessScreen from '../../screens/AdminSettings/Access/AccessScreen';
import AdminSettingsScreen from '../../screens/AdminSettings/AdminSettings/AdminSettingsScreen';
import ExpiredJobsScreen from '../../screens/AdminSettings/ExpiredJobs/ExpiredJobs';
import { AdminSettingsStackParamList } from '../../types/navigation';

const AdminSettingsStack =
  createNativeStackNavigator<AdminSettingsStackParamList>();

function ExpiredJobsHeader() {
  return <Header title="Expired Jobs" />;
}

export default function AdminSettingsStackNavigator() {
  return (
    <AdminSettingsStack.Navigator>
      <AdminSettingsStack.Screen
        name="AdminSettingsScreen"
        component={AdminSettingsScreen}
      />
      <AdminSettingsStack.Screen name="AccessScreen" component={AccessScreen} />
      <AdminSettingsStack.Screen
        name="ExpiredJobsScreen"
        component={ExpiredJobsScreen}
        options={{
          headerTitle: ExpiredJobsHeader,
          headerStyle: styles.headerStyle,
        }}
      />
    </AdminSettingsStack.Navigator>
  );
}
