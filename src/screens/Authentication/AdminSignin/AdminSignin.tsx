import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import logo from '../../../assets/cnsc-logo.png';
import Back from '../../../assets/left-back.svg';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signInEmail } from '../../../firebase/auth';
import globalstyles from '../../../styles/globalstyles';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

const emailSchema = z
  .string()
  .email({ message: 'Oops! Invalid email. Try again.' });

function AdminSigninScreen({
  navigation,
}: AuthStackScreenProps<'AdminSigninScreen'>) {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm<FormValues>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [signInError, setSignInError] = useState('');
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      emailSchema.parse(email);
      await signInEmail(dispatch, { email, password });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError('Oops! Invalid email. Try again.');
      }
      switch (e.code) {
        case 'auth/wrong-password':
          setSignInError('Oops! Incorrect password. Please try again.');
          break;
        case 'auth/user-not-found':
          setEmailError('Oops! Incorrect email or password. Please try again.');
          break;
        case 'auth/missing-email':
          setEmailError('Oops! Email is not registered as admin.');
          break;
        default:
          setSignInError('');
      }
      console.log(e);
    }
    if (signInError !== '') {
      setSignInError('');
    }
  };

  const handlePasswordChange = password => {
    setPassword(password);
    setSignInError('');
  };

  const handleEmailChange = email => {
    setEmail(email);
    if (emailError !== '') {
      setEmailError('');
    }
    if (signInError !== '') {
      setSignInError('');
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={globalstyles.logoContainer}>
        <Image source={logo} />
      </View>
      <FormProvider {...methods}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Log in here. </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.smallText}>Email address </Text>
          <AuthInput
            name="email"
            label="email"
            placeholder=" email@email.com"
            hasError={emailError !== '' || signInError !== ''}
            onChangeText={emailInput => handleEmailChange(emailInput)}
          />
          {emailError !== '' && (
            <Text style={{ color: 'red' }}>{emailError}</Text>
          )}
          <Text style={styles.smallText}>Password </Text>
          <AuthInput
            name="password"
            label="password"
            placeholder=" password"
            hasError={emailError !== '' || signInError !== ''}
            onChangeText={passInput => handlePasswordChange(passInput)}
            secureTextEntry
          />
          {signInError !== '' && (
            <Text style={{ color: 'red' }}>{signInError}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <StyledButton
            text="log in"
            onPress={methods.handleSubmit(onSubmit, onError)}
            buttonStyle={{ height: 60, width: 310 }}
            textStyle={{}}
          />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <View style={styles.svgContainer}>
              <Back />
            </View>
            <Text style={styles.backText}> Back</Text>
          </Pressable>
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

export default AdminSigninScreen;
