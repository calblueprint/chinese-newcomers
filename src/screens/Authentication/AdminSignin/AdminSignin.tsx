import React, { useContext, useState } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { z } from 'zod';
import logo from '../../../assets/cnsc-logo.png';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signInEmail } from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

const emailSchema = z.string().email({ message: "Oops! Invalid email. Try again." });

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
  const [ signInError, setSignInError ] = useState('');
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      emailSchema.parse(email);
      console.log("hellooooooo")
      await signInEmail(dispatch, { email, password });
      console.log("wtf")
      // navigation.navigate('Root', { screen: 'Home' });
    } catch (e) {
      // console.log("wtf")
      if (e instanceof z.ZodError) {
        setEmailError("Oops! Invalid email. Try again.");
      }
      switch (e.code) {
        case 'auth/wrong-password':
          setSignInError(
            'Oops! Incorrect password. Please try again.',
          );
          break;
        case 'auth/user-not-found':
          setEmailError(
            'Oops! Incorrect email or password. Please try again.',
          );
          break;
        case 'auth/missing-email':
          setEmailError(
            'Oops! Email is not registered as admin.',
          );
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

  const handlePasswordChange = (password) => {
    setPassword(password);
    setSignInError('');
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (emailError !== '') {
      setEmailError('');
    }
    if (signInError !== '') {
      setSignInError('');
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <FormProvider {...methods}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Sign in here. </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.smallText}>Email address </Text>
          <AuthInput
            name="email"
            label="email"
            placeholder=" email@email.com"
            hasError={(emailError !== ''|| signInError !== '')}
            onChangeText={(emailInput) => handleEmailChange(emailInput)}
          />
          {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text> }
          <Text style={styles.smallText}>Password </Text>
          <AuthInput
            name="password"
            label="password"
            placeholder=" password"
            hasError={(emailError !== ''|| signInError !== '')}
            onChangeText={(passInput) => handlePasswordChange(passInput)}
            secureTextEntry
          />
          {signInError !== '' && <Text style={{ color: 'red' }}>{signInError}</Text> }
        </View>

        <View style={styles.buttonContainer}>
          <StyledButton
            text="log in"
            onPress={methods.handleSubmit(onSubmit, onError)}
            buttonStyle={{ height: '100%', width: '100%' }}
            textStyle={{}}
          />
          <StyledButton
            text="back"
            onPress={() => navigation.goBack()}
            buttonStyle={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFFFF',
              borderColor: '#CC433C',
            }}
            textStyle={{ fontSize: 16, color: '#CC433C' }}
          />
        </View>
      </FormProvider>
    </View>
  );
}

export default AdminSigninScreen;
