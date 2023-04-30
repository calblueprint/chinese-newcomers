import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import React, { useRef } from 'react';
import { Image, Text, View } from 'react-native';
import logo from '../../../assets/cnsc-logo.png';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { firebaseApp } from '../../../firebase/firebaseApp';
import '../../../translation/languages';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function WelcomeScreen({ navigation }: AuthStackScreenProps<'WelcomeScreen'>) {
  const recaptchaVerifier = useRef(null);

  const [langModalVisibile, setLangModalVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subText}>
          Chinese Newcomers Service Center Job Portal
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="SIGN UP"
          onPress={() => navigation.navigate('UserTypeScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />

        <Text style={styles.orText}> OR </Text>

        <StyledButton
          text="SIGN IN"
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
