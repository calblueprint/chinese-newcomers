import React, { ReactElement } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabParamList } from '../../types/navigation';
import FeedStackNavigator from '../stacks/FeedStackNavigator';
import DraftStackNavigator from '../stacks/DraftStackNavigator';
import ApprovalStackNavigator from '../stacks/ApprovalStackNavigator';
import SignoutStackNavigator from '../stacks/SignOutStackNavigator';

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

function AccountCheckIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="account-check" color={color} size={26} />
  );
}

function LogoutVariantIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
  );
}

function AdminStack(): ReactElement {
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
        component={FeedStackNavigator}
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
        name="Approval"
        component={ApprovalStackNavigator}
        options={{
          tabBarIcon: AccountCheckIcon,
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

export default AdminStack;
