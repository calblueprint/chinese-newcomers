import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AccessScreen from '../../screens/AdminSettings/Access/AccessScreen';
import AdminSettingsScreen from '../../screens/AdminSettings/AdminSettings/AdminSettingsScreen';
import { AdminSettingsStackParamList } from '../../types/navigation';

const AdminSettingsStack = createNativeStackNavigator<AdminSettingsStackParamList>();

export default function AdminSettingsStackNavigator() {
  return (
    <AdminSettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AdminSettingsStack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} />
      <AdminSettingsStack.Screen name="AccessScreen" component={AccessScreen} />
    </AdminSettingsStack.Navigator>
  );
}
