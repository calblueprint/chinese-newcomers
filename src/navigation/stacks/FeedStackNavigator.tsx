import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FeedScreen from '../../screens/Feed/FeedScreen';
import { FeedStackParamList } from '../../types/navigation';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';

const FeedStack = createStackNavigator<FeedStackParamList>();

function FeedHeader() {
  return <Header title="Jobs"/>
}

export default function FeedStackNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen 
        name="FeedScreen" 
        component={FeedScreen}  
        options={{
          headerTitle: FeedHeader,
          headerStyle: styles.headerStyle
        }}
      />
    </FeedStack.Navigator>
  );
}
