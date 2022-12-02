import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
// import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import FormInput from '../../../components/FormInput/FormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import {
  phoneGetConfirmation,
  confirmCode,
  logInOrRegisterWithPhoneNumber,
  getAccess,
  signUpPhoneAdmin
} from '../../../firebase/auth';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseApp } from '../../../firebase/config';
import { getUser, addUser } from '../../../firebase/firestore/user';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthContext } from '../../../context/AuthContext';

const logo = require('../../../assets/favicon.png');

const VerificationScreen = ({ route, navigation }: any) => {
  interface FormValues {
    phoneNumber: string;
    VerificationCode: string;
  }
  const { ...methods } = useForm();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId, phoneNumber } = route.params;
  const { signInPhone } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const access = await getAccess(phoneNumber);
      if (access === false) {
        await signInPhone(verificationId, verificationCode);
      } else {
        await signUpPhoneAdmin(verificationId, verificationCode);
        navigation.navigate('AdminRegister', { phoneNumber });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...methods}>
        <View style={styles.verificationContainer}>
          <Text style={styles.signInText1}>Enter the six-digit code: </Text>
          <FormInput placeholder=" code" onChangeText={setVerificationCode} />
          <Pressable style={styles.nextButton} onPress={methods.handleSubmit(onSubmit)}>
            <Text style={styles.signInText3}> Next </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default VerificationScreen;
