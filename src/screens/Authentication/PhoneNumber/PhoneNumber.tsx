/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import styles from './styles';
import FormInput from '../../../components/FormInput/FormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { phoneGetConfirmation, confirmCode } from '../../../firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../../firebase/config';
import StyledButton from '../../../components/StyledButton/StyledButton';
// import PhoneInput from 'react-native-phone-number-input';

const logo = require('../../../assets/cnsc-logo.png');

const PhoneNumberScreen = ({ navigation }: any) => {
  const { ...methods } = useForm();
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const verificationId = await phoneGetConfirmation(phoneNumber, recaptchaVerifier);
      console.log(verificationId);
      navigation.navigate('VerificationCode', { verificationId, phoneNumber });
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <FormProvider {...methods}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Enter your phone number: </Text>
          <Text style={styles.subText}>
            We'll send you a six-digit verification code to you via text.{' '}
          </Text>
        </View>
        <View>
          {/* note: PhoneInput instead of TextInput ?  */}
          {/* <PhoneInput
          placeholder=" +14151234567"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          defaultCode="US"
        
        /> */}
          <View style={styles.phonenumberContainer}>
            <FormInput
              placeholder=" +14151234567"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              text="next"
              onPress={methods.handleSubmit(onSubmit, onError)}
              buttonStyle={{ width: '45%', height: '100%' }}
              textStyle={{ fontSize: 16 }}
            />
          </View>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseApp.options}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default PhoneNumberScreen;
