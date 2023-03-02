import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DraftScreen from '../../screens/Drafting/Draft';
import { DraftStackParamList } from '../types';

const DraftStack = createNativeStackNavigator<DraftStackParamList>();

export default function DraftStackNavigator() {
    return(
        <DraftStack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <DraftStack.Screen name="DraftScreen" component= {DraftScreen} />
        </DraftStack.Navigator>
    )
}