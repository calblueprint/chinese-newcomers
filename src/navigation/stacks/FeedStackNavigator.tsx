import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from '../../screens/Feed/FeedScreen';
import { FeedStackParamList } from '../types';

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
    return (
        <FeedStack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
        </FeedStack.Navigator>
    )
}