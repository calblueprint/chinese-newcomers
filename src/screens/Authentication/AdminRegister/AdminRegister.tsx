import React, { useState, useContext } from 'react';
import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { z } from 'zod';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthStackScreenProps } from '../../../types/navigation';
import logo from '../../../assets/cnsc-logo.png';

const emailSchema = z.string().email({ message: "Invalid email address" });

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

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .catch(error => {
        setPasswordError("Oops! Weak password. Please make sure your password is at least 6 characters.");
      });
      console.log('Parsed password')
      emailSchema.parse(email);
      await signUpEmail(email, password, phoneNumber);
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.log("e is a zoderror! email was", email)
        setEmailError("Oops! Invalid email. Try again.");
      } 
      console.log("general error e", e);
    }
  };

  const handleEmailChange = (email) => {
    console.log("handleEmailChange, email is", email)
    setEmail(email);
    setEmailError('');
  };

  const handlePasswordChange = (password) => {
    console.log("handlePasswordChange, password is", password)
    setPassword(password);
    setPasswordError('');
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

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
                hasError={emailError!==''}
                onChangeText = {(emailInput) => handleEmailChange(emailInput)}
              />
              <Text style={styles.smallText}>Create Password </Text>
              <AuthInput
                name="password"
                label="password"
                placeholder=" password"
                hasError={passwordError!==''}
                onChangeText = {(passInput) => handlePasswordChange(passInput)}
              />
              <Text style={styles.smallText}>Verify Password </Text>
              <AuthInput 
              name="confirmPassword" 
              label="confirmPassword" 
              placeholder=" password" 
              hasError={passwordError!==''}
              />
              {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text> }
              {passwordError !== '' && <Text style={{ color: 'red' }}>{passwordError}</Text> }
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
