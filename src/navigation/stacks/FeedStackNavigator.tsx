import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FeedScreen from '../../screens/Feed/FeedScreen';
import { FeedStackParamList } from '../../types/navigation';
import Logo from '../../assets/cnsc-logo.png';
import { AuthContext } from '../../context/AuthContext';
import { signUserOut } from '../../firebase/auth';
import Icon from '../../assets/sign-out.svg'

const FeedStack = createStackNavigator<FeedStackParamList>();

const containerStyles = {
  width: 400, 
  flexDirection: 'row',
  alignItems: 'center',
}

const feedTitle = {
  color: '#49260C',
  fontSize: 28,
  fontFamily: 'DMSans_700Bold',
}

function LogoTitle() {
  const { dispatch } = useContext(AuthContext);
  return (
    <View style={containerStyles}>
       <Image source={Logo} style={{ width: 42, height: 47, marginRight: 20, marginLeft: 20, }} />
      <Text style={feedTitle}>Jobs</Text>
      <Pressable 
        style={{ backgroundColor: 'red', width: 20, height: 20 }} 
        onPress={() => signUserOut(dispatch)}>
        <Icon/>
      </Pressable>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 10,
        }}
      />
   </View>
  );
}

export default function FeedStackNavigator() {
  return (
    <FeedStack.Navigator
    >
      <FeedStack.Screen 
        name="FeedScreen" 
        component={FeedScreen}  
        options={{
          headerTitle: LogoTitle,
          headerStyle: { 
            backgroundColor: 'white', height: 125, borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth, }
        }}
        />
    </FeedStack.Navigator>
  );
}
