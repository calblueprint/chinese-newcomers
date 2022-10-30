import React from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import DraftScreen from '../screens/Draft';
import FeedScreen from '../screens/Feed/FeedScreen';
import { RootStackParamList } from '../types/navigation';
import AdminRegisterScreen from '../screens/Authentication/AdminRegister/AdminRegister';

const UserStack = (): ReactElement => {
  const Stack = createStackNavigator();
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
