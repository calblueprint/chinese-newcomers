import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import DraftScreen from "../screens/Draft";
import SigninScreen from "../screens/Authentication/Signin";
import FeedScreen from "../screens/Feed";
import AdminSignInScreen from "../screens/Authentication/AdminSignin";
import { RootStackParamList } from "../types/navigation";

const UserStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Draft" component={DraftScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="AdminSignin" component={AdminSignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
