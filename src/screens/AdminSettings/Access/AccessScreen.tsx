/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';
import StyledButton from '../../../components/StyledButton/StyledButton';
import {
  addAccess,
  getActivationStatus,
} from '../../../firebase/firestore/access';
import styles from './Styles';

import { AdminSettingsStackScreenProps } from '../../../types/navigation';

function AccessScreen({
  navigation,
}: AdminSettingsStackScreenProps<'AccessScreen'>) {
  interface FormValues {
    phoneNumber: string;
  }
  const { ...methods } = useForm<FormValues>();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [userType, setUserType] = useState('');

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      topOffset: 50,
      text1: 'Phone number submitted!', // TODO: Change text styling to increase visibility
      visibilityTime: 2000,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
      setValid(checkValid ?? false);
      // To Do: render error label
      const activated = await getActivationStatus(phoneNumber);
      if (!activated && userType !== '' && valid) {
        await addAccess(phoneNumber, userType);
        showSuccessToast();
      }
      console.log(valid);
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = errors => console.log(errors);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <FormProvider {...methods}>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>
              Invite an Admin or Employer to the app!
            </Text>
            <Text style={styles.subText}>
              We'll send them an invite over text.{' '}
            </Text>
          </View>
          <View>
            <View style={styles.phonenumberContainer}>
              <PhoneInput
                ref={phoneInput}
                placeholder="4151234567"
                defaultValue={phoneNumber}
                onChangeFormattedText={text => {
                  setPhoneNumber(text);
                }}
                defaultCode="US"
              />
            </View>
            <Text style={styles.subTextRadio}>Choose a user type:</Text>
            <View style={styles.buttonContainer}>
              <StyledButton
                text="admin"
                buttonStyle={
                  userType === 'admin'
                    ? styles.selectedRadioButton
                    : styles.unselectedRadioButton
                }
                onPress={() => setUserType('admin')}
                textStyle={
                  userType === 'admin'
                    ? { fontSize: 16 }
                    : styles.selectedTextStyle
                }
              />
              <StyledButton
                text="employer"
                buttonStyle={
                  userType === 'employer'
                    ? styles.selectedRadioButton
                    : styles.unselectedRadioButton
                }
                onPress={() => setUserType('employer')}
                textStyle={
                  userType === 'employer'
                    ? { fontSize: 16 }
                    : styles.selectedTextStyle
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <StyledButton
                text="Submit"
                onPress={methods.handleSubmit(onSubmit, onError)}
                buttonStyle={{ width: '45%', height: '100%', marginTop: '5%' }}
                textStyle={{ fontSize: 16 }}
              />
            </View>
          </View>
        </FormProvider>
      </View>
      <Toast />
    </View>
  );
}

export default AccessScreen;
