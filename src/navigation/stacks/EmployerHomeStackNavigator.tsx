import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import EmployerHome from '../../screens/EmployerHome/EmployerHome';
import { EmployerStackParamList } from '../../types/navigation';
import styles from '../../components/Header/styles';

const EmployerStack = createStackNavigator<EmployerStackParamList>();

function EmployerHomeHeader() {
  return <Header title="Home" />;
}

export default function EmployerHomeStackNavigator() {
  return (
    <EmployerStack.Navigator>
      <EmployerStack.Screen 
        name="EmployerHome" 
        component={EmployerHome} 
        options={{
          headerTitle: EmployerHomeHeader,
          headerStyle: styles.headerStyle,
        }}
      />
    </EmployerStack.Navigator>
  );
}