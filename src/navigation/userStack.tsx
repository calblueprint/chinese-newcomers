import React from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import DraftScreen from '../screens/Draft';
import SignupScreen from '../screens/Authentication/Welcome';
import FeedScreen from '../screens/Feed';
import { RootStackParamList } from '../types/navigation';
import AdminRegisterScreen from '../screens/Authentication/AdminRegister';

const UserStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Draft" component={DraftScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="AdminRegister" component={AdminRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
