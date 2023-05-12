import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { ReactElement } from 'react';
import { BottomTabParamList } from '../../types/navigation';
import BookmarksStackNavigator from '../stacks/BookmarksStackNavigator';
import SettingsStackNavigator from '../stacks/AdminSettingsStackNavigator';
import FeedStackNavigator from '../stacks/FeedStackNavigator';
import { HomeOutlineIcon, SettingsIcon, BookmarkOutlineIcon } from '../../assets/navicons';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

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
          tabBarIcon: HomeOutlineIcon,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksStackNavigator}
        options={{
          tabBarIcon: BookmarkOutlineIcon,
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

export default UserStack;
