import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '../../../assets/cnsc-logo.png';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUpEmail } from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function EmployerRegisterScreen({
  navigation,
  route,
}: AuthStackScreenProps<'EmployerRegisterScreen'>) {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm<FormValues>();
  const { phoneNumber } = route.params;
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await signUpEmail(dispatch, { email: data.email, password: data.password, phoneNumber });
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
            <AuthInput
              name="businessName"
              label="businessName"
            />
            <Text style={styles.smallText}>Email Address *</Text>
            <AuthInput
              name="email"
              label="email"
            />
            <Text style={styles.smallText}>Phone Number *</Text>
            <AuthInput
              name="phoneNumber"
              label="phoneNumber"
            />
            <Text style={styles.smallText}>Website *</Text>
            <AuthInput
              name="website"
              label="website"
            />
            <Text style={styles.smallText}>Password *</Text>
            <AuthInput
              name="password"
              label="password"
            />
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
