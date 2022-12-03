import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import styles from './styles';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../../firebase/firebaseApp';
<<<<<<< HEAD
import { getUser, addUser } from '../../../firebase/firestore/user';
// import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import '../../../translation/i18n';
=======
import StyledButton from '../../../components/StyledButton/StyledButton';
>>>>>>> 50d5333d3b782abbc5ca7e85572779525a6a6539

const logo = require('../../../assets/cnsc-logo.png');

const WelcomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);
  const { t, i18n } = useTranslation();
  // t is a function that accepts key (from json) as parameter and returns apprporiate text based on selected language
  // i18n is an object containing changeLangauage(LANG) function that can be used with a button
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
<<<<<<< HEAD
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signInText1}>
          {/* Welcome to the Chinese Newcomers Service Center job portal! */}
          {t('welcomePage.welcome')}
        </Text>
        <Text style={styles.signInText2}>Let's get your account set up.</Text>

        <Pressable
          style={styles.signInButton}
          onPress={() => navigation.navigate('PhoneNumberRegister')}>
          <Text style={styles.signInText3}> {t('welcomePage.signUp')} </Text>
          {/* <Text style={styles.signInText3}> SIGN UP </Text> */}
        </Pressable>

        <Pressable style={styles.signInButton} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signInText3}> {t('welcomePage.signIn')} </Text>
          {/* <Text style={styles.signInText3}> SIGN IN </Text> */}
        </Pressable>
=======
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Welcome to the Chinese Newcomers Service Center job portal!
        </Text>
        <Text style={styles.subText}>Let's get your account set up.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="sign up"
          onPress={() => navigation.navigate('PhoneNumberRegister')}
          buttonStyle={{}}
          textStyle={{}}
          activeOpacity={{}}
        />

        <Text style={styles.orText}> OR </Text>
>>>>>>> 50d5333d3b782abbc5ca7e85572779525a6a6539

        <StyledButton
          text="sign in"
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
