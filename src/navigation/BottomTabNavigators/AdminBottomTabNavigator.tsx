import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { ReactElement } from 'react';
import { BottomTabParamList } from '../../types/navigation';
import SettingsStackNavigator from '../stacks/AdminSettingsStackNavigator';
import ApprovalStackNavigator from '../stacks/ApprovalStackNavigator';
import BookmarksStackNavigator from '../stacks/BookmarksStackNavigator';
import DraftStackNavigator from '../stacks/DraftStackNavigator';
import FeedStackNavigator from '../stacks/FeedStackNavigator';
import { AccountCheckIcon, BookmarkOutlineIcon, NoteTextOutlineIcon, SettingsIcon } from '../../assets/navicons';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

type IconProps = {
  color: string;
};

function HomeOutlineIcon({ color }: IconProps) {
  return <MaterialCommunityIcons name="home-outline" color={color} size={26} />;
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

export default AdminStack;
