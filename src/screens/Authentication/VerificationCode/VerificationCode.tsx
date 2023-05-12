import React, { useContext, useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/cnsc-logo.png';
import Back from '../../../assets/left-back.svg';
import NumberInput from '../../../components/NumberInput/NumberInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signInPhone, signUpPhoneAdmin } from '../../../firebase/auth';
import { getAccess } from '../../../firebase/firestore/access';
import globalstyles from '../../../styles/globalstyles';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';
import { checkEmployerRequest } from '../../../firebase/firestore/employerRequest';
import { errorTypes } from '../EmployerSignupError/AuthErrorScreen';

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
          // handle case here if we have already sent employer request 
          if (!await checkEmployerRequest(phoneNumber)) {
            navigation.navigate('EmployerRegisterScreen', { phoneNumber });
          } else {
            navigation.navigate("AuthErrorScreen", { errorText: errorTypes.employerRequestAlreadySent} );
          }
        }
        if (userType === 'jobSeeker') {
          await signInPhone(dispatch, { verificationId, verificationCode });
        }
      } else {
        // check type of doc, if employer then nav to error
        // if admin: navigate to email password
        if (accessObject.access === 'admin') {
          await signUpPhoneAdmin(verificationId, verificationCode);
          navigation.navigate('EmailPasswordRegisterScreen', {
            phoneNumber,
            userType: 'admin',
          });
        }
        if (accessObject.access === 'employer') {
          navigation.navigate('EmailPasswordRegisterScreen', {
            phoneNumber,
            userType: 'employer',
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={globalstyles.logoContainer}>
        <Image source={logo} />
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
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <View style={styles.svgContainer}>
              <Back />
            </View>
            <Text style={styles.backText}> Back</Text>
          </Pressable>
          <StyledButton
            text="NEXT"
            onPress={methods.handleSubmit(onSubmit, onError)}
            buttonStyle={{ width: '45%', height: '100%' }}
            textStyle={{}}
          />
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

export default VerificationScreen;
