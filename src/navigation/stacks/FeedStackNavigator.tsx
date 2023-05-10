import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';
import { Translate } from '../../context/AuthContext';
import FeedScreen from '../../screens/Feed/FeedScreen';
import { FeedStackParamList } from '../../types/navigation';

const FeedStack = createStackNavigator<FeedStackParamList>();

function FeedHeader() {
  return <Header title={Translate('Jobs')} />;
}

export default function FeedStackNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          headerTitle: FeedHeader,
          headerStyle: styles.headerStyle,
        }}
      />
    </FeedStack.Navigator>
  );
}
