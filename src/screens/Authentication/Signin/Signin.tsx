import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { signOutUser } from '../../../firebase/auth';
import styles from '../styles';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';

const SigninScreen = ({ navigation }: any): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>What are you signing in as? </Text>
      <Text> Admin </Text>
      <Button
        title="Admin"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('AdminSignin')}
      />
      <Button
        title="Not Admin"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('PhoneNumberRegister')}
      />
    </View>
  );
};

export default SigninScreen;
