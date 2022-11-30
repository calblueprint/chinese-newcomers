import { React, useState, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { getAuth } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import AuthInput from '../../../components/AuthInput/AuthInput';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const auth = getAuth();

const logo = require('../../../assets/cnsc-logo.png');

const AdminSigninScreen = ({ navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { ...methods } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmail } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signInEmail(email, password);
      console.log('signed in');
      // navigation.navigate('Root', { screen: 'Home' });
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

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
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <StyledButton
            text="log in"
            onPress={methods.handleSubmit(onSubmit, onError)}
            buttonStyle={{ height: '100%', width: '100%' }}
            textStyle={{}}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default AdminSigninScreen;
