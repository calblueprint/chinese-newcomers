import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import styles from './styles';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../firebase/firestore';
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

        <Pressable
          style={styles.signInButton}
          onPress={async () => {
            try {
              // case 1: real phone number, working to send code
              // const verificationId = await phoneGetConfirmation('+12014076687', recaptchaVerifier);

              // case 2: fake phone number and code from firebase, working
              const verificationId = await phoneGetConfirmation('+11113334444', recaptchaVerifier);
              console.log(verificationId);
              const user = await confirmCode(verificationId, '123456');
              console.log(user);
              const userObject = await getUser(user.uid);
              if (userObject !== null) {
                console.log('Got user from users collection. Name: ' + userObject.name);
                // TODO: probably put user object into react context
              } else {
                console.log('Create new user flow');
                // TODO: handle user not yet in users collection. check access collection to see what type of user to create
                // below code just for testing
                await addUser({
                  id: user.uid,
                  access: 'regular_user',
                  createdJobs: [],
                  email: user.email,
                  likedJobs: [], // switched to string of jobIds to match Firebase
                  name: 'test phone',
                  phoneNumber: user.phoneNumber,
                  verified: true,
                  password: null
                });
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.signInText3}> test phone number </Text>
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
