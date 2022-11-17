import { React, useState } from 'react';
import { TextInput, Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { getAuth } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import FormInput from '../../../components/JobPostFormInput/JobPostFormInput';
import { adminSignInWithEmailAndPassword } from '../../../firebase/auth';

const auth = getAuth();

const logo = require('../../../assets/favicon.png');

const AdminSigninScreen = ({ navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await adminSignInWithEmailAndPassword(email, password);
      console.log('signed in');
      navigation.navigate('Root', { screen: 'Home' });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...methods}>
        <View style={styles.container}>
          <Text style={styles.signInText1}>Sign in here. </Text>
          <Text style={styles.signInText2}>Email </Text>
          <FormInput
            name="email"
            label="email"
            placeholder=" email@email.com"
            onChangeText={setEmail}
          />
          <Text style={styles.signInText2}>Password </Text>
          <FormInput
            name="password"
            label="password"
            placeholder=" password"
            onChangeText={setPassword}
          />

          <Pressable style={styles.nextButton} onPress={methods.handleSubmit(onSubmit)}>
            <Text style={styles.signInText3}> Log in </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default AdminSigninScreen;
