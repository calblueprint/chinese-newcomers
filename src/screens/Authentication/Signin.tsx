/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import styles from './styles';
import { getAuth } from 'firebase/auth';

// const auth = getAuth();

const logo = require('../../assets/favicon.png');

const SigninScreen = ({ navigation }: any) => {
  // const { user } = useAuthentication();

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signintext1}>
          Welcome to the Chinese Newcomers Service Center job portal!
        </Text>
        <Text style={styles.signintext2}>Let's get your account set up.</Text>

        <Pressable style={styles.signinbutton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.signintext3}> SIGN UP </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default SigninScreen;
