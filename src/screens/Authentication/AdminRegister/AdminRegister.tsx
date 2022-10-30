import React from 'react';
import { TextInput, Text, View, Image, Pressable } from 'react-native';
// import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import styles from './styles';
import FormInput from '../../../components/FormInput/FormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

const auth = getAuth();

const logo = require('../../../assets/favicon.png');

const AdminRegisterScreen = ({ navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...register } = useForm();

  // To Do: const onSubmit: SubmitHandler<FormValues> = async (data) => {
  // try {
  // await signInWithEmailAndPassword(data.email, data.password);
  // signInwithEmailAndPassword firebase auth function
  // navigation.navigate('')
  // } catch (e) {
  // console.error(e.message);
  // }
  // };

  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...register}>
        <View style={styles.container}>
          <Text style={styles.signInText1}>
            Great! Now enter your email and create a password.{' '}
          </Text>
          <Text style={styles.signInText2}>Email </Text>
          <FormInput placeholder=" email@email.com" />
          <Text style={styles.signInText2}>Create Password </Text>
          <FormInput placeholder=" password" />
          <Text style={styles.signInText2}>Repeat Password </Text>
          <FormInput placeholder=" password" />
          <Pressable
            style={styles.nextButton}
            // onPress={register.handleSubmit(onSubmit)}
          >
            <Text style={styles.signInText3}> Next </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default AdminRegisterScreen;
