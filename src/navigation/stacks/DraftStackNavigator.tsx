import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DraftScreen from '../../screens/Drafting/Draft';
import { DraftStackParamList } from '../../types/navigation';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';

const DraftStack = createStackNavigator<DraftStackParamList>();

function DraftHeader() {
  return <Header title="Job Post Draft"/>
}

export default function DraftStackNavigator() {
  return (
    <DraftStack.Navigator>
      <DraftStack.Screen 
        name="DraftScreen" 
        component={DraftScreen}
        options={{
          headerTitle: DraftHeader,
          headerStyle: styles.headerStyle
        }} />
    </DraftStack.Navigator>
  );
}
