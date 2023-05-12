import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { ReactElement } from 'react';
import { BottomTabParamList } from '../../types/navigation';
import SettingsStackNavigator from '../stacks/AdminSettingsStackNavigator';
import DraftStackNavigator from '../stacks/DraftStackNavigator';
import EmployerHomeStackNavigator from '../stacks/EmployerHomeStackNavigator';
import { HomeOutlineIcon, NoteTextOutlineIcon, SettingsIcon } from '../../assets/navicons';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

function EmployerStack(): ReactElement {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      // TODO: Curve the bottom navigation bar
      barStyle={{ backgroundColor: '#FFFFFF' }}
      activeColor="#CC433C"
      shifting={false}
    >
      <Tab.Screen
        name="Feed"
        component={EmployerHomeStackNavigator}
        options={{
          tabBarIcon: HomeOutlineIcon,
        }}
      />
      <Tab.Screen
        name="Draft"
        component={DraftStackNavigator}
        options={{
          tabBarIcon: NoteTextOutlineIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default EmployerStack;
