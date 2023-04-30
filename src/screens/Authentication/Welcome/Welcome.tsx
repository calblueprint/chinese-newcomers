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

function WelcomeScreen({ navigation }: AuthStackScreenProps<'WelcomeScreen'>) {
  const recaptchaVerifier = useRef(null);
  const { t, i18n } = useTranslation();

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
          onPress={() => navigation.navigate('UserTypeScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />

        <Text style={styles.orText}> {t('welcomePage.or')} </Text>

        <StyledButton
          text={t('welcomePage.signIn')}
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
export default WelcomeScreen;
