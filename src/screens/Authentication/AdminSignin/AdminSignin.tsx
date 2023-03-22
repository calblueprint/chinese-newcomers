import React, { useState, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signInEmail } from '../../../firebase/auth';
import logo from '../../../assets/cnsc-logo.png';
import { AuthStackScreenProps } from '../../../types/navigation';

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
  const { signInEmail } = useContext(AuthContext);
  const [emailError, setEmailError] = useState('');
  const [ signInError, setSignInError ] = useState('');
  const auth = getAuth()

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      // signInWithEmailAndPassword(auth, email, password)
      // .catch(error => {
      //   setSignInError("Oops! Incorrect email or password. Try again.");
      // });
      emailSchema.parse(email);
      await signInEmail(email, password);
      // navigation.navigate('Root', { screen: 'Home' });
    } catch (e) {
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
          console.log('bruh')
          setEmailError(
            'Oops! Incorrect email or password. Please try again.',
          );
          break;
        default:
          setSignInError('');
      }
      console.log(e);
      //throw e;
    }
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

  const handlePasswordChange = (password) => {
    setPassword(password);
    setSignInError('');
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
