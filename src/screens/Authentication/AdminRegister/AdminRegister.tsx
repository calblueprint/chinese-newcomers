import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { z } from 'zod';
import logo from '../../../assets/cnsc-logo.png';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

const emailSchema = z.string().email({ message: 'Invalid email address' });

function AdminRegisterScreen({
  navigation,
  route,
}: AuthStackScreenProps<'AdminRegisterScreen'>) {
  interface FormValues {
    email: string;
    password: string;
  }
  const { signUpEmail } = useContext(AuthContext);
  const { ...methods } = useForm<FormValues>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { phoneNumber } = route.params;
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const auth = getAuth();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      // createUserWithEmailAndPassword(auth, email, password).catch(error => {
      //   setPasswordError(
      //     'Oops! Weak password. Please make sure your password is at least 6 characters.',
      //   );
      // });
      emailSchema.parse(email);
      await signUpEmail(email, password, phoneNumber);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError('Oops! Invalid email. Try again.');
      }
      switch (e.code) {
        case 'auth/weak-password':
          setPasswordError(
            'Oops! Weak password. Please make sure your password is at least 6 characters.',
          );
          break;
        case 'auth/email-already-in-use':
          setEmailError(e.message);
          break;
        default:
          setPasswordError('');
      }
      console.log(e);
      console.log(typeof e);
    }
  };

  const handleEmailChange = email => {
    setEmail(email);
    if (emailError !== '') {
      setEmailError('');
    }
  };

  const handlePasswordChange = password => {
    setPassword(password);
    if (passwordError !== '') {
      setPasswordError('');
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
                hasError={emailError !== ''}
                onChangeText={emailInput => handleEmailChange(emailInput)}
              />
              {emailError !== '' && (
                <Text style={{ color: 'red' }}>{emailError}</Text>
              )}
              <Text style={styles.smallText}>Create Password </Text>
              <AuthInput
                name="password"
                label="password"
                placeholder=" password"
                hasError={passwordError !== ''}
                onChangeText={passInput => handlePasswordChange(passInput)}
              />
              <Text style={styles.smallText}>Verify Password </Text>
              <AuthInput
                name="confirmPassword"
                label="confirmPassword"
                placeholder=" password"
                hasError={passwordError !== ''}
              />
              {passwordError !== '' && (
                <Text style={{ color: 'red' }}>{passwordError}</Text>
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
                text="NEXT"
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
