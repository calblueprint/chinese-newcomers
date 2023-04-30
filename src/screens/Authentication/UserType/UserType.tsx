import React, { useContext, useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { firebaseApp } from '../../../firebase/firebaseApp';
import '../../../translation/i18n';
import StyledButton from '../../../components/StyledButton/StyledButton';
import logo from '../../../assets/cnsc-logo.png';
import { AuthStackScreenProps } from '../../../types/navigation';
import { signInPhone, signUpPhoneAdmin } from '../../../firebase/auth';
import { getAccess } from '../../../firebase/firestore/access';
import { AuthContext } from '../../../context/AuthContext';

function UserTypeScreen({ navigation }: AuthStackScreenProps<'UserTypeScreen'>) {
  const recaptchaVerifier = useRef(null);
  const { t, i18n } = useTranslation();
  const { dispatch } = useContext(AuthContext);

  // async function signUp() {
  //   const accessObject = await getAccess(phoneNumber);
  //   if (!accessObject) {
  //     await signInPhone(dispatch, { verificationId, verificationCode });
  //   } else {
  //     await signUpPhoneAdmin(verificationId, verificationCode);
  //     const nextScreen = (accessObject.access == "employer") ? "EmployerRegisterScreen" : "AdminRegisterScreen";
  //     navigation.navigate(nextScreen, { phoneNumber });
  //   }
  // }

  function phoneNumberNavigate(type: string) {
    navigation.navigate('PhoneNumberScreen', { userType: type })
  }

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
          onPress={() => phoneNumberNavigate("jobSeeker")}
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="Employer"
          onPress={() => phoneNumberNavigate("employer")}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
          textStyle={{ color: '#CC433C' }}
        />
        <StyledButton
          text="Admin"
          onPress={() => phoneNumberNavigate("admin")}
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
