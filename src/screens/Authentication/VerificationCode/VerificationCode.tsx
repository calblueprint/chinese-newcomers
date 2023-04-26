import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import logo from '../../../assets/cnsc-logo.png';
import NumberInput from '../../../components/NumberInput/NumberInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import {
  getAccess,
  signInPhone,
  signUpPhoneAdmin,
} from '../../../firebase/auth';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function VerificationScreen({
  route,
  navigation,
}: AuthStackScreenProps<'VerificationScreen'>) {
  interface FormValues {
    phoneNumber: string;
    VerificationCode: string;
  }
  const { ...methods } = useForm<FormValues>();
  const [verificationCode, setVerificationCode] = useState('');
  const { verificationId, phoneNumber } = route.params;
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      const access = await getAccess(phoneNumber);
      if (access === false) {
        await signInPhone(dispatch, { verificationId, verificationCode });
      } else {
        await signUpPhoneAdmin(verificationId, verificationCode);
        navigation.navigate('AdminRegisterScreen', { phoneNumber });
      }
    } catch (e) {
      console.error(e);
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
          <Text style={styles.headingText}>Great! </Text>
          <Text style={styles.subText}>
            Now, enter the six-digit verification code:{' '}
          </Text>
        </View>
        <View style={styles.verificationContainer}>
          <NumberInput
            placeholder=" 123456"
            onChangeText={setVerificationCode}
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
    </View>
  );
}

export default VerificationScreen;
