import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
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
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.signInText1}>
          Welcome to the Chinese Newcomers Service Center job portal!
        </Text>
        <Text style={styles.signInText2}>Let's get your account set up.</Text>
        <StyledButton
          text="sign up"
          onPress={() => navigation.navigate('PhoneNumberRegister')}
          buttonStyle={{}}
          textStyle={{}}
        />

        <Text> OR </Text>

        <StyledButton
          text="sign in"
          onPress={() => navigation.navigate('Signin')}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
          textStyle={{ color: '#CC433C' }}
        />

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseApp.options}
        />
      </View>
    </View>
  );
};
export default WelcomeScreen;
