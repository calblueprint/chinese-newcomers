import React from 'react';
import { Text, View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import '../../../translation/languages';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

export const errorTypes = {
  "employerRequestAlreadySent" : "You have already sent a request for employer access! CNSC will reach out before granting you access.",
  "employerAlreadyActivated": "It seems like you have already completed registration as an employer/admin. Please reach out to CNSC if you think this is a mistake!",
  "employerRequestPending": "Your employer request is now pending! A CNSC admin may reach out to you shortly to verify your information — if they approve your request, you will need to sign up as an employer once again to complete the registration process."
}

function AuthErrorScreen({ route, navigation }: AuthStackScreenProps<'AuthErrorScreen'>) {

  const { errorText } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subText}>
          {errorText}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="Return to Welcome Screen"
          onPress={() => navigation.navigate('WelcomeScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />
      </View>
    </View>
  );
}
export default AuthErrorScreen;
