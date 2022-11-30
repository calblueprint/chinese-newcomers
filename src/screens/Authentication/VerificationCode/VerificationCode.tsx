import React, { useState, useContext } from 'react';
import { Text, View, Image } from 'react-native';
// import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import FormInput from '../../../components/FormInput/FormInput';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { getAccess, signUpPhoneAdmin } from '../../../firebase/auth';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';

const logo = require('../../../assets/cnsc-logo.png');

const VerificationScreen = ({ route, navigation }: any) => {
  interface FormValues {
    phoneNumber: string;
    VerificationCode: string;
  }
  const { ...methods } = useForm();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId, phoneNumber } = route.params;
  const { signInPhone } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const access = await getAccess(phoneNumber);
      if (access === false) {
        await signInPhone(verificationId, verificationCode);
      } else {
        await signUpPhoneAdmin(verificationId, verificationCode);
        navigation.navigate('AdminRegister');
      }
    } catch (e) {
      console.error(e);
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
          <Text style={styles.headingText}>Great! </Text>
          <Text style={styles.subText}>Now, enter the six-digit verification code: </Text>
        </View>
        <View style={styles.verificationContainer}>
          <FormInput placeholder=" 123456" onChangeText={setVerificationCode} />
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton
            text="NEXT"
            onPress={methods.handleSubmit(onSubmit, onError)}
            buttonStyle={{ width: '45%', height: '100%' }}
            textStyle={{}}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default VerificationScreen;
