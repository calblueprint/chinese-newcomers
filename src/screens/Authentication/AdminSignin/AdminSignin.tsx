import React, { useState, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signInEmail } from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';

const emailSchema = z.string().email();

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
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      emailSchema.parse(email);
      await signInEmail(email, password);
      console.log('signed in');
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors);

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
            onChangeText={setEmail}
          />
          <Text style={styles.smallText}>Password </Text>
          <AuthInput
            name="password"
            label="password"
            placeholder=" password"
            onChangeText={setPassword}
            secureTextEntry
          />
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
