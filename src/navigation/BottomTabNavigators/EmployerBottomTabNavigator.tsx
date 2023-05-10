import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { ReactElement } from 'react';
import { BottomTabParamList } from '../../types/navigation';
import SignoutStackNavigator from '../stacks/AdminSettingsStackNavigator';
import DraftStackNavigator from '../stacks/DraftStackNavigator';
import EmployerHomeStackNavigator from '../stacks/EmployerHomeStackNavigator';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

type IconProps = {
  color: string;
};

function HomeOutlineIcon({ color }: IconProps) {
  return <MaterialCommunityIcons name="home-outline" color={color} size={26} />;
}

function NoteTextOutlineIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="note-text-outline" color={color} size={26} />
  );
}

function LogoutVariantIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
  );
}

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
        name="Signout"
        component={SignoutStackNavigator}
        options={{
          tabBarIcon: LogoutVariantIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default EmployerStack;
