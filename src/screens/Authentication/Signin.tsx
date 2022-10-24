import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { signOutUser } from '../../firebase/auth';
import styles from './styles';
import { useAuthentication } from '../../utils/hooks/useAuthentication';

const SigninScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
    </View>
  );
};

export default SigninScreen;
