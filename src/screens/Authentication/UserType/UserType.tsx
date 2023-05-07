import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import React, { useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/cnsc-logo.png';
import Back from '../../../assets/left-back.svg';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { firebaseApp } from '../../../firebase/firebaseApp';
import '../../../translation/languages';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function UserTypeScreen({
  navigation,
}: AuthStackScreenProps<'UserTypeScreen'>) {
  const recaptchaVerifier = useRef(null);

  function phoneNumberNavigate(type: string) {
    navigation.navigate('PhoneNumberScreen', { userType: type });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Who Are You?</Text>
        <Text style={styles.subText}>Choose your account type</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="Job Seeker"
          onPress={() => phoneNumberNavigate('jobSeeker')}
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="Employer"
          onPress={() => phoneNumberNavigate('employer')}
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="Admin"
          onPress={() => phoneNumberNavigate('admin')}
          buttonStyle={{}}
          textStyle={{}}
        />
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButtonContainer}
      >
        <View style={styles.svgContainer}>
          <Back />
        </View>
        <Text style={styles.backText}> Back</Text>
      </Pressable>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
      />
    </SafeAreaView>
  );
}
export default UserTypeScreen;
