import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import styles from './styles';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../../firebase/firebaseApp';
import { getUser, addUser } from '../../../firebase/firestore/user';
// import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import '../../../translation/i18n';
import StyledButton from '../../../components/StyledButton/StyledButton';

const logo = require('../../../assets/cnsc-logo.png');

const WelcomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);
  const { t, i18n } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>{t('welcomePage.welcome')}</Text>
        <Text style={styles.subText}>{t('welcomePage.setUp')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text={t('welcomePage.signUp')}
          onPress={() => navigation.navigate('PhoneNumberRegister')}
          buttonStyle={{}}
          textStyle={{}}
          activeOpacity={{}}
        />

        <Text style={styles.orText}> {t('welcomePage.or')} </Text>

        <StyledButton
          text={t('welcomePage.signIn')}
          onPress={() => navigation.navigate('Signin')}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
          textStyle={{ color: '#CC433C' }}
          activeOpacity={{}}
        />
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
      />
    </View>
  );
};
export default WelcomeScreen;
