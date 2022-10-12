import React from 'react';
import { TextInput, Text, View, Image, Pressable } from 'react-native';
// import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import styles from './styles';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

const auth = getAuth();

const logo = require('../../assets/favicon.png');

const AdminRegisterScreen = ({ navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...register } = useForm();

  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  // try {
  // await signInWithEmailAndPassword(data.email, data.password);
  // signInwithEmailAndPassword firebase auth function
  // navigation.navigate('')
  // } catch (e) {
  // console.error(e.message);
  // }
  // };

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...register}>
        <View style={styles.container}>
          <Text style={styles.signintext1}>
            Great! Now enter your email and create a password.{' '}
          </Text>
          <Text style={styles.signintext2}>Email </Text>
          <TextInput style={styles.input} placeholder=" email@email.com" />
          <Text style={styles.signintext2}>Create Password </Text>
          <TextInput style={styles.input} placeholder=" password" />
          <Text style={styles.signintext2}>Repeat Password </Text>
          <TextInput style={styles.input} placeholder=" password" />
          <Pressable
            style={styles.nextbutton}
            // onPress={register.handleSubmit(onSubmit)}
          >
            <Text style={styles.signintext3}> Next </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default AdminRegisterScreen;
