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
  getAccess
} from '../../../firebase/auth';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseApp } from '../../../firebase/config';
import { getUser, addUser } from '../../../firebase/firestore/user';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthContext } from '../../../context/authContext';

const logo = require('../../../assets/favicon.png');

const VerificationScreen = ({ route, navigation }: any) => {
  interface FormValues {
    phoneNumber: string;
    VerificationCode: string;
  }
  const auth = getAuth();
  const { ...methods } = useForm();
  const { user } = useAuthentication();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId } = route.params;
  const { signIn } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const user = await confirmCode(verificationId, verificationCode);
      const access = await getAccess(user.phoneNumber);
      if (access === false) {
        await logInOrRegisterWithPhoneNumber(user);
      } else {
        navigation.navigate('AdminRegister');
      }
    } catch (e) {
      console.error(e.message);
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
