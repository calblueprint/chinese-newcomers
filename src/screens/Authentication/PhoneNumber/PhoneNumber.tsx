/* eslint-disable react/no-unescaped-entities */
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import React, { useRef, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';
import logo from '../../../assets/cnsc-logo.png';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { phoneGetConfirmation } from '../../../firebase/auth';
import { firebaseApp } from '../../../firebase/config';
import { getActivationStatus } from '../../../firebase/firestore/access';
import globalstyles from '../../../styles/globalstyles';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function PhoneNumberScreen({
  route,
  navigation,
}: AuthStackScreenProps<'PhoneNumberScreen'>) {
  interface FormValues {
    phoneNumber: string;
  }
  const { ...methods } = useForm<FormValues>();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const { userType } = route.params;

  const validatePhoneNumber = () => {
    const countryCode = phoneInput.current?.getCountryCode();
    if (countryCode && isValidNumber(phoneNumber, countryCode)) {
      setPhoneError('');
      return true;
    }
    setPhoneError('Oops! Invalid phone number. Please try again.');
    return false;
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      const validPhoneNumber = validatePhoneNumber();
      // To Do: render error label
      const activated = await getActivationStatus(phoneNumber);
      if (!activated && validPhoneNumber) {
        const verificationId = await phoneGetConfirmation(
          phoneNumber,
          recaptchaVerifier,
        );
        navigation.navigate('VerificationScreen', {
          verificationId,
          phoneNumber,
          userType,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = errors => console.log(errors);

  const handlePhoneChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    if (phoneError !== '') {
      setPhoneError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={globalstyles.logoContainer}>
        <Image source={logo} />
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
              onChangeFormattedText={newPhoneInput =>
                handlePhoneChange(newPhoneInput)
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
    </SafeAreaView>
  );
}

export default PhoneNumberScreen;
