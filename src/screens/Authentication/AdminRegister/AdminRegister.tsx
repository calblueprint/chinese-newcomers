import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import logo from '../../../assets/cnsc-logo.png';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUpEmail } from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function AdminRegisterScreen({
  navigation,
  route,
}: AuthStackScreenProps<'AdminRegisterScreen'>) {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm<FormValues>();
  const { phoneNumber } = route.params;
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await signUpEmail(dispatch, { email: data.email, password: data.password, phoneNumber});
    } catch (e) {
      console.error(e);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors);

  return (
    <View style={styles.container}>
      <View style={styles.keyboardviewContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          contentContainerStyle={styles.container}
        >
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <FormProvider {...methods}>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Great! </Text>
              <Text style={styles.subText}>
                Now, enter your email & create a password:{' '}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.smallText}>Email address</Text>
              <AuthInput
                name="email"
                label="email"
                placeholder=" email@email.com"
              />
              <Text style={styles.smallText}>Create Password </Text>
              <AuthInput
                name="password"
                label="password"
                placeholder=" password"
              />
              <Text style={styles.smallText}>Verify Password </Text>
              <AuthInput
                name="confirmPassword"
                label="confirmPassword"
                placeholder=" password"
              />
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
                text="Submit"
                onPress={methods.handleSubmit(onSubmit, onError)}
                buttonStyle={{ width: '45%', height: '100%' }}
                textStyle={{}}
              />
            </View>
          </FormProvider>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default AdminRegisterScreen;
