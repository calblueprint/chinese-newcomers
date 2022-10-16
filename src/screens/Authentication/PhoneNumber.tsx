/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { phoneGetConfirmation, confirmCode } from '../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../firebase/config';
import { getUser, addUser } from '../../firebase/firestore/user';

// const auth = getAuth();
const logo = require('../../assets/favicon.png');

const PhoneNumberScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);
  // const { ...phonenumber } = useForm();
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signintext1}>Enter your phone number: </Text>
        <Text style={styles.signintext2}>
          You'll receive a six-digit verification code to enter.{' '}
        </Text>
        <TextInput
          style={styles.input}
          placeholder=" phone number"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        {/* <Pressable
          style={styles.nextbutton}
          // onPress={register.handleSubmit(onSubmit)}
        >
          <Text style={styles.signintext3}> Next </Text>
        </Pressable> */}
        <Pressable
          style={styles.signinbutton}
          onPress={async () => {
            try {
              // case 1: real phone number, working to send code
              // const verificationId = await phoneGetConfirmation('+12014076687', recaptchaVerifier);

              // case 2: fake phone number and code from firebase, working
              const verificationId = await phoneGetConfirmation(phoneNumber, recaptchaVerifier);
              console.log(verificationId);
              navigation.navigate('VerificationCode', { verificationId });
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

export default PhoneNumberScreen;
