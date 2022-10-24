import React, { ReactElement } from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import DraftScreen from '../screens/Drafting/Draft';
import SigninScreen from '../screens/Authentication/Signin';
import FeedScreen from '../screens/Feed/Feed';
import { RootStackParamList } from '../types/navigation';

const UserStack = (): ReactElement => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Draft" component={DraftScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
