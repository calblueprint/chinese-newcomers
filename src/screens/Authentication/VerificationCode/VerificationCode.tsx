import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import FormInput from '../../../components/FormInput/FormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { phoneGetConfirmation, confirmCode } from '../../../firebase/auth';
import { firebaseApp } from '../../../firebase/config';
import { getUser, addUser } from '../../../firebase/firestore/user';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const logo = require('../../../assets/favicon.png');

const VerificationScreen = ({ route, navigation }: any) => {
  const { user } = useAuthentication();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId } = route.params;

  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.verificationContainer}>
        <Text style={styles.signInText1}>Enter the six-digit code: </Text>
        <FormInput placeholder=" code" onChangeText={(text) => setVerificationCode(text)} />
        <Pressable
          style={styles.nextButton}
          onPress={async () => {
            try {
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
          <Text style={styles.signInText3}> Next </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default VerificationScreen;
