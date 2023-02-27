import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import logo from '../../../assets/cnsc-logo.png';
import { z } from 'zod';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUpEmail } from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';

const emailSchema = z.string().email({ message: "Invalid email address" });

function AdminRegisterScreen({
  navigation,
  route,
}: AuthStackScreenProps<'AdminRegisterScreen'>) {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm<FormValues>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMsg, setErrorMsg] = useState('');
  const { phoneNumber } = route.params;
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      emailSchema.parse(email);
      await signUpEmail(email, password, phoneNumber);
    } catch (e) {
      if (e instanceof z.ZodError) {
        // setErrorText = e.issues
        console.log(e.issues);
      }
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
                onChangeText={setEmail}
              />
              <Text style={styles.smallText}>Create Password </Text>
              <AuthInput
                name="password"
                label="password"
                placeholder=" password"
                onChangeText={setPassword}
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
