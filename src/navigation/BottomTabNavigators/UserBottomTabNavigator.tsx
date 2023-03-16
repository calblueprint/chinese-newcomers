import React, { ReactElement } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabParamList } from '../../types/navigation';
import FeedStackNavigator from '../stacks/FeedStackNavigator';
import SignoutStackNavigator from '../stacks/SignOutStackNavigator';
import BookmarksStackNavigator from '../stacks/BookmarksStackNavigator';

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
          tabBarIcon: LogoutVariantIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default UserStack;
