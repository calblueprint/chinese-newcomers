import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import styles from './styles';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../firebase/firebaseApp';
import { getUser, addUser } from '../../firebase/firestore/user';
// import { getAuth, signOut } from "firebase/auth";

const logo = require('../../assets/favicon.png');

const WelcomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);

  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signInText1}>
          Welcome to the Chinese Newcomers Service Center job portal!
        </Text>
        <Text style={styles.signInText2}>Let's get your account set up.</Text>

        <Pressable
          style={styles.signInButton}
          onPress={() => navigation.navigate('PhoneNumberRegister')}>
          <Text style={styles.signInText3}> SIGN UP </Text>
        </Pressable>

        <Pressable style={styles.signInButton} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signInText3}> SIGN IN </Text>
        </Pressable>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseApp.options}
        />
      </View>
    </View>
  );
};
export default WelcomeScreen;
