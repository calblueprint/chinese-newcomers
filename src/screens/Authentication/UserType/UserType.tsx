import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { firebaseApp } from '../../../firebase/firebaseApp';
import '../../../translation/i18n';
import StyledButton from '../../../components/StyledButton/StyledButton';
import logo from '../../../assets/cnsc-logo.png';
import { AuthStackScreenProps } from '../../../types/navigation';
import { getAccess, signInPhone, signUpPhoneAdmin } from '../../../firebase/auth';

function signUp(phoneNumber: string) {
  const access = await getAccess(phoneNumber);
  if (access === false) {
    await signInPhone(dispatch, { verificationId, verificationCode });
  } else {
    await signUpPhoneAdmin(verificationId, verificationCode);
    navigation.navigate('UserTypeScreen', { phoneNumber });
  }
}

function UserTypeScreen({ navigation, route }: AuthStackScreenProps<'UserTypeScreen'>) {
  const recaptchaVerifier = useRef(null);
  const { t, i18n } = useTranslation();
  const { phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>{t('chooseTypeScreen.title')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="job seeker"
          onPress={() => navigation.navigate('PhoneNumberScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="Employer"
          onPress={() => navigation.navigate('EmployerScreen')}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
          textStyle={{ color: '#CC433C' }}
        />
        <StyledButton
          text="Admin"
          onPress={() => navigation.navigate('SigninScreen')}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
          textStyle={{ color: '#CC433C' }}
        />
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
      />
    </View>
  );
}
export default UserTypeScreen;
