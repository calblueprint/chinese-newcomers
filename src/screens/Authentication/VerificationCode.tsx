import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { firebaseApp } from '../../firebase/config';
import { getUser, addUser } from '../../firebase/firestore/user';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

// const auth = getAuth();
const logo = require('../../assets/favicon.png');

const VerificationScreen = ({ route, navigation }: any) => {
  const { user } = useAuthentication();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId } = route.params;

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signintext1}>Enter the six-digit code: </Text>
        <TextInput
          style={styles.input}
          placeholder=" code"
          onChangeText={(text) => setVerificationCode(text)}
        />
        <Pressable
          style={styles.signinbutton}
          onPress={async () => {
            try {
              // case 1: real phone number, working to send code
              // const verificationId = await phoneGetConfirmation('+12014076687', recaptchaVerifier);

              // case 2: fake phone number and code from firebase, working
              const user = await confirmCode(verificationId, verificationCode);
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
          <Text style={styles.signintext3}> test phone number </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default VerificationScreen;
