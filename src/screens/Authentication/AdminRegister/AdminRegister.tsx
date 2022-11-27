import { React, useState, useContext } from 'react';
import { TextInput, Text, View, Image, Pressable } from 'react-native';
// import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import { registerWithEmailAndPassword } from '../../../firebase/auth';
import styles from './styles';
// import FormInput from '../../../components/FormInput/FormInput';
import FormInput from '../../../components/JobPostFormInput/JobPostFormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthContext';

const auth = getAuth();

const logo = require('../../../assets/favicon.png');

const AdminRegisterScreen = ({ navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { signUpEmail } = useContext(AuthContext);
  const { ...methods } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signUpEmail(email, password);
    } catch (e) {
      console.error(e);
    }
  };
  // To Do: change form inputs to different component
  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...methods}>
        <View style={styles.container}>
          <Text style={styles.signInText1}>
            Great! Now enter your email and create a password.{' '}
          </Text>
          <Text style={styles.signInText2}>Email </Text>
          <FormInput
            name="email"
            label="email"
            placeholder=" email@email.com"
            onChangeText={setEmail}
          />
          <Text style={styles.signInText2}>Create Password </Text>
          <FormInput
            name="password"
            label="password"
            placeholder=" password"
            onChangeText={setPassword}
          />
          <Text style={styles.signInText2}>Repeat Password </Text>
          <FormInput name="confirmPassword" label="confirmPassword" placeholder=" password" />
          <Pressable style={styles.nextButton} onPress={methods.handleSubmit(onSubmit)}>
            <Text style={styles.signInText3}> Next </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default AdminRegisterScreen;
