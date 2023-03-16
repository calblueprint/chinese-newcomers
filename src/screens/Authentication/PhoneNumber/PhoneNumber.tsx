/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { Text, View, Image } from 'react-native';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import PhoneInput from 'react-native-phone-number-input';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';
import {
  phoneGetConfirmation,
  getActivationStatus,
} from '../../../firebase/auth';
import { firebaseApp } from '../../../firebase/config';
import StyledButton from '../../../components/StyledButton/StyledButton';

const logo = require('../../../assets/cnsc-logo.png');

function PhoneNumberScreen({
  navigation,
}: AuthStackScreenProps<'PhoneNumberScreen'>) {
  interface FormValues {
    phoneNumber: string;
  }

  const { ...methods } = useForm();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      const validatePhoneNumber = () => {
        const regexp =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (regexp.test(phoneNumber)) {
          setPhoneError('');
        }
        setPhoneError('Oops! Invalid phone number. Please try again.');
      };
      const checkValid = validatePhoneNumber();
      console.log(valid);
      setValid(checkValid ?? false);
      // To Do: render error label
      const activated = await getActivationStatus(phoneNumber);
      if (!activated && valid) {
        const verificationId = await phoneGetConfirmation(
          phoneNumber,
          recaptchaVerifier,
        );
        console.log(verificationId);
        navigation.navigate('VerificationScreen', {
          verificationId,
          phoneNumber,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = errors => console.log(errors);

  const handlePhoneChange = phoneNumber => {
    setPhoneNumber(phoneNumber);
    if (phoneError !== '') {
      setPhoneError('');
    }
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
          <View style={styles.phonenumberContainer}>
            <PhoneInput
              ref={phoneInput}
              placeholder="4151234567"
              defaultValue={phoneNumber}
              onChangeFormattedText={
                newPhoneInput => handlePhoneChange(newPhoneInput)
                //   text => {
                //   //setPhoneNumber(text);
                // }
              }
              defaultCode="US"
            />
            {phoneError !== '' && (
              <Text style={{ color: 'red' }}>{phoneError}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              text="back"
              onPress={() => navigation.goBack()}
              buttonStyle={{
                width: '45%',
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderColor: '#CC433C',
              }}
              textStyle={{ fontSize: 16, color: '#CC433C' }}
            />
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
}

export default PhoneNumberScreen;
