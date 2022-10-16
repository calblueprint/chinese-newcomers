import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Pressable } from 'react-native';
import styles from './styles';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../firebase/config';
import { getUser, addUser } from '../../firebase/firestore/user';
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
              const user = await confirmCode(verificationId, '123456');
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
                  likedJobs: [],
                  name: 'test phone',
                  phoneNumber: user.phoneNumber,
                  verified: true
                });
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.signintext3}> test phone number </Text>
        </Pressable>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseApp.options}
        />
      </View>
    </View>
  );
};

export default SigninScreen;
