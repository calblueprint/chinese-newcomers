import React, { useEffect } from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { BottomNavigation } from '@material-ui/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabParamList } from '../types/navigation';
import FeedStackNavigator from './stacks/FeedStackNavigator';
import DraftStackNavigator from './stacks/DraftStackNavigator';
import ApprovalStackNavigator from './stacks/ApprovalStackNavigator';
import SignoutStackNavigator from './stacks/SignOutStackNavigator';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

type Props = {
  color: string;
};

const homeOutline = (props: Props) => {
  const { color } = props;
  return <MaterialCommunityIcons name="home-outline" color={color} size={26} />;
};

const noteTextOutline = (props: Props) => {
  const { color } = props;
  return (
    <MaterialCommunityIcons name="note-text-outline" color={color} size={26} />
  );
};

const accountCheck = (props: Props) => {
  const { color } = props;
  return (
    <MaterialCommunityIcons name="account-check" color={color} size={26} />
  );
};

const logoutVariant = (props: Props) => {
  const { color } = props;
  return (
    <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
  );
};

function UserStack(): ReactElement {
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
          tabBarIcon: homeOutline,
        }}
      />
      <Tab.Screen
        name="Draft"
        component={DraftStackNavigator}
        options={{
          tabBarIcon: noteTextOutline,
        }}
      />
      <Tab.Screen
        name="Approval"
        component={ApprovalStackNavigator}
        options={{
          tabBarIcon: accountCheck,
        }}
      />
      <Tab.Screen
        name="Signout"
        component={SignoutStackNavigator}
        options={{
          tabBarIcon: logoutVariant,
        }}
      />
    </Tab.Navigator>
  );
}

export default UserStack;
