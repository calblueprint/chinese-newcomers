import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Pressable } from 'react-native';
import styles from './styles';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import app from '../../firebase/config';
// import { getAuth, signOut } from "firebase/auth";

// const auth = getAuth();

const logo = require('../../assets/favicon.png');

const SigninScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);

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

        <Pressable
          style={styles.signinbutton}
          onPress={async () => {
            try {
              // case 1: real phone number, working to send code
              // const verificationId = await phoneGetConfirmation('+12014076687', recaptchaVerifier);

              // case 2: fake phone number and code from firebase, working
              const verificationId = await phoneGetConfirmation('+11113334444', recaptchaVerifier);
              console.log(verificationId);
              const user = await confirmCode(verificationId, '123456');
              console.log(user);
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.signintext3}> test phone number </Text>
        </Pressable>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={app.options} />
      </View>
    </View>
  );
};

export default SigninScreen;
