import React, { useRef } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import styles from '../styles';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseApp } from '../../../firebase/firebaseApp';
import StyledButton from '../../../components/StyledButton/StyledButton';

// import { getAuth, signOut } from "firebase/auth";

const logo = require('../../../assets/favicon.png');

const WelcomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const recaptchaVerifier = useRef(null);

  return (
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
        />

        <Text style={styles.orText}> OR </Text>

        <StyledButton
          text="sign in"
          onPress={() => navigation.navigate('Signin')}
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
};
export default WelcomeScreen;
