import React, { useState, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';
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

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        console.log('fml');
        setSignInError("Oops! Incorrect email or password. Try again.");
      });
      console.log('1');
      emailSchema.parse(email);
      console.log('2');
      await signInEmail(email, password);
      console.log('signed in');
      // navigation.navigate('Root', { screen: 'Home' });
    } catch (e) {
      console.log('bruh');
      if (e instanceof z.ZodError) {
        setEmailError("Oops! Invalid email. Try again.");
        console.log('lol');
        console.log(emailError);
        console.log(e.issues);
      }
      console.log(e.message);
      throw e;
    }
  };

  const handleEmailChange = () => {
    setEmail(email);
    setEmailError('');
    setSignInError('');
  };

  const handlePasswordChange = () => {
    setPassword(password);
    setSignInError('');
  };

  const inputContainerStyle = [
    styles.inputContainer,
    (emailError !== ''|| signInError !== '') && { borderColor: 'red' },
  ];

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

        <View style={inputContainerStyle}>
          <Text style={styles.smallText}>Email address </Text>
          <AuthInput
            name="email"
            label="email"
            placeholder=" email@email.com"
            onChangeText={handleEmailChange}
          />
          {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text> }
          <Text style={styles.smallText}>Password </Text>
          <AuthInput
            name="password"
            label="password"
            placeholder=" password"
            onChangeText={handlePasswordChange}
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
