import React, { ReactElement, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DraftScreen from '../screens/Drafting/Draft';
import Signout from '../screens/Authentication/Signout/Signout';
import FeedScreen from '../screens/Feed/FeedScreen';
import ApprovalScreen from '../screens/Approval/ApprovalScreen';

const Tab = createMaterialBottomTabNavigator();

function AdminStack(): ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        // TODO: Curve the bottom navigation bar
        barStyle={{ backgroundColor: '#FFFFFF' }}
        activeColor="#CC433C"
        shifting={false}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Draft"
          component={DraftScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="note-text-outline" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Approval"
          component={ApprovalScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-check" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Signout"
          component={Signout}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AdminStack;
