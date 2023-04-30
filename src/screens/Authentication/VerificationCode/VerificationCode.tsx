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
import { signInPhone, signUpPhoneAdmin } from '../../../firebase/auth';
import { getAccess } from '../../../firebase/firestore/access';
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
  const { verificationId, phoneNumber, userType } = route.params;
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      const accessObject = await getAccess(phoneNumber);
      if (!accessObject) {
        // nav to employer or user based on prop
        if (userType === 'employer') {
          console.log('hello');
          navigation.navigate('EmployerRegisterScreen', { phoneNumber });
        }
        if (userType === 'jobSeeker') {
          await signInPhone(dispatch, { verificationId, verificationCode });
        }
      } else {
        // check type of doc, if employer then nav to error
        // if admin: navigate to email password
        if (accessObject.access === 'admin') {
          if (!accessObject.activated) {
            await signUpPhoneAdmin(verificationId, verificationCode);
            navigation.navigate('AdminRegisterScreen', {
              phoneNumber,
              userType: 'admin',
            });
          } else {
            console.log('error state');
          }
        }
        if (accessObject.access === 'employer') {
          // error state
          if (!accessObject.activated) {
            navigation.navigate('AdminRegisterScreen', {
              phoneNumber,
              userType: 'employer',
            });
          } else {
            // error state
          }
        }
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
