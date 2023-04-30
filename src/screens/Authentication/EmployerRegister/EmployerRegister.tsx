import React, { useContext } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '../../../assets/cnsc-logo.png';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { createEmployerRequest } from '../../../firebase/firestore/employerRequest';
import { AuthStackScreenProps } from '../../../types/navigation';
import { EmployerRequest } from '../../../types/types';
import styles from './styles';

function EmployerRegisterScreen({
  navigation,
  route,
}: AuthStackScreenProps<'EmployerRegisterScreen'>) {
  interface FormValues {
    phoneNumber: string;
    password: string;
  }
  const { ...methods } = useForm<FormValues>();
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<EmployerRequest> = async data => {
    try {
      // send request
      const request: EmployerRequest = { ...data };
      await createEmployerRequest(request);
      navigation.navigate('WelcomeScreen');
    } catch (e) {
      console.error(e);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.form}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <FormProvider {...methods}>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Sign up</Text>
            <Text style={styles.subText}>
              Create an account to start creating and posting jobs!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.smallText}>Name of Business *</Text>
            <AuthInput name="businessName" label="businessName" />
            <Text style={styles.smallText}>Phone Number *</Text>
            <AuthInput name="phoneNumber" label="phoneNumber" />
            <Text style={styles.smallText}>Website *</Text>
            <AuthInput name="website" label="website" />
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              text="Submit"
              onPress={methods.handleSubmit(onSubmit, onError)}
              buttonStyle={{ width: '45%', height: '100%' }}
              textStyle={{}}
            />
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default EmployerRegisterScreen;
