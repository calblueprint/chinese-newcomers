import { React, useState, useContext } from 'react';
import { Text, View, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { getAuth } from 'firebase/auth';
import styles from './styles';
import AuthInput from '../../../components/AuthInput/AuthInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';

const auth = getAuth();

const logo = require('../../../assets/cnsc-logo.png');

const AdminRegisterScreen = ({ route, navigation }: any) => {
  interface FormValues {
    email: string;
    password: string;
  }
  const { signUpEmail } = useContext(AuthContext);
  const { ...methods } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { phoneNumber } = route.params;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signUpEmail(email, password, phoneNumber);
    } catch (e) {
      console.error(e);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  const onBack: any = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyboardviewContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <FormProvider {...methods}>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Great! </Text>
              <Text style={styles.subText}>Now, enter your email & create a password: </Text>
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
              <AuthInput name="confirmPassword" label="confirmPassword" placeholder=" password" />
            </View>
            <View style={styles.buttonContainer}>
              <StyledButton
                text="back"
                onPress={onBack}
                buttonStyle={{
                  width: '45%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CC433C'
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
};

export default AdminRegisterScreen;
