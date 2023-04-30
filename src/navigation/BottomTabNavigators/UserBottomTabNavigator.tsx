import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { ReactElement } from 'react';
import { BottomTabParamList } from '../../types/navigation';
import SignoutStackNavigator from '../stacks/AdminSettingsStackNavigator';
import BookmarksStackNavigator from '../stacks/BookmarksStackNavigator';
import FeedStackNavigator from '../stacks/FeedStackNavigator';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

type IconProps = {
  color: string;
};

function HomeOutlineIcon({ color }: IconProps) {
  return <MaterialCommunityIcons name="home-outline" color={color} size={26} />;
}

function LogoutVariantIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
  );
}

function BookmarkOutlineIcon({ color }: IconProps) {
  return (
    <MaterialCommunityIcons name="bookmark-outline" color={color} size={26} />
  );
}

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
          tabBarIcon: LogoutVariantIcon,
        }}
      />
      <Tab.Screen
        name="Signout"
        component={SignoutStackNavigator}
        options={{
          tabBarIcon: BookmarkOutlineIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default UserStack;
