import React, { ReactElement } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/cnsc-logo.png';
import Back from '../../../assets/left-back.svg';

import StyledButton from '../../../components/StyledButton/StyledButton';
import globalstyles from '../../../styles/globalstyles';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function SigninScreen({
  navigation,
}: AuthStackScreenProps<'SigninScreen'>): ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <View style={globalstyles.logoContainer}>
        <Image source={logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Who Are You?</Text>
        <Text style={styles.subText}>Choose your account type</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          text="job seeker"
          onPress={() =>
            navigation.navigate('PhoneNumberScreen', { userType: 'jobSeeker' })
          }
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="admin"
          onPress={() => navigation.navigate('AdminSigninScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />
        <StyledButton
          text="employer"
          onPress={() => navigation.navigate('AdminSigninScreen')}
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
    </SafeAreaView>
  );
}

export default SigninScreen;
