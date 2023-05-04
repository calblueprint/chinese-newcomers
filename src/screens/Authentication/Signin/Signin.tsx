import React, { ReactElement } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import StyledButton from '../../../components/StyledButton/StyledButton';
import logo from '../../../assets/cnsc-logo.png';
import { AuthStackScreenProps } from '../../../types/navigation';

function SigninScreen({
  navigation,
}: AuthStackScreenProps<'SigninScreen'>): ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>
          Are you an admin or a job seeker?{' '}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
      <StyledButton
          text="job seeker"
          onPress={() => navigation.navigate('PhoneNumberScreen', { userType: "jobSeeker"})}
          buttonStyle={{ width: '100%', height: '42%',
          }}
          textStyle={{ }}
        />
        <StyledButton
          text="admin"
          onPress={() => navigation.navigate('AdminSigninScreen')}
          buttonStyle={{
            backgroundColor: '#FFFFFF',
            borderColor: '#CC433C',
            width: '100%',
            height: '42%',
          }}
          textStyle={{ color: '#CC433C' }}
        />
        <StyledButton
          text="employer"
          onPress={() => navigation.navigate('AdminSigninScreen')}
          buttonStyle={{
            backgroundColor: '#FFFFFF',
            borderColor: '#CC433C',
            width: '100%',
            height: '42%',
          }}
          textStyle={{ color: '#CC433C' }}
        />
      </View>
      <View style={styles.backButtonContainer}>
        <StyledButton
          text="back"
          onPress={() => navigation.goBack()}
          buttonStyle={{
            backgroundColor: '#FFFFFF',
            borderColor: '#CC433C',
            width: '50%',
            height: '30%',
          }}
          textStyle={{ color: '#CC433C' }}
        />
      </View>
    </View>
  );
}

export default SigninScreen;
