import React, { ReactElement } from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
// import { BottomNavigation } from '@material-ui/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DraftScreen from '../screens/Drafting/Draft';
import SignoutScreen from '../screens/Authentication/Signout/Signout';
import FeedScreen from '../screens/Feed/FeedScreen';
import ApprovalScreen from '../screens/Approval/ApprovalScreen';

const Tab = createMaterialBottomTabNavigator();

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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        // TODO: Curve the bottom navigation bar
        barStyle={{ backgroundColor: '#FFFFFF' }}
        activeColor="#CC433C"
        shifting={false}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: homeOutline,
          }}
        />
        <Tab.Screen
          name="Draft"
          component={DraftScreen}
          options={{
            tabBarIcon: noteTextOutline,
          }}
        />
        <Tab.Screen
          name="Approval"
          component={ApprovalScreen}
          options={{
            tabBarIcon: accountCheck,
          }}
        />
        <Tab.Screen
          name="Signout"
          component={SignoutScreen}
          options={{
            tabBarIcon: logoutVariant,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
